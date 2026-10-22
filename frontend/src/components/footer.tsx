import { ContactLink } from '@/components/contact-link';
import { siteConfig } from '@/lib/site-config';
import { Brand } from './brand';
import { SocialLinks } from './social-links';

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top d-flex flex-wrap justify-content-between align-items-center gap-4">
          <Brand />
          <div className="footer-contact d-flex flex-wrap gap-3">
            <a href="/support.html">Support</a>
            <a href="/rates-faq.html#faq">FAQ</a>
            <ContactLink kind="email" />
            <ContactLink kind="phone" />
          </div>
        </div>
        <SocialLinks />
        <div className="footer-bottom d-flex flex-wrap justify-content-between gap-4">
          <p>
            {'© '}
            <span data-business="copyrightYear">
              {siteConfig.copyrightYear}
            </span>{' '}
            <span data-business="businessName">{siteConfig.businessName}</span>.
            All rights reserved.
          </p>
          <p>
            Book and pay through Calendly. Refer to your booking confirmation
            for appointment and meeting details.
          </p>
        </div>
      </div>
    </footer>
  );
}
