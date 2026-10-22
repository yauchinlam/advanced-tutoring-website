import { siteConfig } from '@/lib/site-config';
import pages from '@/lib/page-data.json';

export function OrganizationData() {
  const url = pages.index.canonical;
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}#organization`,
    name: siteConfig.businessName,
    url,
    logo: new URL('/assets/favicon.png', url).href,
    description: pages.index.description,
    email: siteConfig.email,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organization).replace(/</g, '\\u003c'),
      }}
    />
  );
}
