import { createServer, Model, Factory, Response } from "miragejs";
export type User = {
  email: string;
  password: string;
};

export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    factories: {
      user: Factory.extend<Partial<User>>({
        email: 'owner@qonto.com',
        password: 'HelloQonto!',
      }),
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    routes() {
      this.namespace = "api";

      this.post("/users/session", (schema, request) => {
        let requestJSON = JSON.parse(request.requestBody);
        let reqUser = requestJSON.user;
        let email = reqUser.email;
        let user = schema.db.users.findBy({ email });

        if (!user) {
          return new Response(404, {}, { message: 'Not found' });
        }
        if (user.password !== reqUser.password) {
          return new Response(401, {}, { message: 'Unauthorized' });
        }
        return schema.db.users.findBy({ name: requestJSON.name, password: requestJSON.password });
      });
    },

    seeds(server) {
      server.create("user");
    },
  });
}
