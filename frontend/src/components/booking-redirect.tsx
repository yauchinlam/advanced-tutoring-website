'use client';

import { useEffect } from 'react';
import { getBookingUrl } from '@/lib/links';

export function BookingRedirect() {
  const url = getBookingUrl();
  useEffect(() => {
    if (url) window.location.replace(url);
  }, [url]);
  return (
    <p role="status">
      {url
        ? 'Continue to Calendly using the button below.'
        : 'The booking link could not be loaded. Please email support for help arranging a session.'}
    </p>
  );
}
