import { createColumnHelper } from "@tanstack/react-table";
import type { Transaction } from "qonto-api";

export const columnHelper = createColumnHelper<Transaction>();
