import { defineConfig } from '@playwright/test';

// Configuration checks need neither a browser nor a prebuilt static export.
export default defineConfig({
  testDir: './tests',
  testMatch: 'booking-url.spec.ts',
  reporter: 'list',
});
