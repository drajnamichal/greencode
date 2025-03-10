import { test, devices } from '@playwright/test';

// List of devices: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json

// test.use({ ...devices['iPhone 13 Pro'] });
test.use({
  ...devices['iPhone 13 Pro'],
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  hasTouch: true,
  locale: 'fr-FR',
  geolocation: { latitude: 48.8566, longitude: 2.3522 }, // Paris
  permissions: ['geolocation'],
});

test.fixme('Test on mobile', async ({ page }) => {
  await page.goto('https://google.com');
  await page.screenshot({ path: 'mobile.png' });
});
