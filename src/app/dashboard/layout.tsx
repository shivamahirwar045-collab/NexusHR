import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (Desktop sticky + Mobile drawer) */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in-50 duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
