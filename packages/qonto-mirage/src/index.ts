import { createServer, Response } from "miragejs";
import models from "./models";
import factories from "./factories";
import setupApi from "./api";

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,
    factories,
    models,

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
    },

    seeds(server) {
      server.create("user");
    },
  });
}
