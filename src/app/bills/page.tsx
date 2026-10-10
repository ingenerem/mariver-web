"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/SideBar";
import {
    CalendarDays,
    CirclePause,
    CreditCard,
    Pencil,
    PencilLine,
    ReceiptText,
    X,
} from "lucide-react";
import { BillDetailsResponse, BillResponse } from "@/types/bill";
import { deactivateBill, getAllBills } from "@/lib/billApi";
import { updateBill } from "@/lib/billApi";



export default function BillsPage() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [bills, setBills] = useState<BillDetailsResponse[]>([]);

    const [billToDeactivate, setBillToDeactivate] = useState<BillDetailsResponse | null>(null);
    const [deactivateError, setDeactivateError] = useState("");
    const [deactivating, setDeactivating] = useState(false);
    const [billToEdit, setBillToEdit] = useState<BillDetailsResponse | null>(null);

    const [editAmount, setEditAmount] = useState("");
    const [editIntervalValue, setEditIntervalValue] = useState("1");
    const [editIntervalUnit, setEditIntervalUnit] = useState("MONTH");
    const [editAutoPay, setEditAutoPay] = useState(false);
    const [editDueDate, setEditDueDate] = useState("");

    const openEditBill = (bill: BillDetailsResponse) => {
        setEditError("")
        setBillToEdit(bill);
        setEditAmount(String(bill.amount));
        setEditIntervalValue(String(bill.schedule.intervalValue));
        setEditIntervalUnit(bill.schedule.intervalUnit);
        setEditAutoPay(bill.schedule.autoPay);
    };

    const loadBills = async () => {

        console.log("aheemmm")
        try {
            const response = await getAllBills();
            setBills(response);
        } catch (error) {
            console.error("Failed to load bills:", error);
        }
    };

    const handleDeactivateBill = async () => {
        if (!billToDeactivate || deactivating) return;

        try {
            setDeactivating(true);
            setDeactivateError("");

            await deactivateBill(billToDeactivate.id);
            await loadBills();

            setBillToDeactivate(null);
        } catch (error) {
            setDeactivateError(
                error instanceof Error
                    ? error.message
                    : "Failed to deactivate bill."
            );
        } finally {
            setDeactivating(false);
        }
    };

    const [editError, setEditError] = useState("");
    const [savingEdit, setSavingEdit] = useState(false);

    const handleEditBill = async () => {
        if (!billToEdit || savingEdit) return;

        const estimatedAmount = Number(editAmount);
        const intervalValue = Number(editIntervalValue);

        if (!editAmount.trim() || !Number.isFinite(estimatedAmount) || estimatedAmount <= 0) {
            setEditError("Enter a valid amount.");
            return;
        }

        if (
            !editIntervalValue.trim() ||
            !Number.isInteger(intervalValue) ||
            intervalValue < 1
        ) {
            setEditError("Enter a valid frequency interval.");
            return;
        }

        if (!editDueDate) {
            setEditError("Select a due date.");
            return;
        }

        try {
            setSavingEdit(true);
            setEditError("");
            console.log("HANDLE EDIT BILL", {
                amount: estimatedAmount,
                billId: billToEdit.id,
            });

            await updateBill(billToEdit.id, {
                name: billToEdit.name,
                category: billToEdit.category,
                amount: estimatedAmount,
                intervalValue,
                intervalUnit: editIntervalUnit,
                startDate: editDueDate,
                autoPay: editAutoPay,
                paymentType: billToEdit.paymentType,
            });

            await loadBills();
            setBillToEdit(null);
        } catch (error) {
            setEditError(
                error instanceof Error ? error.message : "Failed to update bill."
            );
        } finally {
            setSavingEdit(false);
        }
    };

    useEffect(() => {
        loadBills();
    }, []);

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

                    <aside className="sticky top-0 z-30 relative h-full w-16 bg-white shadow-xl">
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

                <div className="sticky top-0 z-30 bg-slate-50">
                    <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                </div>

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 py-6 md:px-5 md:py-8">

                    {/* Page heading */}
                    <div className="mb-7 flex items-end justify-center gap-4">
                        <div className="sticky top-0 z-30">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <ReceiptText className="h-5 w-5" />
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Your Bills
                                </h1>
                            </div>

                            <p className="text-sm text-slate-500">
                                Manage the bills Mariver is currently tracking for you.
                            </p>
                        </div>

                        <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 sm:block">
                            {bills.filter((bill) => bill.active).length} active bills
                        </div>
                    </div>

                    {/* Bills card */}
                    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                        {/* Card heading */}
                       <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Recurring bills
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Deactivate a bill when you no longer need Mariver to track it.
                                </p>
                            </div>

                            <CalendarDays className="h-5 w-5 text-slate-300" />
                        </div>

                        <div className="min-h-0 flex-1 overflow-auto">
                            <table className="w-full text-left text-sm">

                                <thead className="sticky top-0 z-10 bg-slate-50">
                                    <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-4">Bill</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Frequency</th>
                                        <th className="px-6 py-4">Auto-pay</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {bills.map((bill) => (

                                        <tr
                                            key={bill.id}
                                            className={`
                                                group transition
                                                ${bill.active
                                                    ? "hover:bg-blue-50/30"
                                                    : "bg-slate-50/40 opacity-60"
                                                }
                                            `}
                                        >

                                            {/* Bill */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className={`
                                                            flex h-10 w-10 shrink-0 items-center justify-center
                                                            rounded-xl text-sm font-bold
                                                            ${bill.active
                                                                ? "bg-blue-50 text-blue-600"
                                                                : "bg-slate-100 text-slate-400"
                                                            }
                                                        `}
                                                    >
                                                        {bill.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-slate-800">
                                                            {bill.name}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            Recurring bill
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
                                                    {bill.category}
                                                </span>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-slate-800">
                                                    ${bill.amount}
                                                </span>
                                            </td>

                                            {/* Frequency */}
                                            <td className="px-6 py-4 text-slate-500">
                                                {bill.schedule.intervalUnit}
                                            </td>

                                            {/* Auto-pay */}
                                            <td className="px-6 py-4">
                                                {bill.schedule.autoPay ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                                                        <CreditCard className="h-3.5 w-3.5" />
                                                        On
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                                        Off
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                {bill.active ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action */}
                                            <td className="px-6 py-4 text-right">
                                                {bill.active ? (
                                                    <div className="flex items-center justify-end gap-2">

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                openEditBill(bill)
                                                                setEditDueDate("");
                                                            }}
                                                            title="Edit bill"
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200
                                                            bg-white text-slate-400 shadow-sm transition hover:border-blue-200 
                                                            hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>

                                                        {/* Deactivate */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setBillToDeactivate(bill);
                                                                setDeactivateError("");
                                                            }}
                                                            disabled={!bill.active}
                                                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200
                                                            bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm transition
                                                            hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                                                        >
                                                            <CirclePause className="h-4 w-4" />
                                                            Deactivate
                                                        </button>

                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        No longer tracked
                                                    </span>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </section>

                </main>
            </div>
            {billToDeactivate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Deactivate bill?
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Are you sure you want to deactivate{" "}
                            <span className="font-semibold">{billToDeactivate.name}</span>?
                            It will no longer appear in your upcoming or overdue bills.
                            Previous payments and transactions will be preserved.
                        </p>

                        {deactivateError && (
                            <p className="mt-3 text-sm text-red-600">
                                {deactivateError}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={deactivating}
                                onClick={() => setBillToDeactivate(null)}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deactivating}
                                onClick={handleDeactivateBill}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deactivating ? "Deactivating..." : "Deactivate"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {billToEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">

                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Edit bill
                                </h2>
                                <p className="text-sm text-slate-500">{billToEdit.name}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setBillToEdit(null)}
                                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-600">
                                    Estimated amount
                                </label>
                                <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-blue-500">
                                    <span className="bg-slate-50 px-3 py-2 text-sm text-slate-500">$</span>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                        className="w-full px-3 py-2 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-600">
                                        Every
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editIntervalValue}
                                        onChange={(e) => setEditIntervalValue(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-slate-600">
                                        Frequency
                                    </label>
                                    <select
                                        value={editIntervalUnit}
                                        onChange={(e) => setEditIntervalUnit(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                                    >
                                        <option value="DAY">Days</option>
                                        <option value="WEEK">Weeks</option>
                                        <option value="MONTH">Months</option>
                                        <option value="YEAR">Years</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-600">
                                    Next due date
                                </label>
                                <input
                                    type="date"
                                    value={editDueDate}
                                    onChange={(e) => setEditDueDate(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                                />
                            </div>

                            <label className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2.5">
                                <span className="text-sm font-medium text-slate-700">Auto-pay</span>
                                <input
                                    type="checkbox"
                                    checked={editAutoPay}
                                    onChange={(e) => setEditAutoPay(e.target.checked)}
                                    className="h-4 w-4 accent-blue-600"
                                />
                            </label>
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            {editError && (
                                <p className="mt-3 text-sm text-red-600">{editError}</p>
                            )}
                            <button
                                type="button"
                                onClick={() => setBillToEdit(null)}
                                className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleEditBill}
                                disabled={savingEdit}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {savingEdit ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </main>
    );

}