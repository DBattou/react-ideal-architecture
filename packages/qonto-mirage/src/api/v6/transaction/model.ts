import { Model } from "miragejs";
import type { Transaction } from "qonto-api";

export default Model.extend<Partial<Transaction>>({});
