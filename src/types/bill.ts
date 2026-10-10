export type BillRequest = {
  name: string;
  amount: number;
  category: string;
  intervalValue: number;
  intervalUnit: string;
  startDate: string;
  autoPay: boolean;
  paymentType: string;
};

export type BillResponse = {
  id: number;
  billName: string;
  category: string;
  estimatedAmount: number;
  actualAmount: number | null;
  dueDate: string;
  paid: boolean;
  paidDate: string | null;
  paymentType: string;
  autoPay: boolean;
};

export type BillDetailsResponse = {
  id: number;
  name: string;
  category: string;
  amount: number;
  active: boolean;
  schedule: {
    intervalValue: number;
    intervalUnit: string;
    autoPay: boolean;
  };
  paymentType: string;
}

export type UpdateBillRequest = {
    name: string;
    amount: number;
    category: string;
    intervalValue: number;
    intervalUnit: string;
    startDate: string;
    autoPay: boolean;
    paymentType: string;
};