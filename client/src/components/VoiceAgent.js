import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaTimes, FaHeadset, FaPhoneAlt } from 'react-icons/fa';
import useRealtimeAgent from '../hooks/useRealtimeAgent';

/* -------------------------------------------------------------- copy deck */

const SCREEN = {
  idle: {
    title: 'Ready to talk',
    sub: 'Ask anything about Waqas — his data engineering work, stack or availability.',
    tone: '#7DB3FB',
  },
  connecting: {
    title: 'Connecting',
    sub: 'Setting up a secure voice line.',
    tone: '#F59E0B',
  },
  live: {
    title: 'Listening',
    sub: 'Speak naturally — I can hear you.',
    tone: '#22C55E',
  },
  listening: {
    title: 'Listening',
    sub: 'Go ahead, I am following.',
    tone: '#22D3EE',
  },
  speaking: {
    title: 'Speaking',
    sub: 'Interrupt any time — just start talking.',
    tone: '#3B82F6',
  },
  error: {
    title: 'Connection issue',
    sub: 'Something interrupted the line.',
    tone: '#EF4444',
  },
};

const SUGGESTIONS = [
  'What does Waqas do?',
  'Which clouds has he worked on?',
  'Tell me about his projects',
  'Is he available for work?',
];

/* ---------------------------------------------------------------- visuals */

/** widget.png, with a graceful fallback if the file is missing. */
const AgentAvatar = ({ className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{ background: 'linear-gradient(150deg,#E8F1FF,#BBD7FF)', color: '#1D4ED8' }}
      >
        <FaHeadset className="text-[12px]" />
      </span>
    );
  }

  return (
    <img
      src="/widget.png"
      alt="Waqas Naveed's AI voice assistant"
      className={`select-none object-contain ${className}`}
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
};

/** Slow-rotating elliptical rings that give the sphere its sense of depth. */
const OrbitRings = ({ tone, active }) => (
  <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="orb-ring-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={tone} stopOpacity="0.9" />
        <stop offset="55%" stopColor={tone} stopOpacity="0.12" />
        <stop offset="100%" stopColor={tone} stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id="orb-ring-b" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.7" />
        <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    <ellipse
      cx="200" cy="200" rx="176" ry="176"
      fill="none" stroke="url(#orb-ring-a)" strokeWidth="1.4"
      className={active ? 'animate-spin-slow' : ''}
      style={{ transformOrigin: '200px 200px', animationDuration: '22s' }}
    />
    <ellipse
      cx="200" cy="200" rx="188" ry="72"
      fill="none" stroke="url(#orb-ring-b)" strokeWidth="1.1"
      transform="rotate(-24 200 200)"
      className={active ? 'animate-spin-slow' : ''}
      style={{ transformOrigin: '200px 200px', animationDuration: '30s' }}
    />
    <ellipse
      cx="200" cy="200" rx="194" ry="94"
      fill="none" stroke="url(#orb-ring-a)" strokeWidth="0.9" strokeDasharray="3 9"
      transform="rotate(34 200 200)"
      className={active ? 'animate-spin-slow' : ''}
      style={{ transformOrigin: '200px 200px', animationDuration: '38s', animationDirection: 'reverse' }}
    />
  </svg>
);

const Waveform = ({ level, tone, bars = 40 }) => (
  <div className="flex h-8 items-center justify-center gap-[3px]" aria-hidden="true">
    {Array.from({ length: bars }, (_, i) => {
      const centre = 1 - Math.abs(i - (bars - 1) / 2) / ((bars - 1) / 2);
      const jitter = 0.55 + ((i * 41) % 13) / 22;
      const height = 2 + level * 28 * (0.3 + centre * 1.05) * jitter;
      return (
        <span
          key={i}
          className="w-[2px] rounded-full transition-[height] duration-100"
          style={{
            height: `${Math.max(2, Math.min(30, height))}px`,
            background: tone,
            opacity: 0.25 + centre * 0.6,
          }}
        />
      );
    })}
  </div>
);

const Particles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => (
      <span
        key={i}
        className="absolute animate-drift rounded-full"
        style={{
          left: `${(i * 37) % 100}%`,
          bottom: `${-10 + ((i * 23) % 40)}%`,
          width: i % 3 === 0 ? 3 : 2,
          height: i % 3 === 0 ? 3 : 2,
          background: i % 4 === 0 ? '#22D3EE' : '#7DB3FB',
          opacity: 0.5,
          animationDelay: `${(i * 0.9) % 16}s`,
          animationDuration: `${13 + (i % 5) * 2}s`,
        }}
      />
    ))}
  </div>
);

