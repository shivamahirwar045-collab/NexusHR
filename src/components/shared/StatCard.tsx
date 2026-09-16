import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 text-card-foreground shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">{value}</h3>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && (
          <span
            className={cn(
              "inline-flex items-center font-semibold rounded px-1.5 py-0.5",
              trend.isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            )}
          >
            {trend.isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {trend.value}
          </span>
        )}
        <span className="text-muted-foreground truncate">
          {trend?.label || subtitle}
        </span>
      </div>
    </div>
  );
}
