import { useFetchTransactions } from "../hooks/use-fetchtransaction";
import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./transaction-page.module.css";

export default function TransactionPage() {
  const fetchTransactionsMutation = useFetchTransactions();
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [page, setPageNumber] = useState<number>(1);
  const [limit, setLimitNumber] = useState<number>(10);

  const columnHelper = createColumnHelper<Transaction>();

  useEffect(() => {
    setError(null);
    setErrorCode(null);

    fetchTransactionsMutation.mutate(
      { page, limit },
      {
        onError: (error: any) => {
          setError(
            error.response?.data?.detail ||
              error.message ||
              "Failed to fetch transactions"
          );
          setErrorCode(error.response?.status || null);
        },
      }
    );
  }, [page, limit]);

  const table = useReactTable({
    data: fetchTransactionsMutation.data?.data || [],
    columns: [
      columnHelper.accessor("occurred_at", {
        header: "Occurred At",
        cell: (info) => {
          const value = info.getValue();
          return new Date(value).toLocaleString();
        },
      }),
      columnHelper.accessor("description", {
        header: "Description",
      }),
      columnHelper.accessor("merchant", {
        header: "Merchant",
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
      }),
      columnHelper.accessor("created_at", {
        header: "Created At",
        cell: (info) => {
          const value = info.getValue();
          return new Date(value).toLocaleString();
        },
      }),
      columnHelper.accessor("updated_at", {
        header: "Updated At",
        cell: (info) => {
          const value = info.getValue();
          return new Date(value).toLocaleDateString();
        },
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const hasNext = fetchTransactionsMutation.data?.next ?? false;
  const hasPrevious = fetchTransactionsMutation.data?.previous ?? false;

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1>Transactions</h1>
        <div className={styles.topbarWrapper}>
            <input className={styles.searchbar} placeholder="Search Here"></input>
        </div>

        {fetchTransactionsMutation.isPending && (
          <p className={styles.loading}>Loading...</p>
        )}

        {errorCode && <h2 className={styles.errorCode}>{errorCode}</h2>}
        {error && <p className={styles.errorMessage}>Error: {error}</p>}

        {fetchTransactionsMutation.isSuccess && (
          <>
            <table className={styles.table}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                <span>Page {page}</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimitNumber(Number(e.target.value));
                    setPageNumber(1);
                  }}
                  className={styles.limitSelect}
                >
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>

              <div className={styles.paginationButtons}>
                <button
                  onClick={() => setPageNumber((prev) => prev - 1)}
                  disabled={!hasPrevious || fetchTransactionsMutation.isPending}
                  className={styles.pageButton}
                >
                  Previous
                </button>

                <button
                  onClick={() => setPageNumber((prev) => prev + 1)}
                  disabled={!hasNext || fetchTransactionsMutation.isPending}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}