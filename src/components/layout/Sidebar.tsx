"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  PlugZap,
  LayoutGrid,
  GitBranch,
  Puzzle,
  Settings,
  ChevronsUpDown,
  ShieldCheck,
  TrendingUp,
  CornerDownRight,
  Database,
  ChevronDown,
  ChevronRight,
  Table,
  Terminal,
  RotateCcw,
  Cpu,
  Share2,
  Users,
  ShieldAlert,
  KeyRound,
  Folder,
  Code2,
  Sparkles,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  X,
  Copy,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useApp();

  const [postgresExpanded, setPostgresExpanded] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("production");
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const handleLogout = () => {
    setMobileSidebarOpen(false);
    toast.info("Logged Out", "You have been logged out successfully.");
    router.push("/login");
  };

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const copyConnectionString = () => {
    navigator.clipboard.writeText("postgresql://alex:nexus_secret_pwd@ep-ancient-hill-123456.us-east-2.aws.neon.tech/nexushr?sslmode=require");
    setCopied(true);
    toast.success("Copied to clipboard", "PostgreSQL connection string copied.");
    setTimeout(() => setCopied(false), 2000);
  };

  const projectItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Branches", href: "/dashboard/departments", icon: GitBranch },
    { label: "Integrations", href: "/dashboard/reports", icon: Puzzle },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const branchItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutGrid },
    { label: "Credentials", href: "/dashboard/audit-logs", icon: ShieldCheck },
    { label: "Monitoring", href: "/dashboard/reports", icon: TrendingUp },
    { label: "Child branches", href: "/dashboard/departments", icon: CornerDownRight },
  ];

  const postgresSubItems = [
    { label: "Tables", href: "/dashboard/employees", icon: Table },
    { label: "SQL Editor", href: "/dashboard/reports", icon: Terminal },
    { label: "Backup & Restore", href: "/dashboard/audit-logs", icon: RotateCcw },
    { label: "Computes", href: "/dashboard/departments", icon: Cpu },
    { label: "Data API", href: "/dashboard/attendance", icon: Share2 },
    { label: "Roles", href: "/dashboard/leave", icon: Users },
    { label: "Databases", href: "/dashboard/payroll", icon: Database },
    { label: "Data masking", href: "/dashboard/settings", icon: ShieldAlert },
  ];

  const resourceItems = [
    { label: "Auth", href: "/dashboard/employees", icon: KeyRound },
    { label: "Object storage", href: "/dashboard/reports", icon: Folder },
    { label: "Functions", href: "/dashboard/payroll", icon: Code2 },
    { label: "AI Gateway", href: "/dashboard/attendance", icon: Sparkles },
    { label: "Feedback", href: "/dashboard/settings?tab=help", icon: MessageSquare },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-sidebar text-sidebar-foreground">
      {/* Top Header / Project section */}
      <div className="p-3 space-y-4">
        {/* Mobile Close Bar */}
        <div className="flex items-center justify-between md:hidden pb-2 border-b border-sidebar-border">
          <span className="font-bold text-sm tracking-tight text-sidebar-foreground">
            NexusHR Console
          </span>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PROJECT Header & Connect Button */}
        <div>
          {!sidebarCollapsed && (
            <p className="px-2 pb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              PROJECT
            </p>
          )}

          {/* Connect Button */}
          <button
            type="button"
            onClick={() => setShowConnectModal(true)}
            title={sidebarCollapsed ? "Connect" : undefined}
            className={cn(
              "w-full h-9 rounded-lg flex items-center justify-center gap-2 font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer",
              "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30",
              sidebarCollapsed ? "px-0" : "px-3"
            )}
          >
            <PlugZap className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Connect</span>}
          </button>
        </div>

        {/* Project Navigation Items */}
        <div className="space-y-0.5">
          {projectItems.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  sidebarCollapsed ? "justify-center" : "gap-3"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* BRANCH Section */}
        <div className="pt-2">
          {!sidebarCollapsed && (
            <p className="px-2 pb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              BRANCH
            </p>
          )}

          {/* Branch Selector */}
          {!sidebarCollapsed ? (
            <div className="relative mb-2">
              <button
                type="button"
                onClick={() => setShowBranchMenu(!showBranchMenu)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/60 text-xs font-medium text-sidebar-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <GitBranch className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{selectedBranch}</span>
                </div>
                <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>

              {showBranchMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-xl py-1 z-50 text-xs">
                  {["production", "staging", "dev-feature-branch"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setSelectedBranch(b);
                        setShowBranchMenu(false);
                        toast.info("Branch Switched", `Active branch changed to ${b}`);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 hover:bg-muted transition-colors flex items-center justify-between",
                        selectedBranch === b ? "text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      <span>{b}</span>
                      {selectedBranch === b && <Check className="h-3.5 w-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center mb-2" title="Branch: production">
              <div className="p-1.5 rounded-lg bg-sidebar-accent/40 text-muted-foreground">
                <GitBranch className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Branch Navigation Items */}
          <div className="space-y-0.5">
            {branchItems.map((item) => {
              const active = pathname === item.href && item.label === "Overview";
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                    sidebarCollapsed ? "justify-center" : "gap-3"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sidebar-border" />

        {/* Resource Items / Postgres Database Accordion */}
        <div className="space-y-0.5">
          {/* Postgres database accordion */}
          <div>
            <button
              type="button"
              onClick={() => setPostgresExpanded(!postgresExpanded)}
              title={sidebarCollapsed ? "Postgres database" : undefined}
              className={cn(
                "w-full flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors cursor-pointer",
                sidebarCollapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center gap-3 truncate">
                <Database className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">Postgres database</span>}
              </div>
              {!sidebarCollapsed && (
                postgresExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )
              )}
            </button>

            {/* Sub-items */}
            {!sidebarCollapsed && postgresExpanded && (
              <div className="pl-6 pr-1 pt-1 space-y-0.5">
                {postgresSubItems.map((sub) => {
                  const SubIcon = sub.icon;
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
                    >
                      <SubIcon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span>{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remaining Resource items */}
          {resourceItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors",
                  sidebarCollapsed ? "justify-center" : "gap-3"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar: Collapse menu + Logout */}
      <div className="border-t border-sidebar-border p-2 space-y-1 bg-sidebar">
        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand menu" : "Collapse menu"}
          className={cn(
            "w-full flex items-center rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors cursor-pointer",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 shrink-0" />
              <span>Collapse menu</span>
            </>
          )}
        </button>

        {/* Logout */}
        <Link
          href="/login"
          onClick={handleLogout}
          title={sidebarCollapsed ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-rose-500/90 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </Link>
      </div>

      {/* Connect Details Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <PlugZap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">
                    Connect to NexusHR Database
                  </h3>
                  <p className="text-xs text-muted-foreground">Branch: {selectedBranch}</p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Connection String (PostgreSQL URL)
                </label>
                <div className="relative">
                  <pre className="bg-[#0c0d12] border border-border/80 text-emerald-400 p-3 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                    postgresql://alex:nexus_secret_pwd@ep-ancient-hill-123456.us-east-2.aws.neon.tech/nexushr?sslmode=require
                  </pre>
                  <button
                    onClick={copyConnectionString}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Quick CLI Command:</p>
                <code className="text-[11px] text-primary block bg-background/80 p-1.5 rounded border border-border font-mono">
                  psql &quot;postgresql://alex:nexus_secret_pwd@ep-ancient-hill-123456.us-east-2.aws.neon.tech/nexushr?sslmode=require&quot;
                </code>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden md:flex h-screen sticky top-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 shrink-0",
          sidebarCollapsed ? "w-16" : "w-60"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-sidebar shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

