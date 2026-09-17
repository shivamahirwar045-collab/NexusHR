import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 sm:pb-6 border-b border-border/60",
        className
      )}
    >
      <div>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full sm:w-auto">{children}</div>}
    </div>
  );
}
