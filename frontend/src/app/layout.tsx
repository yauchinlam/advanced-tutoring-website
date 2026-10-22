import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './bootstrap.scss';
import './globals.css';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://elitelambdatutoring.com'),
  icons: {
    icon: [
      { url: '/favicon.ico?v=20261019-circle', sizes: '16x16 32x32 48x48' },
    ],
    apple: [
      {
        url: '/assets/apple-touch-icon.png?v=20261019-circle',
        sizes: '180x180',
      },
    ],
  },
};

export const viewport: Viewport = { themeColor: '#751F30' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