/* ------------------------------------------------------------- component */

const VoiceAgent = () => {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const feedRef = useRef(null);
  const dialogRef = useRef(null);

  const { status, error, muted, transcript, levels, start, stop, toggleMute } = useRealtimeAgent();

  const active = ['live', 'listening', 'speaking'].includes(status);
  const connecting = status === 'connecting';
  const screen = SCREEN[status] || SCREEN.idle;
  const tone = screen.tone;
  const level = status === 'speaking' ? levels.agent : levels.user;
  const pulse = Math.max(levels.agent, levels.user);

  /* mouse-driven 3D tilt of the whole orb assembly */
  const handleTilt = useCallback((event) => {
    const node = stageRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 14, y: px * 18 });
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [transcript]);

  const close = useCallback(() => {
    if (active || connecting) stop();
    setOpen(false);
    setTilt({ x: 0, y: 0 });
  }, [active, connecting, stop]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <>
      {/* ------------------------------------------------- launcher orb */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Talk to Waqas's AI assistant"
        className={`group fixed bottom-5 right-5 z-[70] transition-all duration-500 ${
          open ? 'pointer-events-none scale-50 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <span
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.5), transparent 68%)',
            filter: 'blur(16px)',
            transform: 'scale(1.7)',
          }}
          aria-hidden="true"
        />
        <span className="absolute inset-0 -z-10 animate-ring-pulse rounded-full" style={{ border: '1.5px solid rgba(34,211,238,0.6)' }} aria-hidden="true" />
        <span className="absolute inset-0 -z-10 animate-ring-pulse rounded-full" style={{ border: '1.5px solid rgba(37,99,235,0.45)', animationDelay: '1.1s' }} aria-hidden="true" />

        <span
          className="relative flex h-[68px] w-[68px] animate-float items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
          style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.14), rgba(37,99,235,0.22))',
            border: '1px solid rgba(34,211,238,0.45)',
            boxShadow: '0 18px 44px -14px rgba(37,99,235,0.85), inset 0 1px 0 rgba(255,255,255,0.35)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <AgentAvatar className="h-[52px] w-[52px] drop-shadow-[0_6px_14px_rgba(4,7,14,0.45)]" />
          <span
            className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2"
            style={{ background: '#22C55E', borderColor: 'rgb(var(--bg))' }}
            aria-hidden="true"
          />
        </span>

        <span
          className="pointer-events-none absolute right-[78px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-medium opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:block"
          style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--line))', color: 'rgb(var(--text))' }}
        >
          Ask my AI about me
          <span className="kbd ml-2 text-[9px]">voice</span>
        </span>
      </button>

      {/* ------------------------------------------------- call screen */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`fixed inset-0 z-[90] outline-none transition-opacity duration-500 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Voice conversation with Waqas's AI assistant"
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div className="call-stage absolute inset-0" aria-hidden="true">
          <div
            className="glow left-[12%] top-[8%] h-[420px] w-[420px] animate-aurora"
            style={{ background: 'rgba(37,99,235,0.30)' }}
          />
          <div
            className="glow right-[10%] bottom-[6%] h-[380px] w-[380px] animate-aurora"
            style={{ background: 'rgba(34,211,238,0.20)', animationDelay: '4s' }}
          />
          <div className="grid-bg absolute inset-0 opacity-40" />
          <Particles />
          <div className="call-vignette absolute inset-0" />
        </div>

        {/* content */}
        <div
          className={`relative flex h-full flex-col transition-transform duration-700 ${
            open ? 'scale-100' : 'scale-95'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
        >
          {/* header */}
          <div className="flex items-center justify-between gap-3 px-5 pt-5 sm:px-8 sm:pt-7">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <AgentAvatar className="h-8 w-8" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[13.5px] font-semibold" style={{ color: '#E9EFF7' }}>
                  Waqas&apos;s AI Assistant
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: tone, boxShadow: `0 0 10px ${tone}` }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: '#8595AC' }}>
                    {active ? 'live' : status}
                  </span>
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close voice screen"
              className="call-btn h-10 w-10"
            >
              <FaTimes className="text-[13px]" />
            </button>
          </div>

          {/* orb stage */}
          <div
            ref={stageRef}
            onMouseMove={handleTilt}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="flex flex-1 flex-col items-center justify-center px-6 py-4"
            style={{ perspective: '1100px' }}
          >
            <div
              className="relative h-[210px] w-[210px] transition-transform duration-300 ease-out sm:h-[280px] sm:w-[280px]"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* emanating ripples while the agent talks */}
              {(status === 'speaking' || status === 'listening') &&
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute inset-0 animate-ripple rounded-full"
                    style={{ border: `1px solid ${tone}`, animationDelay: `${i * 1.1}s` }}
                    aria-hidden="true"
                  />
                ))}

              <OrbitRings tone={tone} active={open} />

              {/* bloom */}
              <span
                className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '150%',
                  height: '150%',
                  background: `radial-gradient(circle, ${tone}${active ? '55' : '33'}, transparent 62%)`,
                  filter: 'blur(46px)',
                  opacity: 0.55 + pulse * 0.45,
                  transition: 'opacity 140ms linear',
                }}
                aria-hidden="true"
              />

              {/* the sphere */}
              <div
                className="orb-sphere absolute inset-[14%] animate-orb"
                style={{ transform: `scale(${1 + pulse * 0.07})`, transition: 'transform 110ms ease-out' }}
                aria-hidden="true"
              />
            </div>

            {/* copy */}
            <div key={status} className="mt-9 animate-rise-in text-center sm:mt-11">
              <h2 className="font-display text-[1.6rem] font-semibold sm:text-[2rem]" style={{ color: '#F2F6FC' }}>
                {screen.title}
                {connecting && <span className="animate-blink" style={{ color: tone }}>…</span>}
              </h2>
              <p className="mx-auto mt-2 max-w-[42ch] text-[13.5px] leading-relaxed" style={{ color: '#8595AC' }}>
                {error || screen.sub}
              </p>
            </div>

            {/* meter */}
            <div className="mt-6 h-8">{(active || connecting) && <Waveform level={level} tone={tone} />}</div>

            {/* idle prompts */}
            {!active && !connecting && transcript.length === 0 && (
              <div className="mt-2 flex max-w-[520px] flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <span
                    key={s}
                    className="animate-rise-in rounded-full px-3 py-1.5 font-mono text-[10.5px]"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: '#8595AC',
                      animationDelay: `${200 + i * 90}ms`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* transcript */}
            {transcript.length > 0 && (
              <div
                ref={feedRef}
                className="mt-4 max-h-[164px] w-full max-w-[560px] space-y-2 overflow-y-auto scrollbar-hide px-1"
              >
                {transcript.map((line) => (
                  <div key={line.id} className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span
                      className="max-w-[84%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-relaxed"
                      style={
                        line.role === 'user'
                          ? {
                              background: 'rgba(59,130,246,0.18)',
                              border: '1px solid rgba(59,130,246,0.32)',
                              color: '#E9EFF7',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.10)',
                              color: '#C3CEDD',
                            }
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* controls */}
          <div className="flex flex-col items-center gap-4 px-6 pb-8 sm:pb-10">
            <div className="flex items-center gap-4">
              {!active && !connecting ? (
                <button
                  type="button"
                  onClick={start}
                  className="call-btn call-btn-primary h-[68px] w-[68px]"
                  aria-label="Start voice conversation"
                >
                  <FaPhoneAlt className="text-[19px]" />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={toggleMute}
                    disabled={connecting}
                    aria-pressed={muted}
                    aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
                    className="call-btn h-14 w-14 disabled:opacity-45"
                    style={muted ? { borderColor: 'rgba(248,113,113,0.55)', color: '#F87171' } : undefined}
                  >
                    {muted ? <FaMicrophoneSlash className="text-[16px]" /> : <FaMicrophone className="text-[16px]" />}
                  </button>
                  <button
                    type="button"
                    onClick={stop}
                    aria-label={connecting ? 'Cancel connection' : 'End call'}
                    className="call-btn call-btn-danger h-14 w-14"
                  >
                    <FaTimes className="text-[17px]" />
                  </button>
                </>
              )}
            </div>

            <p className="text-center font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: '#5B6B86' }}>
              {active || connecting
                ? 'Answers questions about Waqas only · OpenAI Realtime'
                : 'Tap to start · answers questions about Waqas only'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceAgent;
