import { amountColumn } from "./amount";
import { operationMethodColumn } from "./operation-method";
import { emittedAtColumn } from "./emitted-at";
import { selectColumn } from "./select";
import { counterpartyNameColumn } from "./counterparty-name";

export const columns = [
  selectColumn,
  counterpartyNameColumn,
  operationMethodColumn,
  emittedAtColumn,
  amountColumn,
];
