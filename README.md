## Playwright Workshop Starter Project

### 🛠 Setup Instructions

1. **Clone the repository**:
   ```sh
   git clone https://github.com/drajnamichal/greencode.git
   cd greencode
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Run example tests**:
   ```sh
   npx playwright test
   ```

---

### 📂 Project Structure
```
playwright-workshop/
├── tests/                     # Test cases
│   ├── example.spec.ts        # Example test
│   ├── ui.spec.ts             # UI Test example
│   ├── api.spec.ts            # API Test example
│   ├── visual.spec.ts         # Visual Regression Test
│   ├── flaky.spec.ts          # Example of flaky test
│   ├── auth.spec.ts           # Authenticated test
│
├── playwright.config.ts       # Playwright configuration file
├── package.json               # Dependencies and scripts
├── README.md                  # Documentation
├── .gitignore                 # Ignored files
└── storageState.json          # Authenticated session (pre-saved state)
```

---

### ✅ Example Tests

#### **Basic UI Test** (`tests/example.spec.ts`)
```ts
import { test, expect } from '@playwright/test';

test('Check if Saucedemo homepage loads', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});
```

#### **API Test** (`tests/api.spec.ts`)
```ts
import { test, expect } from '@playwright/test';

test('Verify API response', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('title');
});
```

#### **Visual Regression Test** (`tests/visual.spec.ts`)
```ts
import { test, expect } from '@playwright/test';

test('Visual comparison test on Saucedemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  expect(await page.screenshot()).toMatchSnapshot('saucedemo-homepage.png');
});
```

#### **Authenticated Test** (`tests/auth.spec.ts`)
```ts
import { test, expect } from '@playwright/test';

test.use({ storageState: 'storageState.json' });

test('Login and check inventory page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Products');
});
```

---

### 🚀 Running Tests

#### Run all tests
```sh
npx playwright test
```

#### Run tests in headed mode (UI visible)
```sh
npx playwright test --headed
```

#### Run specific test file
```sh
npx playwright test tests/example.spec.ts
```

#### Run tests in debug mode
```sh
npx playwright test --debug
```

#### Generate Tests using CodeGen
```sh
npx playwright codegen https://www.saucedemo.com
```

#### Run tests in multiple browsers
```sh
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

### 🔄 CI/CD Integration

#### GitLab CI/CD Example
```yaml
stages:
  - test

e2e_tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  script:
    - npm install
    - npx playwright test
  artifacts:
    paths:
      - playwright-report/
```

#### GitHub Actions Example
```yaml
name: Playwright Tests
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: microsoft/playwright-github-action@v1
      - run: npm install
      - run: npx playwright test
```

---

### 📊 Reporting

Generate an **HTML report**:
```sh
npx playwright test --reporter=html
npx playwright show-report
```

Generate a **JSON report**:
```sh
npx playwright test --reporter=json > report.json
```

Send reports to **Slack** using SlackReporter.
```ts
import SlackReporter from 'playwright-slack-reporter';
export default { reporter: new SlackReporter({ webhookUrl: 'your-slack-webhook-url' }) };
```

---

### 🚀 Best Practices

✔ **Use `storageState.json`** for authentication to speed up tests.
✔ **Avoid XPath selectors**, prefer `getByRole()` or `data-testid`.
✔ **Use `.waitForSelector()` cautiously**, prefer built-in waits like `expect().toBeVisible()`.
✔ **Run tests in parallel** to save time (`workers: 4`).
✔ **Mock API requests** to avoid reliance on backend.

---

🔹 **Ready for Workshop!**
- Clone repo
- Install dependencies
- Run first test!

💡 **Next Steps**: Customize tests, add API mocks, integrate CI/CD!
