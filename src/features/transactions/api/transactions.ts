import { api } from "../../../lib/axios";
import type { TransactionPaginationPayload, TransactionListResponse } from "../types";

export async function fetchTransactions(payload: TransactionPaginationPayload) : Promise<TransactionListResponse> {
    const response = await api.get<TransactionListResponse>("/transactions", { params: payload });
    return response.data;
}