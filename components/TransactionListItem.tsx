import Link from "next/link";
import { getTransactionListItemData } from "@/lib/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { Transaction } from "@/lib/types";

interface Props {
  transaction: Transaction;
}

export function TransactionListItem({ transaction }: Props) {
  const { iconBackgroundColor, icon, formattedAmount, formattedDate } =
    getTransactionListItemData(transaction);

  return (
    <li className="relative flex items-center gap-3 py-2 w-full focus-within:bg-surface-primary/20 transition-colors duration-200">
      <div
        className="size-12 flex items-center justify-center shrink-0 rounded-sm text-foreground-primary ring-1 ring-border-primary"
        style={{ backgroundColor: iconBackgroundColor }}
      >
        <FontAwesomeIcon icon={icon} size="xl" aria-hidden="true" />
      </div>
      <div className="flex-1 truncate leading-5">
        <div className="flex items-center justify-between gap-2 text-lg leading-6">
          <h2 className="truncate font-semibold">{transaction.name}</h2>
          <span className="shrink-0 font-medium">{formattedAmount}</span>
        </div>
        <p className="truncate text-text-secondary">
          {transaction.pending && "Pending –"} {transaction.description}
        </p>
        <p className="text-text-secondary">
          {transaction.authorizedUser && `${transaction.authorizedUser} –`}{" "}
          {formattedDate}
        </p>
      </div>
      <Link
        href={`/transactions/${transaction.id}`}
        className="self-start text-link-secondary focus-visible:outline-none before:content-[''] before:absolute before:inset-0 focus-visible:before:rounded-xs focus-visible:before:outline-2 focus-visible:before:outline-link-primary focus-visible:before:outline-offset-2"
      >
        <span className="sr-only">Transaction details</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          color="currentColor"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
