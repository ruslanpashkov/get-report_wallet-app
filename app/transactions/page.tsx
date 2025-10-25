import { SummaryBlocks } from "@/components/SummaryBlocks";
import { LatestTransactions } from "@/components/LatestTransactions";

export const dynamic = "force-dynamic";

export default function TransactionsListPage() {
  return (
    <main className="py-4" aria-labelledby="latest-heading">
      <SummaryBlocks />
      <LatestTransactions />
    </main>
  );
}
