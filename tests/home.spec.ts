import test, { expect } from '../fixtures/basePages';

// test with test steps, annotations, and tags

test.describe('Home page', () => {
  test('home page test',
    {
      annotation: [{ type: 'Test', description: 'This test uses storage state and saved cookies, so there is no need to login.' }],
      tag: ['@web'],
    },
    async ({ page }) => {
      await test.step('Visit home page', async () => {
        await page.goto('https://www.saucedemo.com/inventory.html');
      });
      await test.step('Verify title', async () => {
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
      });
  });
});
