const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;

/** Lazily built so the process still boots when mail is not configured. */
const getTransporter = () => {
  if (!env.mailReady) {
    throw new Error('Mail is not configured. Set MAIL_USER and MAIL_APP_PASSWORD in server/.env');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.mail.user,
        pass: env.mail.pass,
      },
      pool: true,
      maxConnections: 2,
    });
  }

  return transporter;
};

/** Confirms the SMTP credentials actually work. Called once at boot. */
const verifyConnection = async () => {
  if (!env.mailReady) return { ok: false, reason: 'not-configured' };
  try {
    await getTransporter().verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
};

const send = (message) => getTransporter().sendMail(message);

module.exports = { getTransporter, verifyConnection, send };
