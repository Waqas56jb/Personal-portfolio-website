const express = require('express');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');
const mailer = require('../services/mailer');
const { enquiryEmail, autoReplyEmail } = require('../services/templates');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many messages from this address. Please try again in a few minutes.',
  },
});

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

const validate = (body) => {
  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    subject: clean(body.subject, 200),
    budget: clean(body.budget, 80),
    message: clean(body.message, 5000),
    // Honeypot: real people never fill a hidden field.
    website: clean(body.website, 200),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.message.length < 10) errors.message = 'Please add a little more detail (10+ characters).';

  return { data, errors };
};

router.post('/', limiter, async (req, res) => {
  const { data, errors } = validate(req.body || {});

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors });
  }

  // Silently accept bot submissions so they stop retrying.
  if (data.website) {
    return res.json({ ok: true, message: 'Message received.' });
  }

  if (!env.mailReady) {
    return res.status(503).json({
      ok: false,
      error: 'Email delivery is not configured on the server yet.',
    });
  }

  const payload = {
    ...data,
    meta: {
      receivedAt: new Date().toUTCString(),
      source: clean(req.get('referer') || 'portfolio', 200),
      ip: req.ip || 'unknown',
    },
  };

  try {
    const enquiry = enquiryEmail(payload);

    await mailer.send({
      from: `"Portfolio Enquiry" <${env.mail.user}>`,
      to: env.mail.to,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `New enquiry — ${data.name}${data.subject ? ` · ${data.subject}` : ''}`,
      text: enquiry.text,
      html: enquiry.html,
    });

    if (env.mail.autoReply) {
      const reply = autoReplyEmail(payload);
      // A failed courtesy email must never fail the visitor's submission.
      mailer
        .send({
          from: `"Waqas Naveed" <${env.mail.user}>`,
          to: data.email,
          subject: 'Thanks for reaching out — Waqas Naveed',
          text: reply.text,
          html: reply.html,
        })
        .catch((error) => console.error('[contact] auto-reply failed:', error.message));
    }

    return res.json({ ok: true, message: "Message sent. I'll reply within one business day." });
  } catch (error) {
    console.error('[contact] send failed:', error.message);
    return res.status(502).json({
      ok: false,
      error: 'Could not send your message right now. Please email waqas56jb@gmail.com directly.',
    });
  }
});

module.exports = router;
