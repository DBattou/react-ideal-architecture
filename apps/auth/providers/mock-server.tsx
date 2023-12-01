"use client";
import { useEffect } from "react";

export function MockServer(): null {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      require("../mocks/browser");
    }
  }, []);

  return null;
}
