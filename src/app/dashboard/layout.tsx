"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        async function checkAuthentication() {
            const token = localStorage.getItem("mariver_token");

            if (!token) {
                localStorage.removeItem("mariver_user");
                router.replace("/login");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:8080/api/accounts/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    localStorage.removeItem("mariver_token");
                    localStorage.removeItem("mariver_user");
                    router.replace("/login");
                    return;
                }

                setIsCheckingAuth(false);
            } catch {
                // Don't treat a network/server failure as "logged out"
                setIsCheckingAuth(false);
            }
        }

        checkAuthentication();
    }, [router]);

    if (isCheckingAuth) {
        return null;
    }

    return <>{children}</>;
}