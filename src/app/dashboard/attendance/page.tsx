"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import {
  CalendarCheck,
  Search,
  Download,
  Calendar as CalendarIcon,
  List,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { AttendanceStatus } from "@/types";

export default function AttendancePage() {
  const { attendanceRecords, departments, employees, markAttendance } = useApp();
  const toast = useToast();

  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September (0-indexed 8)

  // Filtered attendance
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((rec) => {
      const matchesQuery =
        rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "all" || rec.departmentName === selectedDept;
      const matchesStatus = selectedStatus === "all" || rec.status === selectedStatus;

      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [attendanceRecords, searchQuery, selectedDept, selectedStatus]);

  // Statistics
  const totalCount = attendanceRecords.length;
  const presentCount = attendanceRecords.filter((r) => r.status === "present").length;
  const lateCount = attendanceRecords.filter((r) => r.status === "late").length;
  const halfDayCount = attendanceRecords.filter((r) => r.status === "half_day").length;
  const leaveCount = attendanceRecords.filter((r) => r.status === "on_leave").length;
  const absentCount = attendanceRecords.filter((r) => r.status === "absent").length;

  const handleExport = () => {
    toast.success("Attendance Report Exported", "Monthly attendance matrix saved to CSV.");
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge variant="success">Present</Badge>;
      case "late":
        return <Badge variant="warning">Late (Logged)</Badge>;
      case "half_day":
        return <Badge variant="info">Half Day</Badge>;
      case "on_leave":
        return <Badge variant="secondary">On Leave</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calendar mock days generator for September 2026
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const isWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 1; // Approx weekend
    const isToday = day === 16;
    return {
      day,
      date: `2026-09-${day < 10 ? `0${day}` : day}`,
      isWeekend,
      isToday,
      status: isWeekend ? "weekend" : day === 16 ? "present" : day === 9 ? "absent" : day === 15 ? "on_leave" : "present",
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Attendance & Punctuality Tracker"
        description="Daily biometric log validation, check-in records, shift schedules, and monthly calendar attendance."
      >
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg border bg-muted p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "table" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" /> Table View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === "calendar" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarIcon className="h-3.5 w-3.5" /> Calendar View
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 text-xs font-semibold">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </PageHeader>

      {/* 5 Top Attendance Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>On-Time Present</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-foreground">{presentCount}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Regular shifts</span>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Late Check-in</span>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-foreground">{lateCount}</p>
          <span className="text-[11px] text-amber-600 font-semibold">&gt; 15 mins delay</span>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Half Day Shifts</span>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-foreground">{halfDayCount}</p>
          <span className="text-[11px] text-blue-600 font-semibold">4.0 hrs logged</span>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>On Leave</span>
            <CalendarCheck className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-foreground">{leaveCount}</p>
          <span className="text-[11px] text-purple-600 font-semibold">Approved PTO</span>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Absent Unexcused</span>
            <XCircle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-foreground">{absentCount}</p>
          <span className="text-[11px] text-rose-600 font-semibold">No notification</span>
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW */}
      {viewMode === "table" && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search by employee name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-44">
                <Select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                  <option value="all">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="w-36">
                <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="all">All Statuses</option>
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="half_day">Half Day</option>
                  <option value="on_leave">On Leave</option>
                  <option value="absent">Absent</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[260px]">Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks / Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar src={rec.avatarUrl} name={rec.employeeName} size="sm" />
                        <div>
                          <p className="font-semibold text-foreground text-xs">{rec.employeeName}</p>
                          <p className="text-[11px] text-muted-foreground">{rec.employeeCode}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{rec.departmentName}</TableCell>
                    <TableCell className="text-xs font-medium">{formatDate(rec.date)}</TableCell>
                    <TableCell className="text-xs">{rec.checkIn || "--"}</TableCell>
                    <TableCell className="text-xs">{rec.checkOut || "--"}</TableCell>
                    <TableCell className="text-xs font-semibold">
                      {rec.workingHours ? `${rec.workingHours} hrs` : "--"}
                    </TableCell>
                    <TableCell>{getStatusBadge(rec.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{rec.notes || "Standard shift"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* VIEW 2: CALENDAR VIEW */}
      {viewMode === "calendar" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-bold">September 2026 Workforce Attendance Heatmap</CardTitle>
              <p className="text-xs text-muted-foreground">Select date to inspect shift logs and roster density</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs font-bold">September 2026</span>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="font-bold text-muted-foreground py-2 border-b">
                  {d}
                </div>
              ))}

              {calendarDays.map((cal) => (
                <div
                  key={cal.day}
                  className={`min-h-[85px] rounded-lg border p-2 text-left flex flex-col justify-between transition-colors ${
                    cal.isToday
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : cal.isWeekend
                      ? "bg-muted/30 border-dashed opacity-60"
                      : "bg-card hover:border-border"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-xs ${cal.isToday ? "text-primary" : "text-foreground"}`}>
                      {cal.day}
                    </span>
                    {cal.isToday && (
                      <span className="text-[10px] bg-primary text-primary-foreground font-bold px-1.5 py-0.2 rounded">
                        Today
                      </span>
                    )}
                  </div>

                  {!cal.isWeekend && (
                    <div className="space-y-1 mt-1">
                      <div className="text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold px-1 py-0.5 rounded truncate">
                        ✓ 95% Present
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        141 / 149 Active
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
