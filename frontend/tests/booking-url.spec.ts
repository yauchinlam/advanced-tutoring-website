import { test, expect } from '@playwright/test';
import { getBookingUrl } from '../src/lib/links';

test('booking destinations require HTTPS and the exact Calendly host', () => {
  expect(
    getBookingUrl('https://calendly.com/elitelambdatutoring/private-tutoring'),
  ).toBe('https://calendly.com/elitelambdatutoring/private-tutoring');
  for (const value of [
    '',
    'javascript:alert(1)',
    'http://calendly.com/test',
    'https://calendly.com.example.org/test',
    'https://user:password@calendly.com/test',
    'https://example.org/test',
  ]) {
    expect(getBookingUrl(value), value).toBeNull();
  }
});
