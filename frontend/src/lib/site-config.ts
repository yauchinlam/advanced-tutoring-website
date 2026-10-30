// Public, build-time configuration. Never put secrets in this module.
export interface SiteConfig {
  businessName: string;
  publicName: string;
  professionalTitle: string;
  locationText: string;
  primaryCta: string;
  email: string;
  phone: string;
  rateText: string;
  copyrightYear: string;
  socialLinks: Record<string, string>;
}

export const siteConfig = {
  businessName: 'Elite Lambda Tutoring',
  publicName: 'Yauchin M. Lam',
  professionalTitle: 'Advanced Math & Physics Tutor | Senior Software Engineer',
  locationText:
    'In-Person Tutoring in Selected Washington, D.C., Maryland, and Virginia Areas | Online Nationwide',
  primaryCta: 'Book a Tutoring Session',
  email: 'support@elitelambdatutoring.com',
  phone: '',
  rateText:
    'Rates vary by session format and location. View booking details for regular rates, promotional rates, and coupon codes.',
  copyrightYear: '2026',
  socialLinks: {
    linkedin: '',
    instagram: '',
    facebook: '',
    twitter: '',
    whatsapp: '',
    youtube: '',
  },
} satisfies SiteConfig;
