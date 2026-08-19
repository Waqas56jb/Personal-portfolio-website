const express = require('express');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');
const { buildInstructions } = require('../prompts/agent');

const router = express.Router();

const OPENAI = 'https://api.openai.com/v1';

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many voice sessions started. Please wait a moment.' },
});

/**
 * OpenAI moved ephemeral-token minting from `/realtime/sessions` to
 * `/realtime/client_secrets`. Try the current endpoint, fall back to the
 * older one so this keeps working on either API generation.
 */
const mintClientSecret = async (instructions) => {
  const headers = {
    Authorization: `Bearer ${env.openai.apiKey}`,
    'Content-Type': 'application/json',
  };

  // --- current shape ------------------------------------------------------
  const modern = await fetch(`${OPENAI}/realtime/client_secrets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session: {
        type: 'realtime',
        model: env.openai.model,
        instructions,
        audio: {
          input: {
            transcription: { model: 'whisper-1' },
            turn_detection: {
              type: 'semantic_vad',
              // The visitor can cut in; the agent stops instead of talking over.
              interrupt_response: true,
              create_response: true,
            },
          },
          output: { voice: env.openai.voice },
        },
      },
    }),
  });

  if (modern.ok) {
    const json = await modern.json();
    return {
      token: json.value || json.client_secret?.value,
      expiresAt: json.expires_at || json.client_secret?.expires_at,
      api: 'client_secrets',
    };
  }

  const modernError = await modern.text();

  // --- legacy shape -------------------------------------------------------
  const legacy = await fetch(`${OPENAI}/realtime/sessions`, {
    method: 'POST',
    headers: { ...headers, 'OpenAI-Beta': 'realtime=v1' },
    body: JSON.stringify({
      model: env.openai.model,
      voice: env.openai.voice,
      modalities: ['audio', 'text'],
      instructions,
      input_audio_transcription: { model: 'whisper-1' },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.6,
        prefix_padding_ms: 300,
        silence_duration_ms: 620,
        create_response: true,
        interrupt_response: true,
      },
    }),
  });

  if (legacy.ok) {
    const json = await legacy.json();
    return {
      token: json.client_secret?.value,
      expiresAt: json.client_secret?.expires_at,
      api: 'sessions',
    };
  }

  const legacyError = await legacy.text();
  const error = new Error(
    `OpenAI rejected the session request. client_secrets: ${modern.status} ${modernError.slice(0, 300)} | sessions: ${legacy.status} ${legacyError.slice(0, 300)}`
  );
  error.status = modern.status === 401 || legacy.status === 401 ? 401 : 502;
  throw error;
};

router.get('/session', limiter, async (req, res) => {
  if (!env.voiceReady) {
    return res.status(503).json({
      ok: false,
      error: 'Voice agent is not configured. Add OPENAI_API_KEY to server/.env',
    });
  }

  try {
    const { token, expiresAt, api } = await mintClientSecret(buildInstructions());

    if (!token) {
      return res.status(502).json({ ok: false, error: 'OpenAI did not return a session token.' });
    }

    return res.json({
      ok: true,
      token,
      expiresAt,
      model: env.openai.model,
      voice: env.openai.voice,
      // The client tries these in order when POSTing its SDP offer.
      sdpUrls: [
        `${OPENAI}/realtime/calls?model=${encodeURIComponent(env.openai.model)}`,
        `${OPENAI}/realtime?model=${encodeURIComponent(env.openai.model)}`,
      ],
      api,
    });
  } catch (error) {
    console.error('[realtime] session failed:', error.message);
    return res.status(error.status || 502).json({
      ok: false,
      error:
        error.status === 401
          ? 'OpenAI rejected the API key. Check OPENAI_API_KEY in server/.env'
          : 'Could not start a voice session right now. Please try again.',
    });
  }
});

module.exports = router;
