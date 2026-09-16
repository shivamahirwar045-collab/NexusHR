"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/shared/StatCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Users,
  CalendarCheck,
  CalendarOff,
  Clock,
  CreditCard,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Building2,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function DashboardOverviewPage() {
  const {
    employees,
    departments,
    attendanceRecords,
    leaveRequests,
    payrollRecords,
    auditLogs,
    approveLeaveRequest,
    rejectLeaveRequest,
    markAttendance,
  } = useApp();
  const toast = useToast();

  const [checkedInToday, setCheckedInToday] = useState(false);

  // Metrics calculations
  const totalEmployees = employees.length;
  const presentToday = attendanceRecords.filter((a) => a.status === "present" || a.status === "late").length;
  const onLeaveToday = attendanceRecords.filter((a) => a.status === "on_leave").length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === "pending");
  const latestPayroll = payrollRecords.filter((p) => p.monthYear === "September 2026" || p.monthYear === "August 2026");
  const totalMonthlyPayroll = latestPayroll.reduce((acc, p) => acc + p.netPay, 0);

  const attendanceRate = totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0;

  // Department headcount distribution
  const topDepartments = departments.slice(0, 4);

  const handleQuickCheckIn = () => {
    markAttendance("present", "Quick Web Check-In");
    setCheckedInToday(true);
    toast.success("Attendance Logged", "You are successfully checked in for today at " + new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <PageHeader
        title="Workforce Executive Dashboard"
        description="Real-time company health, attendance analytics, pending approvals, and payroll overview."
      >
        <Button
          variant={checkedInToday ? "secondary" : "emerald"}
          size="sm"
          onClick={handleQuickCheckIn}
          disabled={checkedInToday}
          className="gap-2 text-xs font-semibold"
        >
          <CalendarCheck className="h-4 w-4" />
          {checkedInToday ? "Checked In for Today ✓" : "Quick Check-In"}
        </Button>
        <Link href="/dashboard/employees/new">
          <Button size="sm" className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </PageHeader>

      {/* 5 KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Workforce"
          value={totalEmployees}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: "+12.4%", isPositive: true, label: "vs last quarter" }}
        />
        <StatCard
          title="Present Today"
          value={`${presentToday}/${totalEmployees}`}
          icon={<CalendarCheck className="h-5 w-5" />}
          trend={{ value: `${attendanceRate}%`, isPositive: attendanceRate >= 90, label: "Daily Rate" }}
        />
        <StatCard
          title="On Leave"
          value={onLeaveToday}
          icon={<CalendarOff className="h-5 w-5" />}
          subtitle="Approved PTO & Sick"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingLeaves.length}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          subtitle="Action required"
          className={pendingLeaves.length > 0 ? "border-amber-500/30 bg-amber-500/5" : ""}
        />
        <StatCard
          title="Monthly Payroll"
          value={formatCurrency(totalMonthlyPayroll || 146800)}
          icon={<CreditCard className="h-5 w-5 text-emerald-500" />}
          trend={{ value: "On Schedule", isPositive: true }}
        />
      </div>

      {/* Main Grid: Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Visual Status Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-bold">Today&apos;s Attendance & Punctuality</CardTitle>
              <CardDescription>Live biometric and web check-in breakdown</CardDescription>
            </div>
            <Link href="/dashboard/attendance" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
              View full tracker <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {/* Visual Segmented Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
                <span>Workforce Attendance Pulse</span>
                <span className="font-bold text-foreground">{attendanceRate}% Active Onsite/Remote</span>
              </div>
              <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${(attendanceRecords.filter(r => r.status === 'present').length / totalEmployees) * 100}%` }}
                  className="bg-emerald-500 h-full transition-all"
                  title="On Time"
                />
                <div
                  style={{ width: `${(attendanceRecords.filter(r => r.status === 'late').length / totalEmployees) * 100}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title="Late Check-in"
                />
                <div
                  style={{ width: `${(attendanceRecords.filter(r => r.status === 'half_day').length / totalEmployees) * 100}%` }}
                  className="bg-blue-500 h-full transition-all"
                  title="Half Day"
                />
                <div
                  style={{ width: `${(attendanceRecords.filter(r => r.status === 'on_leave').length / totalEmployees) * 100}%` }}
                  className="bg-purple-500 h-full transition-all"
                  title="On Leave"
                />
                <div
                  style={{ width: `${(attendanceRecords.filter(r => r.status === 'absent').length / totalEmployees) * 100}%` }}
                  className="bg-rose-500 h-full transition-all"
                  title="Absent"
                />
              </div>
            </div>

            {/* Attendance Legend Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="rounded-lg border bg-muted/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-semibold mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> On-Time
                </div>
                <p className="text-xl font-bold text-foreground">
                  {attendanceRecords.filter((r) => r.status === "present").length}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 font-semibold mb-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Late
                </div>
                <p className="text-xl font-bold text-foreground">
                  {attendanceRecords.filter((r) => r.status === "late").length}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-blue-600 font-semibold mb-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Half Day
                </div>
                <p className="text-xl font-bold text-foreground">
                  {attendanceRecords.filter((r) => r.status === "half_day").length}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-purple-600 font-semibold mb-1">
                  <span className="h-2 w-2 rounded-full bg-purple-500" /> On Leave
                </div>
                <p className="text-xl font-bold text-foreground">
                  {attendanceRecords.filter((r) => r.status === "on_leave").length}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3 text-center col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 font-semibold mb-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Absent
                </div>
                <p className="text-xl font-bold text-foreground">
                  {attendanceRecords.filter((r) => r.status === "absent").length}
                </p>
              </div>
            </div>

            {/* Simulated 6-Month Headcount Growth Curve */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" /> 6-Month Organization Headcount Trajectory
                </p>
                <span className="text-[11px] text-emerald-600 font-medium">+18 Net New Hires</span>
              </div>
              <div className="grid grid-cols-6 gap-2 text-center text-xs">
                {[
                  { month: "Apr", count: 104, height: "60%" },
                  { month: "May", count: 110, height: "66%" },
                  { month: "Jun", count: 118, height: "74%" },
                  { month: "Jul", count: 125, height: "80%" },
                  { month: "Aug", count: 138, height: "90%" },
                  { month: "Sep", count: 149, height: "100%" },
                ].map((item) => (
                  <div key={item.month} className="flex flex-col items-center gap-1.5">
                    <div className="w-full bg-muted rounded-t h-20 flex items-end justify-center p-1">
                      <div
                        style={{ height: item.height }}
                        className="w-full bg-primary/70 hover:bg-primary rounded-t transition-all"
                        title={`${item.count} Employees`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">{item.month}</span>
                    <span className="text-[10px] text-foreground font-bold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution & Budgets Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base font-bold">Department Strength</CardTitle>
                <CardDescription>Top divisions by headcount</CardDescription>
              </div>
              <Link href="/dashboard/departments" className="text-xs text-primary hover:underline">
                All ({departments.length})
              </Link>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              {topDepartments.map((dept) => (
                <div key={dept.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      {dept.name}
                    </span>
                    <span className="text-muted-foreground font-medium">{dept.employeeCount} staff</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      style={{ width: `${(dept.employeeCount / totalEmployees) * 100}%` }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </div>

          <div className="p-6 pt-0 border-t mt-4">
            <div className="rounded-lg bg-muted/40 p-3 mt-4 text-xs flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Allocated Budget</p>
                <p className="font-bold text-sm text-foreground">{formatCurrency(2320000)}</p>
              </div>
              <Link href="/dashboard/reports">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Cost Analytics
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Pending Actions vs Recent Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Action Items & Leave Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Pending Leave Approvals
              </CardTitle>
              <CardDescription>Direct manager review required</CardDescription>
            </div>
            <Link href="/dashboard/leave" className="text-xs text-primary hover:underline">
              View all requests →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                All pending leave applications have been resolved!
              </div>
            ) : (
              pendingLeaves.map((req) => (
                <div
                  key={req.id}
                  className="rounded-lg border bg-card p-3 shadow-sm hover:border-border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <Avatar src={req.avatarUrl} name={req.employeeName} size="sm" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{req.employeeName}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        <span className="capitalize font-medium text-foreground">{req.leaveType} Leave</span> • {req.daysCount} Days ({formatDate(req.startDate)} - {formatDate(req.endDate)})
                      </p>
                      <p className="text-muted-foreground text-[11px] italic mt-1 line-clamp-1">
                        &quot;{req.reason}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    <Button
                      size="sm"
                      variant="emerald"
                      className="h-7 px-2.5 text-xs font-semibold"
                      onClick={() => {
                        approveLeaveRequest(req.id);
                        toast.success("Leave Approved", `${req.employeeName}'s ${req.daysCount}-day request is approved.`);
                      }}
                    >
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-7 px-2.5 text-xs font-semibold"
                      onClick={() => {
                        rejectLeaveRequest(req.id, "Operational constraint");
                        toast.error("Leave Declined", `Declined leave request for ${req.employeeName}.`);
                      }}
                    >
                      <XCircle className="mr-1 h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Platform Activity Trail */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">Recent System Audit Log</CardTitle>
              <CardDescription>Live administrative events and changes</CardDescription>
            </div>
            <Link href="/dashboard/audit-logs" className="text-xs text-primary hover:underline">
              Full audit trail →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3 text-xs">
                <Avatar src={log.userAvatar} name={log.userName} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{log.userName}</p>
                    <span className="text-[10px] text-muted-foreground">{log.timestamp}</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">{log.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
