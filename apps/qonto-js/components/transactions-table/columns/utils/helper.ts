import { createColumnHelper } from "@tanstack/react-table";
import type { Transaction } from "@/services/transactions";

export const columnHelper = createColumnHelper<Transaction>();
