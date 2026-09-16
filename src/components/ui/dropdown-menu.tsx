"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  destructive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { destructive?: boolean }) {
  return (
    <button
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-left disabled:pointer-events-none disabled:opacity-50",
        destructive && "text-destructive hover:bg-destructive/10 hover:text-destructive",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-muted" />;
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2.5 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}
