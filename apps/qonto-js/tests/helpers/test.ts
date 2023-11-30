import { test as testBase, expect } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";
import { makeServer } from "qonto-mirage";

const test = testBase.extend<{
  mirageServer: ReturnType<typeof makeServer>; // TODO: improve this type
  autoTestFixture: string;
}>({
  mirageServer: async ({ page }, use) => {
    // Test has not started to execute...
    const mirageServer = makeServer({
      environment: "test",
      page,
    });

    await use(mirageServer);

    // Test has finished executing...
    // [insert any cleanup actions here]

    // TODO: shutdown is not automatically called due to: https://github.com/miragejs/miragejs/blob/34266bf7ebd200bbb1fade0ce7a7a9760cc93a88/lib/server.js#L664
    // @ts-expect-error Mirage types are out of sync with reality
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    mirageServer.interceptor.shutdown();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
