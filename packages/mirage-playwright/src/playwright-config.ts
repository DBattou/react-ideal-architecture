import PassthroughRegistry from "./passthrough-registry";
import type { Request as MirageRequest } from "miragejs";
import type {
  HTTPVerb,
  RouteHandler,
  ServerConfig as MirageServerConfig,
} from "miragejs/server";
import type { AnyFactories, AnyModels, AnyRegistry } from "miragejs/-types";
import { Page, Route, Request as PlaywrightRequest } from "@playwright/test";
import { convertPathToPlaywrightUrl } from "./utils";
import RouteRecognizer from "route-recognizer";

type RawHandler = RouteHandler<AnyRegistry> | {};

type ResponseCode = number;

/** code, headers, serialized response */
type ResponseData = [ResponseCode, { [k: string]: string }, string | undefined];

/** e.g. "/movies/:id" */
type Shorthand = string;

type RouteArgs =
  | [RouteOptions]
  | [Record<string, unknown>, ResponseCode]
  | [Function, ResponseCode]
  | [Shorthand, RouteOptions]
  | [Shorthand, ResponseCode, RouteOptions];

type RouteArguments = [
  RawHandler | undefined,
  ResponseCode | undefined,
  RouteOptions
];

type BaseHandler = (path: string, ...args: RouteArgs) => void;

interface ServerConfig<Models extends AnyModels, Factories extends AnyFactories>
  extends MirageServerConfig<Models, Factories> {
  page: Page;
}

type MirageRouteHandlerResponse = [
  number,
  Record<string, string> | undefined,
  string | {} | undefined
];

type MirageServer = {
  registerRouteHandler: (
    verb: HTTPVerb,
    path: string,
    rawHandler?: RawHandler,
    customizedCode?: ResponseCode,
    options?: unknown
  ) => (
    request: MirageRequest
  ) => MirageRouteHandlerResponse | PromiseLike<MirageRouteHandlerResponse>;

  shouldLog: () => boolean;

  get?: BaseHandler;
  post?: BaseHandler;
  put?: BaseHandler;
  delete?: BaseHandler;
  del?: BaseHandler;
  patch?: BaseHandler;
  head?: BaseHandler;
  options?: BaseHandler;
};

type RouteOptions = {
  /** JSON-api option */
  coalesce?: boolean;
  /**
   * Pretender treats a boolean timing option as "async", number as ms delay.
   * TODO: Not sure what MSW does yet.
   */
  timing?: boolean | number;
};

const defaultRouteOptions = {
  coalesce: false,
  timing: undefined,
};

/**
 * Determine if the object contains a valid option.
 *
 * @method isOption
 * @param {Object} option An object with one option value pair.
 * @return {Boolean} True if option is a valid option, false otherwise.
 * @private
 */
function isOption(option: unknown): option is RouteOptions {
  if (!option || typeof option !== "object") {
    return false;
  }

  let allOptions = Object.keys(defaultRouteOptions);
  let optionKeys = Object.keys(option);
  for (let i = 0; i < optionKeys.length; i++) {
    let key = optionKeys[i];
    if (allOptions.indexOf(key) > -1) {
      return true;
    }
  }
  return false;
}

/**
 * Extract arguments for a route.
 *
 * @method extractRouteArguments
 * @param {Array} args Of the form [options], [object, code], [function, code]
 * [shorthand, options], [shorthand, code, options]
 * @return {Array} [handler (i.e. the function, object or shorthand), code,
 * options].
 */
function extractRouteArguments(args: RouteArgs): RouteArguments {
  let result: RouteArguments = [undefined, undefined, {}];

  for (const arg of args) {
    if (isOption(arg)) {
      result[2] = { ...defaultRouteOptions, ...arg };
    } else if (typeof arg === "number") {
      result[1] = arg;
    } else {
      result[0] = arg;
    }
  }
  return result;
}

export default class PlaywrightConfig {
  urlPrefix?: string;
  namespace?: string;
  timing?: number;
  page?: Page;
  mirageServer?: MirageServer;
  // TODO: infer models and factories
  mirageConfig?: ServerConfig<AnyModels, AnyFactories>;

  router: RouteRecognizer;
  handlers: Promise<void>[] = [];

  private passthroughs;
  private passthroughChecks: ((req: PlaywrightRequest) => boolean)[] = [];

