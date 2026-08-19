import { useCallback, useEffect, useRef, useState } from 'react';
import { createVoiceSession } from '../services/api';

/**
 * WebRTC bridge to the OpenAI Realtime API (speech-to-speech).
 *
 * The browser never sees the real API key — the server mints a short-lived
 * ephemeral token, and that token is what signs the SDP exchange.
 */
const useRealtimeAgent = () => {
  const [status, setStatus] = useState('idle'); // idle | connecting | live | speaking | listening | error
  const [error, setError] = useState(null);
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [levels, setLevels] = useState({ user: 0, agent: 0 });

  const pcRef = useRef(null);
  const micRef = useRef(null);
  const audioElRef = useRef(null);
  const dcRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analysersRef = useRef({ user: null, agent: null });
  const rafRef = useRef(null);
  const pendingRef = useRef('');

  /* ----------------------------------------------------------- metering */

  const attachAnalyser = useCallback((stream, key) => {
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

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
        const next = prev.slice(0, -1);
        return [...next, { ...last, text, final }];
      }
      return [...prev.slice(-14), { id: `${role}-${prev.length}-${Date.now()}`, role, text, final }];
    });
  }, []);

  const handleServerEvent = useCallback(
    (event) => {
      switch (event.type) {
        case 'input_audio_buffer.speech_started':
          setStatus('listening');
          break;

        case 'input_audio_buffer.speech_stopped':
          setStatus('live');
          break;

        case 'conversation.item.input_audio_transcription.completed':
          pushTranscript('user', event.transcript, true);
          break;

        // Assistant speech transcript — event name differs across API versions.
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

        case 'response.done':
          pendingRef.current = '';
          setStatus('live');
          break;

        case 'error':
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
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    try { dcRef.current?.close(); } catch { /* already closed */ }
    dcRef.current = null;

    micRef.current?.getTracks().forEach((t) => t.stop());
    micRef.current = null;

    try { pcRef.current?.close(); } catch { /* already closed */ }
    pcRef.current = null;

    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current = null;
    }

    analysersRef.current = { user: null, agent: null };
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;

    pendingRef.current = '';
    setLevels({ user: 0, agent: 0 });
    setStatus('idle');
    setMuted(false);
  }, []);

  /* -------------------------------------------------------------- start */

  const start = useCallback(async () => {
    if (pcRef.current) return;

    setError(null);
    setTranscript([]);
    setStatus('connecting');

    try {
      const session = await createVoiceSession();

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = pc;

      // Remote audio — the agent's voice.
      const audioEl = new Audio();
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (event) => {
        const [stream] = event.streams;
        audioEl.srcObject = stream;
        audioEl.play().catch(() => {});
        attachAnalyser(stream, 'agent');
      };

      // Local mic.
      const mic = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      micRef.current = mic;
      mic.getTracks().forEach((track) => pc.addTrack(track, mic));
      attachAnalyser(mic, 'user');

      // Event channel.
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;
      dc.onopen = () => {
        setStatus('live');
        // Ask the agent to greet first so the visitor is not left in silence.
        dc.send(JSON.stringify({ type: 'response.create' }));
      };
      dc.onmessage = (message) => {
        try {
          handleServerEvent(JSON.parse(message.data));
        } catch {
          /* non-JSON frames are not ours */
        }
      };

      pc.onconnectionstatechange = () => {
        if (['failed', 'closed'].includes(pc.connectionState)) {
          setError('The voice connection dropped.');
          stop();
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Give ICE a moment so the offer carries candidates.
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
      setError(message);
      setStatus('error');
      stop();
    }
  }, [attachAnalyser, handleServerEvent, runMeter, stop]);

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
