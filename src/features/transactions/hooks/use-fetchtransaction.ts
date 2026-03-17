import { useQuery } from "@tanstack/react-query";
import {fetchTransactions} from "../api/transactions"
import type {
  TransactionListResponse,
  TransactionPaginationPayload,
} from "../types";

export function useFetchTransactions(payload: TransactionPaginationPayload) {
  return useQuery<TransactionListResponse, Error>({
    queryKey: [
      "transactions",
      payload.page,
      payload.limit,
      payload.search ?? "",
    ],
    queryFn: () => fetchTransactions(payload),
    placeholderData: (previousData) => previousData,
  });
}