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
                    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/me`,
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