import { useCallback, useEffect, useRef, useState } from 'react';
import { createVoiceSession } from '../services/api';

/**
 * WebRTC bridge to the OpenAI Realtime API (speech-to-speech).
 *
 * The browser never sees the real API key — the server mints a short-lived
 * ephemeral token, and that token is what signs the SDP exchange.
 *
 * Two things matter for audio quality and are easy to get wrong:
 *  1. The <audio> sink must live in the DOM, otherwise the browser cannot wire
 *     it into acoustic echo cancellation and the agent hears itself, answers
 *     itself, and you end up with two overlapping voices.
 *  2. Exactly one `response.create` may be in flight. The greeting is sent only
 *     if the server has not already opened a response of its own.
 */
const useRealtimeAgent = ({ audioRef } = {}) => {
  const [status, setStatus] = useState('idle'); // idle | connecting | live | listening | speaking | error
  const [error, setError] = useState(null);
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [levels, setLevels] = useState({ user: 0, agent: 0 });

  const pcRef = useRef(null);
  const micRef = useRef(null);
  const dcRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analysersRef = useRef({ user: null, agent: null });
  const rafRef = useRef(null);
  const pendingRef = useRef('');

  // Guards — all synchronous so double clicks and re-renders cannot race.
  const busyRef = useRef(false);
  const greetedRef = useRef(false);
  const responseActiveRef = useRef(false);
  const greetTimerRef = useRef(null);
  const remoteStreamIdRef = useRef(null);

  /* ----------------------------------------------------------- metering */

  const attachAnalyser = useCallback((stream, key) => {
    try {
      if (analysersRef.current[key]) return; // never stack analysers
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Note: the analyser is a dead end — it is never connected to the
      // destination, so it cannot double up the playback.
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analysersRef.current[key] = analyser;
    } catch {
      /* metering is decoration — never break the call over it */
    }
  }, []);

  const runMeter = useCallback(() => {
    if (rafRef.current) return;

    const read = (analyser) => {
      if (!analyser) return 0;
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(data);
      let peak = 0;
      for (let i = 0; i < data.length; i += 1) {
        peak = Math.max(peak, Math.abs(data[i] - 128) / 128);
      }
      return Math.min(1, peak * 2.4);
    };

    const tick = () => {
      setLevels({
        user: read(analysersRef.current.user),
        agent: read(analysersRef.current.agent),
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* --------------------------------------------------------- transcript */

  const pushTranscript = useCallback((role, text, final = false) => {
    if (!text) return;
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role && !last.final) {
        return [...prev.slice(0, -1), { ...last, text, final }];
      }
      return [...prev.slice(-14), { id: `${role}-${prev.length}-${Date.now()}`, role, text, final }];
    });
  }, []);

  const handleServerEvent = useCallback(
    (event) => {
      switch (event.type) {
        /* --- a response opened: block any further response.create ------ */
        case 'response.created':
          responseActiveRef.current = true;
          greetedRef.current = true;
          if (greetTimerRef.current) {
            clearTimeout(greetTimerRef.current);
            greetTimerRef.current = null;
          }
          break;

        case 'response.done':
        case 'response.cancelled':
          responseActiveRef.current = false;
          pendingRef.current = '';
          setStatus('live');
          break;

        /* --- turn taking ---------------------------------------------- */
        case 'input_audio_buffer.speech_started':
          setStatus('listening');
          break;

        case 'input_audio_buffer.speech_stopped':
          setStatus('live');
          break;

        case 'output_audio_buffer.started':
          setStatus('speaking');
          break;

        case 'output_audio_buffer.stopped':
        case 'output_audio_buffer.cleared':
          setStatus('live');
          break;

        /* --- transcripts ---------------------------------------------- */
        case 'conversation.item.input_audio_transcription.completed':
          pushTranscript('user', event.transcript, true);
          break;

        case 'response.audio_transcript.delta':
        case 'response.output_audio_transcript.delta':
          setStatus('speaking');
          pendingRef.current += event.delta || '';
          pushTranscript('agent', pendingRef.current);
          break;

        case 'response.audio_transcript.done':
        case 'response.output_audio_transcript.done':
          pushTranscript('agent', event.transcript || pendingRef.current, true);
          pendingRef.current = '';
          break;

        case 'error':
          // A duplicate response is recoverable — do not alarm the visitor.
          if (event.error?.code === 'conversation_already_has_active_response') break;
          setError(event.error?.message || 'The voice agent hit an error.');
          break;

        default:
          break;
      }
    },
    [pushTranscript]
  );

  /* --------------------------------------------------------------- stop */

  const stop = useCallback(() => {
    if (greetTimerRef.current) {
      clearTimeout(greetTimerRef.current);
      greetTimerRef.current = null;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    try {
      if (dcRef.current?.readyState === 'open' && responseActiveRef.current) {
        dcRef.current.send(JSON.stringify({ type: 'response.cancel' }));
      }
      dcRef.current?.close();
    } catch {
      /* already gone */
    }
    dcRef.current = null;

    micRef.current?.getTracks().forEach((track) => track.stop());
    micRef.current = null;

    try {
      pcRef.current?.getSenders().forEach((sender) => sender.track?.stop());
      pcRef.current?.close();
    } catch {
      /* already gone */
    }
    pcRef.current = null;

    const sink = audioRef?.current;
    if (sink) {
      sink.pause();
      sink.srcObject = null;
    }
    remoteStreamIdRef.current = null;

    analysersRef.current = { user: null, agent: null };
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;

    pendingRef.current = '';
    greetedRef.current = false;
    responseActiveRef.current = false;
    busyRef.current = false;

    setLevels({ user: 0, agent: 0 });
    setMuted(false);
    setStatus('idle');
  }, [audioRef]);

  /* -------------------------------------------------------------- start */

  const start = useCallback(async () => {
    // Synchronous lock — set before any await so a double click cannot
    // open two peer connections (that is what produced two voices).
    if (busyRef.current || pcRef.current) return;
    busyRef.current = true;

    setError(null);
    setTranscript([]);
    setStatus('connecting');

    try {
      const session = await createVoiceSession();

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = pc;

      // Remote audio -> the <audio> element that lives in the DOM.
      pc.ontrack = (event) => {
        const [stream] = event.streams;
        if (!stream || remoteStreamIdRef.current === stream.id) return;
        remoteStreamIdRef.current = stream.id;

        const sink = audioRef?.current;
        if (sink) {
          sink.srcObject = stream;
          sink.play().catch(() => {});
        }
        attachAnalyser(stream, 'agent');
      };

      // Local mic. Echo cancellation is what stops the agent hearing itself.
      const mic = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      micRef.current = mic;
      mic.getTracks().forEach((track) => pc.addTrack(track, mic));
      attachAnalyser(mic, 'user');

      // Event channel.
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.onopen = () => {
        setStatus('live');
        // Greet once — and only if the server has not already started talking.
        greetTimerRef.current = setTimeout(() => {
          if (!greetedRef.current && !responseActiveRef.current && dc.readyState === 'open') {
            greetedRef.current = true;
            dc.send(JSON.stringify({ type: 'response.create' }));
          }
          greetTimerRef.current = null;
        }, 450);
      };

      dc.onmessage = (message) => {
        try {
          handleServerEvent(JSON.parse(message.data));
        } catch {
          /* non-JSON frames are not ours */
        }
      };

      pc.onconnectionstatechange = () => {
        if (['failed', 'closed', 'disconnected'].includes(pc.connectionState)) {
          if (pc.connectionState === 'failed') setError('The voice connection dropped.');
          stop();
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Let ICE settle so the offer carries candidates.
      await new Promise((resolve) => {
        if (pc.iceGatheringState === 'complete') return resolve();
        const timer = setTimeout(resolve, 1500);
        pc.addEventListener('icegatheringstatechange', () => {
          if (pc.iceGatheringState === 'complete') {
            clearTimeout(timer);
            resolve();
          }
        });
        return undefined;
      });

      let answerSdp = null;
      let lastError = '';
      for (const url of session.sdpUrls) {
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(url, {
          method: 'POST',
          body: pc.localDescription.sdp,
          headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/sdp',
          },
        });
        if (response.ok) {
          // eslint-disable-next-line no-await-in-loop
          answerSdp = await response.text();
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        lastError = `${response.status} ${(await response.text()).slice(0, 160)}`;
      }

      if (!answerSdp) throw new Error(`OpenAI refused the connection (${lastError})`);

      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });
      runMeter();
    } catch (err) {
      const message =
        err.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser and try again.'
          : err.message || 'Could not start the voice agent.';
      stop();
      setError(message);
      setStatus('error');
    } finally {
      busyRef.current = false;
    }
  }, [attachAnalyser, audioRef, handleServerEvent, runMeter, stop]);

  const toggleMute = useCallback(() => {
    const tracks = micRef.current?.getAudioTracks() || [];
    const next = !muted;
    tracks.forEach((track) => {
      track.enabled = !next;
    });
    setMuted(next);
  }, [muted]);

  useEffect(() => stop, [stop]);

  return { status, error, muted, transcript, levels, start, stop, toggleMute };
};

export default useRealtimeAgent;
