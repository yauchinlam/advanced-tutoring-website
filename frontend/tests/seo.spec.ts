import { test, expect } from '@playwright/test';

// Inspect build-time HTML, including booking metadata before its client redirect.
test.use({ javaScriptEnabled: false });

const origin = 'https://elitelambdatutoring.com';
const indexablePaths = ['/', '/about.html', '/rates-faq.html', '/support.html'];

test('indexable pages have unique metadata and canonical internal links', async ({
  page,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of indexablePaths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/.+ \| Elite Lambda Tutoring$/);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);
    await expect(description).toHaveAttribute('content', /\S/);
    const content = (await description.getAttribute('content'))!;
    expect(descriptions.has(content)).toBe(false);
    descriptions.add(content);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      path === '/' ? /^https:\/\/elitelambdatutoring\.com\/?$/ : origin + path,
    );
    await expect(
      page.locator('meta[name="robots"][content*="noindex"]'),
    ).toHaveCount(0);
    await expect(page.locator('a[href="/index.html"]')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('main')).toContainText(/tutor/i);
  }
});

test('legacy homepage retains the preferred root canonical', async ({
  page,
}) => {
  await page.goto('/index.html');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https:\/\/elitelambdatutoring\.com\/?$/,
  );
  await expect(
    page.getByRole('link', { name: 'Elite Lambda Tutoring home' }).first(),
  ).toHaveAttribute('href', '/');
});

test('sitemap includes only canonical indexable pages and robots allows crawling', async ({
  page,
  request,
}) => {
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(await robots.text()).not.toMatch(/Disallow:\s*\//i);
  const response = await page.goto('/sitemap.xml');
  expect(response?.status()).toBe(200);
  const urls = await page.locator('loc').allTextContents();
  expect(urls.sort()).toEqual(
    indexablePaths.map((path) => origin + path).sort(),
  );
  for (const url of urls) {
    await page.goto(new URL(url).pathname);
    await expect(
      page.locator('meta[name="robots"][content*="noindex"]'),
    ).toHaveCount(0);
  }
});

test('booking compatibility page is noindex but keeps its manual booking link', async ({
  page,
}) => {
  await page.goto('/book.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /follow/,
  );
  await expect(
    page.getByRole('link', { name: 'Continue to Calendly' }),
  ).toHaveAttribute(
    'href',
    'https://calendly.com/elitelambdatutoring/private-tutoring',
  );
});

test('homepage contains public Organization data in static HTML', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const script = page.locator('script[type="application/ld+json"]');
  await expect(script).toHaveCount(1);
  const data = JSON.parse((await script.textContent())!);
  expect(data).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'Elite Lambda Tutoring',
    url: `${origin}/`,
    email: 'support@elitelambdatutoring.com',
  });
  await expect(page.locator('footer')).toContainText(data.name);
  await expect(
    page.getByRole('link', { name: data.email, exact: true }),
  ).toHaveAttribute('href', `mailto:${data.email}`);
  expect(data).not.toHaveProperty('address');
  expect(data).not.toHaveProperty('aggregateRating');
  const logo = await request.get(new URL(data.logo).pathname);
  expect(logo.status()).toBe(200);
  expect(logo.headers()['content-type']).toContain('image/');
});
