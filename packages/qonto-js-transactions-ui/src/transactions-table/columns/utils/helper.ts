import { createColumnHelper } from "@tanstack/react-table";
import type { Transaction } from "transactions-entity";

export const columnHelper = createColumnHelper<Transaction>();
