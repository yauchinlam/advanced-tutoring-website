# Elite Lambda Tutoring Website

A responsive static website for an independent mathematics and physics tutor. Built with semantic HTML, Bootstrap 5.3.8 via CDN, custom CSS, and a small vanilla JavaScript file. No package installation, JavaScript application framework, or build step is required.

## File structure

```text
advanced-tutoring-website/
├── index.html       # Home: overview, subjects, teaching approach, and booking buttons
├── about.html       # Tutor background and credentials
├── rates-faq.html   # Session format, rates, FAQ, and booking policies
├── support.html     # Support email, contact guidance, and help links
├── book.html        # Redirect for existing booking links
├── styles.css       # Custom visual identity and Bootstrap component theming
├── site-config.js   # Public business details (no secrets)
├── script.js        # Business details, booking links, and booking redirect
├── assets/          # Local images, icons, SVGs, and other media
│   └── .gitkeep     # Keeps the empty asset directory in version control
└── README.md
```

The academic profile uses the original tutor photo at `assets/yauchin-lam-headshot.jpg`. Replace that file to update the photo; update the image dimensions in HTML if its aspect ratio changes. Decorative graphics use CSS and text symbols. Store future local media in `assets/` and reference it with relative paths such as `assets/portrait.jpg`. Give meaningful images descriptive alt text; use empty alt text for decorative images.

The public domain is `https://elitelambdatutoring.com`. Public contact links use `support@elitelambdatutoring.com`. Keep `CNAME`, canonical URLs, sharing URLs, `robots.txt`, and `sitemap.xml` aligned with the domain.

## Local usage

Open `index.html` directly in a browser. All local paths are relative, and no build step is needed.

Optionally serve the project locally with Python:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C. Bootstrap CSS and its JavaScript bundle load from jsDelivr and require an internet connection, as does the external Calendly booking page. The pinned CDN tags include subresource integrity hashes.

## Brand color theme

Elite Lambda Tutoring uses the following approved five-color visual theme:

| Role | Color | Hex |
| --- | --- | --- |
| Primary | Burgundy | `#751F30` |
| Accent | Antique Gold | `#C39A52` |
| Background | Silver Gray | `#ECEEEF` |
| Dark text | Espresso | `#302522` |
| Contrast | Pure White | `#FFFFFF` |

Use Silver Gray as the main page background, Burgundy for primary brand structure and calls to action, Antique Gold for restrained accents and borders, Espresso for primary body text, and Pure White for high-contrast surfaces and text on dark backgrounds. Do not reintroduce the previous Ivory `#FAF7F0` background unless the brand palette is intentionally changed.

## Customization

- **Public business details:** Edit only `site-config.js` for the business name, email, phone, Calendly URL, rate text, social URLs, and copyright year. The page title, repeated names, home-link labels, and marked contact/pricing elements update automatically across all five pages. Edit the general meta description in HTML if the service itself changes.
- **Academic profile:** Academic copy now reflects the approved public profile supplied by the tutor. Edit credentials and biographical content in `about.html` when facts change; do not add unsupported qualifications or outcomes.
- **Subjects and approach:** Edit the subject cards, audience list, teaching process, and session descriptions to match actual services. Add subjects by duplicating a `.col` wrapper and its `.subject.card` article in the expertise grid.
- **Rates and policies:** Set public rate text in `site-config.js`. `rates-faq.html` contains the confirmed 60-minute session format, recurring availability, and cancellation policies. Keep policy wording in HTML; confirm the online platform and integration details before accepting bookings. Edit or hide the optional `.rates` aside using the `hidden` attribute.
- **Design:** Edit the CSS custom properties at the top of `styles.css`. Bootstrap containers, rows, responsive columns, spacing, and flex utilities provide the layout. Custom tablet and mobile rules refine the presentation. Keep Bootstrap CSS before `styles.css`. Load deferred scripts in order: Bootstrap bundle, `site-config.js`, then `script.js`. The system font stack needs no external font downloads.
- **Legal information:** Add real Privacy and Terms pages and footer links if needed. No placeholder legal links are included.

### Calendly setup

1. Set `calendlyUrl` in `site-config.js` to your HTTPS Calendly scheduling URL, for example `https://calendly.com/your-account/your-event`. No HTML edit is needed to change the URL.
2. Configure availability, session lengths, rates, booking policies, and any payment requirements in Calendly itself.
3. Review the in-person service-area reminder in `book.html` and the rates and booking policies in `rates-faq.html`. Keep these aligned with the Calendly event.
4. Test a booking on the deployed site, including confirmation, rescheduling, cancellation, timezone display, and payment if enabled.

