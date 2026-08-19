const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const env = require('./config/env');
const mailer = require('./services/mailer');
const contactRouter = require('./routes/contact');
const realtimeRouter = require('./routes/realtime');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '64kb' }));

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin requests and curl send no Origin header.
      if (!origin) return callback(null, true);
      if (env.isOriginAllowed(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
    methods: ['GET', 'POST'],
  })
);

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    env: env.nodeEnv,
    mail: env.mailReady ? 'configured' : 'missing MAIL_USER / MAIL_APP_PASSWORD',
    voice: env.voiceReady ? 'configured' : 'missing OPENAI_API_KEY',
  });
});

app.use('/api/contact', contactRouter);
app.use('/api/realtime', realtimeRouter);

app.use((req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error('[server]', error.message);
  const status = /CORS/.test(error.message) ? 403 : 500;
  res.status(status).json({ ok: false, error: error.message });
});

app.listen(env.port, async () => {
  console.log(`\n  Portfolio API  ·  http://localhost:${env.port}`);
  console.log(`  Allowed origins: ${env.clientOrigins.join(', ')}`);

  const mail = await mailer.verifyConnection();
  console.log(
    mail.ok
      ? `  Mail:  ready (${env.mail.user} -> ${env.mail.to})`
      : `  Mail:  NOT ready — ${mail.reason}`
  );
  console.log(
    env.voiceReady
      ? `  Voice: ready (${env.openai.model}, voice "${env.openai.voice}")`
      : '  Voice: NOT ready — set OPENAI_API_KEY in server/.env'
  );
  console.log('');
});
