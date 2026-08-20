import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { sendContactMessage } from '../services/api';

const EMPTY = {
  name: '',
  email: '',
  company: '',
  subject: '',
  budget: '',
  message: '',
  website: '', // honeypot
};

const BUDGETS = ['Not sure yet', 'Under $1k', '$1k – $5k', '$5k – $15k', '$15k+', 'Hourly / retainer'];

const Field = ({ label, error, children, hint }) => (
  <label className="block">
    <span className="kbd mb-1.5 block text-[9.5px]">{label}</span>
    {children}
    {error ? (
      <span className="mt-1 block text-[11px]" style={{ color: '#F87171' }}>
        {error}
      </span>
    ) : (
      hint && <span className="kbd mt-1 block text-[9px]">{hint}</span>
    )}
  </label>
);

const inputStyle = {
  background: 'rgb(var(--surface-2))',
  border: '1px solid rgb(var(--line))',
  color: 'rgb(var(--text))',
};

const inputClass =
  'w-full rounded-[10px] px-3 py-2.5 text-[13.5px] outline-none transition-colors focus:border-azure-500';

const ContactForm = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [feedback, setFeedback] = useState('');

  const update = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (state === 'sending') return;

    setState('sending');
    setErrors({});
    setFeedback('');

    try {
      const result = await sendContactMessage(values);
      setState('sent');
      setFeedback(result?.message || 'Message sent.');
      setValues(EMPTY);
    } catch (error) {
      setState('error');
      setErrors(error.errors || {});
      setFeedback(
        error.errors
          ? 'Please check the highlighted fields.'
          : error.message || 'Could not send your message.'
      );
    }
  };

  if (state === 'sent') {
    return (
      <div className="card flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: 'rgba(34,197,94,0.14)', color: '#22C55E' }}
        >
          <FaCheckCircle className="text-[22px]" />
        </span>
        <h3 className="text-[1.05rem]">Message sent</h3>
        <p className="muted max-w-[36ch] text-[13px] leading-relaxed">{feedback}</p>
        <button
          type="button"
          onClick={() => {
            setState('idle');
            setFeedback('');
          }}
          className="btn-ghost mt-2 !py-2 !text-[12.5px]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card h-full p-5 sm:p-6" noValidate>
      <div className="mb-4 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h3 className="text-[1.05rem]">Send a message</h3>
        <span className="kbd text-[9px]">replies within 1 business day</span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Your name *" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={update('name')}
            className={inputClass}
            style={inputStyle}
            placeholder="Jane Cooper"
            autoComplete="name"
            required
          />
        </Field>

        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={update('email')}
            className={inputClass}
            style={inputStyle}
            placeholder="jane@company.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Company">
          <input
            type="text"
            value={values.company}
            onChange={update('company')}
            className={inputClass}
            style={inputStyle}
            placeholder="Optional"
            autoComplete="organization"
          />
        </Field>

        <Field label="Budget">
          <select value={values.budget} onChange={update('budget')} className={inputClass} style={inputStyle}>
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Subject">
            <input
              type="text"
              value={values.subject}
              onChange={update('subject')}
              className={inputClass}
              style={inputStyle}
              placeholder="Streaming pipeline on AWS"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="What are you building? *" error={errors.message}>
            <textarea
              value={values.message}
              onChange={update('message')}
              rows={5}
              className={`${inputClass} resize-y`}
              style={inputStyle}
              placeholder="Tell me about the data problem, the stack you are on, and your timeline."
              required
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={update('website')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
      />

      {state === 'error' && feedback && (
        <div
          className="mt-4 rounded-lg px-3 py-2.5 text-[12.5px] leading-relaxed"
          style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}
          role="alert"
        >
          {feedback}
        </div>
      )}

      <button type="submit" disabled={state === 'sending'} className="btn-primary mt-5 w-full disabled:opacity-70">
        {state === 'sending' ? (
          <>
            <FaSpinner className="animate-spin text-xs" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <FaPaperPlane className="text-xs" aria-hidden="true" /> Send message
          </>
        )}
      </button>

      <p className="kbd mt-3 text-[9px] leading-relaxed">
        Goes straight to waqas56jb@gmail.com. No newsletter, no sharing.
      </p>
    </form>
  );
};

export default ContactForm;
