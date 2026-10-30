# SEO and performance

[Project overview](../README.md) | [Frontend](frontend.md) | [Deployment](deployment.md)

## Search configuration

The SEO changes are deployed. Page titles, descriptions, canonical URLs, and social metadata are maintained in `frontend/src/lib/page-data.json` and rendered through `frontend/src/lib/metadata.ts`. The helper appends the business name to each title. Review metadata alongside visible copy when services change.

| URL               | Canonical and indexing policy                                                    |
| ----------------- | -------------------------------------------------------------------------------- |
| `/`               | Indexable homepage, canonical `/`                                                |
| `/index.html`     | Compatible duplicate of the homepage, canonical `/`                              |
| `/about.html`     | Indexable, self-canonical                                                        |
| `/rates-faq.html` | Indexable, self-canonical                                                        |
| `/support.html`   | Indexable, self-canonical                                                        |
| `/book.html`      | `noindex, follow`; online and location booking selector |

Internal homepage links use `/`. `frontend/public/sitemap.xml` includes only the four indexable canonical URLs. `frontend/public/robots.txt` permits crawling and advertises the sitemap. Do not block `/book.html` in robots.txt: crawlers must be able to read its noindex directive.

The homepage renders Organization JSON-LD through `frontend/src/components/organization-data.tsx`, using the public business name, URL, logo, email, and description. Keep markup consistent with visible content. No LocalBusiness address, ratings, or reviews are asserted. Confirm a publishable address and Google's required fields before evaluating LocalBusiness markup.

Follow Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization). These settings help describe and expose the site; they do not guarantee indexing, rankings, or rich results.

## Performance measurements

Audit date: October 21, 2026. Baseline: commit `87be248`. These are historical measurements of the SEO implementation, not continuous monitoring.

The public PageSpeed Insights API returned HTTP 429 (quota exhausted) for both mobile and desktop. No PageSpeed Insights or CrUX field assessment was obtained. Instead, Lighthouse 13.5.0 audited the production export at `http://127.0.0.1:3100/` using default mobile settings and the desktop preset, simulated throttling, and Chromium. Each result below is one snapshot. Normal run variation can outweigh small score differences. The preview serves uncompressed responses and does not reproduce GitHub Pages caching, network latency, or compression.

| Measurement                              | Before        | After        |
| ---------------------------------------- | ------------- | ------------ |
| Mobile performance score                 | 82            | 84           |
| Desktop performance score                | 98            | 98           |
| Lighthouse SEO score, mobile and desktop | 100           | 100          |
| Mobile lab LCP                           | 4.36 seconds  | 4.27 seconds |
| Desktop lab LCP                          | 1.08 seconds  | 1.01 seconds |
| Mobile total blocking time               | 117 ms        | 131 ms       |
| Desktop total blocking time              | 12 ms         | 64 ms        |
| Layout shift, both profiles              | 0             | 0            |
| Displayed brand image                    | 222,697 bytes | 36,977 bytes |

The brand now uses the existing 180px Apple icon for its 38px display size. This preserves the artwork, supports high-density displays, and reduces that image's bytes by 83%. Bootstrap now compiles only the components used on this site through `frontend/src/app/bootstrap.scss`. The build retains its complete utility API and includes cards, responsive navigation, transitions, and accordions. Add the corresponding Sass import when introducing another Bootstrap component. This follows [Bootstrap's lean Sass guidance](https://getbootstrap.com/docs/5.3/customize/optimize/).

The mobile-only image experiment scored 79, confirming that a payload reduction does not by itself demonstrate a better performance score. The final score of 84 follows both image and CSS changes. The reliable improvement is fewer asset bytes; these snapshots do not establish a statistically significant latency improvement or a passing real-user Core Web Vitals assessment. Mobile LCP remains a concern. Framework JavaScript and remaining styles are still audit opportunities. Measure deployed performance before further changes, especially because the local preview lacks compression. No runtime dependency was added; Sass is a build dependency. Bootstrap 5.3's documented imports currently produce upstream Sass deprecation warnings.

Raw audit artifacts were written to `/tmp/tutoring-seo-audit/` during the audit and are intentionally outside Git. They are temporary and may no longer exist. The table above preserves the recorded results. The CLI used was:

```sh
lighthouse http://127.0.0.1:3100/ --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" --only-categories=performance,seo --output=json --output=html --output-path=/tmp/tutoring-seo-audit/mobile
# Add --preset=desktop for the desktop profile.
```

Build from `frontend/` first and run `npm run preview` with `PORT=3100`. Lighthouse was installed outside the repository for this audit. Do not interpret Lighthouse's SEO score as proof that Google has indexed or ranked a page. See [Google's lab and field data explanation](https://developers.google.com/speed/docs/insights/v5/about).

## Regression checks

`frontend/tests/seo.spec.ts` checks canonical URLs, unique titles and descriptions, crawlable robots directives, sitemap membership, booking noindex metadata, and public Organization data without JavaScript. Asset budgets guard against reintroducing oversized brand images (50 KiB per mark) or stylesheets (160 KiB total, uncompressed). Existing browser tests cover all page content, navigation, FAQ interaction, booking behavior, image loading, and horizontal overflow at desktop, tablet, and mobile sizes. These budgets are regression guards, not Google ranking thresholds.

## Search Console monitoring

The owner confirmed the domain is verified. The October 22, 2026 deployment succeeded, and public checks confirmed canonical links, Organization data, booking noindex metadata, the four-page sitemap, and the custom 404. Search Console account actions were not performed; sitemap submission and Google's indexing state remain unconfirmed.

Use this workflow after substantive SEO updates:

1. Verify the live sitemap lists `/`, `/about.html`, `/rates-faq.html`, and `/support.html`, with no `/book.html`. Verify the booking page has `noindex, follow`, and the homepage contains Organization JSON-LD.
2. In the existing Search Console property covering `https://elitelambdatutoring.com/`, submit `https://elitelambdatutoring.com/sitemap.xml`. Confirm the submission is accepted and later fetched successfully.
3. Inspect the four sitemap URLs. Run a live test to confirm successful fetching and indexing eligibility. Compare the indexed report's user-declared and Google-selected canonicals after Google recrawls. The live test does not tell you Google's final canonical selection.
4. Request indexing for the changed substantive pages when eligible. Do not request indexing for `/book.html`. Inspect `/index.html` as a compatibility duplicate expected to consolidate to `/`.
5. Check Page indexing for unexpected exclusions and soft 404s, and inspect Organization markup with Google's Rich Results Test where supported. An Organization entity does not guarantee a rich result.
6. Record Search performance impressions, clicks, CTR, and average position for the changed pages and relevant queries. Review weekly, comparing similar periods and noting the deployment date. Review Core Web Vitals when enough field data exists. Empty or delayed reports do not establish that the implementation failed.

Sitemap submission and indexing requests require access to the verified Search Console property. Public page checks cannot confirm Google's crawl, canonical selection, or indexing state. Google explains the access requirements and recrawl behavior in [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
