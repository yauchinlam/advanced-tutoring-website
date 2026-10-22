# Deployment and operations

[Project overview](../README.md) | [Frontend](frontend.md) | [SEO and performance](seo-performance.md)

## Production architecture

GitHub Pages hosts the static Next.js export at [elitelambdatutoring.com](https://elitelambdatutoring.com/). GitHub Actions builds and deploys it using [`.github/workflows/site.yml`](../.github/workflows/site.yml). There is no production Node.js process. Calendly hosts booking and configured payment flows separately.

The published artifact is `frontend/out/`. The repository root is not a publish directory, and `next start` is not used for this static export.

## GitHub Actions workflow

| Trigger                       | Behavior                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Pull request targeting `main` | Build, lint, typecheck, browser tests, and artifact upload; deployment is skipped |
| Push or merged PR into `main` | Build and validate, then deploy the successful Pages artifact                     |
| Manual workflow dispatch      | Run validation on the selected ref; deploy only when the ref is `main`            |

The `build` job runs on `ubuntu-latest`. Shell steps run from `frontend/`, while action input paths remain relative to the repository root. Node.js is selected from `frontend/.nvmrc`; npm caching uses `frontend/package-lock.json`.

Build steps execute in this order:

1. Check out the repository and set up Node.js with npm caching.
2. Install locked dependencies using `npm ci`.
3. Run `npm run lint`, `npm run build`, and `npm run typecheck`.
4. Install Chromium and Linux browser dependencies with `npx playwright install --with-deps chromium`.
5. Run `npm test`. CI uses two workers, permits one retry, and rejects `test.only`.
6. Upload test diagnostics if validation failed. On success, upload `frontend/out/` as the Pages artifact.

The `deploy` job requires the successful `build` job and runs only for `main` outside pull request events. It uses `actions/deploy-pages@v4`, requests `pages: write` and `id-token: write`, and targets the `github-pages` environment. Deployments share a concurrency group with `cancel-in-progress: false`.

## Repository and hosting settings

These settings were verified during the October 2026 rollout. They are repository settings, not configuration stored entirely in this checkout:

| Setting                         | Deployed configuration                         |
| ------------------------------- | ---------------------------------------------- |
| Pages publishing source         | GitHub Actions (`workflow`)                    |
| Custom domain                   | `elitelambdatutoring.com`                      |
| HTTPS enforcement               | Enabled                                        |
| Deployment environment          | `github-pages`, permitting `main`              |
| Main branch changes             | Pull requests required                         |
| Required status check           | `build`, with branch required to be up to date |
| Administrator enforcement       | Enabled                                        |
| Required approving review count | Zero                                           |

GitHub prevents an author from approving their own PR. With the current zero-approval requirement, the author may merge their PR after the required check passes. Do not push a feature branch directly to `main`.

The custom domain is configured in Pages settings and recorded in `frontend/public/CNAME`. The export also includes `.nojekyll`, robots.txt, and sitemap.xml. Preserve the custom domain and HTTPS settings when adjusting publishing configuration.

## Release workflow

Create feature branches without setting `origin/main` as their upstream push destination:

```sh
git fetch origin
git switch --no-track -c feature/example origin/main
# Implement and validate the change, then commit it.
git push -u origin feature/example
```

Open a PR targeting `main`, review the diff, and wait for `build` to pass on the current head commit. Merge through the PR. Monitor the resulting workflow on `main` until both build and deployment succeed.

Application changes require the checks described in [frontend testing](frontend.md#testing). Documentation-only edits do not need local browser tests, although the current GitHub workflow validates all PRs into `main`.

## Verify a deployment

Check the public site after the Pages job succeeds:

- `/`, `/about.html`, `/rates-faq.html`, `/support.html`, and `/book.html` respond successfully.
- `/index.html` remains compatible, with `/` as its canonical URL.
- Shared styles and brand images load, and navigation and FAQ interactions work at relevant widths.
- An unknown URL returns HTTP 404 and the custom missing-page content.
- HTTP redirects to HTTPS on the custom domain.
- `robots.txt` advertises the sitemap; the sitemap and indexing directives match the policy in the [SEO guide](seo-performance.md).

A successful deployment does not confirm Google's crawl or indexing state. Search Console verification is a separate follow-up.

## Troubleshooting

| Symptom                               | Check                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Push to `main` is rejected with GH006 | Push the feature branch to its own remote branch and open a PR; confirm the local upstream is correct  |
| Required `build` check is expected    | Confirm a PR targets `main`, the workflow ran on its latest commit, and the check name remains `build` |
| Browser fails to launch on Linux      | Install Playwright Chromium and system dependencies; inspect missing-library output                    |
| Preview reports a missing export      | Run `npm run build` from `frontend/` before previewing or testing                                      |
| Port 3000 or 3100 is in use           | Stop the stale process or choose another manual preview port; tests expect port 3100                   |
| Pages deploy job is skipped           | Confirm the workflow ref is `main`; PR workflows intentionally skip deployment                         |
| Deployment fails after build succeeds | Inspect artifact upload, Pages publishing source, deployment environment rules, and token permissions  |
| Domain or HTTPS changes unexpectedly  | Inspect Pages settings, certificate status, DNS, and `frontend/public/CNAME`                           |

## Rollback

Prefer a revert PR against `main` that reverses the faulty change. Validate it through the same required build check, merge it, and monitor the replacement deployment. Keep Pages configured for GitHub Actions and preserve the current domain and HTTPS settings.

If an unchanged earlier version must be redeployed, a previous successful `main` workflow can be rerun where GitHub permits it. That rebuilds the historical commit rather than restoring the source branch. If using a retained artifact through another approved recovery process, confirm artifact availability and deployment provenance first. Follow any temporary recovery with a source change so `main` describes the intended release.

## Moving to another static host

Set the application root to `frontend/`, use `npm ci && npm run build`, and publish `out/` relative to that application root. Preserve existing `.html` URLs, canonical URLs, the custom 404 response, and HTTPS. Review host-specific caching, compression, domain, and redirect settings before changing providers.
