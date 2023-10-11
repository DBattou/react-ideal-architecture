import { createColumnHelper } from "@tanstack/react-table";
import type { Transaction } from "../../../types/transaction";

export const columnHelper = createColumnHelper<Transaction>();
