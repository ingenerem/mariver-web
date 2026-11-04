import type {
    Fund,
    FundRequest,
    FundAmountRequest,
} from "@/types/fund";

// Use your existing API base URL and token helper
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFunds(): Promise<Fund[]> {
  

    const response = await fetch(`${API_URL}/api/funds`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to retrieve funds");
    }

    return response.json();
}

export async function createFund(
    request: FundRequest
): Promise<Fund> {

    const response = await fetch(`${API_URL}/api/funds`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("Failed to create fund");
    }

    return response.json();
}

export async function allocateFund(
    fundId: number,
    request: FundAmountRequest
): Promise<Fund> {

    const response = await fetch(
        `${API_URL}/api/funds/${fundId}/allocate`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to allocate money to fund");
    }

    return response.json();
}

export async function releaseFund(
    fundId: number,
    request: FundAmountRequest
): Promise<Fund> {

    const response = await fetch(
        `${API_URL}/api/funds/${fundId}/release`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to release money from fund");
    }

    return response.json();
}