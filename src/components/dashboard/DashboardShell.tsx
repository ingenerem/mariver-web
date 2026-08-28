"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import StartingBalanceModal from "@/components/dashboard/StartingBalanceModal"
import BillsModal from "@/components/bills/BillsModal";
import { getUpcomingBills, payBill, getPaidBills, getOverdueBills } from "@/lib/billApi";
import { formatDueDate } from "@/utils/dateFormat";
import { BillResponse } from "@/types/bill";


export default function DashboardShell() {

    const currentMonth = new Date().toLocaleString("default", {month: "long",});

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Stores the user's starting/current balance.
    // null means the user has not entered a balance yet.
    const [startingBalance, setStartingBalance] = useState<number | null>(null);

    // Controls whether the starting balance modal is open or closed.
    const [isStartingBalanceModalOpen, setIsStartingBalanceModalOpen] =
        useState(false);

    // Controls whether the preset bills modal is open or closed.
    const [isBillsModalOpen, setIsBillsModalOpen] = useState(false);

    const [isLoadingAccount, setIsLoadingAccount] = useState(true);


    const [bills, setBills] = useState<BillResponse[]>([]);
    const [paidBills, setPaidBills] = useState<BillResponse[]>([]);
    const [overDueBills, setOverDueBills] = useState<BillResponse[]>([]);
    const [isLoadingBills, setIsLoadingBills] = useState(false);


    const handleMarkAsPaid = async(billId: number) => {

         try {
            // Used for the to show the user when the bills are still loading

            await payBill(billId);
            await Promise.all([
                loadBills(),
                loadPaidBills(),
                loadOverDueBills()

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

                const response = await fetch("http://localhost:8080/api/accounts/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("mariver_token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to load account");
                }

                const account = await response.json();
                setStartingBalance(account.currentBalance);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingAccount(false);
            }
        }

        loadAccount();
    }, []);


    //Call the api to retrieve bills and load them into state
    const loadBills = async () => {
        try {
            // Used for the to show the user when the bills are still loading
            setIsLoadingBills(true);

            const data = await getUpcomingBills();
            console.log(data);
            setBills(data);
        } catch (error) {
            console.error("Failed to load bills:", error);
        } finally {
            setIsLoadingBills(false);
        }
    };


        //Call the api to retrieve paid bills and load them into state
    const loadPaidBills = async () => {
        try {
            // Used for the to show the user when the bills are still loading
            setIsLoadingBills(true);

            const data = await getPaidBills();
            console.log(data);
            setPaidBills(data);
        } catch (error) {
            console.error("Failed to load bills:", error);
        } finally {
            setIsLoadingBills(false);
        }
    };

            //Call the api to retrieve unpaid bills and load them into state
    const loadOverDueBills = async () => {
        try {
            // Used for the to show the user when the bills are still loading
            setIsLoadingBills(true);

            const data = await getOverdueBills();
            console.log(data);
            setOverDueBills(data);
        } catch (error) {
            console.error("Failed to load bills:", error);
        } finally {
            setIsLoadingBills(false);
        }
    };




    useEffect(() => {
        loadBills();
        loadPaidBills();
        loadOverDueBills();
    }, []);



    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 md:flex">

            <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white md:block">
                <DashboardSidebar />
            </aside>
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">

                    {/* dark background */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* actual sidebar container */}
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
            )}



            <div className="flex-1 p-2">
                <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />


                <div className="mt-4 space-y-6">

                    {/* Desktop top cards*/}

                    <section className="hidden gap-6 lg:grid lg:grid-cols-5">

                        <DashboardCard

                            title="Current balance" className="w-full justify-self-center p-3">

                            <button
                                type="button"

                                // Opens modal when card is clicked.
                                onClick={() => setIsStartingBalanceModalOpen(true)}

                                className="w-full text-left"
                            >


                                <div className="mt-3 border-t-4 border-green-500 pt-3">
                                    {isLoadingAccount ? (
                                        <>
                                            <p className="text-xl font-bold">Loading...</p>
                                        </>
                                    ) : startingBalance === null ? (
                                        <>
                                            <p className="text-xl font-bold">Not set</p>

                                            <p
                                                onClick={() => setIsStartingBalanceModalOpen(true)}
                                                className="mt-1 text-xs font-medium text-blue-600 hover:underline"
                                            >
                                                Set starting balance
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-2xl font-bold">
                                                ${startingBalance.toFixed(2)}
                                            </p>

                                            <p className="mt-1 text-xs text-green-600">
                                                Current active balance
                                            </p>

                                            <p className="text-xs font-medium text-slate-500">
                                                Edit
                                            </p>
                                        </>
                                    )}
                                </div>
                            </button>
                        </DashboardCard>

                        <DashboardCard title="Total unpaid bills" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3" >
                                <p className="text-2xl font-bold text-red-700">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reserved
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spending money" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Available now
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Emergency fund" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                <p className="text-xl font-bold">$0/0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    84% complete
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    3 active goals
                                </p>
                            </div>
                        </DashboardCard>


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
                                    {startingBalance === null ? (
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
                                                ${startingBalance}
                                            </p>

                                            <p className="mt-1 text-xs text-green-600">
                                                Current active balance
                                            </p>
                                            <p className="text-xs font-medium text-slate-500">
                                                Edit
                                            </p>
                                        </>
                                    )}

                                </div>
                            </button>
                        </DashboardCard>

                        <DashboardCard title="Total unpaid bills"  className="max-w-[1500px] p-3">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3">
                                <p className="text-2xl font-bold text-red-700">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reserved
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spending money" className="max-w-[1500px] justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Available now
                                </p>
                            </div>
                        </DashboardCard>
                    </section>


                    <section>
                        <div className="grid grid-cols-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <button className="flex items-center justify-center gap-3 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-green-500">+</span>
                                <span className="font-medium">Add income</span>
                            </button>

                            <button onClick={() => setIsBillsModalOpen(true)}
                                className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-blue-500">+</span>
                                <span className="font-medium">Add bill(s)</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-orange-500">+</span>
                                <span className="font-medium">Add spending</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-purple-500">⇄</span>
                                <span className="font-medium">Adjust income</span>
                            </button>

                            <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-pink-500">+</span>
                                <span className="font-medium">Future goal</span>
                            </button>

                        </div>
                    </section>


                    {/*Mobile view bottom cards */}

                    <section className="grid grid-cols-2 gap-4 lg:hidden">

                        <DashboardCard title="Emergency fund" tittle_color="text-slate-800" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                <p className="text-2xl font-bold">$0/0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    84% complete
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings" tittle_color="text-slate-800" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$0</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    3 active goals
                                </p>
                            </div>
                        </DashboardCard>
                    </section>


                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <DashboardCard title="Paid bills" tittle_color="text-green-700" subtitle={`(${currentMonth})`} className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1 text-sm">
                                   {isLoadingBills ? (
                                    <p className="text-sm text-slate-500">Loading bills...</p>
                                ) : paidBills.length === 0 ? (
                                    <p className="text-sm text-slate-500">No bills found for this month.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {paidBills.map((bill) => (
                                            <div
                                                key={bill.id}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 p-2"
                                            >


                                                <div>
                                                    <p className="font-medium text-slate-900">
                                                        {bill.billName}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {bill.category} • Paid at {bill.paidAt &&  new Date(bill.paidAt).toLocaleString()}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold text-slate-900">
                                                        ${bill.actualAmount.toFixed(2)}
                                                    </p>

                                                  
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </DashboardCard>

                        <DashboardCard title="Upcoming Bills" subtitle={`(${currentMonth})`} tittle_color="text-blue-700" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1 text-sm">
                                {isLoadingBills ? (
                                    <p className="text-sm text-slate-500">Loading bills...</p>
                                ) : bills.length === 0 ? (
                                    <p className="text-sm text-slate-500">No bills found for this month.</p>
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
                                                        {bill.category} • Due {formatDueDate(bill.dueDay)}
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
                                    <p className="text-sm text-slate-500">No unpaid bills found for this month.</p>
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
                                                        {bill.category} • Due {formatDueDate(bill.dueDay)}
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
                    <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">

                        <DashboardCard title="Recent Spendings" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3">

                            </div>
                        </DashboardCard>

                        <DashboardCard title="Projected income" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-green-500 pt-3">
                                <p className="text-2xl font-bold">
                                    $0
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Expected next month
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Future goals" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">
                                    $0
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Vacation + school plans
                                </p>
                            </div>
                        </DashboardCard>

                    </section>

                </div>
            </div>

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

                        setStartingBalance(updatedAccount.currentBalance);
                        setIsStartingBalanceModalOpen(false);
                    }}
                />
            )}

            {isBillsModalOpen && (
                <BillsModal
                    onClose={() => setIsBillsModalOpen(false)}
                    onSaveSuccess={async () => {
                        await loadBills();
                        setIsBillsModalOpen(false);
                    }}

                />
            )}
        </main>




    );
}