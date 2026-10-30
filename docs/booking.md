# Phase 1 location booking

All booking links lead to `/book.html`. Customers choose Online or In Person, then a public location. The existing metadata, navigation, static export, and GitHub Pages hosting are preserved. MapLibre GL JS loads only for In Person. Its worker URL is explicitly bundled using the [MapLibre Next.js guidance](https://maplibre.org/maplibre-gl-js/docs/); the preview server serves `.mjs` assets as JavaScript. There are four markers, a native keyboard-accessible selector, and a shared details card. Missing keys, tile failures, and unavailable WebGL leave the selector usable, with the selected address and an external Google Maps link. There is no geolocation, routing, distance calculation, or dynamic pricing.

## Configuration and launch

`frontend/src/lib/booking-config.ts` is the single source for IDs, addresses, coordinates, rates, coupons, and event URLs. Online is a separate option with no coordinates. The five user-supplied Calendly event URLs are configured here. Edit each option’s `calendlyUrl` directly in this file when its event changes; an empty value disables that option at runtime but fails the required configuration check. Local and production builds use these same URLs; there are no Calendly environment variables or GitHub Actions variables. Each option points to its corresponding event. Missing or invalid URLs disable the relevant booking button at runtime and fail `npm run test:config` before CI builds. Accepted URLs must use HTTPS, the exact `calendly.com` host, and one event under the `elitelambdatutoring` account.

Set only the Geoapify build-time environment variable in `frontend/.env` for local work. This file is ignored by the repository’s `.env*` rule. For deployment, store `NEXT_PUBLIC_GEOAPIFY_API_KEY` as a repository Actions secret:

```text
NEXT_PUBLIC_GEOAPIFY_API_KEY=
```

The deployment workflow reads the Geoapify key from `secrets.NEXT_PUBLIC_GEOAPIFY_API_KEY` when building. The Geoapify secret and local `.env` use `REPLACE_WITH_GEOAPIFY_API_KEY` as a generic placeholder. Replace it before using the map; placeholder requests cannot load real tiles, and the location selector remains available.

To enter or replace the key privately from your own terminal, run the following command and paste the value at the hidden prompt. Do not put the key in the command itself or share it in chat:

```sh
gh secret set NEXT_PUBLIC_GEOAPIFY_API_KEY --repo yauchinlam/advanced-tutoring-website
```

Alternatively, update it in the repository’s Settings > Secrets and variables > Actions. For local use, enter the value directly in `frontend/.env`. GitHub does not synchronize repository secrets into your local environment. Rebuild after every change; the static export cannot read runtime environment variables. Never put private API credentials in a `NEXT_PUBLIC_` variable. The Geoapify browser map key is necessarily visible in requests and bundles. Use a dedicated browser key restricted to the production origins and HTTP referrers for `https://elitelambdatutoring.com` and any actively served `www` domain. Use a separate development key for localhost. Test the restrictions on the deployed domain. CORS alone is not access protection. Follow [Geoapify API key guidance](https://myprojects.geoapify.com/help/api-keys/).

The map uses Geoapify's Positron style. Provider attribution remains visible, including a persistent credit line below the map. Monitor project usage against the current free-tier quota in Geoapify; do not assume unlimited usage. See [Geoapify map tiles documentation](https://apidocs.geoapify.com/docs/maps/).

Before enabling each event URL, configure and verify its 60-minute duration, regular price, matching coupon and promotional price, and meeting location in Calendly. Online must use Google Meet. The website displays coupon instructions but does not apply or validate discounts, create events, or change Calendly settings. Confirm each supplied URL belongs to the intended event before publishing it.

Run the required checks from `frontend/`, open a PR from `feature/maps`, and merge through the existing GitHub Actions deployment after review. The workflow publishes `frontend/out/` to GitHub Pages. No hosting migration is needed. After deployment, verify all four markers, real tile loading and attribution, and each configured event destination without submitting a booking or payment.

## Coordinate verification

Coordinates were resolved from storefront listings on October 30, 2026, not from city or airport centers. Values below are latitude, longitude; the configuration uses MapLibre's longitude, latitude order.

| Storefront | Coordinates | Evidence |
| --- | --- | --- |
| 1690 S Pleasant Valley Rd, Winchester | 39.165808081, -78.164368117 | [Waze storefront](https://www.waze.com/live-map/directions/starbucks-s-pleasant-valley-rd-1690-winchester?to=place.w.184680840.1847070541.2225354), structured Place coordinates and address; listing links Starbucks store 1012354 |
| 4412 Chantilly Lace Ct, Chantilly | 38.886580, -77.444840 | [Roadtrippers storefront](https://maps.roadtrippers.com/us/chantilly-va/food-drink/starbucks-chantilly-va--6), matching address and coordinates; [Waze cross-check](https://www.waze.com/live-map/directions/starbucks-chantilly-shopping-ctr-4412-chantilly?to=place.w.185205125.1851789105.6194200) uses the alternate Chantilly Shopping Ctr address, same phone and Starbucks store 1023213, pin approximately 19 meters away |
| 2413 Columbia Pike, Arlington | 38.863470, -77.084020 | [Roadtrippers storefront](https://maps.roadtrippers.com/us/arlington-va/food-drink/starbucks-arlington-va--40); [Waze cross-check](https://www.waze.com/live-map/directions/starbucks-penrose-square-columbia-pike-2413-arlington?to=place.w.185401733.1854148398.2611085) agrees within approximately 1 meter |
| 7680 Arundel Mills Blvd, Hanover | 39.153183718, -76.728378294 | [Waze storefront](https://www.waze.com/live-map/directions/starbucks-arundel-mills-blvd-7680-severn?to=place.w.185663880.1856442187.4469118), structured Place coordinates, street address, phone and Starbucks store 1018050; Waze labels the locality Severn, while the supplied postal address is Hanover |

## Testing

`tests/tutoring-booking.spec.ts` covers all five options, rates, coupons, missing URLs, matching event navigation, map markers, selection synchronization, keyboard use, remounting, responsive overflow, tile errors and WebGL failure. Tile and Calendly requests are intercepted; no bookings or payments are made.

The normal unconfigured build tests the missing-key and missing-event state. The map and WebGL tests skip when no map key is supplied. To exercise the map without a real key, build and test with a map fixture:

```sh
export NEXT_PUBLIC_GEOAPIFY_API_KEY=playwright-fixture
npm run build
npm test -- tutoring-booking.spec.ts
```

When event URLs are configured in `booking-config.ts`, the browser tests verify matching navigation using intercepted Calendly responses. Empty URLs exercise disabled booking buttons. Never deploy the map fixture build. Unset `NEXT_PUBLIC_GEOAPIFY_API_KEY` in the shell and rebuild with the intended local or deployment key before publishing. Mocked tiles validate rendering and interactions, not live Geoapify account permissions or real Calendly event settings.
