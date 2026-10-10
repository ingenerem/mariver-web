
import type { BillRequest, UpdateBillRequest } from "@/types/bill";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


function mapBillRequest(bill: BillRequest) {
  return {
    name: bill.name,
    amount: bill.amount,
    category: bill.category,
    intervalValue: bill.intervalValue,
    intervalUnit: bill.intervalUnit,
    startDate: bill.startDate,
    autoPay: bill.autoPay,
    paymentType: bill.paymentType,
  };
}


export async function createBill(bill: BillRequest) {
  const response = await fetch(`${API_BASE_URL}/api/bills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    },
    body: JSON.stringify(bill),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create bill");
  }

  return response.json();
}

export async function createBills(bills: BillRequest[]) {
  const response = await fetch(`${API_BASE_URL}/api/bills/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    },
    body: JSON.stringify(bills.map(mapBillRequest)),
  });
 

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to create bills");
  }


  return response;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getUpcomingBills() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/bill_record`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bills");
    }

    return response.json();
}

export async function getPaidBills() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/bill_record/paid`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bills");
    }

    return response.json();
}

export async function getOverdueBills() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/bill_record/overdue`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bills");
    }

    return response.json();
}


export async function payBill(billId: number, paidDate:string, amount:number) {
  const response = await fetch(`${API_BASE_URL}/api/bill_record/${billId}/${paidDate}/${amount}/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to pay bill");
  }

  return response;
}


export async function syncDashboard() {
  const response = await fetch(`${API_BASE_URL}/api/bill_record/sync`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to pay bill");
  }

  return response;
}

export async function processAutoPay(){
    const response = await fetch(`${API_BASE_URL}/api/bill_record/autoPay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to pay bill");
  }

  return response;
}


export async function getAllBills() {
    const token = localStorage.getItem("token");


    const response = await fetch(`${API_BASE_URL}/api/bills/allBills`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bills");
    }

    return response.json();
}

export async function deactivateBill(billId: number): Promise<void> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bills/${billId}/deactivate`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to deactivate bill");
    }
}

export async function updateBill(
    billId: number,
    request: UpdateBillRequest
): Promise<void> {
  console.log(request," meeeeeeeeeeee")
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bills/${billId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update bill");
    }
}