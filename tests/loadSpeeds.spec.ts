import test from '../fixtures/basePages';

test('Compare page load speeds', async ({ page }) => {
  for (const strategy of ['load', 'domcontentloaded', 'commit']) {
    const start = Date.now();
    await page.goto('https://www.saucedemo.com/', { waitUntil: strategy as 'load' | 'domcontentloaded' | 'commit' });
    const duration = Date.now() - start;
    console.log(`⏳ Time for waitUntil="${strategy}": ${duration}ms`);
  }
});