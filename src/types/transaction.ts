export type TransactionType = "INFLOW" | "OUTFLOW";

export type TransactionStatus = "POSTED" | "DELETED";

export type TransactionSource = "INCOME" | "SPENDING" | "BILL";

export interface TransactionRequest {
  name: string;
  amount: number;
  type: TransactionType;
  description?: string;
  category: string;
  transactionSource: string;
  transactionDate: string;
}

export interface TransactionResponse {
  id: number;
  name:string;
  amount: number;
  type: TransactionType;
  description?: string;
  category: string;
  transactionSource: string;
  transactionDate: string;
  status: TransactionStatus;
  createdAt: string;
  autoPaid: boolean;
}

export interface SpendingCategoryTotal {
  category: string;
  totalAmount: number;
}

export interface TransactionSummaryResponse {
  totalIncome: number;
  totalExpenses: number;
  totalBillExpenses: number;
  totalOtherExpenses: number;
  topSpendingCategory: SpendingCategoryTotal | null;
  topBillCategory: SpendingCategoryTotal | null;

}