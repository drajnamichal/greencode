import test, { expect } from '../fixtures/basePages';

test('Unpredictable popups', async ({ page }) => {
  // add locator handler
  await page.addLocatorHandler(page.getByRole('heading', { name: 'Nastavení soukromí' }), async() => {
    await page.getByRole('button', { name: 'Souhlasit a zavřít: Souhlasit' }).click();
  }); 
  // go to https://zpravy.aktualne.cz/
  await page.goto('https://zpravy.aktualne.cz/');
  // click on "Auto" section
  await page.locator('#draggable__wrapper').getByRole('link', { name: 'Auto' }).click();
  // verify URL /ekonomika/auto
  expect(page.url()).toContain('/ekonomika/auto/');
});