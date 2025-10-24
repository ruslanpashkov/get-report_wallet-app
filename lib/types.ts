export type Season = "spring" | "summer" | "autumn" | "winter";

export type TransactionType = "Payment" | "Credit";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  date: string; // ISO string
  pending?: boolean;
  authorizedUser?: string;
}

export interface WalletSummary {
  limit: number;
  balance: number;
  available: number;
}
