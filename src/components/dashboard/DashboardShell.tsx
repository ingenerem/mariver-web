"use client";

import { useState } from "react";
import DashboardCard from "./DashboardCard";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

                        <DashboardCard title="Current balance" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-green-500 pt-3">
                                <p className="text-2xl font-bold">$8,240</p>

                                <p className="mt-1 text-xs text-green-600">
                                    +12% this period
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Preset bills" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3" >
                                <p className="text-2xl font-bold">$2,140</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reserved
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spending money" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$1,380</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Available now
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Emergency fund" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                <p className="text-xl font-bold">$4,200/6000</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    84% complete
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$1,750</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    3 active goals
                                </p>
                            </div>
                        </DashboardCard>


                    </section>

                    {/*Mobile view top cards */}

                    <section className="grid grid-cols-3 gap-4 mx-auto max-w-[1500px] lg:hidden">
                        <DashboardCard title="Current balance" className="max-w-[250px] p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$8,240</p>

                                <p className="mt-1 text-xs text-green-600">
                                    +12% this period
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Preset bills" className="max-w-[1500px] p-3">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3">
                                <p className="text-2xl font-bold">$2,140</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reserved
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spending money" className="max-w-[1500px] justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$1,380</p>

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

                            <button className="flex items-center justify-center gap-3 border-l border-slate-200 p-5 transition hover:bg-slate-50">
                                <span className="text-xl text-blue-500">+</span>
                                <span className="font-medium">Add bill</span>
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

                        <DashboardCard title="Emergency fund" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                <p className="text-2xl font-bold">$4,200/6000</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    84% complete
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$1,750</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    3 active goals
                                </p>
                            </div>
                        </DashboardCard>
                    </section>


                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <DashboardCard title="Paid bills" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-4 space-y-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-700">Rent</p>
                                    </div>
                                    <span className="font-semibold text-slate-900">$1,450</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-700">Electricity</p>
                                    </div>
                                    <span className="font-semibold text-slate-900">$95</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-700">Internet</p>
                                    </div>
                                    <span className="font-semibold text-slate-900">$65</span>
                                </div>

                            </div>
                        </DashboardCard>

                        <DashboardCard title="Recent spending" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Groceries</span>
                                    <span className="font-semibold">$82</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Gas</span>
                                    <span className="font-semibold">$47</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Dining</span>
                                    <span className="font-semibold">$64</span>
                                </div>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Upcoming bills" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Rent</span>
                                    <span className="font-semibold">$1,450</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Netflix</span>
                                    <span className="font-semibold">$20</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600">Insurance</span>
                                    <span className="font-semibold">$180</span>
                                </div>
                            </div>
                        </DashboardCard>


                    </section>
                    <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">

                        <DashboardCard title="Income period" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3">
                                <p className="text-xl font-bold">
                                    May 15 – May 30
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Current active pay period
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Projected income" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-green-500 pt-3">
                                <p className="text-2xl font-bold">
                                    $5,000
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Expected next month
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Future goals" className="w-full p-3 justify-self-center p-3">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">
                                    $4,000
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Vacation + school plans
                                </p>
                            </div>
                        </DashboardCard>

                    </section>

                </div>
            </div>
        </main>
    );
}