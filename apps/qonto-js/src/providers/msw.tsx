"use client";
import { useEffect } from "react";

export function MSWComponent(): null {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
      const { worker } = require("@/mocks/browser");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      worker.start();
    }
  }, []);

  return null;
}
