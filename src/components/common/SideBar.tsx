import {
  ArrowLeftRight,
  LayoutDashboard,
  LogOut,
  Receipt,
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Bills", href: "/bills", icon: Receipt },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-16 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="flex h-full flex-col items-center gap-6 py-6">

        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}

        <div className="mt-auto">
          <Link
            href="/"
            title="Logout"
            className="block rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
          </Link>
        </div>

      </div>
    </aside>
  );
}