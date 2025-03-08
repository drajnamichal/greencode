import test, { expect } from '../fixtures/basePages';

test.describe('Console log errors', () => {

  test('Page has no errors or logs', async ({ page }) => {
    page.on('console', (message) => {
      // Zachytí všetky správy z konzoly
      console.log(message.type(), message.text());
    });

    const logs = [] as any;
    page.on("console", (message) => {
      return logs.push({ message, type: message.type() });
    })

    const errors = [] as any;
    // Zachytí chyby JavaScriptu na stránke
    page.on("pageerror", (exception) => {
      errors.push(exception);
    })

    await page.goto('https://saucelabs.com/');
    console.log('Logs: ', logs);
    expect.soft(logs.length).toBe(0);
    console.log('Errors: ', errors);
    expect(errors.length).toBe(0);
  })
})