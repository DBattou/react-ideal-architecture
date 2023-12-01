import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/",
  outputDir: "./.playwright/test-results/",
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: "./.playwright/__snapshots__",
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ["junit", { outputFile: "./.playwright/report/junit.xml" }],
        [
          "monocart-reporter",
          {
            name: "My Test Report",
            outputFile: "./.playwright/monocart/report.html",
            // global coverage report options
            coverage: {
              toIstanbul: ["html-spa", "cobertura", "text-summary"],
              entryFilter: (entry) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const url = entry.url as string;
                // TODO: see if we can make this neater, it's required so we
                //  don't analuze nextjs server and other unrelated files.
                return (
                  url.startsWith("webpack-internal:///./src/") &&
                  !url.endsWith(".css")
                );
              },
              inline: true,
            },
          },
        ],
      ]
    : [["html", { outputFolder: "./.playwright/report" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://127.0.0.1:3501",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: "pnpm dev -- -p 3501",
    url: "http://127.0.0.1:3501",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
