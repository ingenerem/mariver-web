import type {
  TransactionRequest,
  TransactionResponse,
  TransactionSummaryResponse,
} from "@/types/transaction";

const API_BASE_URL = "http://localhost:8080";


export async function createTransactions(
  transactions: TransactionRequest[]
): Promise<string> {

  const response = await fetch(`${API_BASE_URL}/api/transactions/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    },
    body: JSON.stringify(transactions),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create transactions");
  }

  return response.text();
}


export async function getTransactions(): Promise<TransactionResponse[]> {

  const response = await fetch(`${API_BASE_URL}/api/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    },
  });

  if (!response.ok) {
   
    throw new Error("Failed to retrieve transactions");
  }

    const data: TransactionResponse[] = await response.json();

  console.log("Transactions response:", data);

  return data;
}


export async function getTransactionSummary():Promise<TransactionSummaryResponse>
 {

  const response = await fetch(`${API_BASE_URL}/api/transactions/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    },
   });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to load transaction summary");
  }

   const data: TransactionSummaryResponse  = await response.json();

  console.log("Transactions response:", data);

  return data;

}