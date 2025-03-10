import test, { expect } from '../fixtures/basePages';

test.fixme('Visual comparison test on Saucedemo', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveScreenshot({
    maxDiffPixelRatio: 0.2,
    mask: [page.locator('[data-test="shopping-cart-link"]'), page.locator('[data-test="inventory-item-price"]')],
    maskColor: '#d55348'
   })
});