  get?: BaseHandler;
  post?: BaseHandler;
  put?: BaseHandler;
  delete?: BaseHandler;
  del?: BaseHandler;
  patch?: BaseHandler;
  head?: BaseHandler;
  options?: BaseHandler;

  constructor() {
    this.passthroughs = new PassthroughRegistry();
    this.router = new RouteRecognizer();
  }

  create(
    server: MirageServer,
    mirageConfig: ServerConfig<AnyModels, AnyFactories>
  ) {
    this.mirageServer = server;
    this.mirageConfig = mirageConfig;

    this.page = this.mirageConfig.page;
    if (!this.page) {
      throw new Error("A Playwright Page must be passed in the mirageConfig");
    }

    this.config(mirageConfig);

    const verbs = [
      ["get"] as const,
      ["post"] as const,
      ["put"] as const,
      ["delete", "del"] as const,
      ["patch"] as const,
      ["head"] as const,
      ["options"] as const,
    ];

    // TODO: playwright doesn't distinguish between verbs, we can probably get away with creating 1 handler per URL
    // TODO: figure out a way to distinguish between verbs so we're sure the right handler is used
    verbs.forEach(([verb, alias]) => {
      this[verb] = (path: string, ...args: RouteArgs) => {
        let [rawHandler, customizedCode, options] = extractRouteArguments(args);

        // This assertion is for TypeScript, we don't expect it to happen
        if (!this.mirageServer) {
          throw new Error("Lost the mirageServer");
        }

        let handler = this.mirageServer.registerRouteHandler(
          verb,
          path,
          rawHandler,
          customizedCode,
          options
        );

        console.log("adding path", ["/", this.namespace, path].join(""));
        this.router.add([
          { path: ["/", this.namespace, path].join(""), handler },
        ]);

        let fullPath = this._getFullPath(path);
        let playwrightHandler = this.page!.route(
          convertPathToPlaywrightUrl(fullPath),
          async (route: Route) => {
            const request = route.request();
            console.log("HANDLING", fullPath, request.url());
            const method = request.method();
            const url = new URL(request.url());
            const requestHeaders = await request.allHeaders();
            const postData = request.postData();

            let params = {};
            let queryParams = {};
            let matches = this.router.recognize(fullPath);
            let match = matches ? matches[0] : null;
            if (match) {
              params = match.params;
              queryParams = matches!.queryParams;
            }

            let mirageRequest: MirageRequest = {
              requestBody: postData ?? "",
              requestHeaders,
              url: fullPath,
              params,
              queryParams,
            };

            let [status, headers, body] = await handler(mirageRequest);

            console.log("fulfilling route", status, headers);
            await route.fulfill({
              status,
              headers,
              body,
            });
          }
        );

        this.handlers.push(playwrightHandler);
      };
      server[verb] = this[verb];

      if (alias) {
        this[alias] = this[verb];
        server[alias] = this[verb];
      }
    });
  }

  // TODO: infer models and factories
  config(mirageConfig: ServerConfig<AnyModels, AnyFactories>) {
    /**
         Sets a string to prefix all route handler URLs with.

         Useful if your app makes API requests to a different port.

         ```js
         createServer({
         routes() {
         this.urlPrefix = 'http://localhost:8080'
         }
         })
         ```
         */
    this.urlPrefix = this.urlPrefix || mirageConfig.urlPrefix || "";

    /**
         Set the base namespace used for all routes defined with `get`, `post`, `put` or `del`.

         For example,

         ```js
         createServer({
         routes() {
         this.namespace = '/api';

         // this route will handle the URL '/api/contacts'
         this.get('/contacts', 'contacts');
         }
         })
         ```

         Note that only routes defined after `this.namespace` are affected. This is useful if you have a few one-off routes that you don't want under your namespace:

         ```js
         createServer({
         routes() {

         // this route handles /auth
         this.get('/auth', function() { ...});

         this.namespace = '/api';
         // this route will handle the URL '/api/contacts'
         this.get('/contacts', 'contacts');
         };
         })
         ```

         If your app is loaded from the filesystem vs. a server (e.g. via Cordova or Electron vs. `localhost` or `https://yourhost.com/`), you will need to explicitly define a namespace. Likely values are `/` (if requests are made with relative paths) or `https://yourhost.com/api/...` (if requests are made to a defined server).

         For a sample implementation leveraging a configured API host & namespace, check out [this issue comment](https://github.com/miragejs/ember-cli-mirage/issues/497#issuecomment-183458721).

         @property namespace
         @type String
         @public
         */
    this.namespace = this.namespace || mirageConfig.namespace || "";
  }

