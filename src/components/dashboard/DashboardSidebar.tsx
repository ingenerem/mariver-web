import { ArrowLeftRight, BarChart3, CalendarDays, LayoutDashboard, LogOut, PiggyBank, Receipt, Settings, Target } from "lucide-react";
import Link from "next/link";
import MariverLogo from "../layout/MariverLogo";


const sidebarItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Pay periods",
        href: "/dashboard/pay-periods",
        icon: CalendarDays,
    },
    {
        label: "Bills",
        href: "/dashboard/bills",
        icon: Receipt,
    },
    {
        label: "Transactions",
        href: "/dashboard/transactions",
        icon: ArrowLeftRight,
    },
    {
        label: "Savings",
        href: "/dashboard/savings",
        icon: PiggyBank,
    },
    {
        label: "Goals",
        href: "/dashboard/goals",
        icon: Target,
    },
    {
        label: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function DashboardSidebar() {
    return (
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
            <MariverLogo />
            <nav className="flex flex-col gap-2 mt-6">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                <div className="mt-auto border-t border-slate-300 pt-4">
                    <Link href="/" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </nav>


        </aside>
    );
}