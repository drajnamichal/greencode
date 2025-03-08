import { test, Browser, chromium, Page, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import AxeBuilder from '@axe-core/playwright';

let browser: Browser;
let page: Page;

test.describe('Accessibility test using Axe', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('https://playwright.dev');
    await injectAxe(page);
  });
  test.skip('Simple accessibility test', async () => {
    await checkA11y(page, undefined, { 
      detailedReport: true,
      })
    });
  });


test.describe('Achieving WCAG Standard with Playwright Accessibility Tests', () => {
  test('Accessibility Scan', async ({ page }, testInfo) => {

    const PAGE_FOR_SCAN = 'https://www.npmjs.com/package/axe-playwright?activeTab=readme';
    
    await page.goto(PAGE_FOR_SCAN);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Attach the accessibility scan results as a log for later analysis
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    // Perform detailed accessibility checks and generate a detailed report
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    // Assert that there are no accessibility violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
