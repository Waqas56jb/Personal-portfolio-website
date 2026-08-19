import React from 'react';
import { FaEnvelope, FaLinkedinIn, FaGithub, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { profile } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ContactForm from './ContactForm';

const CHANNELS = [
  { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaPhoneAlt, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: FaMapMarkerAlt, label: 'Location', value: profile.location },
  { icon: FaGithub, label: 'Code', value: 'github.com/Waqas56jb', href: profile.github },
  { icon: FaLinkedinIn, label: 'LinkedIn', value: 'waqas-naveed', href: profile.linkedin },
];

const Contact = () => (
  <section id="contact" className="section relative" aria-labelledby="contact-title">
    <div
      className="glow left-1/2 top-10 h-[300px] w-[600px] -translate-x-1/2"
      style={{ background: 'rgba(37,99,235,0.12)' }}
      aria-hidden="true"
    />
    <div className="container-x relative">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Left — pitch + channels ---------------------------------- */}
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Have a data problem"
            accent="worth solving?"
            description="Streaming pipelines, cloud migrations, lakehouse builds or a warehouse that needs rescuing — tell me what you are trying to move."
          />

          <Reveal delay={140}>
            <div className="mt-7 flex items-center gap-2">
              <span className="live-dot" aria-hidden="true" />
              <span className="muted text-[13px]">{profile.availability}</span>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="panel-2 flex items-center gap-3.5 p-3.5 transition-colors hover:border-azure-500/50">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
                    style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}
                    aria-hidden="true"
                  >
                    <Icon className="text-[13px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="kbd block text-[9px]">{c.label}</span>
                    <span className="block truncate text-[13.5px] font-medium">{c.value}</span>
                  </span>
                </div>
              );

              return (
                <Reveal key={c.label} delay={i * 60}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right — form ---------------------------------------------- */}
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>
);

export default Contact;
