"use client";
import { useEffect } from "react";

export function MSWComponent(): null {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
      const { worker } = require("@/mocks/browser");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      worker.start({
        onUnhandledRequest(request, print) {
          // Ignore any requests relatec to Next.js' static file serving.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          if (request.url.includes("/_next/")) {
            return;
          }

          // Otherwise, print an unhandled request warning.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          print.warning();
        },
      });
    }
  }, []);

  return null;
}
