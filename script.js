'use strict';

// Keep readable HTML fallbacks when configuration is missing or fails to load.
(() => {
  if (typeof SITE_CONFIG === 'undefined') return;
  const config = SITE_CONFIG;
  const value = (entry) => typeof entry === 'string' ? entry.trim() : '';
  const populate = (key, text) => {
    if (!text) return;
    document.querySelectorAll(`[data-business="${key}"]`).forEach((element) => {
      element.textContent = text;
    });
  };

  const name = value(config.businessName);
  populate('businessName', name);
  ['publicName', 'professionalTitle', 'locationText', 'primaryCta'].forEach((key) => {
    populate(key, value(config[key]));
  });
  populate('rateText', value(config.rateText));
  populate('copyrightYear', String(config.copyrightYear || ''));
  if (name) {
    document.title = `${document.body.dataset.pageTitle || 'Advanced Mathematics & Physics'} | ${name}`;
    document.querySelectorAll('[data-business-home]').forEach((link) => {
      link.setAttribute('aria-label', `${name} home`);
    });
  }

  const email = value(config.email);
  const phone = value(config.phone);
  // No HTML injection: public text uses textContent and links use explicit schemes.
  const contacts = [
    ['email', email, email && !/[\s?&#]/.test(email) && /^[^@]+@[^@]+\.[^@]+$/.test(email), `mailto:${email}`],
    ['phone', phone, /\d/.test(phone) && /^[+\d\s().-]+$/.test(phone), `tel:${phone.replace(/[^+\d]/g, '')}`]
  ];
  contacts.forEach(([key, text, valid, href]) => {
    document.querySelectorAll(`[data-contact="${key}"]`).forEach((link) => {
      link.hidden = !valid;
      if (valid) {
        link.textContent = text;
        link.href = href;
      } else {
        link.removeAttribute('href');
      }
    });
  });

  const httpsUrl = (entry) => {
    try {
      const url = new URL(value(entry));
      return url.protocol === 'https:' && !url.username && !url.password ? url : null;
    } catch {
      return null;
    }
  };
  let socialCount = 0;
  document.querySelectorAll('[data-social]').forEach((link) => {
    const url = httpsUrl(config.socialLinks?.[link.dataset.social]);
    link.hidden = !url;
    if (url) {
      link.href = url.href;
      socialCount += 1;
    } else {
      link.removeAttribute('href');
    }
  });
  document.querySelectorAll('[data-social-links]').forEach((element) => {
    element.hidden = socialCount === 0;
  });

  const bookingUrl = httpsUrl(config.calendlyUrl);
  if (!bookingUrl || bookingUrl.hostname !== 'calendly.com') {
    const status = document.querySelector('[data-booking-status]');
    if (status) status.textContent = 'The booking link could not be loaded. Please email support for help arranging a session.';
    document.querySelectorAll('[data-booking-link]').forEach((link) => {
      link.href = 'book.html';
      if (link.closest('main') && document.body.hasAttribute('data-booking-redirect')) {
        link.hidden = true;
      }
    });
    return;
  }
  document.querySelectorAll('[data-booking-link]').forEach((link) => {
    link.href = bookingUrl.href;
    link.hidden = false;
  });
  if (document.body.hasAttribute('data-booking-redirect')) {
    const status = document.querySelector('[data-booking-status]');
    if (status) status.textContent = 'Opening Calendly. If you are not redirected, use the button below.';
    window.location.replace(bookingUrl.href);
  }
})();
