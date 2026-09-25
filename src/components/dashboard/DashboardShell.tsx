"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import StartingBalanceModal from "@/components/dashboard/StartingBalanceModal"
import BillsModal from "@/components/bills/BillsModal";
import SpendingModal from "@/components/spendings/SpendingModal";
import IncomeModal from "@/components/income/IncomeModal"
import { getUpcomingBills, payBill, getPaidBills, getOverdueBills } from "@/lib/billApi";
import { formatDueDate } from "@/utils/dateFormat";
import { BillResponse } from "@/types/bill";
import getDashboardStats from "@/lib/dashboardApi"
import { TransactionResponse, TransactionSummaryResponse } from "@/types/transaction";
import { getTransactions, getTransactionSummary } from "@/lib/transactionApi";
import { formatDate } from "@/utils/dateFormat";
import { CalendarDays, ChartPie, CircleCheckBig, HandCoins, ReceiptText, RefreshCw, TrendingDown, TrendingUp, WalletCards } from "lucide-react";

export default function DashboardShell() {

    const currentMonth = new Date().toLocaleString("default", { month: "long", });

    type DashboardStats = {
        currentBalance: number;
        protectedBills: number;
        emergencyFund: number,
        spendableAmount: number;
        otherSavings: number;
    };

    const [stats, setDashBoardStats] = useState<DashboardStats>({
        currentBalance: 0,
        protectedBills: 0,
        spendableAmount: 0,
        emergencyFund: 0,
        otherSavings: 0,
    });

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



    // Controls whether the starting balance modal is open or closed.
    const [isStartingBalanceModalOpen, setIsStartingBalanceModalOpen] =
        useState(false);

    // Controls whether the preset bills modal is open or closed.
    const [isBillsModalOpen, setIsBillsModalOpen] = useState(false);

    // Controls whether the Spendings modal is open or closed.
    const [isSpendingsModalOpen, setIsSpendingsModalOpen] = useState(false);

    // Controls whether the Income modal is open or closed.
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

    const [isLoadingAccount, setIsLoadingAccount] = useState(true);


    const [bills, setBills] = useState<BillResponse[]>([]);
    const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
    const [paidBills, setPaidBills] = useState<BillResponse[]>([]);
    const [overDueBills, setOverDueBills] = useState<BillResponse[]>([]);
    const [isLoadingBills, setIsLoadingBills] = useState(false);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
    const [transactionSummary, setTransactionSummary] = useState<TransactionSummaryResponse | null>(null);


    const handleMarkAsPaid = async (billId: number) => {

        try {
            // Used for the to show the user when the bills are still loading

            await payBill(billId);
            await Promise.all([
                await loadDashboard()



            ]);


        } catch (error) {
            console.error("Failed to pay bill:", error);
        }
    };

    // Loads saved balance from the browser when the dashboard first opens.
    useEffect(() => {
        async function loadAccount() {
            try {
                setIsLoadingAccount(true);



                const dashboardData = await getDashboardStats()
                setDashBoardStats(dashboardData)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingAccount(false);
            }
        }

        loadAccount();
    }, []);


    const loadDashboard = async () => {
        try {
            const [
                upcoming,
                overdue,
                paid,
                stats,
                transactions,
                transactionSummary

            ] = await Promise.all([
                getUpcomingBills(),
                getOverdueBills(),
                getPaidBills(),
                getDashboardStats(),
                getTransactions(),
                getTransactionSummary(),

            ]);

            setBills(upcoming);
            setOverDueBills(overdue);
            setPaidBills(paid);
            setDashBoardStats(stats);
            setTransactions(transactions);
            setTransactionSummary(transactionSummary);


        } catch (error) {
            console.error("Failed to load dashboard:", error);
        }
    };

    function formatEnumLabel(value: string): string {
        return value
            .toLowerCase()
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }



    useEffect(() => {
        loadDashboard()
    }, []);



    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">

            {/* TODO: Re-enable sidebar when V1 navigation pages are implemented
            <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white md:block">
                <DashboardSidebar />
            </aside> 
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">

                    //dark background 
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    //actual sidebar container 
                    <aside className="relative h-full w-64 bg-white shadow-xl">

                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute right-4 top-4 text-xl text-slate-600"
                        >
                            ×
                        </button>

                        <DashboardSidebar />

                    </aside>

                </div>
            )}*/}






            <div className="flex-1 p-2">
                <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />


                <div className="mt-4 space-y-4">



                    <section>
                        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() => setIsIncomeModalOpen(true)}
                                    className="flex items-center gap-3 rounded-xl bg-green-50 px-5 py-3 text-left transition hover:bg-green-100"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xl font-semibold text-green-600">
                                        +
                                    </span>

                                    <div>
                                        <p className="font-medium text-slate-900">
                                            Add income
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Record income or payment
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setIsBillsModalOpen(true)}
                                    className="flex items-center gap-3 rounded-xl bg-blue-50 px-5 py-3 text-left transition hover:bg-blue-100"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-600">
                                        +
                                    </span>

                                    <div>
                                        <p className="font-medium text-slate-900">
                                            Add bill(s)
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Record recurring bills
                                        </p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setIsSpendingsModalOpen(true)}
                                    className="flex items-center gap-3 rounded-xl bg-orange-50 px-5 py-3 text-left transition hover:bg-orange-100"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xl font-semibold text-orange-600">
                                        +
                                    </span>

                                    <div>
                                        <p className="font-medium text-slate-900">
                                            Add spending
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Record an expense
                                        </p>
                                    </div>
                                </button>

                            </div>


                            {/*} <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-purple-500">⇄</span>
                                <span className="font-medium">Adjust income</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-pink-500">+</span>
                                <span className="font-medium">Future goal</span>
                            </button>*/}

                        </div>
                    </section>

                    {/* Desktop top cards*/}

                    <section className="hidden gap-4 lg:grid lg:grid-cols-3">
                        <DashboardCard
                            title="Current balance"
                            className="w-full justify-self-center p-3"
                        >
                            <button
                                type="button"
                                onClick={() => setIsStartingBalanceModalOpen(true)}
                                className="w-full text-left"
                            >
                                <div className="mt-3 border-t-4 border-green-500 pt-3">
                                    {isLoadingAccount ? (
                                        <p className="text-xl font-bold">Loading...</p>
                                    ) : stats.currentBalance === null ? (
                                        <>
                                            <p className="text-xl font-bold">Not set</p>
                                            <p className="mt-1 text-xs font-medium text-blue-600">
                                                Set starting balance
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <p className="text-2xl font-bold">
                                                    ${stats.currentBalance}
                                                </p>

                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                                                    <WalletCards className="h-5 w-5 text-green-600" />
                                                </div>
                                            </div>

                                            <p className="mt-1 text-xs text-green-600">
                                                Current active balance
                                            </p>

                                            <p className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-500">
                                                <RefreshCw className="h-3 w-3" />
                                                Adjust
                                            </p>
                                        </>
                                    )}
                                </div>
                            </button>
                        </DashboardCard>


                        <DashboardCard title="Total unpaid bills" className="max-w-[1500px] p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                {isLoadingAccount ? (
                                    <p className="text-xl font-bold">Loading...</p>
                                ) : stats.protectedBills === null ? (
                                    <p className="text-xl font-bold">No bills found</p>
                                ) : stats.protectedBills === 0 ? (
                                    <>
                                        <p className="text-xl font-semibold text-stale-400">
                                            All bills paid
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Nothing currently due
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.protectedBills}
                                        </p>

                                        <p className="mt-1 text-xs text-blue-600">
                                            Total unpaid bills
                                        </p>
                                    </>
                                )}
                            </div>
                        </DashboardCard>

                        <DashboardCard
                            title="Spendable money"
                            className="w-full justify-self-center p-3"
                        >
                            <div className="mt-3 border-t-4 border-blue-500 pt-3">
                                {isLoadingAccount ? (
                                    <p className="text-xl font-bold">Loading...</p>
                                ) : stats.spendableAmount === null ? (
                                    <p className="text-xl font-bold">$0</p>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-bold">
                                                ${stats.spendableAmount}
                                            </p>

                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                                                <HandCoins className="h-5 w-5 text-orange-600" />
                                            </div>
                                        </div>

                                        <p
                                            className={`mt-1 text-xs ${stats.spendableAmount < 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                                }`}
                                        >
                                            {stats.spendableAmount < 0
                                                ? `$${Math.abs(stats.spendableAmount)} beyond available funds`
                                                : "Available now"}
                                        </p>
                                    </>
                                )}
                            </div>
                        </DashboardCard>

                        {/*<DashboardCard title="Emergency fund" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                {isLoadingAccount ? (
                                    <>
                                        <p className="text-xl font-bold">Loading...</p>
                                    </>
                                ) : stats.emergencyFund === null ? (
                                    <>
                                        <p className="text-xl font-bold">$0</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.emergencyFund}
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Allocated fund
                                        </p>

                                    </>
                                )}
                            </div>
                        </DashboardCard> 

                        <DashboardCard title="Other savings" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                {isLoadingAccount ? (
                                    <>
                                        <p className="text-xl font-bold">Loading...</p>
                                    </>
                                ) : stats.otherSavings === null ? (
                                    <>
                                        <p className="text-xl font-bold">$0</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.otherSavings}
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Allocated fund
                                        </p>

                                    </>
                                )}
                            </div>
                        </DashboardCard>*/}


                    </section>

                    {/*Mobile view top cards */}

                    <section className="grid grid-cols-3 gap-4 mx-auto max-w-[1500px] lg:hidden">
                        <DashboardCard title="Current balance" className="max-w-[250px] p-3">
                            <button
                                type="button"

                                // Opens modal when card is clicked.
                                onClick={() => setIsStartingBalanceModalOpen(true)}

                                className="w-full text-left"
                            >
                                <div className="mt-3 border-t-4 border-green-500 pt-3">
                                    {stats.currentBalance === null ? (
                                        <>
                                            <p className="text-xl font-bold">Not set</p>

                                            <p


                                                // Opens the modal when clicked.
                                                onClick={() => setIsStartingBalanceModalOpen(true)}

                                                className="mt-1 text-xs font-medium text-blue-600 hover:underline"
                                            >
                                                Set starting balance
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-2xl font-bold">
                                                ${stats.currentBalance}
                                            </p>

                                            <p className="mt-1 text-xs text-green-600">
                                                Current active balance
                                            </p>
                                            <p className="text-xs font-medium text-slate-500">
                                                <span>⇄</span>
                                                Adjust
                                            </p>
                                        </>
                                    )}

                                </div>
                            </button>
                        </DashboardCard>

                        <DashboardCard title="Total unpaid bills" className="max-w-[1500px] p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                {isLoadingAccount ? (
                                    <p className="text-xl font-bold">Loading...</p>
                                ) : stats.protectedBills === null ? (
                                    <p className="text-xl font-bold">No bills found</p>
                                ) : stats.protectedBills === 0 ? (
                                    <>
                                        <p className="text-xl font-semibold text-stale-400">
                                            All bills paid
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Nothing currently due
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.protectedBills}
                                        </p>

                                        <p className="mt-1 text-xs text-blue-600">
                                            Total unpaid bills
                                        </p>
                                    </>
                                )}
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spendable money" className="max-w-[1500px] justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3">
                                {isLoadingAccount ? (
                                    <>
                                        <p className="text-xl font-bold">Loading...</p>
                                    </>
                                ) : stats.spendableAmount === null ? (
                                    <>
                                        <p className="text-xl font-bold">$0</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.spendableAmount}
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Available now
                                        </p>

                                    </>
                                )}
                            </div>
                        </DashboardCard>
                    </section>



                    {/*Mobile view bottom cards */}

                    {/*
                    <section className="grid grid-cols-2 gap-4 lg:hidden">

                        <DashboardCard title="Emergency fund" tittle_color="text-slate-800" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                {isLoadingAccount ? (
                                    <>
                                        <p className="text-xl font-bold">Loading...</p>
                                    </>
                                ) : stats.emergencyFund === null ? (
                                    <>
                                        <p className="text-xl font-bold">$0</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.emergencyFund}
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Allocated fund
                                        </p>

                                    </>
                                )}
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings" tittle_color="text-slate-800" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                {isLoadingAccount ? (
                                    <>
                                        <p className="text-xl font-bold">Loading...</p>
                                    </>
                                ) : stats.otherSavings === null ? (
                                    <>
                                        <p className="text-xl font-bold">$0</p>

                                    </>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold">
                                            ${stats.otherSavings}
                                        </p>

                                        <p className="mt-1 text-xs text-green-600">
                                            Allocated fund
                                        </p>

                                    </>
                                )}
                            </div>
                        </DashboardCard>
                    </section> */}


                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                        <DashboardCard
                            title="Recent transactions"
                            tittle_color="text-green-700"
                            subtitle={`(${currentMonth})`}
                            className="w-full justify-self-center p-3"
                        >
                            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1 text-sm">
                                {isLoadingAccount ? (
                                    <p className="text-sm text-slate-500">
                                        Loading...
                                    </p>
                                ) : transactions.length === 0 ? (
                                    <div className="flex min-h-24 flex-col items-center justify-center text-center">
                                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                                            <ReceiptText className="h-5 w-5 text-slate-500" />
                                        </div>

                                        <p className="text-sm font-medium text-slate-700">
                                            No transactions yet
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Add income or spending to see your activity here.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {transactions.map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 p-2"
                                            >
                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {transaction.category}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {transaction.transactionDate}
                                                        {" • "}
                                                        {transaction.transactionSource === "SPENDING"
                                                            ? "Spending"
                                                            : transaction.transactionSource === "BILL"
                                                                ? "Bill"
                                                                : "Income"}
                                                        {" • "}
                                                        {transaction.category}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p
                                                        className={`font-semibold ${transaction.type === "INCOME"
                                                                ? "text-green-600"
                                                                : "text-orange-600"
                                                            }`}
                                                    >
                                                        ${transaction.amount.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </DashboardCard>


                        <DashboardCard
                            title="Upcoming Bills"
                            subtitle={`(${currentMonth})`}
                            tittle_color="text-blue-700"
                            className="w-full justify-self-center p-3">
                            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
                                {bills.length === 0 ? (
                                    <div className="flex min-h-24 flex-col items-center justify-center text-center">
                                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-600">
                                            📅
                                        </div>

                                        <p className="text-sm font-medium text-slate-700">
                                            No upcoming bills
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Add a bill to keep track of upcoming payments.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {bills.map((bill) => (
                                            <div
                                                key={bill.id}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 p-2"
                                            >


                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {bill.billName}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {bill.category} • Due {formatDueDate(bill.dueDay, bill.recordMonth, bill.recordYear)}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold text-slate-900">
                                                        ${bill.actualAmount.toFixed(2)}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkAsPaid(bill.id)}
                                                        className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>

                        </DashboardCard>

                        <DashboardCard title="Over due bills" tittle_color="text-red-700" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1 text-sm">
                                {isLoadingBills ? (
                                    <p className="text-sm text-slate-500">Loading bills...</p>
                                ) : overDueBills.length === 0 ? (
                                    <div className="flex min-h-24 flex-col items-center justify-center text-center">
                                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                            <CircleCheckBig className="h-5 w-5 text-red-500" />
                                        </div>

                                        <p className="text-sm font-medium text-slate-700">
                                            No overdue bills
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            You're all caught up!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {overDueBills.map((bill) => (
                                            <div
                                                key={bill.id}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 p-2"
                                            >


                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {bill.billName}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {bill.category} • Due {formatDueDate(bill.dueDay, bill.recordMonth, bill.recordYear)}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold text-slate-900">
                                                        ${bill.actualAmount.toFixed(2)}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkAsPaid(bill.id)}
                                                        className="rounded-lg bg-red-700 px-3 py-1 text-xs font-medium text-white hover:bg-red-950"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </DashboardCard>


                    </section>
                    <section className="grid grid-cols-1 gap-3 xl:grid-cols-4">

                        <DashboardCard
                            title="Total Spending"
                            subtitle={`(${currentMonth})`}
                            className="w-full justify-self-center p-2.5"
                        >
                            <div className="mt-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-orange-600">
                                        ${transactionSummary?.totalExpenses.toFixed(2) ?? "0.00"}
                                    </p>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                                        <TrendingDown className="h-4 w-4 text-orange-600" />
                                    </div>
                                </div>

                                <div className="mt-1.5 space-y-0.5 text-xs text-slate-500">
                                    <div className="flex justify-between">
                                        <span>Bills</span>
                                        <span>
                                            ${transactionSummary?.totalBillExpenses.toFixed(2) ?? "0.00"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Other</span>
                                        <span>
                                            ${transactionSummary?.totalOtherExpenses.toFixed(2) ?? "0.00"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DashboardCard>

                        <DashboardCard
                            title="Total Income"
                            subtitle={`(${currentMonth})`}
                            className="w-full justify-self-center p-2.5"
                        >
                            <div className="mt-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-green-600">
                                        ${transactionSummary?.totalIncome.toFixed(2) ?? "0.00"}
                                    </p>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    </div>
                                </div>

                                <p className="mt-1.5 text-[11px] text-slate-500">
                                    Recorded through {formatDate(new Date())}
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard
                            title="Highest Spending Category"
                            subtitle={`(${currentMonth})`}
                            className="w-full justify-self-center p-2.5"
                        >
                            <div className="mt-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-orange-600">
                                        {transactionSummary?.topSpendingCategory?.category ?? "—"}
                                    </p>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                                        <ChartPie className="h-4 w-4 text-orange-600" />
                                    </div>
                                </div>

                                <p className="mt-1.5 text-[11px] text-slate-500">
                                    ${transactionSummary?.topSpendingCategory?.totalAmount.toFixed(2) ?? "0.00"} spent this month
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard
                            title="Highest Bill Category"
                            subtitle={`(${currentMonth})`}
                            className="w-full justify-self-center p-2.5"
                        >
                            <div className="mt-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-orange-600">
                                        {transactionSummary?.topBillCategory?.category
                                            ? transactionSummary.topBillCategory.category.charAt(0).toUpperCase() +
                                            transactionSummary.topBillCategory.category.slice(1).toLowerCase()
                                            : "—"}
                                    </p>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                                        <ReceiptText className="h-4 w-4 text-blue-600" />
                                    </div>
                                </div>

                                <p className="mt-1.5 text-[11px] text-slate-500">
                                    ${transactionSummary?.topBillCategory?.totalAmount.toFixed(2) ?? "0.00"} spent this month
                                </p>
                            </div>
                        </DashboardCard>

                    </section>

                </div>
            </div >

            {isStartingBalanceModalOpen && (
                <StartingBalanceModal
                    onClose={() => setIsStartingBalanceModalOpen(false)}

                    // Receives the amount from the modal
                    // and updates the dashboard state.
                    onSave={async (amount) => {
                        const response = await fetch("http://localhost:8080/api/accounts/me", {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                            },
                            body: JSON.stringify({ currentBalance: amount }),
                        });

                        if (!response.ok) {
                            throw new Error("Failed to update balance");
                        }

                        const updatedAccount = await response.json();


                        setIsStartingBalanceModalOpen(false);
                        loadDashboard();
                    }}
                />
            )
            }

            {
                isBillsModalOpen && (
                    <BillsModal
                        onClose={() => setIsBillsModalOpen(false)}
                        onSaveSuccess={async () => {
                            await loadDashboard();
                            setIsBillsModalOpen(false);
                        }}

                    />
                )
            }


            {
                isSpendingsModalOpen && (
                    <SpendingModal
                        onClose={() => setIsSpendingsModalOpen(false)}
                        onSaveSuccess={async () => {
                            await loadDashboard();
                            setIsSpendingsModalOpen(false);
                        }
                        }

                    />
                )
            }



            {
                isIncomeModalOpen && (
                    <IncomeModal
                        onClose={() => setIsIncomeModalOpen(false)}
                        onSaveSuccess={async () => {
                            await loadDashboard();
                            setIsIncomeModalOpen(false);
                        }
                        }

                    />
                )
            }
        </main >




    );
}