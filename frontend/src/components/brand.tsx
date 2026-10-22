import { siteConfig } from '@/lib/site-config';

export function Brand({ navbar = false }: { navbar?: boolean }) {
  return (
    <a
      className={`brand${navbar ? ' navbar-brand' : ''}`}
      href="/"
      aria-label={`${siteConfig.businessName} home`}
    >
      <img
        className="brand-mark"
        src="/assets/favicon.png?v=20261019-circle"
        width={38}
        height={38}
        alt=""
        aria-hidden="true"
      />
      <span>
        <span data-business="businessName">{siteConfig.businessName}</span>
        <small>MATHEMATICS &amp; PHYSICS</small>
      </span>
    </a>
  );
}
