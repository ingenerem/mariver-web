type DashboardCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function DashboardCard({
  title,
  children,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}