# Frontend architecture and development

[Project overview](../README.md) | [Deployment](deployment.md) | [SEO and performance](seo-performance.md)

Paths in this guide are relative to the repository root unless a command explicitly runs from `frontend/`.

## Stack and rendering

The application uses Next.js App Router, React, and TypeScript. `frontend/next.config.mjs` sets `output: 'export'`, so builds produce HTML, CSS, JavaScript, and static assets in `frontend/out/`. Production serves these files without a Node.js runtime.

Page components render content at build time. Small React Client Components handle responsive navigation, grouped FAQ state, and the booking format/location selector. Shared link helpers validate public contact, social, and Calendly URLs. Invalid contact and social links are omitted. Missing or invalid event URLs disable the corresponding booking action with support guidance. See [location booking](booking.md) for configuration, coordinate sources, and testing.

Bootstrap JavaScript and CDN assets are not used. Images use standard HTML image elements with explicit dimensions; the static host has no Next.js image optimization server.

## Folder layout

```text
advanced-tutoring-website/
├── AGENTS.md
├── README.md
├── docs/
│   ├── frontend.md
│   ├── deployment.md
│   └── seo-performance.md
├── .github/workflows/site.yml
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    ├── public/
    │   └── assets/
    ├── scripts/preview.mjs
    ├── tests/
    ├── package.json
    ├── package-lock.json
    ├── next.config.mjs
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── playwright.config.ts
    ├── .nvmrc
    ├── .prettierrc.json
    └── .prettierignore
```

| Location                          | Responsibility                                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `frontend/src/app/layout.tsx`     | Root HTML language, shared styles, icons, skip link, and footer                                                   |
| `frontend/src/app/page.tsx`       | Homepage content and Organization JSON-LD                                                                         |
| `frontend/src/app/*/page.tsx`     | About, rates and FAQ, support, and booking pages                                                                  |
| `frontend/src/app/not-found.tsx`  | Custom missing-page content                                                                                       |
| `frontend/src/app/globals.css`    | Brand styles, page layouts, responsive adjustments, and focus states                                              |
| `frontend/src/app/bootstrap.scss` | Selected Bootstrap components and complete utility API                                                            |
| `frontend/src/components/`        | Branding, header, footer, FAQ controls, contact and booking links, closing section, location map, and structured data |
| `frontend/src/lib/site-config.ts` | Typed public business details and service configuration                                                           |
| `frontend/src/lib/page-data.json` | Page descriptions, titles, canonical URLs, and social metadata                                                    |
| `frontend/src/lib/metadata.ts`    | Next.js metadata generation and booking indexing policy                                                           |
| `frontend/src/lib/links.ts`       | URL validation and contact-link helpers                                                                           |
| `frontend/public/`                | Files copied into the export, including icons, images, robots, sitemap, CNAME, and `.nojekyll`                    |
| `frontend/scripts/preview.mjs`    | Local server for reviewing the production export                                                                  |
| `frontend/tests/`                 | Playwright tests and expected content data                                                                        |

`node_modules/`, `.next/`, `out/`, `test-results/`, `playwright-report/`, and TypeScript build caches are generated and ignored by Git. `next-env.d.ts` is maintained by Next.js tooling and may change between development and production builds; do not edit its declarations manually. Keep `package-lock.json` tracked for reproducible installations.

## Pages and URLs

| Source under `frontend/`     | Public URL        | Behavior                                                     |
| ---------------------------- | ----------------- | ------------------------------------------------------------ |
| `src/app/page.tsx`           | `/`               | Canonical homepage                                           |
| `src/app/page.tsx`           | `/index.html`     | Compatible homepage alias, canonical points to `/`           |
| `src/app/about/page.tsx`     | `/about.html`     | Tutor background and credentials                             |
| `src/app/rates-faq/page.tsx` | `/rates-faq.html` | Rates, policies, and interactive FAQ                         |
| `src/app/support/page.tsx`   | `/support.html`   | Support information and contact options                      |
| `src/app/book/page.tsx`      | `/book.html`      | Location booking selector, excluded from indexing      |
| `src/app/not-found.tsx`      | `404.html` export | Missing-page content, served with HTTP 404 for unknown paths |

The dev-only rewrites in `next.config.mjs` make `.html` URLs resolve to App Router pages during development. Production navigation links to exported files directly. Internal homepage links use `/`.

