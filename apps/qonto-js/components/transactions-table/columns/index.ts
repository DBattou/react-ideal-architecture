import { amountColumn } from "./amount";
import { operationMethodColumn } from "./operationMethod";
import { emittedAtColumn } from "./emittedAt";
import { selectColumn } from "./select";
import { counterpartyNameColumn } from "./counterpartyName";

export const columns = [
  selectColumn,
  counterpartyNameColumn,
  operationMethodColumn,
  emittedAtColumn,
  amountColumn,
];
