import test, { expect } from '../fixtures/basePages';

test('Complex test with multiple potential failures', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // 1. Possible issue: Delay in page load causing a missing element
  await expect(page.locator('.inventory_list')).toBeVisible();
  
  // 2. Missing await, bodka pred inventory pre classu
  const firstProductTitle = await page.locator('.inventory_item:first-child .inventory_item_name').innerText();
  expect(firstProductTitle).toBe('Sauce Labs Backpack');
  
  // 3. chybajuce k v slove backpack
  await page.click('#add-to-cart-sauce-labs-backpack');
  
  // 4. Nespravny pocet v kosiku, zle uvodzovky
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
