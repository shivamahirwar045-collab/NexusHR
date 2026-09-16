"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  FileBarChart,
  Bell,
  ScrollText,
  Settings,
  HelpCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
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
    notifications,
    leaveRequests,
  } = useApp();

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const pendingLeaveCount = leaveRequests.filter((l) => l.status === "pending").length;

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Employees", href: "/dashboard/employees", icon: Users },
    { label: "Departments", href: "/dashboard/departments", icon: Building2 },
    { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
    {
      label: "Leave / PTO",
      href: "/dashboard/leave",
      icon: CalendarOff,
      badge: pendingLeaveCount > 0 ? pendingLeaveCount : undefined,
      badgeVariant: "warning",
    },
    { label: "Payroll", href: "/dashboard/payroll", icon: CreditCard },
    { label: "Reports", href: "/dashboard/reports", icon: FileBarChart },
    {
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
      badgeVariant: "destructive",
    },
    { label: "Audit Logs", href: "/dashboard/audit-logs", icon: ScrollText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const bottomItems = [
    { label: "Help & Support", href: "/dashboard/settings?tab=help", icon: HelpCircle },
    { label: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const handleLogout = () => {
    toast.info("Logged Out", "You have been securely signed out.");
    router.push("/login");
  };

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto">
      {/* Top Brand Header */}
      <div>
        <div
          className={cn(
            "flex h-16 items-center border-b px-4 transition-all duration-200",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-foreground flex items-center gap-1.5">
                  NexusHR
                  <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                    PRO
                  </span>
                </span>
                <span className="text-[11px] text-muted-foreground font-medium truncate">
                  Enterprise Suite
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Navigation List */}
        <div className="px-3 py-4 space-y-1">
          {!sidebarCollapsed && (
            <p className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  sidebarCollapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                      active ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>

                {!sidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={cn(
                      "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                      item.badgeVariant === "warning" && !active && "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                      item.badgeVariant === "destructive" && !active && "bg-rose-500/15 text-rose-600 dark:text-rose-400",
                      active && "bg-white/20 text-white"
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active indicator pip */}
                {sidebarCollapsed && active && (
                  <span className="absolute right-1 top-1.5 h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t px-3 py-4 space-y-1">
        {!sidebarCollapsed && (
          <p className="px-3 pb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            System & Account
          </p>
        )}

        {bottomItems.map((item) => {
          const active = isLinkActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              title={sidebarCollapsed ? item.label : undefined}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                sidebarCollapsed ? "justify-center" : "gap-3"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          title={sidebarCollapsed ? "Sign Out" : undefined}
          className={cn(
            "group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>

        {/* Desktop Sidebar Collapse Toggle Button */}
        <div className="hidden md:block pt-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex w-full items-center justify-center rounded-lg border border-border py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden md:flex h-screen sticky top-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 shrink-0",
          sidebarCollapsed ? "w-16" : "w-64"
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
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-card shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
