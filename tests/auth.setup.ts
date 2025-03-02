import { test as setup, expect, chromium } from '@playwright/test';

const authFile = '.auth/standard_user.json';

setup('Authentication', async () => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

    // Save storage state
    await page.context().storageState({ path: authFile });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Authentication failed:', error);
  }
});
