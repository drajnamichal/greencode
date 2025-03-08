import { defineConfig, devices } from '@playwright/test';
import { Config } from "./config";

// const gitlabToSlackMap: { [key: string]: string } = {
//   'Michal Drajna': 'U046BMTSPCP',
// };

// function extractAuthorName(authorString: string): string {
//   const name = authorString.split(' <')[0];
//   return name;
// }

// const authorName = process.env.CI_COMMIT_AUTHOR ? extractAuthorName(process.env.CI_COMMIT_AUTHOR) : 'unknown';
// const slackUserId = gitlabToSlackMap[authorName] || 'unknown';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  snapshotDir: "./screenshots",
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  captureGitInfo: { commit: true, diff: true },
  reporter: process.env.CI
  ? [
      // [
      //   './../../node_modules/playwright-slack-report/dist/src/SlackReporter.js',
      //   {
      //     channels: ['automation tests'],
      //     sendResults: process.env.REPORT_ALWAYS === 'true' ? 'always' : 'on-failure',
      //     showInThread: true,
      //     meta: [
      //       {
      //         key: 'HTML Report',
      //         value: `${process.env.CI_JOB_URL}/artifacts/file/playwright-report/index.html`,
      //       },
      //       {
      //         key: 'Pipeline',
      //         value: `https://gitlab.com/investown/investown-fe/-/pipelines/${process.env.CI_PIPELINE_ID}`,
      //       },
      //       {
      //         key: 'Merged branch',
      //         value: `${process.env.CI_COMMIT_REF_NAME}`,
      //       },
      //       {
      //         key: 'Author',
      //         value: `<@${slackUserId}>`,
      //       },
      //     ],
      //   },
      // ],
      ['blob'],
      ['html'],
      ['list'],
    ]
  : [
      ['html', { open: 'on-failure' }],
      ['allure-playwright'],
      // list, line, dot, json, junit
    ],
  use: {
    baseURL: Config.E2E_TEST_BASE_URL,
    trace: 'on',
    headless: Config.HEADLESS_BROWSER,
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    // locale: 'cs-CZ',
    // actionTimeout: 0,
    // permissions: ['clipboard-read', 'geolocation'],
    // geolocation: { longitude: 14.41854, latitude: 50.073658 },
    viewport: {
      width: 1920,
      height: 1080,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'auth', testMatch: /auth.setup\.ts/ },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: '.auth/standard_user.json', 
      },
      dependencies: ['auth'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
