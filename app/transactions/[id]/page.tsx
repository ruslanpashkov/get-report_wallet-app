import Link from "next/link";
import { redirect } from "next/navigation";
import { getTransactionById } from "@/lib/data";
import { formatAmountForType } from "@/lib/format";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  params: {
    id: string;
  };
}

export default async function TransactionDetailPage({ params }: Props) {
  const { id: transactionId } = await params;
  const transaction = getTransactionById(transactionId);
  if (!transaction) {
    redirect("/transactions");
  }
  return (
    <main className="py-4">
      <Link href="/transactions" className="py-4 pr-4 text-blue-500">
        <span className="sr-only">Back</span>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="currentColor"
          aria-hidden="true"
        />
      </Link>
      <div className="p-4 mb-6 text-center">
        <div className="py-4 text-5xl font-bold">
          {formatAmountForType(transaction.amount, transaction.type)}
        </div>
        <div className="text-zinc-500 font-medium">{transaction.name}</div>
        <div className="text-zinc-500 font-medium">
          {new Date(transaction.date).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 ring-1 ring-zinc-100">
          <dl className="grid grid-cols-1 gap-3">
            <div className="font-bold">
              <dt>Status:</dt>
              <dd>{transaction.pending ? "Pending" : "Approved"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Description</dt>
              <dd>{transaction.description}</dd>
            </div>
            {transaction.authorizedUser && (
              <div>
                <dt className="text-zinc-500">Authorized User</dt>
                <dd>{transaction.authorizedUser}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-zinc-200 pt-3 font-semibold">
              <dt>Total</dt>
              <dd>
                {formatAmountForType(transaction.amount, transaction.type)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
