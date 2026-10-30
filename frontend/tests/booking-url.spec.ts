import { test, expect } from '@playwright/test';
import { bookingOptions, CALENDLY_ACCOUNT } from '../src/lib/booking-config';
import { getBookingUrl } from '../src/lib/links';

test('booking destinations require HTTPS and the exact Calendly host', () => {
  expect(
    getBookingUrl(`https://calendly.com/${CALENDLY_ACCOUNT}/private-tutoring`),
  ).toBe(`https://calendly.com/${CALENDLY_ACCOUNT}/private-tutoring`);
  for (const value of [
    '',
    'https://calendly.com/elitelambdatutoring',
    'https://calendly.com/another-account/event',
    'https://calendly.com/elitelambdatutoring/event/extra',
    'javascript:alert(1)',
    'http://calendly.com/test',
    'https://calendly.com.example.org/test',
    'https://user:password@calendly.com/test',
    'https://example.org/test',
  ]) {
    expect(getBookingUrl(value), value).toBeNull();
  }
});

test('all five booking options have valid Calendly event URLs', () => {
  expect(Object.keys(bookingOptions).sort()).toEqual([
    'arlington',
    'chantilly',
    'hanover',
    'online',
    'winchester',
  ]);
  for (const [id, option] of Object.entries(bookingOptions)) {
    expect(option.id).toBe(id);
    expect(
      getBookingUrl(option.calendlyUrl),
      `${id} must have a valid Calendly event URL`,
    ).not.toBeNull();
  }
});
