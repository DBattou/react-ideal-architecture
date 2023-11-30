import { setupWorker } from "msw";
import handlers from "./handlers";

const worker = setupWorker(...handlers);

void worker.start({
  onUnhandledRequest(request, print) {
    // Ignore any requests relatec to Next.js' static file serving.
    if (request.url.pathname.includes("/_next/")) {
      return;
    }
    // Otherwise, print an unhandled request warning.
    print.warning();
  },
});