The booking page offers Online and In Person formats without redirecting automatically. Without JavaScript, the online option and support guidance remain available. See [location booking](booking.md) for configuration and map testing. FAQ groups allow one expanded answer per group; preserve question, answer, and group IDs when changing related content or links.

## Content, styles, and assets

Change business details in `frontend/src/lib/site-config.ts`. Keep site descriptions consistent with visible services. Metadata and indexing rules are documented in [SEO and performance](seo-performance.md).

Use `frontend/src/app/globals.css` for site styling. `bootstrap.scss` imports the Bootstrap components used by the site, including grids, cards, buttons, navigation, transitions, and accordions. Add the corresponding Sass import when introducing another Bootstrap component. Sass is a build dependency. Bootstrap 5.3 currently uses Sass imports that produce upstream deprecation warnings; the build still succeeds.

The approved palette is Burgundy `#751F30`, Antique Gold `#C39A52`, Silver Gray `#ECEEEF`, Espresso `#302522`, and White `#FFFFFF`. Silver Gray is the default page background. Preserve the circular burgundy Greek-letter mark. The displayed 38px mark uses the existing 180px Apple icon to avoid downloading the larger favicon PNG. If artwork changes, update `frontend/public/assets/favicon.png`, `frontend/public/assets/favicon.ico`, `frontend/public/favicon.ico`, and `frontend/public/assets/apple-touch-icon.png` together.

## Local commands

Use `frontend/.nvmrc` to select Node.js, then run `npm ci` from `frontend/`. The README contains first-time setup commands.

| Command from `frontend/`     | Purpose                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| `npm run dev`                | Development server on port 3000                                  |
| `npm run lint`               | ESLint checks                                                    |
| `npm run build`              | Production build and static export                               |
| `npm run typecheck`          | TypeScript checks, including generated route types after a build |
| `npm test`                   | Full Playwright suite against the export                         |
| `npm run preview`            | Serve existing `out/` on port 3000                               |
| `npx playwright show-report` | Open the latest HTML test report                                 |

The preview accepts a `PORT` environment variable. It is a local verification server and does not reproduce GitHub Pages compression, caching, or network behavior.

## Testing

Playwright configuration lives in `frontend/playwright.config.ts`. All three projects use Chromium: desktop, an 820-by-1180 tablet viewport, and iPhone 13 device emulation. The mobile project does not use Safari or test a physical iPhone.

| Test file under `frontend/tests/` | Coverage                                                                                                                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.spec.ts`                    | Exported page responses, headings and text, anchor IDs, metadata, links, brand image loading, overflow, visitor navigation, FAQ keyboard behavior, booking selection and no-JavaScript fallback, and custom 404 |
| `booking-url.spec.ts`             | Direct unit checks for HTTPS and exact Calendly hostname validation                                                                                                                                            |
| `seo.spec.ts`                     | Static metadata, canonical URLs, sitemap and robots, booking noindex, Organization JSON-LD, and image and stylesheet budgets                                                                                   |
| `migration-baseline.json`         | Expected headings, paragraphs, and anchors used by content regression checks                                                                                                                                   |

Despite its historical filename, `migration-baseline.json` remains active test data. Update expected content only for deliberate copy changes. It is not a migration task list.

Build before testing application changes:

```sh
cd frontend
npm run lint
npm run build
npm run typecheck
npm test
# For a targeted run after a build:
npm test -- tests/seo.spec.ts
```

Playwright starts the production preview on port 3100, reusing an existing server locally when permitted. CI starts a fresh server. Failures retain screenshots and traces in `frontend/test-results/`. The HTML report is in `frontend/playwright-report/`. CI retries failures once and uploads both directories on failure.

The latest deployed suite contained 66 cases: 64 passed and two skipped. The mobile keyboard navigation test explicitly runs only in the mobile project, so desktop and tablet skip it. Tablet still has a collapsed menu and is covered by navigation click tests; its keyboard-toggle coverage remains a gap. Test counts can change as coverage grows.

## Dependencies

Use `npm ci` for installation and review lockfile changes with dependency updates. The Babel parser and Browserslist overrides in `package.json` preserve the resolved toolchain choices. ESLint 9 is retained for compatibility with the current Next.js lint configuration. Reassess overrides and run the build and browser suite when upgrading dependencies.

Run a fresh dependency audit when reviewing dependency health. Historical installation warnings are not a current vulnerability assessment. Avoid forced dependency downgrades solely to suppress an audit report without checking compatibility and the affected dependency path.
