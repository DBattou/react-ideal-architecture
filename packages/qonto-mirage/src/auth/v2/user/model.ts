import { Model } from "miragejs";

export type User = {
  email: string;
  password: string;
};

export default Model.extend<Partial<User>>({});
