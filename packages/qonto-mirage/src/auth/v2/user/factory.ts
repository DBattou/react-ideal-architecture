import { Factory } from "miragejs";
import { User } from "./model";

export default Factory.extend<Partial<User>>({
  email: "owner@qonto.com",
  password: "HelloQonto!",
});
