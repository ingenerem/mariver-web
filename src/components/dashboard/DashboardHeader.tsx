"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateFormat";
import { formatPayPeriod, getCurrentPayPeriod } from "@/utils/payPeriod";

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

type StoredUser = {
  displayName?: string;
  email?: string;
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const todayDate = formatDate(new Date());
  const [user, setUser] = useState<StoredUser | null>(null);

  const payFrequency = "semi-monthly";

  const currentPayPeriod = getCurrentPayPeriod(
    new Date(),
    payFrequency
  );

  const incomePeriodText = formatPayPeriod(
    currentPayPeriod.start,
    currentPayPeriod.end
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("mariver_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="flex items-start gap-4">
      <div className="flex items-start gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-xl text-slate-700 sm:h-10 sm:w-10 sm:text-2xl lg:hidden"
        >
          ☰
        </button>
      </div>

      <div className="flex-1 text-xl font-bold text-slate-950 sm:text-2xl">
        <h1>Hello {user?.displayName ?? "there"}</h1>

        <p className="mt-1 text-xs text-slate-600/60 sm:text-sm">
          Here’s your financial overview for today.
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-5">

      

        <p className="mt-1 text-xs text-slate-500">
          Current active pay period {incomePeriodText}
        </p>
        <button className="text-base sm:text-lg">🔔</button>

        <span className="text-xs sm:text-sm">📅 {todayDate}</span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
          MA
        </div>
      </div>
    </header>
  );
}