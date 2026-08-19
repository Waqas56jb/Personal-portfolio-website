const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const bool = (value, fallback = false) => {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const list = (value, fallback = []) =>
  (value ? String(value).split(',') : fallback).map((v) => v.trim()).filter(Boolean);

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',

  clientOrigins: list(process.env.CLIENT_ORIGIN, [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]),

  mail: {
    user: process.env.MAIL_USER || '',
    // Gmail shows app passwords with spaces; SMTP wants them without.
    pass: (process.env.MAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
    to: process.env.MAIL_TO || process.env.MAIL_USER || '',
    autoReply: bool(process.env.SEND_AUTO_REPLY, true),
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime',
    voice: process.env.OPENAI_REALTIME_VOICE || 'alloy',
  },
};

env.mailReady = Boolean(env.mail.user && env.mail.pass);
env.voiceReady = Boolean(env.openai.apiKey);

module.exports = env;
