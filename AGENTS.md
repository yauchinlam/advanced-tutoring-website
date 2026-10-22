# Repository instructions

## Writing style

Do not use em dashes (U+2014) or en dashes (U+2013) in website copy, metadata, accessibility labels, documentation, or commit messages. Rewrite with commas, periods, colons, or parentheses as appropriate. Ordinary hyphens in words such as "one-on-one" are fine. Apply this preference to responses about this project as well.

Keep these instructions in mind for all future edits in this repository.

## Testing code changes

When changing frontend code, review the Playwright tests in `frontend/tests/` and add or update coverage as needed for changed user-visible behavior. Use accessible locators and retrying assertions. Mock external services such as Calendly instead of creating real bookings or payments. Update `migration-baseline.json` only when the expected content change is intentional, never solely to silence a failing test.

Run commands from `frontend/`. For frontend code changes, run `npm run lint`, `npm run build`, and `npm run typecheck`, then run the relevant Playwright tests with `npm test -- <test-file>` or the full suite with `npm test` when shared behavior changes. Playwright serves the production export, so rebuild before testing changed application code. Documentation-only changes do not require browser tests. Report any checks that could not run and why.

## Brand color theme

Use this approved Elite Lambda Tutoring palette for all website styling and future visual updates:

- Primary Burgundy: `#751F30`
- Accent Antique Gold: `#C39A52`
- Background Silver Gray: `#ECEEEF`
- Dark text Espresso: `#302522`
- Pure White: `#FFFFFF`

Silver Gray is the default page background. Use Burgundy as the main structural brand color, Antique Gold as a restrained accent, Espresso for dark text, and Pure White for contrast surfaces and text on dark backgrounds. Do not use the retired Ivory `#FAF7F0` background or introduce replacement brand colors unless the user explicitly requests a palette change.
