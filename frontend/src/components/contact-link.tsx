import { getContact } from '@/lib/links';

export function ContactLink({ kind }: { kind: 'email' | 'phone' }) {
  const contact = getContact(kind);
  return contact ? <a href={contact.href}>{contact.text}</a> : null;
}
