import { createServer, Model, Factory } from "miragejs";
export type User = {
  name: string;
  password: string;
};

type UserResponse = {
  users: User[];
};

export const fetchUsers = (url: string) =>
  fetch(url).then<UserResponse>((r) => r.json());


export function makeServer({ environment = "test" }) {
  return createServer({
    environment,

    factories: {
      user: Factory.extend<Partial<User>>({
        name: 'owner@qonto.com',
        password: 'HelloQonto!',
      }),
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    routes() {
      this.namespace = "api";

      this.get("users");
    },

    seeds(server) {
      server.create("user", { name: 'admin@qonto.com', password: 'HelloQonto!' });
    },
  });
}
