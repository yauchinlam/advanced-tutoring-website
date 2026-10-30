# Elite Lambda Tutoring

Elite Lambda Tutoring is a five-page website for one-on-one mathematics and physics tutoring. It serves high-school and college students, with online sessions nationwide and in-person sessions in selected Washington, D.C., Maryland, and Virginia areas. Calendly handles scheduling and configured payments.

The frontend uses React, Next.js App Router, TypeScript, and Bootstrap styles. Node.js runs development and builds. Production is a static export hosted on GitHub Pages at [elitelambdatutoring.com](https://elitelambdatutoring.com/). The frontend migration is complete. Backend requirements and architecture will be reviewed separately.

## Documentation

Detailed documentation is organized by responsibility under `docs/`:

| Guide                                                     | Contents                                                                                                                                |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [Frontend architecture and development](docs/frontend.md) | Folder layout, rendering, page routes, shared components, configuration, styling, local commands, and tests                             |
| [Deployment and operations](docs/deployment.md)           | GitHub Actions workflow, branch protection, Pages hosting, domain and HTTPS settings, release verification, and rollback                |
| [SEO and performance](docs/seo-performance.md)            | Metadata, canonical URLs, indexing policy, structured data, performance measurements, regression budgets, and Search Console monitoring |

[AGENTS.md](AGENTS.md) defines repository-wide writing, branding, and testing rules. Keep implementation details in the guide responsible for that topic, and update it when behavior changes.

## Local setup

Use the Node.js version pinned in `frontend/.nvmrc`. The application package allows Node.js 22 through 24; CI uses the pinned version.

```sh
cd frontend
nvm install
nvm use
npm ci
npx playwright install --with-deps chromium
npm run dev
```

The development server runs at `http://localhost:3000`. On Linux, installing Chromium system dependencies may require administrator access. If Chromium is already installed, this installation step is unnecessary for ordinary development.

## Build and verify

Run commands from `frontend/`:

```sh
npm run lint
npm run build
npm run typecheck
npm test
```

Build before running Playwright because browser tests exercise the exported site. To review the export manually, run `npm run preview` after building. It serves `out/` on port 3000 by default. Stop the development server first or use `PORT=3100 npm run preview` to choose another port.

The suite covers desktop, tablet, and mobile layouts in Chromium, including content, navigation, FAQs, booking selection, metadata, and asset budgets. Tests mock Calendly and do not create real appointments or charges. See the [frontend testing guide](docs/frontend.md#testing) for reports, targeted tests, and current viewport-specific skips.

## Making changes

Create a feature branch from current `main`, implement and validate the change, and open a pull request. The required `build` check must pass before merging into `main`. A successful workflow on `main` deploys the static export automatically. See [deployment and operations](docs/deployment.md) for the full release process.

See [location booking](docs/booking.md) for map and per-event configuration, coordinate verification, and launch steps.

Edit public business details in `frontend/src/lib/site-config.ts`, page copy in `frontend/src/app/`, and titles and descriptions in `frontend/src/lib/page-data.json`. Rebuild to publish changes. Public configuration and generated browser bundles must never contain credentials or private student information. Scheduling availability and payment settings are maintained in Calendly.

## Configuration

- `frontend/src/lib/site-config.ts`: business details, contacts, social links, and general copy.
- `frontend/src/lib/booking-config.ts`: the Calendly account and all five booking options, including public event URLs, rates, coupons, addresses, and coordinates. Update addresses and coordinates together.
- Calendly prices, coupons, and event descriptions must be updated manually alongside the code. Nothing synchronizes these settings automatically.
- The map component reads `NEXT_PUBLIC_GEOAPIFY_API_KEY`, supplied by gitignored `frontend/.env` locally and a GitHub Actions secret in production. Restrict the browser key to the production domain and localhost, or use a separate development key.

Run `npm run test:config` from `frontend/` to validate all five booking options without a browser or production build. CI runs this check before building. Missing or invalid event URLs fail this check; disabled buttons remain a runtime fallback. When the map key is missing, the selected address and a plain external Google Maps link remain available.

## Repository boundaries

`frontend/` contains the application, its configuration, dependencies, tests, and build output. `docs/` contains maintained project documentation. `.github/` contains repository automation. Generated dependencies, build output, and browser reports are ignored by Git.

There is currently no Python application, database, or server API in this repository. This documentation describes the deployed frontend; backend planning is outside the current scope.
