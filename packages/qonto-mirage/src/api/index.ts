import registerV6Transaction from "./v6/transaction/handlers";

export default function (server) {
  registerV6Transaction(server);
}
