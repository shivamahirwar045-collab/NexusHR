"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Employee,
  Department,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  NotificationItem,
  AuditLogItem,
} from "@/types";
import {
  initialEmployees,
  initialDepartments,
  initialAttendanceRecords,
  initialLeaveRequests,
  initialPayrollRecords,
  initialNotifications,
  initialAuditLogs,
} from "@/lib/mock-data";

export interface CurrentUser {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  companyName: string;
}

interface AppContextType {
  // State
  employees: Employee[];
  departments: Department[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  currentUser: CurrentUser;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  globalSearchOpen: boolean;

  // Actions
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setGlobalSearchOpen: (open: boolean) => void;
  
  // Employee actions
  addEmployee: (employee: Omit<Employee, "id" | "attendanceRate" | "leaveBalance">) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  toggleEmployeeStatus: (id: string, status: Employee["status"]) => void;

  // Department actions
  addDepartment: (dept: Omit<Department, "id" | "employeeCount" | "createdAt">) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;

  // Attendance actions
  markAttendance: (status: AttendanceRecord["status"], notes?: string) => void;

  // Leave actions
  addLeaveRequest: (request: Omit<LeaveRequest, "id" | "status" | "appliedOn">) => void;
  approveLeaveRequest: (id: string) => void;
  rejectLeaveRequest: (id: string, reason?: string) => void;

  // Payroll actions
  processPayroll: (monthYear: string) => void;

  // Notification actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;

  // Audit actions
  addAuditLog: (log: Omit<AuditLogItem, "id" | "timestamp" | "userId" | "userName" | "userEmail" | "userAvatar" | "ipAddress">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(initialPayrollRecords);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  const currentUser: CurrentUser = {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@company.com",
    role: "HR Administrator",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    companyName: "NexusTech Enterprises Inc.",
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addAuditLog = (log: Omit<AuditLogItem, "id" | "timestamp" | "userId" | "userName" | "userEmail" | "userAvatar" | "ipAddress">) => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      " " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      userId: "emp-4",
      userName: currentUser.name,
      userEmail: currentUser.email,
      userAvatar: currentUser.avatarUrl,
      timestamp: formatted,
      ipAddress: "192.168.1.104",
      action: log.action,
      module: log.module,
      description: log.description,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addEmployee = (employeeData: Omit<Employee, "id" | "attendanceRate" | "leaveBalance">) => {
    const newId = `emp-${Date.now()}`;
    const newEmployee: Employee = {
      ...employeeData,
      id: newId,
      attendanceRate: 100,
      leaveBalance: 20,
      fullName: `${employeeData.firstName} ${employeeData.lastName}`.trim(),
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    
    // Update department count
    setDepartments((prev) =>
      prev.map((d) => (d.id === employeeData.departmentId ? { ...d, employeeCount: d.employeeCount + 1 } : d))
    );

    addAuditLog({
      action: "create",
      module: "employees",
      description: `Added new employee ${newEmployee.fullName} (${newEmployee.employeeCode}) to ${newEmployee.departmentName}`,
    });

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Employee Added",
      description: `${newEmployee.fullName} has been onboarded into ${newEmployee.departmentName}.`,
      timestamp: "Just now",
      type: "employee",
      isRead: false,
      actionUrl: `/dashboard/employees/${newId}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const updated = { ...emp, ...updates };
          if (updates.firstName || updates.lastName) {
            updated.fullName = `${updated.firstName} ${updated.lastName}`.trim();
          }
          return updated;
        }
        return emp;
      })
    );
    addAuditLog({
      action: "update",
      module: "employees",
      description: `Updated profile details for employee record ID ${id}`,
    });
  };

  const deleteEmployee = (id: string) => {
    const empToDelete = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    if (empToDelete) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === empToDelete.departmentId ? { ...d, employeeCount: Math.max(0, d.employeeCount - 1) } : d))
      );
      addAuditLog({
        action: "delete",
        module: "employees",
        description: `Removed employee record: ${empToDelete.fullName} (${empToDelete.employeeCode})`,
      });
    }
  };

  const toggleEmployeeStatus = (id: string, status: Employee["status"]) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, status } : emp))
    );
    const emp = employees.find((e) => e.id === id);
    if (emp) {
      addAuditLog({
        action: "update",
        module: "employees",
        description: `Changed status of ${emp.fullName} to ${status.replace("_", " ").toUpperCase()}`,
      });
    }
  };

  const addDepartment = (deptData: Omit<Department, "id" | "employeeCount" | "createdAt">) => {
    const newDept: Department = {
      ...deptData,
      id: `dept-${Date.now()}`,
      employeeCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDepartments((prev) => [...prev, newDept]);
    addAuditLog({
      action: "create",
      module: "departments",
      description: `Created new department: ${newDept.name} (${newDept.code})`,
    });
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setDepartments((prev) =>
      prev.map((dept) => (dept.id === id ? { ...dept, ...updates } : dept))
    );
    addAuditLog({
      action: "update",
      module: "departments",
      description: `Updated department configuration for ID ${id}`,
    });
  };

  const deleteDepartment = (id: string) => {
    const dept = departments.find((d) => d.id === id);
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    if (dept) {
      addAuditLog({
        action: "delete",
        module: "departments",
        description: `Deleted department: ${dept.name} (${dept.code})`,
      });
    }
  };

  const markAttendance = (status: AttendanceRecord["status"], notes?: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const todayStr = now.toISOString().split("T")[0];

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: "emp-4",
      employeeName: currentUser.name,
      employeeCode: "EMP-1004",
      departmentName: "People & Human Resources",
      avatarUrl: currentUser.avatarUrl,
      date: todayStr,
      checkIn: timeStr,
      checkOut: null,
      workingHours: status === "present" ? 8.0 : status === "half_day" ? 4.0 : 0,
      status,
      notes: notes || "Manual self-check in via dashboard",
    };

    setAttendanceRecords((prev) => [newRecord, ...prev.filter((r) => !(r.employeeId === "emp-4" && r.date === todayStr))]);
    addAuditLog({
      action: "create",
      module: "attendance",
      description: `Logged attendance status (${status.toUpperCase()}) for ${currentUser.name}`,
    });
  };

  const addLeaveRequest = (requestData: Omit<LeaveRequest, "id" | "status" | "appliedOn">) => {
    const newReq: LeaveRequest = {
      ...requestData,
      id: `leave-${Date.now()}`,
      status: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };
    setLeaveRequests((prev) => [newReq, ...prev]);
    addAuditLog({
      action: "create",
      module: "leave",
      description: `Submitted ${newReq.leaveType} leave request for ${newReq.employeeName} (${newReq.daysCount} days)`,
    });
  };

  const approveLeaveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "approved",
              reviewedBy: currentUser.name,
              reviewedAt: new Date().toISOString().split("T")[0],
            }
          : req
      )
    );
    const req = leaveRequests.find((r) => r.id === id);
    if (req) {
      addAuditLog({
        action: "approve",
        module: "leave",
        description: `Approved ${req.leaveType} leave for ${req.employeeName} (${req.daysCount} days)`,
      });
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Leave Approved",
        description: `Leave request for ${req.employeeName} (${req.daysCount} days) has been approved.`,
        timestamp: "Just now",
        type: "leave",
        isRead: false,
        actionUrl: "/dashboard/leave",
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const rejectLeaveRequest = (id: string, reason?: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "rejected",
              reviewedBy: currentUser.name,
              reviewedAt: new Date().toISOString().split("T")[0],
              rejectionReason: reason || "Operational requirements during requested dates.",
            }
          : req
      )
    );
    const req = leaveRequests.find((r) => r.id === id);
    if (req) {
      addAuditLog({
        action: "reject",
        module: "leave",
        description: `Rejected ${req.leaveType} leave for ${req.employeeName}`,
      });
    }
  };

  const processPayroll = (monthYear: string) => {
    setPayrollRecords((prev) =>
      prev.map((rec) => (rec.monthYear === monthYear ? { ...rec, status: "paid", payDate: new Date().toISOString().split("T")[0] } : rec))
    );
    addAuditLog({
      action: "update",
      module: "payroll",
      description: `Disbursed and marked payroll batch complete for ${monthYear}`,
    });
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Payroll Batch Processed",
      description: `All eligible staff compensation disbursements for ${monthYear} have been authorized.`,
      timestamp: "Just now",
      type: "payroll",
      isRead: false,
      actionUrl: "/dashboard/payroll",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        departments,
        attendanceRecords,
        leaveRequests,
        payrollRecords,
        notifications,
        auditLogs,
        currentUser,
        sidebarCollapsed,
        mobileSidebarOpen,
        globalSearchOpen,
        setSidebarCollapsed,
        setMobileSidebarOpen,
        setGlobalSearchOpen,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        markAttendance,
        addLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        processPayroll,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
