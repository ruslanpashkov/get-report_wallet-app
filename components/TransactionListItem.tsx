import Link from "next/link";
import { formatAmountForType, formatFriendlyDate } from "@/lib/format";
import { getDarkBgClassForSeed } from "@/lib/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faClock,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import type { Transaction } from "@/lib/types";

interface Props {
  transaction: Transaction;
}

export function TransactionListItem({ transaction }: Props) {
  const iconBackgroundClass = getDarkBgClassForSeed(transaction.id);

  return (
    <li className="relative flex items-center gap-3 py-2 w-full focus-within:bg-zinc-50 transition-colors duration-200">
      <div
        className={`${iconBackgroundClass} size-12 flex items-center justify-center shrink-0 rounded-sm text-white ring-1 ring-zinc-200`}
      >
        <FontAwesomeIcon
          icon={transaction.pending ? faClock : faCreditCard}
          size="xl"
          aria-hidden="true"
        />
      </div>
      <div className="flex-1 truncate leading-5">
        <div className="flex items-center justify-between gap-2 text-lg leading-6">
          <h2 className="truncate font-semibold">{transaction.name}</h2>
          <span className="shrink-0 font-medium">
            {formatAmountForType(transaction.amount, transaction.type)}
          </span>
        </div>
        <p className="truncate text-zinc-500">
          {transaction.pending && "Pending –"} {transaction.description}
        </p>
        <p className="text-zinc-500">
          {transaction.authorizedUser && `${transaction.authorizedUser} –`}{" "}
          {formatFriendlyDate(transaction.date)}
        </p>
      </div>
      <Link
        href={`/transactions/${transaction.id}`}
        className="self-start text-zinc-500 focus-visible:outline-none before:content-[''] before:absolute before:inset-0 focus-visible:before:rounded-xs focus-visible:before:outline-2 focus-visible:before:outline-blue-700 focus-visible:before:outline-offset-2"
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
