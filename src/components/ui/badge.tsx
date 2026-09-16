import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive/15 text-destructive border-destructive/20": variant === "destructive",
          "border-border text-foreground": variant === "outline",
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": variant === "success",
          "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400": variant === "warning",
          "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400": variant === "info",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
