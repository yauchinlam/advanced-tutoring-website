import { test, expect } from '@playwright/test';
import { onlineBooking, tutoringLocations } from '../src/lib/booking-config';

const options = [onlineBooking, ...tutoringLocations];
const configuredMap = !!process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

test.beforeEach(async ({ page }) => {
  // Never request live tiles or create real bookings/payments.
  await page.route('https://maps.geoapify.com/**', (route) =>
    route.fulfill({
      json: {
        version: 8,
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#ECEEEF' },
          },
        ],
      },
    }),
  );
  await page.route('https://calendly.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<h1>Mock Calendly event</h1>',
    }),
  );
});

test('all five options show correct prices, coupons, addresses, and safe booking actions', async ({
  page,
}) => {
  await page.goto('/book.html');
  await expect(
    page.getByRole('radio', { name: 'Online', exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole('region', { name: 'Tutoring locations map' }),
  ).toHaveCount(0);
  for (const option of options) {
    if (option.coordinates) {
      await page.getByRole('radio', { name: 'In Person' }).check();
      await page.getByLabel('Choose a public location').selectOption(option.id);
    }
    const details = page.getByRole('article', {
      name: 'Selected booking option',
    });
    await expect(
      details.getByRole('heading', { name: option.displayName }),
    ).toBeVisible();
    await expect(details).toContainText(option.address);
    await expect(page.getByRole('main')).not.toContainText(/starbucks/i);
    await expect(details).toContainText(
      `Regular rate: $${option.regularRate}/hour`,
    );
    await expect(details).toContainText(
      `Promotional rate: $${option.promotionalRate}/hour`,
    );
    await expect(details).toContainText(option.coupon);
    await expect(details).toContainText(
      'The discount is not applied automatically.',
    );
    const label = option.coordinates ? 'Book This Location' : 'Book Online';
    if (option.calendlyUrl) {
      await expect(details.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        option.calendlyUrl,
      );
      await details.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(option.calendlyUrl);
      await expect(
        page.getByRole('heading', { name: 'Mock Calendly event' }),
      ).toBeVisible();
      await page.goto('/book.html');
    } else {
      await expect(details.getByRole('button', { name: label })).toBeDisabled();
      await expect(details).toContainText(
        'Booking for this option is not available yet.',
      );
    }
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  await page.getByRole('radio', { name: 'Online', exact: true }).check();
  await expect(
    page.getByRole('heading', { name: 'Online tutoring' }),
  ).toBeVisible();
  await expect(page.getByRole('combobox')).toHaveCount(0);
  await expect(page.getByRole('main')).not.toContainText(/starbucks/i);
});

test('exactly four map markers select and reflect the matching location', async ({
  page,
}, testInfo) => {
  test.skip(!configuredMap, 'Run with the documented map fixture build.');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/book.html');
  await page.getByRole('radio', { name: 'In Person' }).check();
  const map = page.getByRole('region', { name: 'Tutoring locations map' });
  await expect(
    page.getByText('Select a marker or use the location selector below.'),
  ).toBeVisible();
  await expect(map.getByRole('button', { name: /^Select / })).toHaveCount(4);
  for (const option of tutoringLocations) {
    const marker = map.getByRole('button', {
      name: `Select ${option.displayName}`,
      exact: true,
    });
    await marker.click();
    await expect(page.getByLabel('Choose a public location')).toHaveValue(
      option.id,
    );
    await expect(marker).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('article')).toContainText(option.address);
  }
  await page.getByLabel('Choose a public location').selectOption('winchester');
  await expect(
    map.getByRole('button', { name: 'Select Winchester, VA' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await map.getByRole('button', { name: 'Select Arlington, VA' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Choose a public location')).toHaveValue(
    'arlington',
  );
  await expect(
    page.getByRole('link', { name: 'Powered by Geoapify', exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath('booking-map.png'),
    fullPage: true,
  });
  await page.getByRole('radio', { name: 'Online', exact: true }).check();
  await page.getByRole('radio', { name: 'In Person' }).check();
  await expect(map.getByRole('button', { name: /^Select / })).toHaveCount(4);
});

test('map failure leaves the location selector usable', async ({ page }) => {
  await page.route('https://maps.geoapify.com/**', (route) => route.abort());
  await page.goto('/book.html');
  await page.getByRole('radio', { name: 'In Person' }).check();
  await expect(
    page.getByText('Map unavailable. Please use the location selector below.'),
  ).toBeVisible();
  await page.getByLabel('Choose a public location').selectOption('hanover');
  await expect(page.getByRole('article')).toContainText(
    '7680 Arundel Mills Blvd',
  );
});

test('WebGL initialization failure does not prevent booking selection', async ({
  page,
}) => {
  test.skip(!configuredMap, 'Run with the documented map fixture build.');
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto('/book.html');
  await page.getByRole('radio', { name: 'In Person' }).check();
  await expect(
    page.getByText('Map unavailable. Please use the location selector below.'),
  ).toBeVisible();
  await page.getByLabel('Choose a public location').selectOption('chantilly');
  await expect(page.getByRole('article')).toContainText(
    '4412 Chantilly Lace Ct',
  );
});

test('unavailable map offers an external link for the selected address', async ({
  page,
}) => {
  await page.route('https://maps.geoapify.com/**', (route) => route.abort());
  await page.goto('/book.html');
  await page.getByRole('radio', { name: 'In Person' }).check();
  for (const location of tutoringLocations) {
    await page.getByLabel('Choose a public location').selectOption(location.id);
    const link = page.getByRole('link', {
      name: `View ${location.displayName} on Google Maps (opens in a new tab)`,
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      'href',
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`,
    );
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link.locator('..')).toContainText(location.address);
  }
});
