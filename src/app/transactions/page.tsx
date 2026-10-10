"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/SideBar";
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    ReceiptText,
    Trash2,
    WalletCards,
} from "lucide-react";
import { TransactionResponse } from "@/types/transaction";
import { getMonthlyTransactions, reverseTransaction } from "@/lib/transactionApi";


export default function TransactionsPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [transactions, setTransaction] = useState<TransactionResponse[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const previousMonth = () => { setSelectedMonth(current => new Date(current.getFullYear(), current.getMonth() - 1, 1)); };
    const nextMonth = () => { setSelectedMonth(current => new Date(current.getFullYear(), current.getMonth() + 1, 1)); };

    const [transactionToReverse, setTransactionToReverse] = useState<number | null>(null);
    const [reverseReason, setReverseReason] = useState("");
    const [reverseError, setReverseError] = useState("");

    const loadTransactions = async () => {

        console.log("aheemmm")
        try {
            const response = await getMonthlyTransactions(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1);
            setTransaction(response);
        } catch (error) {
            console.error("Failed to load bills:", error);
        }
    };


    const handleReverseTransaction = async () => {
        if (transactionToReverse === null) return;

        try {
            setReverseError("");

            await reverseTransaction(transactionToReverse, reverseReason.trim());

            await loadTransactions();

            setTransactionToReverse(null);
            setReverseReason("");
        } catch (error) {
            setReverseError(
                error instanceof Error
                    ? error.message
                    : "Failed to reverse transaction."
            );
        }
    };

    useEffect(() => {
        loadTransactions();
    }, [selectedMonth]);

    return (
       <main className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">

            {/* Desktop sidebar */}
            <aside className="sticky top-0 z-30 hidden h-screen w-16 shrink-0 border-r border-slate-200 bg-white md:block">
                <Sidebar />
            </aside>

            {/* Mobile sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <aside className="relative h-full w-16 bg-white shadow-xl">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute right-1 top-1 text-xl text-slate-600"
                        >
                            ×
                        </button>

                        <Sidebar />
                    </aside>
                </div>
            )}

            {/* Main page */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">

                <Header
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-6 md:px-5 md:py-8">

                    {/* Page heading */}
                    <div className="mb-7 flex flex-wrap items-end justify-center gap-4">

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <WalletCards className="h-5 w-5" />
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Transactions
                                </h1>
                            </div>

                            <p className="text-sm text-slate-500">
                                Everything that moved your Mariver balance.
                            </p>
                        </div>

                        {/* Month selector */}
                        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedMonth(current =>
                                        new Date(current.getFullYear(), current.getMonth() + 1, 1)
                                    )

                                }
                                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="min-w-32 px-3 text-center text-sm font-semibold text-slate-700">
                                {selectedMonth.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>

                            <button
                                type="button"

                                onClick={() =>
                                    setSelectedMonth(current =>
                                        new Date(current.getFullYear(), current.getMonth() - 1, 1)
                                    )
                                }
                                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>

                        </div>
                    </div>

                    {/* Transactions card */}
                    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        {/* Card heading */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    October activity
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Income, spending and bill payments in one place.
                                </p>
                            </div>

                            <ReceiptText className="h-5 w-5 text-slate-300" />

                        </div>

                        <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
                            <table className="w-full text-left text-sm">

                                <thead className="sticky top-0 z-10 bg-slate-50">
                                    <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-4">Transaction</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Source</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {transactions.map((transaction) => {

                                        const isIncome =
                                            transaction.type === "INFLOW";

                                        return (
                                            <tr
                                                key={transaction.id}
                                                className="group transition hover:bg-blue-50/30"
                                            >

                                                {/* Transaction */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`
                                                                flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                                                ${isIncome
                                                                    ? "bg-emerald-50 text-emerald-600"
                                                                    : "bg-orange-50 text-orange-500"
                                                                }
                                                            `}
                                                        >
                                                            {isIncome ? (
                                                                <ArrowDownLeft className="h-5 w-5" />
                                                            ) : (
                                                                <ArrowUpRight className="h-5 w-5" />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {transaction.name}
                                                            </p>

                                                            <p className="mt-0.5 text-xs text-slate-400">
                                                                {isIncome
                                                                    ? "Money in"
                                                                    : "Money out"}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
                                                        {transaction.category}
                                                    </span>
                                                </td>

                                                {/* Source */}
                                                {/* Source */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col items-start gap-1.5">

                                                        {transaction.transactionSource === "INCOME" && (
                                                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                                                                Income
                                                            </span>
                                                        )}

                                                        {transaction.transactionSource === "BILL" && (
                                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                                Bill
                                                            </span>
                                                        )}

                                                        {transaction.transactionSource === "SPENDING" && (
                                                            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                                                                Spending
                                                            </span>
                                                        )}

                                                        {transaction.autoPaid && (
                                                            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                Auto-paid
                                                            </span>
                                                        )}

                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-4 text-slate-500">
                                                    {transaction.transactionDate}
                                                </td>

                                                {/* Amount */}
                                                <td
                                                    className={`
                                                        px-6 py-4 text-right font-bold
                                                        ${isIncome
                                                            ? "text-emerald-600"
                                                            : "text-slate-800"
                                                        }
                                                    `}
                                                >
                                                    {isIncome ? "+" : "−"}$
                                                    {transaction.amount.toFixed(2)}
                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-4 text-right">


                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setTransactionToReverse(transaction.id);
                                                            setReverseReason("");
                                                            setReverseError("");
                                                        }}
                                                        className="
                                                                inline-flex items-center gap-1.5
                                                                rounded-xl border border-slate-200
                                                                bg-white px-3 py-2
                                                                text-xs font-medium text-slate-500
                                                                shadow-sm transition
                                                                hover:border-red-200
                                                                hover:bg-red-50
                                                                hover:text-red-600
                                                            "
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </button>


                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>
                        </div>

                    </section>

                    {transactionToReverse !== null && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Reverse transaction?
                                </h2>

                                <p className="mt-2 text-sm text-slate-600">
                                    This will reverse the transaction and update your account balance
                                    and financial totals. If it's a bill payment, the bill will
                                    become unpaid again.
                                </p>

                                <textarea
                                    value={reverseReason}
                                    onChange={(e) => {
                                        setReverseReason(e.target.value);
                                        setReverseError("");
                                    }}
                                    placeholder="Reason for reversal"
                                    className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                />

                                {reverseError && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {reverseError}
                                    </p>
                                )}

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTransactionToReverse(null);
                                            setReverseReason("");
                                            setReverseError("");
                                        }}
                                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReverseTransaction}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        Reverse
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </main>
    );
}