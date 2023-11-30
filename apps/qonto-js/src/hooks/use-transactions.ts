import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { searchTransactions } from "@/services/transactions";
import type {
  TransactionsListPayload,
  SearchTransactionsFilters,
} from "@/services/transactions";

export function useTransactions(
  filters: SearchTransactionsFilters
): UseQueryResult<TransactionsListPayload> {
  return useQuery({
    queryKey: ["transactions", "list", filters],
    queryFn: async ({ signal }) => searchTransactions(filters, { signal }),
  });
}
