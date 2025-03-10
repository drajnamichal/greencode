import test, { expect } from '../fixtures/basePages';

test('Fix login test with proper waiting', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  await page.waitForSelector('.title', { timeout: 2000 });
  await expect(page.locator('.title')).toHaveText('Products');
});