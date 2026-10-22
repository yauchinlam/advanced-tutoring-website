import { siteConfig } from './site-config';

export function httpsUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function getBookingUrl(value = siteConfig.calendlyUrl): string | null {
  const url = httpsUrl(value);
  return url && new URL(url).hostname === 'calendly.com' ? url : null;
}

export function getContact(kind: 'email' | 'phone') {
  const text = siteConfig[kind].trim();
  if (kind === 'email') {
    return text && !/[\s?&#]/.test(text) && /^[^@]+@[^@]+\.[^@]+$/.test(text)
      ? { text, href: `mailto:${text}` }
      : null;
  }
  return /\d/.test(text) && /^[+\d\s().-]+$/.test(text)
    ? { text, href: `tel:${text.replace(/[^+\d]/g, '')}` }
    : null;
}
