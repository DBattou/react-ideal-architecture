# Ideal Architecture Proof of Concept

This is the web team's ideal architecture repo supporting [this document](https://www.notion.so/Under-Review-React-migration-ideal-architecture-4369e93ee0f34a3dae3c0ae69a58ab79).

## What's inside?

It is a monorepo containing simplified copies of our existing apps and packages within the web team. We use [Turborepo](https://turbo.build/repo) as a monorepo build tool.

## Architecture

You can find information about our monorepo setup in [TurboRepo's MonoRepo Handbook](https://turbo.build/repo/docs/handbook).

### Apps and Packages

Within our monorepo we have multiple smaller projects that we divide in `apps` and `packages`, which are defined as [workspaces](https://turbo.build/repo/docs/handbook/workspaces).

**apps**

- `auth`: A [Next.js](https://nextjs.org/) app containing just the login screen. In our current architecture this exists within the qonto-js app and we redirect to it from all other apps.
- `qonto-js`: A [Next.js](https://nextjs.org/) app containing a simplified version of our existing qonto-js app.
- `workshop`: A [Storybook](https://storybook.js.org/) app that contains all stories for visual testing components of apps and packages. We use [vite.dev](https://vitejs.dev/) for development and building.

**packages**

- `ui`: A React component library shared by both `auth` and `qonto-js` applications similar to our existing ui-kit.
- `qonto-mirage`: A [mirage-js](https://miragejs.com/) api mock shared by both `auth` and `qonto-js` applications similar to our existing qonto-mirage.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

Some additional tools are also setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### How to create a new workspace

#### Create a new app

TBD

### Create a new package

TBD

### How to link a package to an app

TBD

## Install

We use [pnpm](https://pnpm.io/) as our package manager.

You can run `pnpm install` in the root directory to install all dependencies for apps and packages at once.

### How to install a new dependency

New dependencies are install from the root, even when it is for a specific workspace. This allows shared dependencies to be added to the root instead of the workspace.

```bash
pnpm add <package> --filter <workspace>
```

Please see the [TurboRepo docs](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages) for more info.

## Develop

We use [pnpm](https://pnpm.io/) as our package manager.

To develop all apps and packages, run the following command from the root:

```bash
pnpm run dev
```

Turborepo will then run the `dev` command for all workspaces. For now we only configured the apps to run in development and start them on a dedicated localhost port.

If you ony want to run specific apps, you can use a filter:

```bash
pnpm run dev --filter <app_name>
```

### Rebuilding and HMR

When making a change in an app it will also be automatically rebuilt. If an app has any internal dependencies, making a change in them will also trigger a rebuild. **turborepo will only rebuild the apps and dependencies that are affected to avoid rebuilding everything.**

Hot Module Reloading is enabled for our [Next.js apps](https://turbo.build/pack/docs/features/dev-server#hmr) as well as our Storybook vite server.

## Test

We have 3 types of tests:

- full page tests (also called application tests in Ember)
- component tests (also called rendering tests in Ember)
- unit tests

We use [Playwright](https://playwright.dev/docs/intro) for all testing types. They have a dedicated package for [React component testing](https://playwright.dev/docs/test-components).

To run our tests:

```bash
# run this for page and unit tests with playwright
pnpm run test
# run this for component tests with playwright
pnpm run test-ct
```

Turborepo will then run the correct test command for all workspaces that have tests configured. All tests are run inside a headless Chrome instance, and the output of the tests will be logged to the console.

When making changes, **turborepo will only test the apps and dependencies that are affected to avoid rebuilding everything.**

### Running visual tests

Playwright also supports [visual testing](https://playwright.dev/docs/test-ui-mode). We created 2 separate commands for this:

```bash
# run this for page and unit tests with playwright
pnpm run test:ui
# run this for component tests with playwright
pnpm run test-ct:ui
```

## Build

To build all apps and packages, run the following command:

```bash
pnpm run build
```

When making changes, **turborepo will only rebuild the apps and dependencies that are affected to avoid rebuilding everything.**
