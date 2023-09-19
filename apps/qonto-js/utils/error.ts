export function isAbortError(error: any): error is DOMException {
  return error && error.name === "AbortError";
}
