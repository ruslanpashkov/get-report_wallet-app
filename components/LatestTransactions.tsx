import { TransactionListItem } from "@/components/TransactionListItem";
import { getLatestTransactionsData } from "@/lib/services";

export function LatestTransactions() {
  const { transactions: latestTransactions } = getLatestTransactionsData();

  return (
    <section className="p-4">
      <h1 id="latest-heading" className="mb-2 text-2xl font-bold">
        Latest Transactions
      </h1>
      <ol
        className="bg-foreground-primary rounded-xl divide-y divide-border-primary px-4 ring-1 ring-block-outline ring-border-primary/20"
        aria-label="Latest transactions"
      >
        {latestTransactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </ol>
    </section>
  );
}
