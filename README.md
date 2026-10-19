# Elite Lambda Tutoring

A five-page tutoring website built with React, Next.js App Router, and TypeScript. Next.js generates static HTML, CSS, and JavaScript in `out/`. Production needs no Node.js server, database, or Python service. Calendly continues to handle scheduling and configured payments.

## Development

Use the Node.js version in `.nvmrc`:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`. Existing links such as `/about.html` work in development through development-only rewrites. Normal production navigation uses real `.html` files, without a server rewrite or SPA fallback.

```sh
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm test
npm run preview
```

The production preview serves `out/` at `http://localhost:3000`; set `PORT` to use another port. Build before previewing. Browser tests start their own production preview on port 3100 and cover desktop and mobile layouts. Type checking after a build includes Next.js generated route types.

## Project structure

| Location                     | Purpose                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `src/app/`                   | Page components, root layout, and global styles                              |
| `src/components/`            | Shared branding, navigation, footer, contact and booking links, FAQ controls |
| `src/lib/site-config.ts`     | Typed public business details                                                |
| `src/lib/page-data.json`     | Page descriptions, canonical URLs, and sharing metadata                      |
| `src/lib/metadata.ts`        | Next.js metadata generation                                                  |
| `public/`                    | Images, favicon, custom domain file, robots, and sitemap                     |
| `scripts/preview.mjs`        | Static production preview server                                             |
| `tests/`                     | Browser tests and the original page heading and anchor baseline              |
| `.github/workflows/site.yml` | PR checks, production build, and deployment from main                        |

Page content is rendered at build time. The mobile navigation, grouped FAQ accordions, and booking compatibility redirect use small React Client Components. Bootstrap CSS is installed through npm; Bootstrap JavaScript and CDN requests are not used. Local images use standard image elements because this static deployment has no image optimization server.

## Content and branding

Edit public business details in `src/lib/site-config.ts`. Changes require a rebuild. Never put credentials, API keys, or private student information in public configuration or browser bundles. Invalid contact and social URLs are omitted; invalid booking URLs route visitors to the compatibility page with support guidance.

Edit general page content in `src/app/*/page.tsx` and homepage content in `src/app/page.tsx`. Update metadata in `src/lib/page-data.json` when service descriptions change. Availability, actual charges, and payment settings remain in Calendly.

The approved palette is Burgundy `#751F30`, Antique Gold `#C39A52`, Silver Gray `#ECEEEF`, Espresso `#302522`, and White `#FFFFFF`. Silver Gray remains the default background. Preserve the circular burgundy Greek-letter mark. Update `public/assets/favicon.png`, both favicon ICO files, and the Apple touch icon together when the artwork changes. Do not use em dashes or en dashes in copy or documentation.

## URLs and metadata

| Next.js source               | Exported public URL   |
| ---------------------------- | --------------------- |
| `src/app/page.tsx`           | `/` and `/index.html` |
| `src/app/about/page.tsx`     | `/about.html`         |
| `src/app/rates-faq/page.tsx` | `/rates-faq.html`     |
| `src/app/support/page.tsx`   | `/support.html`       |
| `src/app/book/page.tsx`      | `/book.html`          |

Each page exports its title, description, canonical, Open Graph, and Twitter metadata. Text and booking/contact links are present in the generated HTML without JavaScript. The booking compatibility page uses `location.replace` after hydration and retains a manual Calendly link without JavaScript. The FAQ preserves existing question, answer, and group anchors, with one expanded answer per group.

## Deployment and rollback

GitHub Actions validates pull requests into `main`. Pushes to `main` build, test, and deploy `out/` through GitHub Pages. Keep main protected and merge changes through PRs.

Before the first migration deployment, select **Settings > Pages > Build and deployment > Source > GitHub Actions**. Changing this setting should happen only after local review and before merging the migration PR. The custom domain remains `elitelambdatutoring.com`; the export includes `CNAME`, `.nojekyll`, `robots.txt`, and `sitemap.xml`. Review HTTPS enforcement and certificate status in Pages settings; the migration does not change these settings automatically.

For another static host, use `npm ci && npm run build` as the build command and `out/` as the publish directory. Do not publish the repository root or use `next start` for a static export.

For rollback after deployment, redeploy a previously successful Pages artifact if available. For a durable rollback, revert the migration through a PR and restore the previous Pages deployment source if returning to branch-based publishing. The pre-migration HTML site remains in Git history.

## Future Python backend

Python is outside this migration. When requirements call for accounts, lesson records, or custom workflows, add a separately hosted Python API and database. The React frontend can remain. Choose authentication, framework, storage, and API contracts then. Browser code must never hold backend secrets. Server features would require revisiting static hosting or deploying the API separately.

## Migration review checklist

- [ ] Review desktop, tablet, and mobile production previews with the site owner.
- [ ] Verify real Calendly scheduling and payment configuration separately, without creating bookings in automated tests.
- [ ] Review production page metadata and custom-domain configuration.
- [ ] Select GitHub Actions as the Pages source before merging the migration PR.
- [ ] Merge through protected main and confirm the resulting deployment and HTTPS.

## Dependency notes

The lockfile pins the toolchain. The Babel parser override avoids a registry dependency-resolution failure, and the Browserslist override selects a patched release. ESLint 9 is retained for compatibility with the Next.js lint configuration and its plugins.

The install audit reports five high-severity entries from a single unpatched `braces` issue propagated through the Next.js lint tooling (`eslint-config-next` > Next.js ESLint plugin > `fast-glob` > `micromatch` > `braces`). These are development dependencies used with repository-controlled patterns, not code served in the static export. Track [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) for an upstream fix. Do not run a forced major dependency downgrade to suppress the report. Standalone audit requests timed out in this environment; the findings above come from the successful installation audit.
