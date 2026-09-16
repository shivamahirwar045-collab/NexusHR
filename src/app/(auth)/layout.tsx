import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-muted/30 relative selection:bg-primary/20">
      {/* Top Header */}
      <header className="flex h-16 items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-foreground">
            NexusHR
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Form Center Box */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NexusHR Inc. All rights reserved. •{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        •{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </footer>
    </div>
  );
}
