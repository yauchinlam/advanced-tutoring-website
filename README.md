# Elite Lambda Tutoring

A five-page tutoring website built with React, Next.js App Router, and TypeScript. Next.js generates static HTML, CSS, and JavaScript in `frontend/out/`. Production needs no Node.js server, database, or Python service. Calendly continues to handle scheduling and configured payments.

## Development

Run frontend commands from `frontend/`, using the Node.js version in `frontend/.nvmrc`:

```sh
cd frontend
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

The production preview serves `out/` at `http://localhost:3000`; set `PORT` to use another port. Build before previewing. Browser tests start their own production preview on port 3100 and cover desktop and mobile layouts. Type checking after a build includes Next.js generated route types. Tests cover homepage navigation to About, Rates & FAQ, Support, and booking at each configured screen size. Calendly navigation is mocked. Failures retain screenshots and traces in `test-results/`; the HTML report is written to `playwright-report/`. Run `npx playwright show-report` from `frontend/` to inspect it. CI retries failed tests once and uploads both diagnostic directories on failure.

## Project structure

The Next.js application lives in `frontend/`, including its package files and Next.js, TypeScript, ESLint, Prettier, Node.js, and Playwright configuration. Repository instructions and GitHub workflows remain at the repository root. Paths in the content and URL sections below are relative to `frontend/`.

Generated dependencies, build output, and test results stay inside `frontend/` and are ignored by Git.

| Location                     | Purpose                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `frontend/src/app/`                   | Page components, root layout, and global styles                              |
| `frontend/src/components/`            | Shared branding, navigation, footer, contact and booking links, FAQ controls |
| `frontend/src/lib/site-config.ts`     | Typed public business details                                                |
| `frontend/src/lib/page-data.json`     | Page descriptions, canonical URLs, and sharing metadata                      |
| `frontend/src/lib/metadata.ts`        | Next.js metadata generation                                                  |
| `frontend/public/`                    | Images, favicon, custom domain file, robots, and sitemap                     |
| `frontend/scripts/preview.mjs`        | Static production preview server                                             |
| `frontend/tests/`                     | Browser tests and the original page heading and anchor baseline              |
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

GitHub Actions validates pull requests into `main`. Pushes to `main` build, test, and deploy `frontend/out/` through GitHub Pages. Keep main protected and merge changes through PRs.

Before the first migration deployment, select **Settings > Pages > Build and deployment > Source > GitHub Actions**. Changing this setting should happen only after local review and before merging the migration PR. The custom domain remains `elitelambdatutoring.com`; the export includes `CNAME`, `.nojekyll`, `robots.txt`, and `sitemap.xml`. Review HTTPS enforcement and certificate status in Pages settings; the migration does not change these settings automatically.

For another static host, set the application root to `frontend/`, use `npm ci && npm run build` as the build command, and use `out/` relative to that application root as the publish directory. Do not publish the repository root or use `next start` for a static export.

For rollback after deployment, redeploy a previously successful Pages artifact if available. For a durable rollback, revert the migration through a PR and restore the previous Pages deployment source if returning to branch-based publishing. The pre-migration HTML site remains in Git history.

## Future Python backend

Python is outside this migration. When requirements call for accounts, lesson records, or custom workflows, add a separately hosted Python API and database in a new `backend/` directory alongside `frontend/`. Keep Python dependency configuration and backend tests inside `backend/`. Django can use `manage.py`, a project configuration package, and application packages. Flask can use an application package and a separate `tests/` directory. Add this directory when backend work begins. The React frontend can remain. Choose authentication, framework, storage, and API contracts then. Browser code must never hold backend secrets. Server features would require revisiting static hosting or deploying the API separately.

## Migration review checklist

- [ ] Review desktop, tablet, and mobile production previews with the site owner.
- [ ] Verify real Calendly scheduling and payment configuration separately, without creating bookings in automated tests.
- [ ] Review production page metadata and custom-domain configuration.
- [ ] Select GitHub Actions as the Pages source before merging the migration PR.
- [ ] Merge through protected main and confirm the resulting deployment and HTTPS.

## Dependency notes

The lockfile pins the toolchain. The Babel parser override avoids a registry dependency-resolution failure, and the Browserslist override selects a patched release. ESLint 9 is retained for compatibility with the Next.js lint configuration and its plugins.

The install audit reports five high-severity entries from a single unpatched `braces` issue propagated through the Next.js lint tooling (`eslint-config-next` > Next.js ESLint plugin > `fast-glob` > `micromatch` > `braces`). These are development dependencies used with repository-controlled patterns, not code served in the static export. Track [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) for an upstream fix. Do not run a forced major dependency downgrade to suppress the report. Standalone audit requests timed out in this environment; the findings above come from the successful installation audit.

## Search visibility

The homepage canonical is `/`; internal homepage links use that URL while `/index.html` remains available for older links. Other public pages retain their existing `.html` URLs. Titles and descriptions live in `frontend/src/lib/page-data.json`, with the business name appended by the metadata helper.

The booking compatibility page uses `noindex, follow` and is excluded from the sitemap. It remains crawlable and retains its Calendly link without JavaScript. Keep `frontend/public/sitemap.xml` limited to canonical indexable pages when adding routes.

The homepage includes Organization JSON-LD generated from public business configuration. Keep structured data consistent with visible content. No LocalBusiness address or ratings are asserted. A public business address would need to be confirmed before evaluating LocalBusiness markup. Playwright SEO checks inspect the static site without JavaScript.

These changes follow Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization). Search Console inspection and sitemap submission remain post-deployment tasks; markup and metadata do not guarantee rankings or rich results.
