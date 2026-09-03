export default async function getDashboardStats() {

     const response = await fetch("http://localhost:8080/api/dashboard/summary", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load account");
                }
                return response.json();
}