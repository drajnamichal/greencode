import test, { expect } from '../fixtures/basePages';

test.fixme('Unpredictable popups', async ({ page }) => { 
  // go to https://zpravy.aktualne.cz/
  await page.goto('https://zpravy.aktualne.cz/');
  // click on "Auto" section
  await page.locator('#draggable__wrapper').getByRole('link', { name: 'Auto' }).click();
  // verify URL /ekonomika/auto
  expect(page.url()).toContain('/ekonomika/auto/');
});