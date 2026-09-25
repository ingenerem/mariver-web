type DashboardCardProps = {
  title: string;
  tittle_color?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function DashboardCard({
  title,
  tittle_color = "text-slate-700",
  subtitle,
  icon,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-50 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            {icon}
          </span>
        )}

        <h2 className={`font-semibold ${tittle_color}`}>
          {title}

          {subtitle && (
            <span className="ml-2 font-normal text-slate-400">
              {subtitle}
            </span>
          )}
        </h2>
      </div>

      {children}
    </div>
  );
}