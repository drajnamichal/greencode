import test, { expect } from '../fixtures/basePages';

test.fixme('Visual comparison test on Saucedemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveScreenshot('homepage.png');
});
