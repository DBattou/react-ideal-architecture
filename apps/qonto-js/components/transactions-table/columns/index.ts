import { amountColumn } from "./amount";
import { methodColumn } from "./method";
import { operationDateColumn } from "./operationDate";
import { selectColumn } from "./select";
import { transactionColumn } from "./transaction";

export const columns = [
  selectColumn,
  transactionColumn,
  methodColumn,
  operationDateColumn,
  amountColumn,
];
