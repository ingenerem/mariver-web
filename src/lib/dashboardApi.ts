export default async function getDashboardStats() {

     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load account");
                }
                return response.json();
}