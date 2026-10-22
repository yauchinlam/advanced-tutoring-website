import { test, expect } from '@playwright/test';
import baseline from './migration-baseline.json';

const bookingUrl = 'https://calendly.com/elitelambdatutoring/private-tutoring';

for (const [slug, original] of Object.entries(baseline)) {
  test(`${slug}: direct URL, content, metadata, and links`, async ({
    page,
    request,
  }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    if (slug === 'book') {
      // Inspect the static compatibility page without following its browser redirect.
      const response = await request.get('/book.html');
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain('Continue to booking.');
      expect(html).toContain(bookingUrl);
      return;
    }
    const response = await page.goto(`/${slug}.html`);
    expect(response?.status()).toBe(200);
    const html = await response!.text();
    expect(html).toContain('<main');
    expect(html).toContain('Elite Lambda Tutoring');
    await expect(page.locator('h1')).toHaveCount(1);
    for (const heading of original.headings) {
      await expect(
        page.getByRole('heading', { name: heading, exact: true }),
      ).toHaveCount(1);
    }
    for (const paragraph of original.paragraphs)
      await expect(page.locator('main')).toContainText(paragraph);
    for (const id of original.anchors)
      await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      slug === 'index'
        ? /^https:\/\/elitelambdatutoring\.com\/?$/
        : `https://elitelambdatutoring.com/${slug}.html`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /https:\/\/elitelambdatutoring.com\/assets\//,
    );
    await expect(page.locator('header a[aria-current="page"]')).toHaveCount(1);
    for (const image of await page.locator('.brand-mark').all()) {
      await expect(image).toHaveCSS('border-radius', '50%');
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    }
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
    const links = await page
      .locator('a[href]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('href')!),
      );
    for (const href of new Set(links.filter((href) => href.startsWith('/')))) {
      const linked = await request.get(href.split('#')[0]);
      expect(linked.status(), href).toBe(200);
    }
    expect(links).toContain(bookingUrl);
    expect(errors).toEqual([]);
    if (slug === 'index')
      await page.screenshot({
        path: testInfo.outputPath('homepage.png'),
        fullPage: true,
      });
  });
}

for (const [label, path] of [
  ['About', '/about.html'],
  ['Rates & FAQ', '/rates-faq.html'],
  ['Support', '/support.html'],
  ['Book a session', bookingUrl],
] as const) {
  test(`visitor navigates from home to ${label}`, async ({ page }) => {
    if (path === bookingUrl) {
      await page.route('https://calendly.com/**', (route) =>
        route.fulfill({
          contentType: 'text/html',
          body: '<h1>Calendly destination</h1>',
        }),
      );
    }
    await page.goto('/index.html');
    const navigation = page.getByRole('navigation', {
      name: 'Main navigation',
    });
    const toggle = navigation.getByRole('button', {
      name: 'Toggle navigation',
    });
    if (await toggle.isVisible()) await toggle.click();
    await navigation.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    if (path !== bookingUrl) {
      if (await toggle.isVisible()) await toggle.click();
      await expect(
        page
          .getByRole('navigation', { name: 'Main navigation' })
          .getByRole('link', { name: label, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
    }
  });
}

test('mobile navigation responds to keyboard activation', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('/index.html');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByRole('link', { name: 'About', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('FAQ opens by keyboard and closes another answer in its group', async ({
  page,
}) => {
  await page.goto('/rates-faq.html');
  const first = page.getByRole('button', {
    name: 'Who do you tutor?',
    exact: true,
  });
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-answer-1')).toBeVisible();
  await page
    .getByRole('button', { name: 'What subjects do you tutor?', exact: true })
    .click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-answer-1')).toBeHidden();
  await expect(page.locator('#faq-answer-2')).toBeVisible();
});

test('booking compatibility page navigates to Calendly', async ({ page }) => {
  await page.route('https://calendly.com/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<h1>Calendly destination</h1>',
    }),
  );
  await page.goto('/book.html');
  await expect(page).toHaveURL(bookingUrl);
});

test('booking fallback works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/book.html');
  await expect(
    page.getByRole('link', { name: 'Continue to Calendly' }),
  ).toHaveAttribute('href', bookingUrl);
  await context.close();
});

test('unknown pages return a useful 404', async ({ page }) => {
  const response = await page.goto('/does-not-exist.html');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Page not found.' }),
  ).toBeVisible();
});
