export const convertPathToPlaywrightUrl = (path: string | RegExp): RegExp => {
  // If already a regex, just return straight away
  if (path instanceof RegExp) {
    return path;
  }

  // Deconstruct path
  const { origin, pathname } =
    path.match(
      /^(?<origin>\*|\w+:\/\/[^/]+)?(?<pathname>[^?]+)(?<search>\?.*)?/
    )?.groups ?? {};

  // Rebuild it as a RegExp
  return new RegExp(
    [
      "^",
      origin === "*" ? ".*" : origin ?? "(\\w+://[^/]+)?",
      // Replace route parameters (`:whatever`) with multi-char wildcard
      pathname.replace(/:[^/]+/g, "[^/]+"),
      // Add optional trailing slash
      "\\/?",
      // Add optional query parameters
      "(\\?.*)?",
      // Anchor to end of string
      "$",
    ].join("")
  );
};
