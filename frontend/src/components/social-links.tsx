import { siteConfig } from '@/lib/site-config';
import { httpsUrl } from '@/lib/links';

const labels: Record<string, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X / Twitter',
  whatsapp: 'WhatsApp',
  youtube: 'YouTube',
};

export function SocialLinks() {
  const links = Object.entries(siteConfig.socialLinks).flatMap(
    ([key, value]) => {
      const href = httpsUrl(value);
      return href ? [{ key, href, label: labels[key] ?? key }] : [];
    },
  );
  if (!links.length) return null;
  return (
    <nav className="mb-4" aria-label="Social links">
      <ul className="list-unstyled d-flex flex-wrap gap-3 mb-0">
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
