import { createServer, Response, Server } from "miragejs";
import models from "./models";
import factories from "./factories";
import setupApi from "./api";
import serializers from "./serializers";
import { PlaywrightInterceptor } from "mirage-playwright";
import type { Page } from "@playwright/test";

interface MakeServerArgs {
  environment?: "test" | "development" | "production";
  page: Page;
}

export function makeServer({
  environment = "test",
  page,
}: MakeServerArgs): Server {
  const server = createServer({
    environment,
    factories,
    models,
    interceptor: new PlaywrightInterceptor(),
    page,

    routes() {
      this.namespace = "api";

      this.post("/users/session", (schema, request) => {
        let requestJSON = JSON.parse(request.requestBody);
        let reqUser = requestJSON.user;
        let email = reqUser.email;
        let user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(404, {}, { message: "Not found" });
        }
        if (user.password !== reqUser.password) {
          return new Response(401, {}, { message: "Unauthorized" });
        }
        return schema.db.users.findBy({
          name: requestJSON.name,
          password: requestJSON.password,
        });
      });

      setupApi(this);

      this.namespace = "";
      // if (environment === "test") {
      //   this.passthrough("/api/v6/transactions/search");
      // }

      //this.passthrough();
    },

    seeds(server) {
      server.create("user");
      server.createList("transaction", 100);
    },

    serializers,
  });

  server.logging = true;

  return server;
}
