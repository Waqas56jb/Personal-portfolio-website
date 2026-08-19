import React from 'react';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { profile } from '../data/portfolio';

const SOCIALS = [
  { href: profile.github, icon: FaGithub, label: 'GitHub' },
  { href: profile.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: FaEnvelope, label: 'Email' },
];

const Footer = () => (
  <footer style={{ borderTop: '1px solid rgb(var(--line))' }}>
    <div className="container-x flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[10px] font-display text-[13px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#22D3EE,#2563EB)' }}
          aria-hidden="true"
        >
          WN
        </span>
        <div>
          <div className="font-display text-[14px] font-semibold">{profile.name}</div>
          <div className="kbd text-[9.5px]">
            {profile.title} · {profile.subtitle}
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-2" aria-label="Social links">
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-azure-500"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              <Icon className="text-[13px]" />
            </a>
          );
        })}
      </nav>

      <p className="kbd text-[9.5px]">© 2026 {profile.name}</p>
    </div>
  </footer>
);

export default Footer;
