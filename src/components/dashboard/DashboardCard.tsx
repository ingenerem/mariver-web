type DashboardCardProps = {
  title: string;
  tittle_color ?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};





export default function DashboardCard({
  title,
  tittle_color = "text-slate-700",
  subtitle,
  children,
  className="",
  
}: DashboardCardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>
      <h2 className={`font-semibold ${tittle_color ?? ""}`}>
  {title}
  {subtitle && (
    <span className="ml-2 font-normal text-slate-400">
      {subtitle}
    </span>
  )}
</h2>

      {children}
    </div>
  );
}