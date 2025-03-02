import test, { expect } from '../fixtures/basePages';

test('Visual comparison test on Saucedemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  expect(await page.screenshot()).toMatchSnapshot('saucedemo-homepage.png');
});