  /**
   * Builds a full path for Pretender to monitor based on the `path` and
   * configured options (`urlPrefix` and `namespace`).
   *
   * @private
   * @hide
   */
  _getFullPath(path: string) {
    path = path[0] === "/" ? path.slice(1) : path;
    let fullPath = "";
    let urlPrefix = this.urlPrefix ? this.urlPrefix.trim() : "";
    let namespace = "";

    // if there is a urlPrefix and a namespace
    if (this.urlPrefix && this.namespace) {
      if (
        this.namespace[0] === "/" &&
        this.namespace[this.namespace.length - 1] === "/"
      ) {
        namespace = this.namespace
          .substring(0, this.namespace.length - 1)
          .substring(1);
      }

      if (
        this.namespace[0] === "/" &&
        this.namespace[this.namespace.length - 1] !== "/"
      ) {
        namespace = this.namespace.substring(1);
      }

      if (
        this.namespace[0] !== "/" &&
        this.namespace[this.namespace.length - 1] === "/"
      ) {
        namespace = this.namespace.substring(0, this.namespace.length - 1);
      }

      if (
        this.namespace[0] !== "/" &&
        this.namespace[this.namespace.length - 1] !== "/"
      ) {
        namespace = this.namespace;
      }
    }

    // if there is a namespace and no urlPrefix
    if (this.namespace && !this.urlPrefix) {
      if (
        this.namespace[0] === "/" &&
        this.namespace[this.namespace.length - 1] === "/"
      ) {
        namespace = this.namespace.substring(0, this.namespace.length - 1);
      }

      if (
        this.namespace[0] === "/" &&
        this.namespace[this.namespace.length - 1] !== "/"
      ) {
        namespace = this.namespace;
      }

      if (
        this.namespace[0] !== "/" &&
        this.namespace[this.namespace.length - 1] === "/"
      ) {
        let namespaceSub = this.namespace.substring(
          0,
          this.namespace.length - 1
        );
        namespace = `/${namespaceSub}`;
      }

      if (
        this.namespace[0] !== "/" &&
        this.namespace[this.namespace.length - 1] !== "/"
      ) {
        namespace = `/${this.namespace}`;
      }
    }

    // if no namespace
    if (!this.namespace) {
      namespace = "";
    }

    // check to see if path is a FQDN. if so, ignore any urlPrefix/namespace that was set
    if (/^https?:\/\//.test(path)) {
      fullPath += path;
    } else {
      // otherwise, if there is a urlPrefix, use that as the beginning of the path
      if (urlPrefix.length) {
        fullPath +=
          urlPrefix[urlPrefix.length - 1] === "/" ? urlPrefix : `${urlPrefix}/`;
      }

      // add the namespace to the path
      fullPath += namespace;

      // add a trailing slash to the path if it doesn't already contain one
      if (fullPath[fullPath.length - 1] !== "/") {
        fullPath += "/";
      }

      // finally add the configured path
      fullPath += path;

      // if we're making a same-origin request, ensure a / is prepended and
      // dedup any double slashes
      if (!/^https?:\/\//.test(fullPath)) {
        fullPath = `/${fullPath}`;
        fullPath = fullPath.replace(/\/+/g, "/");
      }
    }

    return fullPath;
  }

  passthrough(...args: (string | HTTPVerb[])[]) {
    let verbs: HTTPVerb[] = [
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "options",
      "head",
    ];
    let lastArg = args[args.length - 1];
    let paths: string[] = [];

    if (args.length === 0) {
      paths = ["/**", "/"];
    } else if (Array.isArray(lastArg)) {
      verbs = lastArg;
    }
    // Need to loop because TS doesn't know if they're strings or arrays
    for (const arg of args) {
      if (typeof arg === "string") {
        paths.push(arg);
      }
    }

    paths.forEach((path) => {
      if (typeof path === "function") {
        this.passthroughChecks.push(path);
      } else {
        let fullPath = this._getFullPath(path);
        this.passthroughs.add(fullPath, verbs);
      }
    });
  }

  start() {
    // TODO: mirage isn't async, our handlers' init is
    //await Promise.all(this.handlers);
    // TODO: passthroughs?
  }

  shutdown() {
    // await Promise.all(
    //   this.handlers.map((handler) =>
    //     this.page.unroute(convertPathToPlaywrightUrl)
    //   )
    // );
  }
}