`script.js` points all marked booking buttons directly to the configured HTTPS URL on `calendly.com`, in the same tab. Calendly handles the complete booking interface; no widget, iframe, or Calendly script is loaded on this site. `book.html` remains as a compatibility redirect for bookmarks and older shared links, using `location.replace` so the Back button returns to the referring page. It also offers a manual continuation button. A blank or invalid URL leaves the redirect inactive and displays contact guidance. Before JavaScript loads, the page shows neutral continuation guidance and a working link to the approved Calendly URL. Keep that HTML fallback aligned when changing the URL. Keep `calendlyUrl` in `site-config.js` as the runtime source for booking destinations.

The static site does not collect payments itself. Payment availability depends on the booking platform configuration. Do not claim a payment provider is connected until you have configured and tested it. Visitors need JavaScript enabled to populate the configured booking links and follow the compatibility redirect; the Bootstrap mobile navigation toggle and FAQ accordion also require JavaScript and the Bootstrap CDN bundle.

## Deployment

Upload `index.html`, `about.html`, `rates-faq.html`, `support.html`, `book.html`, `styles.css`, `site-config.js`, `script.js`, and `assets/` together to any static web host, preserving their relative paths. Set the repository root as the publish directory and leave the build command empty. No server-side runtime or environment variables are required. `README.md` does not need to be served.

For GitHub Pages, publish from the repository's chosen branch and root directory. For hosts such as Netlify or Cloudflare Pages, choose a static deployment with no framework and no build command. Enable HTTPS through your host.

Before launch, review `site-config.js` and review HTML for service-area availability, agreed meeting locations, online platform, and booking/payment details. HTML fallbacks use the approved business name and support email; JavaScript updates them from configuration. Keep these HTML fallbacks aligned when changing those values. Check the finished site at mobile, tablet, and desktop widths, use keyboard navigation, and verify all booking behavior. Navigation uses real `.html` pages, so no URL rewrite rules are required. The homepage retains prominent booking buttons that open Calendly directly after configuration loads (`book.html` is their HTML fallback). Each page has its own title, description, canonical URL, sharing URL, and current-page navigation indicator. Header and footer markup is shared by convention: keep it aligned when editing the four HTML files.

## Accessibility and behavior

The page includes a skip link, semantic landmarks, visible keyboard focus, Bootstrap FAQ accordion controls, responsive grids, and reduced-motion support. Bootstrap provides the responsive navbar, grid, cards, buttons, spacing utilities, and accordion; `styles.css` provides the premium academic styling. It does not use analytics, external icon libraries, or a contact form. Browser rendering and the configured third-party booking flow should be checked before launch.

## Implementation guidance

Use Bootstrap 5 responsive containers and grid columns for page layout; prefer its spacing and flex utilities for alignment. Use Bootstrap navbar, card, button, and accordion markup and data attributes for core UI. Keep custom academic colors, typography, notebook graphics, borders, and component theme overrides in `styles.css`. Avoid reimplementing Bootstrap collapse behavior in `script.js`. Keep authored CSS and JavaScript external, preserve semantic headings and accessible control labels, and retain all clearly marked factual placeholders until verified.

