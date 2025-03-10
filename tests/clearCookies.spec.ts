import { Config } from '../config';
import test, { expect } from '../fixtures/basePages';

test.describe('Session and cookie validation', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('Clear cookies', async ({ page, context, loginPage }) => {
    await loginPage.visit();
    await loginPage.enterUsername(Config.E2E_TEST_STANDARD_USER);
    await loginPage.enterPassword(Config.E2E_TEST_VALID_USER_PASSWORD);
    await loginPage.clickLoginButton();
    const cookies = await context.cookies();
    expect(cookies.length).toBeGreaterThan(0);

    await context.clearCookies();
    await page.reload();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
