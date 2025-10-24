import { getLatestTransactions } from "@/lib/data";
import { TransactionListItem } from "@/components/TransactionListItem";

export function LatestTransactions() {
  const latestTransactions = getLatestTransactions();
  return (
    <section className="p-4">
      <h1 id="latest-heading" className="mb-2 text-2xl font-bold">
        Latest Transactions
      </h1>
      <ol
        className="bg-white rounded-xl divide-y divide-gray-200 py-2 px-4 ring-1 ring-block-outline ring-zinc-100"
        aria-label="Latest transactions"
      >
        {latestTransactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </ol>
    </section>
  );
}
