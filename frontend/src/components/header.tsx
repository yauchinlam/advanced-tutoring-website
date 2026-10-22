'use client';

import { useState } from 'react';
import { Brand } from './brand';
import { BookingLink } from './booking-link';

const pages = [
  ['index', 'Home'],
  ['about', 'About'],
  ['rates-faq', 'Rates & FAQ'],
  ['support', 'Support'],
] as const;

export function Header({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-xl py-3"
        aria-label="Main navigation"
      >
        <div className="container">
          <Brand navbar />
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="main-navigation"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${open ? ' show' : ''}`}
            id="main-navigation"
          >
            <ul className="navbar-nav ms-auto align-items-xl-center gap-xl-3 pt-3 pt-xl-0">
              {pages.map(([slug, label]) => (
                <li className="nav-item" key={slug}>
                  <a
                    className={`nav-link${current === slug ? ' active' : ''}`}
                    href={slug === 'index' ? '/' : `/${slug}.html`}
                    aria-current={current === slug ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <BookingLink className="nav-link">
                  Book a session <span aria-hidden="true">↗</span>
                </BookingLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
