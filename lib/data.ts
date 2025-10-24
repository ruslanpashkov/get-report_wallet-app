import transactions from "@/data/transactions.json";
import { LATEST_TRANSACTIONS_LIMIT, MAX_CARD_LIMIT_USD } from "@/lib/constants";
import { roundToCents } from "@/lib/format";
import type { Transaction, WalletSummary } from "@/lib/types";

export function getLatestTransactions(
  limit: number = LATEST_TRANSACTIONS_LIMIT
): Transaction[] {
  const transactionsArray = transactions as Transaction[];
  const sortedByNewestFirst = transactionsArray
    .slice()
    .sort((left, right) => +new Date(right.date) - +new Date(left.date));
  const latestTransactions = sortedByNewestFirst.slice(0, limit);
  return latestTransactions;
}

export function getTransactionById(
  transactionId: string
): Transaction | undefined {
  const transactionsArray = transactions as Transaction[];
  return transactionsArray.find((candidate) => candidate.id === transactionId);
}

export function getWalletSummary(): WalletSummary {
  const creditLimitUsd = MAX_CARD_LIMIT_USD;
  const randomBalanceBetweenZeroAndLimit = Math.random() * creditLimitUsd;
  const roundedBalanceToCents = roundToCents(randomBalanceBetweenZeroAndLimit);
  const computedAvailable = Math.max(
    0,
    roundToCents(creditLimitUsd - roundedBalanceToCents)
  );
  return {
    limit: creditLimitUsd,
    balance: roundedBalanceToCents,
    available: computedAvailable,
  };
}
