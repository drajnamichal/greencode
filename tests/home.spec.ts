import test, { expect } from '../fixtures/basePages';

test('home page test', async ({ page }) => {
  // await loginPage.visit();
  // await loginPage.enterUsername(process.env.E2E_TEST_VALID_USER_EMAIL!);
  // await loginPage.enterPassword(process.env.E2E_TEST_VALID_USER_PASSWORD!);
  // await loginPage.clickLoginButton();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
});