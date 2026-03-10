import { useMutation } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";
import type { TransactionPaginationPayload, TransactionListResponse } from "../types";

export function useFetchTransactions() {
    return useMutation<TransactionListResponse, Error, TransactionPaginationPayload>({
        mutationFn: fetchTransactions,
    });
}