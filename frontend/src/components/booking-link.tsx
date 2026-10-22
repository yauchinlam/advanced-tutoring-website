import type { ComponentProps } from 'react';
import { getBookingUrl } from '@/lib/links';

export function BookingLink(props: Omit<ComponentProps<'a'>, 'href'>) {
  return <a {...props} href={getBookingUrl() ?? '/book.html'} />;
}
