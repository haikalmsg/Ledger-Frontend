export type TransactionPaginationPayload = {
    page : number;
    limit : number;
    search?: string;
    kind?: string;
    account_id?: number;
}
export type Transaction = {
    id : string;
    user_id : string;
    acount_id : string;
    category_id : string;
    kind : string;
    amount : number;
    occurred_at : Date | string;
    description : string | null;
    merchant : string | null;
    created_at : Date | string;
    updated_at : Date | string;
}
export type TransactionListResponse = {
    data : Transaction[];
    next : boolean;
    previous : boolean;
    page : number;
    total_pages : number;
}