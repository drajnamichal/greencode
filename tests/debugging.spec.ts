import test, { expect } from '../fixtures/basePages';

test('Complex test with multiple potential failures', {
  tag: '@fixme',
},  async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    const firstProductTitle = page.locator('inventory_item:first-child .inventory_item_name').innerText();
    expect(firstProductTitle).not.toBe('Sauce Labs Backpack');
    
    await page.click('.add-to-cart-sauce-labs-bacpack');
    
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});
