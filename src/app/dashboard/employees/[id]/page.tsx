"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { PayslipModal } from "@/components/shared/PayslipModal";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Briefcase,
  DollarSign,
  FileText,
  Clock,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { PayrollRecord } from "@/types";

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { employees, attendanceRecords, leaveRequests, payrollRecords, toggleEmployeeStatus } = useApp();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);

  const employee = employees.find((e) => e.id === id) || employees[0];

  if (!employee) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Employee record not found.</p>
        <Link href="/dashboard/employees">
          <Button variant="outline" className="mt-4">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  // Employee-specific datasets
  const empAttendance = attendanceRecords.filter((a) => a.employeeId === employee.id || a.employeeName === employee.fullName);
  const empLeaves = leaveRequests.filter((l) => l.employeeId === employee.id || l.employeeName === employee.fullName);
  const empPayroll = payrollRecords.filter((p) => p.employeeId === employee.id || p.employeeName === employee.fullName);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active Employee</Badge>;
      case "probation":
        return <Badge variant="warning">On Probation</Badge>;
      case "on_leave":
        return <Badge variant="info">On Leave</Badge>;
      default:
        return <Badge variant="destructive">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Shortcut */}
      <div>
        <Link href="/dashboard/employees">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Employee Directory
          </Button>
        </Link>
      </div>

      {/* Header Profile Hero Card */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <Avatar
              src={employee.avatarUrl}
              name={employee.fullName}
              size="xl"
              className="ring-4 ring-primary/10 shadow-sm"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{employee.fullName}</h1>
                {getStatusBadge(employee.status)}
                <span className="font-mono text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {employee.employeeCode}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {employee.designation} • <span className="text-foreground">{employee.departmentName}</span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" /> {employee.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary" /> {employee.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {employee.city}, {employee.state}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            {employee.status === "active" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleEmployeeStatus(employee.id, "inactive");
                  toast.info("Status Changed", `${employee.fullName} marked as inactive.`);
                }}
                className="text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                <XCircle className="mr-1.5 h-3.5 w-3.5" /> Deactivate
              </Button>
            ) : (
              <Button
                variant="emerald"
                size="sm"
                onClick={() => {
                  toggleEmployeeStatus(employee.id, "active");
                  toast.success("Status Changed", `${employee.fullName} is now active.`);
                }}
                className="text-xs"
              >
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Activate Employee
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => toast.info("Profile Export", "Exported complete profile dossier as PDF.")}
              className="text-xs"
            >
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* 8-Tab Profile Management Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="attendance">Attendance ({empAttendance.length})</TabsTrigger>
          <TabsTrigger value="leave">Leave / PTO ({empLeaves.length})</TabsTrigger>
          <TabsTrigger value="payroll">Payroll ({empPayroll.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents (3)</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-6">
          {/* 3 Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Attendance Reliability</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">{employee.attendanceRate}%</p>
              <p className="text-[11px] text-muted-foreground mt-1">Excellent punctuality score</p>
            </div>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Remaining PTO Quota</p>
              <p className="text-2xl font-bold mt-1 text-primary">{employee.leaveBalance} Days</p>
              <p className="text-[11px] text-muted-foreground mt-1">From annual 24-day allocation</p>
            </div>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Performance Rating</p>
              <p className="text-2xl font-bold mt-1 text-foreground flex items-center gap-1">
                <Award className="h-5 w-5 text-amber-500" /> {employee.performanceRating || 4.8} / 5.0
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Q2 Performance Review: Exceeds Expectations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" /> Key Employment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Job Title</span>
                  <span className="font-semibold text-foreground">{employee.designation}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-semibold text-foreground">{employee.departmentName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Joining Date</span>
                  <span className="font-semibold text-foreground">{formatDate(employee.joiningDate)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Reporting Manager</span>
                  <span className="font-semibold text-foreground">{employee.managerName || "Direct Leadership"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Salary</span>
                  <span className="font-semibold text-foreground">{formatCurrency(employee.baseSalary)} / year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Recent Attendance Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {empAttendance.slice(0, 3).map((att) => (
                  <div key={att.id} className="flex items-center justify-between rounded-lg bg-muted/40 p-2.5">
                    <div>
                      <p className="font-semibold text-foreground">{formatDate(att.date)}</p>
                      <p className="text-[11px] text-muted-foreground">
                        In: {att.checkIn || "N/A"} • Out: {att.checkOut || "Active"}
                      </p>
                    </div>
                    <Badge variant={att.status === "present" ? "success" : att.status === "late" ? "warning" : "info"}>
                      {att.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: PERSONAL INFORMATION */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Personal & Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-semibold text-foreground text-sm">{employee.fullName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Gender</p>
                <p className="font-semibold text-foreground capitalize">{employee.gender.replace("_", " ")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-semibold text-foreground">{formatDate(employee.dateOfBirth)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Email Address</p>
                <p className="font-semibold text-foreground">{employee.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Phone Number</p>
                <p className="font-semibold text-foreground">{employee.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Residential Address</p>
                <p className="font-semibold text-foreground">
                  {employee.address}, {employee.city}, {employee.state} {employee.postalCode}, {employee.country}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: EMPLOYMENT */}
        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Employment & Organizational Structure</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <p className="text-muted-foreground">Employee ID Code</p>
                <p className="font-semibold text-foreground text-sm">{employee.employeeCode}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Department Assignment</p>
                <p className="font-semibold text-foreground text-sm">{employee.departmentName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Designation / Role</p>
                <p className="font-semibold text-foreground">{employee.designation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Employment Classification</p>
                <p className="font-semibold text-foreground capitalize">{employee.employmentType.replace("_", " ")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Official Joining Date</p>
                <p className="font-semibold text-foreground">{formatDate(employee.joiningDate)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Direct Supervisor</p>
                <p className="font-semibold text-foreground">{employee.managerName || "None"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: ATTENDANCE */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Attendance Record History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground text-xs">
                        No recorded attendance history for this employee.
                      </TableCell>
                    </TableRow>
                  ) : (
                    empAttendance.map((rec) => (
                      <TableRow key={rec.id}>
                        <TableCell className="font-medium text-xs">{formatDate(rec.date)}</TableCell>
                        <TableCell className="text-xs">{rec.checkIn || "--"}</TableCell>
                        <TableCell className="text-xs">{rec.checkOut || "--"}</TableCell>
                        <TableCell className="text-xs font-semibold">{rec.workingHours ? `${rec.workingHours} hrs` : "--"}</TableCell>
                        <TableCell>
                          <Badge variant={rec.status === "present" ? "success" : rec.status === "late" ? "warning" : "info"}>
                            {rec.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{rec.notes || "Regular check-in"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: LEAVE / PTO */}
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Leave Requests & PTO Quotas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empLeaves.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground text-xs">
                        No leave requests submitted yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    empLeaves.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-semibold text-xs capitalize">{req.leaveType} Leave</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(req.startDate)} - {formatDate(req.endDate)}
                        </TableCell>
                        <TableCell className="text-xs font-bold">{req.daysCount} Days</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{req.reason}</TableCell>
                        <TableCell>
                          <Badge variant={req.status === "approved" ? "success" : req.status === "pending" ? "warning" : "destructive"}>
                            {req.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: PAYROLL */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Compensation & Issued Payslips</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Gross</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Payslip Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empPayroll.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground text-xs">
                        No payroll records available for this cycle.
                      </TableCell>
                    </TableRow>
                  ) : (
                    empPayroll.map((pay) => (
                      <TableRow key={pay.id}>
                        <TableCell className="font-medium text-xs">{pay.monthYear}</TableCell>
                        <TableCell className="text-xs font-semibold">{formatCurrency(pay.baseSalary + pay.allowances + pay.bonus)}</TableCell>
                        <TableCell className="text-xs text-destructive">-{formatCurrency(pay.deductions + pay.tax)}</TableCell>
                        <TableCell className="text-xs font-bold text-primary">{formatCurrency(pay.netPay)}</TableCell>
                        <TableCell>
                          <Badge variant={pay.status === "paid" ? "success" : "warning"}>
                            {pay.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPayslip(pay)}
                            className="text-xs h-8 gap-1.5"
                          >
                            <Eye className="h-3.5 w-3.5" /> View Payslip
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 7: DOCUMENTS */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Uploaded Personnel Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: `${employee.firstName}_Resume_Curriculum_Vitae.pdf`, size: "1.4 MB", date: "2023-01-10" },
                { name: "Government_Issued_Identity_Passport.pdf", size: "3.2 MB", date: "2023-01-12" },
                { name: "Signed_Employment_NDA_Offer_Contract.pdf", size: "840 KB", date: "2023-01-15" },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between rounded-lg border bg-muted/20 p-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{doc.size} • Uploaded {formatDate(doc.date)}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Download Started", `Downloading ${doc.name}`)}
                    className="h-8 gap-1 text-xs"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 8: ACTIVITY LOG */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Employee Lifecycle & Audit Trail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-start gap-3 border-l-2 border-primary pl-4 pb-4">
                <div>
                  <p className="font-semibold text-foreground">Annual Performance Rating Finalized</p>
                  <p className="text-muted-foreground">Rating 4.8 / 5.0 submitted by Department Lead.</p>
                  <span className="text-[10px] text-muted-foreground">Aug 15, 2026</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-primary pl-4 pb-4">
                <div>
                  <p className="font-semibold text-foreground">Compensation Adjusted</p>
                  <p className="text-muted-foreground">Base salary updated to {formatCurrency(employee.baseSalary)}.</p>
                  <span className="text-[10px] text-muted-foreground">Jun 01, 2026</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-2 border-muted pl-4">
                <div>
                  <p className="font-semibold text-foreground">Employee Onboarded</p>
                  <p className="text-muted-foreground">Record created and workspace credentials dispatched.</p>
                  <span className="text-[10px] text-muted-foreground">{formatDate(employee.joiningDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payslip Modal */}
      <PayslipModal
        record={selectedPayslip}
        open={Boolean(selectedPayslip)}
        onOpenChange={(open) => !open && setSelectedPayslip(null)}
      />
    </div>
  );
}
