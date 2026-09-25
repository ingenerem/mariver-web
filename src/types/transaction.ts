export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionStatus = "POSTED" | "DELETED";

export type TransactionSource = "INCOME" | "SPENDING" | "BILL";

export interface TransactionRequest {
  amount: number;
  type: TransactionType;
  description?: string;
  category: string;
  transactionSource: string;
  transactionDate: string;
}

export interface TransactionResponse {
  id: number;
  amount: number;
  type: TransactionType;
  description?: string;
  category: string;
  transactionSource: string;
  transactionDate: string;
  status: TransactionStatus;
  createdAt: string;
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