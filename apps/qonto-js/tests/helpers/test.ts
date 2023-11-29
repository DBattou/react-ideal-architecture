import { test as testBase, expect } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";
import { makeServer } from "qonto-mirage";
import type { Server } from "miragejs";

const test = testBase.extend<{
  mirageServer: Server;
  autoTestFixture: string;
}>({
  mirageServer: async ({ page }, use) => {
    // Test has not started to execute...
    console.log("creating mirage server");
    const mirageServer = makeServer({
      environment: "test",
      page,
    });

    await use(mirageServer);

    // Test has finished executing...
    // [insert any cleanup actions here]
    mirageServer.shutdown();
  },
  autoTestFixture: [
    async ({ page }, use): Promise<void> => {
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
