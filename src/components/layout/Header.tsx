"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const {
    currentUser,
    setMobileSidebarOpen,
    setGlobalSearchOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useApp();

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  // Generate breadcrumb items
  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      // Clean slug names
      let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      if (segment.startsWith("emp-")) {
        label = "Employee Profile";
      }
      return { segment, label };
    });

  const handleLogout = () => {
    toast.info("Logged Out", "You have been signed out successfully.");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Left section: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center space-x-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground font-medium transition-colors">
            NexusHR
          </Link>
          {pathSegments.map((item, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/${pathSegments.slice(0, index + 1).map((s) => s.segment).join("/")}`;

            return (
              <React.Fragment key={item.segment}>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-foreground truncate max-w-[140px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right section: Search trigger + Notifications + Theme Toggle + User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Trigger */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shadow-sm"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search records...</span>
          <kbd className="hidden sm:inline-flex h-4 items-center rounded border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Notification Popover Dropdown */}
        <DropdownMenu
          trigger={
            <div className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </div>
          }
          className="w-80 p-0"
        >
          <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
            <div>
              <p className="text-xs font-semibold text-foreground">Notifications</p>
              <p className="text-[11px] text-muted-foreground">
                {unreadNotifications.length} unread updates
              </p>
            </div>
            {unreadNotifications.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAllNotificationsAsRead();
                  toast.success("All notifications marked as read");
                }}
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-border/60">
            {notifications.slice(0, 4).map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.actionUrl) router.push(notif.actionUrl);
                }}
                className={`p-3 text-xs hover:bg-muted/50 cursor-pointer transition-colors ${
                  !notif.isRead ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className={`font-semibold ${!notif.isRead ? "text-primary" : "text-foreground"}`}>
                    {notif.title}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{notif.timestamp}</span>
                </div>
                <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-2">{notif.description}</p>
              </div>
            ))}
          </div>

          <div className="border-t p-2 text-center bg-muted/20">
            <Link
              href="/dashboard/notifications"
              className="text-xs text-primary font-medium hover:underline block py-1"
            >
              View all notifications →
            </Link>
          </div>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        <div className="h-5 w-px bg-border/60 mx-1 hidden sm:block" />

        {/* User Profile Dropdown */}
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-2 rounded-lg p-1 hover:bg-muted/60 transition-colors">
              <Avatar
                src={currentUser.avatarUrl}
                name={currentUser.name}
                size="sm"
                className="ring-1 ring-primary/30"
              />
              <div className="hidden text-left lg:block leading-none pr-1">
                <p className="text-xs font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{currentUser.role}</p>
              </div>
            </div>
          }
          className="w-56"
        >
          <DropdownMenuLabel className="border-b pb-2 mb-1">
            <p className="font-semibold text-foreground">{currentUser.name}</p>
            <p className="text-[11px] text-muted-foreground font-normal truncate">{currentUser.email}</p>
            <p className="text-[10px] text-primary font-medium mt-0.5">{currentUser.companyName}</p>
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile Overview
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/dashboard/settings?tab=help")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Documentation
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem destructive onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
