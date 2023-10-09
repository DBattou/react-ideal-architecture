import { createColumnHelper } from "@tanstack/react-table";
import type { Transaction } from "@/src/services/transactions";

export const columnHelper = createColumnHelper<Transaction>();
