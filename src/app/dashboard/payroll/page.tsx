"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { PayslipModal } from "@/components/shared/PayslipModal";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CreditCard,
  Download,
  Eye,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  FileSpreadsheet,
  Zap,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { PayrollRecord } from "@/types";

export default function PayrollPage() {
  const { payrollRecords, processPayroll } = useApp();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredRecords = payrollRecords.filter((rec) => {
    const matchesQuery =
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = selectedMonth === "all" || rec.monthYear === selectedMonth;
    const matchesStatus = selectedStatus === "all" || rec.status === selectedStatus;

    return matchesQuery && matchesMonth && matchesStatus;
  });

  // Summary Metrics
  const totalPayrollGross = payrollRecords.reduce((acc, r) => acc + r.baseSalary + r.allowances + r.bonus, 0);
  const totalPayrollNet = payrollRecords.reduce((acc, r) => acc + r.netPay, 0);
  const paidCount = payrollRecords.filter((r) => r.status === "paid").length;
  const pendingCount = payrollRecords.filter((r) => r.status === "pending").length;

  const handleProcessBatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processPayroll("September 2026");
      setIsProcessing(false);
      toast.success("Payroll Batch Processed", "September 2026 disbursements successfully initiated.");
    }, 800);
  };

  const handleExportBatch = () => {
    toast.success("Payroll Register Exported", "Exported complete salary disbursement schedule to CSV.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Payroll & Compensation Management"
        description="Calculate monthly net earnings, manage direct deposits, and generate electronic payslips."
      >
        <Button variant="outline" size="sm" onClick={handleExportBatch} className="gap-2 text-xs font-semibold">
          <Download className="h-4 w-4" />
          Export Register
        </Button>
        <Button
          onClick={handleProcessBatch}
          disabled={pendingCount === 0 || isProcessing}
          isLoading={isProcessing}
          size="sm"
          className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25"
        >
          <Zap className="h-4 w-4" />
          Process September Batch ({pendingCount})
        </Button>
      </PageHeader>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Total Gross Compensation</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{formatCurrency(totalPayrollGross)}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Base + Allowances + Bonuses</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Total Net Disbursed</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">{formatCurrency(totalPayrollNet)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">After statutory withholdings</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Paid Employees</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{paidCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Direct deposit completed</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
          <p className="text-2xl font-bold mt-1 text-amber-600">{pendingCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Awaiting payout authorization</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by employee, department, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-44">
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="all">All Pay Cycles</option>
              <option value="September 2026">September 2026</option>
              <option value="August 2026">August 2026</option>
            </Select>
          </div>

          <div className="w-36">
            <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="paid">Disbursed (Paid)</option>
              <option value="pending">Pending</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Payroll Records Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[260px]">Employee</TableHead>
              <TableHead>Pay Cycle</TableHead>
              <TableHead>Gross Earnings</TableHead>
              <TableHead>Deductions</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Payslip Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((rec) => {
              const gross = rec.baseSalary + rec.allowances + rec.bonus;
              const deductions = rec.deductions + rec.tax;

              return (
                <TableRow key={rec.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar src={rec.avatarUrl} name={rec.employeeName} size="sm" />
                      <div>
                        <p className="font-semibold text-foreground text-xs">{rec.employeeName}</p>
                        <p className="text-[11px] text-muted-foreground">{rec.employeeCode} • {rec.departmentName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{rec.monthYear}</TableCell>
                  <TableCell className="text-xs font-semibold text-foreground">{formatCurrency(gross)}</TableCell>
                  <TableCell className="text-xs font-medium text-destructive">-{formatCurrency(deductions)}</TableCell>
                  <TableCell className="text-xs font-bold text-primary">{formatCurrency(rec.netPay)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{rec.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant={rec.status === "paid" ? "success" : "warning"}>
                      {rec.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPayslip(rec)}
                      className="text-xs h-8 gap-1.5"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Payslip
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Payslip Modal */}
      <PayslipModal
        record={selectedPayslip}
        open={Boolean(selectedPayslip)}
        onOpenChange={(open) => !open && setSelectedPayslip(null)}
      />
    </div>
  );
}
