import { test as testBase, expect } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";
import { createWorkerFixture } from "playwright-msw";
import handlers from "../msw/handlers";

const test = testBase.extend({
  worker: createWorkerFixture(handlers),
  autoTestFixture: [
    async ({ page }, use) => {
      const isChromium = test.info().project.name === "chromium";

      // coverage API is chromium only
      if (isChromium) {
        await Promise.all([
          page.coverage.startJSCoverage({
            resetOnNavigation: false,
          }),
          // page.coverage.startCSSCoverage({
          //   resetOnNavigation: false,
          // }),
        ]);
      }

      await use("autoTestFixture");

      if (isChromium) {
        const [jsCoverage /*, cssCoverage*/] = await Promise.all([
          page.coverage.stopJSCoverage(),
          // page.coverage.stopCSSCoverage(),
        ]);
        const coverageList = [...jsCoverage /*, ...cssCoverage*/];
        await addCoverageReport(coverageList, test.info());
      }
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});
export { test, expect };