CDN versions and integrity values follow the [official Bootstrap quick start](https://getbootstrap.com/docs/5.3/getting-started/introduction/). When upgrading Bootstrap, update both pinned URLs and their matching integrity hashes together.

## Public business configuration

`site-config.js` is the single editing location for frequently changing public business details:

| Field | Usage |
| --- | --- |
| `businessName` | Header, profile name, footer, copyright, page title, and home-link accessibility labels |
| `publicName` | Tutor’s public name in the academic profile |
| `professionalTitle` | Public professional title in the profile |
| `locationText` | Public service-area wording in the hero |
| `primaryCta` | Primary booking button text |
| `email` | Visible email address and `mailto:` link; blank hides it |
| `phone` | Visible phone number and `tel:` link; blank hides it; use an optional leading `+`, digits, spaces, parentheses, dots, or hyphens |
| `calendlyUrl` | Direct booking buttons and compatibility redirect; use an HTTPS URL on `calendly.com` |
| `rateText` | Public rates area; does not change actual prices in Calendly |
| `copyrightYear` | Copyright year displayed in the footer |
| `socialLinks` | Optional HTTPS URLs for LinkedIn, Instagram, Facebook, X/Twitter, WhatsApp, and YouTube; blank values hide links |

All values in this file are **public and visible to visitors**. Never add API keys, Stripe secret keys, database passwords, private tokens, or other secrets. If future functionality needs secrets, it must use a server-side service with environment variables; this static project has no secret storage.

`script.js` fills only explicitly marked elements using `textContent`, validated contact URLs, and HTTPS social/booking links. No HTML templates or general presentation logic belong in the config. Adding another social network requires an HTML link with its `data-social` key as well as a matching config entry.

Subjects and teaching philosophy stay in `index.html`, credentials in `about.html`, session details and grouped FAQ policies in `rates-faq.html`, support guidance in `support.html`, and the compatibility booking redirect in `book.html`. Booking availability, actual charges, and payment settings remain in Calendly. Changing contact details or public rate text does not require editing HTML, CSS, or `script.js`.

If JavaScript or the config fails to load, the HTML retains a generic tutor name, understandable rates/contact fallback text, and all main academic content. Optional contact and social links remain hidden. Dynamic business details and booking require JavaScript. Do not replace generic fallbacks with duplicate real business values: keep the config as their single source.

## Approved public profile and pending launch details

The current website copy uses the tutor-supplied profile: mathematics degree from Stevens Institute of Technology, Physics minor, approximately four years of prior tutoring experience, Senior Software Engineer background, Microsoft experience, and U.S. Navy service. The profile is deliberately concise rather than a full résumé. The public subject menu is Algebra, Geometry, Trigonometry, Precalculus, Calculus, Statistics, and Physics; advanced requests are considered individually.

The public rate is configured centrally. Sessions last 60 minutes, with the same rate online and in person. HTML contains the approved payment-at-booking policy, 24-hour cancellation/rescheduling notice, 50% late-cancellation/no-show charge, late-arrival policy, and tutor-cancellation terms. Scheduling, payment, and meeting details are handled through the configured Calendly event.

At launch, in-person tutoring takes place at the student’s home within selected DMV service areas, with public meeting locations available by agreement. Online tutoring is available nationwide. No permanent office or tutoring hub is advertised. Confirm service-area coverage and the meeting location before an in-person booking. Online meeting details and payment are managed through Calendly. There are no testimonials. Do not add personal records or private source documents to `assets/` or publish unsupported claims. This repository contains public website copy only, not the underlying private source sheet or verification documents.

## Shared-link preview

Each HTML page contains static Open Graph and Twitter large-image metadata for text messages and social sharing. Open Graph uses `assets/social-preview-20261018.jpg` for Facebook, LinkedIn, WhatsApp, iMessage, and other Open Graph consumers. Twitter/X uses the same branded image through its dedicated card metadata, with absolute HTTPS URLs matching `CNAME`. Upload the image with the rest of the site.

Sharing crawlers generally do not execute JavaScript, so preview titles, descriptions, URLs, and image alt text must be edited directly in each page’s HTML; changes to `site-config.js` do not update them. This metadata is an intentional exception to the single-source business configuration. Keep both Open Graph and Twitter fields aligned. If the domain changes, update the canonical URL and all preview URLs too.

The only shared preview image is `assets/social-preview-20261018.jpg`, a 1536 by 807 JPEG used by all five pages for both Open Graph and Twitter cards. To revise the card, save the replacement image under a new filename and update the Open Graph and Twitter image URLs in all five HTML pages. Keep the Open Graph image type, width, height, and both image alt text fields aligned with the replacement. The website needs no build step or Python dependencies. All preview and icon files are ready-to-serve static assets.

After deploying, request a fresh scrape through your sharing platform's preview debugger and check a newly shared link. Platforms control their own card layout and may cache earlier previews. If replacing an already cached image, use a new image filename and update the corresponding image URLs to prompt a refresh.

The browser favicon uses the Elite Lambda Tutoring ελτ brand mark in the multi-size root `favicon.ico`, with `assets/apple-touch-icon.png` retained for Apple home-screen bookmarks. Deploy `favicon.ico` at the site root along with `assets/`. When changing the mark, update the SVG, ICO, and Apple touch icon together. These are static assets and require no Python on GitHub Pages.

## Support content

The Support page links to Calendly for new bookings and directs existing clients to their confirmation links for changes. Support email links use the `email` value in `site-config.js`. Keep the address there and align the HTML email fallbacks when it changes. The FAQ is grouped into getting started, session preparation, and booking and payment, with stable question IDs and topic links. Keep support guidance aligned with the FAQ policies. Do not add response-time promises without confirming them.
