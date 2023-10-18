import { beforeMount } from "@playwright/experimental-ct-react/hooks";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider/next-13";
import "@/styles/global.css";

export type HooksConfig = {
  enableRouting?: boolean;
};

/* eslint-disable-next-line @typescript-eslint/require-await --
 * beforeMount needs a callback returning Promise<Element | void>
 * so it's just easier flagging the function as async
 */
beforeMount<HooksConfig>(async ({ hooksConfig, App }) => {
  if (hooksConfig?.enableRouting) {
    return (
      <MemoryRouterProvider>
        <App />
      </MemoryRouterProvider>
    );
  }
  return <App />;
});
