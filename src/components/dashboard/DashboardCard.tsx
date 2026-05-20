type DashboardCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function DashboardCard({
  title,
  children,
  className="",
  
}: DashboardCardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}