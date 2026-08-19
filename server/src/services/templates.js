/** HTML + plain-text bodies for the two transactional emails. */

const BRAND = '#2563EB';
const ACCENT = '#22D3EE';
const INK = '#0B1120';
const MUTED = '#64748B';
const LINE = '#E2E8F0';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (value = '') => escapeHtml(value).replace(/\r?\n/g, '<br />');

const shell = (title, inner) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:600px;background:#FFFFFF;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(100deg,${BRAND},#1D4ED8);padding:22px 26px;">
              <div style="color:#FFFFFF;font-size:17px;font-weight:700;letter-spacing:-0.2px;">Waqas Naveed</div>
              <div style="color:rgba(255,255,255,0.82);font-size:11px;letter-spacing:1.6px;text-transform:uppercase;margin-top:4px;">
                Data Engineer &middot; Cloud &amp; Real-Time Data Engineering
              </div>
            </td>
          </tr>
          <tr><td style="padding:26px;">${inner}</td></tr>
          <tr>
            <td style="padding:16px 26px;border-top:1px solid ${LINE};background:#F8FAFC;">
              <div style="color:${MUTED};font-size:11px;line-height:1.6;">
                Sent automatically from the contact form on
                <span style="color:${BRAND};">waqasnaveed portfolio</span>.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const row = (label, value, isLink = false) => {
  const safe = escapeHtml(value);
  const rendered = isLink
    ? `<a href="${safe.startsWith('http') ? safe : `mailto:${safe}`}" style="color:${BRAND};text-decoration:none;">${safe}</a>`
    : safe;
  return `
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid ${LINE};width:118px;vertical-align:top;
                 color:${MUTED};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;">${escapeHtml(label)}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${LINE};color:${INK};font-size:14px;">${rendered}</td>
    </tr>`;
};

/** Notification that lands in Waqas's inbox. */
const enquiryEmail = (data) => {
  const { name, email, company, subject, budget, message, meta } = data;

  const details = [
    row('Name', name),
    row('Email', email, true),
    company ? row('Company', company) : '',
    subject ? row('Subject', subject) : '',
    budget ? row('Budget', budget) : '',
  ].join('');

  const html = shell(
    'New enquiry',
    `
    <div style="display:inline-block;padding:5px 11px;border-radius:99px;background:rgba(37,99,235,0.10);
                color:${BRAND};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;font-weight:700;">
      New enquiry
    </div>
    <h1 style="margin:14px 0 6px;font-size:21px;line-height:1.25;color:${INK};">
      ${escapeHtml(name)} wants to get in touch
    </h1>
    <p style="margin:0 0 20px;color:${MUTED};font-size:13px;line-height:1.6;">
      Submitted through the portfolio contact form.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
      ${details}
    </table>

    <div style="border-left:3px solid ${ACCENT};background:#F8FAFC;border-radius:0 10px 10px 0;padding:14px 16px;">
      <div style="color:${MUTED};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;margin-bottom:8px;">Message</div>
      <div style="color:${INK};font-size:14px;line-height:1.7;">${nl2br(message)}</div>
    </div>

    <div style="margin-top:24px;">
      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: ${subject || 'your enquiry'}`)}"
         style="display:inline-block;background:${BRAND};color:#FFFFFF;text-decoration:none;
                padding:11px 20px;border-radius:9px;font-size:13px;font-weight:600;">
        Reply to ${escapeHtml(name)}
      </a>
    </div>

    <div style="margin-top:22px;padding-top:14px;border-top:1px solid ${LINE};color:${MUTED};font-size:11px;line-height:1.7;">
      Received ${escapeHtml(meta.receivedAt)}<br />
      Source ${escapeHtml(meta.source)} &middot; IP ${escapeHtml(meta.ip)}
    </div>
    `
  );

  const text = [
    `NEW ENQUIRY — ${name}`,
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    subject ? `Subject: ${subject}` : null,
    budget ? `Budget:  ${budget}` : null,
    '',
    'Message:',
    message,
    '',
    `Received ${meta.receivedAt} · source ${meta.source} · IP ${meta.ip}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return { html, text };
};

/** Acknowledgement sent back to the person who filled the form. */
const autoReplyEmail = (data) => {
  const { name, message } = data;

  const html = shell(
    'Thanks for reaching out',
    `
    <h1 style="margin:0 0 10px;font-size:21px;line-height:1.3;color:${INK};">
      Thanks for reaching out, ${escapeHtml(name.split(' ')[0])}
    </h1>
    <p style="margin:0 0 16px;color:${INK};font-size:14px;line-height:1.75;">
      Your message reached me and I'll get back to you personally, usually within
      one business day.
    </p>
    <p style="margin:0 0 18px;color:${INK};font-size:14px;line-height:1.75;">
      In the meantime, here is what I work on: real-time streaming pipelines,
      cloud data platforms on AWS and Azure, lakehouse and warehouse
      architecture, and the analytics layer on top of them.
    </p>

    <div style="border-left:3px solid ${LINE};background:#F8FAFC;border-radius:0 10px 10px 0;padding:13px 15px;margin-bottom:20px;">
      <div style="color:${MUTED};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;margin-bottom:7px;">Your message</div>
      <div style="color:${MUTED};font-size:13px;line-height:1.7;">${nl2br(message)}</div>
    </div>

    <p style="margin:0;color:${INK};font-size:14px;line-height:1.7;">
      Best,<br />
      <strong>Waqas Naveed</strong><br />
      <span style="color:${MUTED};font-size:12px;">Data Engineer &middot; Cloud &amp; Real-Time Data Engineering</span>
    </p>
    `
  );

  const text = [
    `Thanks for reaching out, ${name.split(' ')[0]}`,
    '',
    "Your message reached me and I'll get back to you personally, usually within one business day.",
    '',
    'Your message:',
    message,
    '',
    'Best,',
    'Waqas Naveed',
    'Data Engineer · Cloud & Real-Time Data Engineering',
  ].join('\n');

  return { html, text };
};

module.exports = { enquiryEmail, autoReplyEmail };
