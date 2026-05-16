import DashboardCard from "./DashboardCard";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";



export default function DashboardShell() {
    return (
        <main className="flex min-h-screen bg-slate-50 text-slate-900">
            <DashboardSidebar />
            <div className="flex-1 p-2">
                <DashboardHeader />
                <div className="mt-4 space-y-6">

                    <section className="grid grid-cols-6 gap-3">

                        <DashboardCard title="Current balance">
                            <div className="mt-3 border-t-4 border-green-500 pt-3">
                                <p className="text-2xl font-bold">$8,240</p>

                                <p className="mt-1 text-xs text-green-600">
                                    +12% this period
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Preset bills">
                            <div className="mt-3 border-t-4 border-blue-500 pt-3">
                                <p className="text-2xl font-bold">$2,140</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Reserved
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Spending money">
                            <div className="mt-3 border-t-4 border-orange-500 pt-3">
                                <p className="text-2xl font-bold">$1,380</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Available now
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Emergency fund">
                            <div className="mt-3 border-t-4 border-red-500 pt-3">
                                <p className="text-2xl font-bold">$4,200/6000</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    84% complete
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Other savings">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$1,750</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    3 active goals
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Investments">
                            <div className="mt-3 border-t-4 border-purple-500 pt-3">
                                <p className="text-2xl font-bold">$1000</p>

                                <p className="mt-1 text-xs text-slate-500">
                                    stocks
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


                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <DashboardCard title="Paid bills">
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

                        <DashboardCard title="Recent spending">
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

                        <DashboardCard title="Upcoming bills">
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
                    <section className="grid grid-cols-3 gap-3">

                        <DashboardCard title="Income period">
                            <div className="mt-3">
                                <p className="text-xl font-bold">
                                    May 15 – May 30
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Current active pay period
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Projected income">
                            <div className="mt-3 border-t-4 border-green-500 pt-3">
                                <p className="text-2xl font-bold">
                                    $5,000
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Expected next month
                                </p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Future goals">
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