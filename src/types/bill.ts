export type BillRequest = {
    name: string;
    amount: number;
    category: string;
    intervalValue: number;
    intervalUnit: string;
    dueDay: number;
    dueMonth: number | null;
};


export type BillResponse = {
  id: number;
  billName: string;
  category: string;
  actualAmount: number;
  dueDay: number;
  recordMonth: number,
  recordYear: number,
  paidAt: string | null;
}