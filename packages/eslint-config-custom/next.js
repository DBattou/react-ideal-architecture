const { resolve } = require("node:path");
 
const project = resolve(process.cwd(), "tsconfig.json");
 
/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */
 
module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    // turborepo custom eslint configuration configures the following rules:
    //  - https://github.com/vercel/turbo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-unnecessary-condition": "off" /** false positive? */
  },

  /**
   * Remove this override when tests get extracted in their own package.
   */
  overrides: [{
    files: ["**/*.spec.ts?(x)"],
    extends: [require.resolve("@vercel/style-guide/eslint/playwright-test")]
  }]
};