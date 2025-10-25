import Link from "next/link";
import { redirect } from "next/navigation";
import { getTransactionDetailData } from "@/lib/services";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  params: {
    id: string;
  };
}

export default async function TransactionDetailPage({ params }: Props) {
  const { id: transactionId } = await params;
  const data = getTransactionDetailData(transactionId);

  if (!data) {
    redirect("/transactions");
  }

  const { transaction, formattedAmount, formattedDate, status } = data;

  return (
    <main className="py-4">
      <Link href="/transactions" className="py-4 pr-4 text-link-primary">
        <span className="sr-only">Back</span>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="lg"
          color="currentColor"
          aria-hidden="true"
        />
      </Link>
      <div className="p-4 mb-2 text-center">
        <div className="mb-2 text-6xl font-bold">{formattedAmount}</div>
        <div className="text-text-secondary font-medium">
          {transaction.name}
        </div>
        <div className="text-text-secondary font-medium">{formattedDate}</div>
      </div>
      <div className="p-4">
        <div className="bg-foreground-primary rounded-xl p-4 ring-1 ring-border-primary/20">
          <div className="mb-4">
            <p className="font-bold">Status: {status}</p>
            <p className="text-text-secondary">{transaction.description}</p>
            {transaction.authorizedUser && (
              <p className="text-text-secondary">
                Authorized User: {transaction.authorizedUser}
              </p>
            )}
          </div>
          <div className="flex justify-between border-t border-border-primary pt-3 font-semibold">
            <dt>Total</dt>
            <dd>{formattedAmount}</dd>
          </div>
        </div>
      </div>
    </main>
  );
}
