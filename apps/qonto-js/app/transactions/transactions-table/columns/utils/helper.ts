import { Transaction } from "@/services/transactions";
import { createColumnHelper } from "@tanstack/react-table";

export const columnHelper = createColumnHelper<Transaction>();
