export type Fund = {
  id: number;
  name: string;
  balance: number;
  availableBalance: number;
  createdAt: string;
};

export type FundRequest = {
  name: string;
};

export type FundAmountRequest = {
  amount: number;
};