import { test, Browser, chromium, Page } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

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
