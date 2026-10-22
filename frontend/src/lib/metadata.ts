import type { Metadata } from 'next';
import pages from './page-data.json';
import { siteConfig } from './site-config';

export function pageMetadata(key: keyof typeof pages): Metadata {
  const page = pages[key];
  // The suffix comes from the shared configuration, including after a business rename.
  const title = `${page.socialTitle} | ${siteConfig.businessName}`;
  return {
    title,
    description: page.description,
    ...(key === 'book' ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: page.canonical },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.businessName,
      title: page.socialTitle,
      description: page.socialDescription,
      url: page.canonical,
      images: [
        {
          url: page.image,
          secureUrl: page.image,
          width: page.width,
          height: page.height,
          alt: page.imageAlt,
          type: key === 'index' ? 'image/jpeg' : 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.socialTitle,
      description: page.socialDescription,
      images: [
        {
          url: 'https://elitelambdatutoring.com/assets/social-preview-20261018.jpg',
          alt: page.imageAlt,
        },
      ],
    },
  };
}
