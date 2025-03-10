import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/standard_user.json';

setup('Authentication', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'commit' });
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

    // Save storage state
    await page.context().storageState({ path: authFile });
});
