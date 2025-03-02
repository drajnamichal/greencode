import { Locator, Page } from '@playwright/test';

export class LoginPage {
  // define selectors
  readonly page: Page;

  readonly userNameInput: Locator;

  readonly passwordInput: Locator;

  readonly loginButton: Locator;

  // init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByTestId('signInUsername');
    this.passwordInput = page.getByTestId('signInPassword');
    this.loginButton = page.getByTestId('signInConfirmButton');
  }

  // define login page methods
  async visit() {
    await this.page.goto(process.env.E2E_TEST_BASE_URL!);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterUsername(username: string) {
    await this.userNameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async successfulLogin() {
    await this.userNameInput.pressSequentially(process.env.E2E_TEST_VALID_USER_EMAIL!, { delay: 100 });
    await this.passwordInput.fill(process.env.E2E_TEST_VALID_USER_PASSWORD!);
    await this.loginButton.click();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
