import { DEFAULT_CURRENCY, MS_IN_DAY, DAYS_IN_WEEK } from "@/lib/constants";
import type { TransactionType } from "@/lib/types";

export function roundToCents(amountInUnits: number): number {
  const cents = 100;
  return Math.round(amountInUnits * cents) / cents;
}

export function formatCurrency(amountInUnits: number): string {
  const isNegative = amountInUnits < 0;
  const absoluteValue = Math.abs(amountInUnits);
  const formattedAbsoluteValue = absoluteValue.toLocaleString(undefined, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
    minimumFractionDigits: 2,
  });
  return isNegative ? `-${formattedAbsoluteValue}` : formattedAbsoluteValue;
}

export function formatAmountForType(
  amount: number,
  type: TransactionType
): string {
  const prefix = type === "Payment" ? "+" : "";
  return `${prefix}${formatCurrency(amount)}`;
}

export function formatFriendlyDate(dateIsoString: string): string {
  const date = new Date(dateIsoString);
  const today = new Date();
  const differenceInDays = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      MS_IN_DAY
  );
  const withinLastWeekExclusive = differenceInDays < DAYS_IN_WEEK;
  if (withinLastWeekExclusive) {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }
  return date.toLocaleDateString();
}
