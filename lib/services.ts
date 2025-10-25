import {
  getTransactionById,
  getWalletSummary,
  getLatestTransactions,
} from "@/lib/data";
import {
  formatAmountForType,
  formatFriendlyDate,
  formatCurrency,
} from "@/lib/format";
import { calculateDailyPoints, formatPointsShort } from "@/lib/points";
import { getDarkColorForSeed } from "@/lib/colors";
import { getTransactionIcon } from "@/lib/icons";
import type { Transaction } from "@/lib/types";

export function getTransactionDetailData(transactionId: string) {
  const transaction = getTransactionById(transactionId);

  if (!transaction) {
    return null;
  }

  const formattedAmount = formatAmountForType(
    transaction.amount,
    transaction.type
  );
  const formattedDate = new Date(transaction.date).toLocaleString("en-US", {
    minute: "2-digit",
    hour: "numeric",
    day: "numeric",
    month: "numeric",
    year: "2-digit",
    hour12: false,
  });
  const status = transaction.pending ? "Pending" : "Approved";

  return {
    transaction,
    formattedAmount,
    formattedDate,
    status,
  };
}

export function getSummaryBlocksData() {
  const walletSummary = getWalletSummary();
  const today = new Date();
  const todayPoints = calculateDailyPoints(today);
  const currentMonth = today.toLocaleString("en-US", {
    month: "long",
  });
  const formattedBalance = formatCurrency(walletSummary.balance);
  const formattedAvailable = formatCurrency(walletSummary.available);
  const formattedPoints = formatPointsShort(todayPoints);

  return {
    formattedBalance,
    formattedAvailable,
    formattedPoints,
    currentMonth,
  };
}

export function getLatestTransactionsData() {
  const transactions = getLatestTransactions();

  return {
    transactions,
  };
}

export function getTransactionListItemData(transaction: Transaction) {
  const iconBackgroundColor = getDarkColorForSeed(transaction.id);
  const icon = getTransactionIcon(transaction.icon);
  const formattedAmount = formatAmountForType(
    transaction.amount,
    transaction.type
  );
  const formattedDate = formatFriendlyDate(transaction.date);

  return {
    iconBackgroundColor,
    icon,
    formattedAmount,
    formattedDate,
  };
}
