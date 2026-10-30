import type { ComponentProps } from 'react';

export function BookingLink(props: Omit<ComponentProps<'a'>, 'href'>) {
  return <a {...props} href="/book.html" />;
}
