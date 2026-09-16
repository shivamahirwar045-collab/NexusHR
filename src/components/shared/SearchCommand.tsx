"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";
import {
  Search,
  Users,
  Building2,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  FileBarChart,
  Bell,
  ScrollText,
  Settings,
  User,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export function SearchCommand() {
  const { globalSearchOpen, setGlobalSearchOpen, employees, departments } = useApp();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const navigationItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Users className="h-4 w-4" /> },
    { label: "Employees Directory", href: "/dashboard/employees", icon: <Users className="h-4 w-4" /> },
    { label: "Add New Employee", href: "/dashboard/employees/new", icon: <PlusCircle className="h-4 w-4 text-primary" /> },
    { label: "Departments", href: "/dashboard/departments", icon: <Building2 className="h-4 w-4" /> },
    { label: "Attendance Tracker", href: "/dashboard/attendance", icon: <CalendarCheck className="h-4 w-4" /> },
    { label: "Leave & PTO Requests", href: "/dashboard/leave", icon: <CalendarOff className="h-4 w-4" /> },
    { label: "Payroll Management", href: "/dashboard/payroll", icon: <CreditCard className="h-4 w-4" /> },
    { label: "Analytics & Reports", href: "/dashboard/reports", icon: <FileBarChart className="h-4 w-4" /> },
    { label: "Notification Center", href: "/dashboard/notifications", icon: <Bell className="h-4 w-4" /> },
    { label: "Audit & Security Logs", href: "/dashboard/audit-logs", icon: <ScrollText className="h-4 w-4" /> },
    { label: "System Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
    { label: "Admin Profile", href: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
  ];

  const filteredEmployees = useMemo(() => {
    if (!query.trim()) return [];
    return employees
      .filter(
        (e) =>
          e.fullName.toLowerCase().includes(query.toLowerCase()) ||
          e.email.toLowerCase().includes(query.toLowerCase()) ||
          e.departmentName.toLowerCase().includes(query.toLowerCase()) ||
          e.employeeCode.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  }, [employees, query]);

  const filteredDepartments = useMemo(() => {
    if (!query.trim()) return [];
    return departments
      .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.code.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 4);
  }, [departments, query]);

  const filteredNavigation = useMemo(() => {
    if (!query.trim()) return navigationItems;
    return navigationItems.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (href: string) => {
    setGlobalSearchOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Dialog open={globalSearchOpen} onOpenChange={setGlobalSearchOpen}>
      <DialogContent maxWidth="max-w-2xl" className="p-0 overflow-hidden border-border/80">
        <div className="flex items-center border-b px-4 py-3 bg-muted/20">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees, departments, payroll, or pages (e.g. 'Alexander', 'Design')..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Employees Results */}
          {filteredEmployees.length > 0 && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Employees ({filteredEmployees.length})
              </p>
              <div className="mt-1 space-y-1">
                {filteredEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => handleSelect(`/dashboard/employees/${emp.id}`)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                        {emp.firstName[0]}
                        {emp.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{emp.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {emp.designation} • {emp.departmentName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      {emp.employeeCode} <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Departments Results */}
          {filteredDepartments.length > 0 && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Departments
              </p>
              <div className="mt-1 space-y-1">
                {filteredDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => handleSelect("/dashboard/departments")}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-foreground">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {dept.employeeCount} Members • Lead: {dept.managerName}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation / Pages */}
          <div>
            <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {query ? "Matching Pages & Actions" : "Quick Navigation"}
            </p>
            <div className="mt-1 space-y-0.5">
              {filteredNavigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-left hover:bg-accent text-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-50" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t bg-muted/40 px-4 py-2 text-xs text-muted-foreground flex justify-between items-center">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono">NexusHR Command Menu</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
