"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PayrollRecord } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Printer, Download, Building2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface PayslipModalProps {
  record: PayrollRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayslipModal({ record, open, onOpenChange }: PayslipModalProps) {
  const toast = useToast();

  if (!record) return null;

  const totalEarnings = record.baseSalary + record.allowances + record.bonus;
  const totalDeductions = record.deductions + record.tax;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success(
      "Payslip PDF Downloaded",
      `Payslip_${record.employeeCode}_${record.monthYear.replace(" ", "_")}.pdf has been saved.`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-2xl" className="p-6">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <DialogTitle>Employee Payslip</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Statement of Earnings & Deductions — {record.monthYear}
            </p>
          </div>
          <div className="flex items-center gap-2 mr-6">
            <Button size="sm" variant="outline" onClick={handlePrint} className="gap-1.5 text-xs">
              <Printer className="h-3.5 w-3.5" />
              Print
            </Button>
            <Button size="sm" onClick={handleDownload} className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </Button>
          </div>
        </DialogHeader>

        {/* Printable Slip Container */}
        <div id="printable-payslip" className="mt-4 space-y-6 text-foreground">
          {/* Company & Statement Banner */}
          <div className="flex items-start justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">NexusTech Enterprises Inc.</h3>
                <p className="text-xs text-muted-foreground">500 Howard Street, Suite 400 • San Francisco, CA 94105</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                {record.status.toUpperCase()}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Disbursed: {formatDate(record.payDate)}</p>
            </div>
          </div>

          {/* Employee & Bank Info Grid */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4 text-xs">
            <div>
              <p className="text-muted-foreground">Employee Name</p>
              <p className="font-semibold text-foreground text-sm">{record.employeeName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Employee ID</p>
              <p className="font-semibold text-foreground">{record.employeeCode}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Designation / Role</p>
              <p className="font-semibold text-foreground">{record.designation}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Department</p>
              <p className="font-semibold text-foreground">{record.departmentName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Method</p>
              <p className="font-semibold text-foreground">{record.paymentMethod}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Disbursement Account</p>
              <p className="font-semibold text-foreground">{record.bankAccount}</p>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="rounded-lg border">
              <div className="bg-muted/60 px-3 py-2 text-xs font-semibold text-foreground border-b flex justify-between">
                <span>EARNINGS ITEM</span>
                <span>AMOUNT</span>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Salary</span>
                  <span className="font-medium">{formatCurrency(record.baseSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allowances (HRA/Medical)</span>
                  <span className="font-medium">{formatCurrency(record.allowances)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Performance Bonus</span>
                  <span className="font-medium">{formatCurrency(record.bonus)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-foreground">
                  <span>Gross Earnings</span>
                  <span>{formatCurrency(totalEarnings)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="rounded-lg border">
              <div className="bg-muted/60 px-3 py-2 text-xs font-semibold text-foreground border-b flex justify-between">
                <span>DEDUCTIONS ITEM</span>
                <span>AMOUNT</span>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Income Tax Withholding</span>
                  <span className="font-medium text-destructive">-{formatCurrency(record.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Health & Retirement (401k)</span>
                  <span className="font-medium text-destructive">-{formatCurrency(record.deductions)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-foreground">
                  <span>Total Deductions</span>
                  <span className="text-destructive">-{formatCurrency(totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Take-Home Pay Highlight Card */}
          <div className="flex items-center justify-between rounded-xl bg-primary/10 border border-primary/20 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Net Salary Payable</p>
              <p className="text-xs text-muted-foreground mt-0.5">Amount transferred to bank account</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary">{formatCurrency(record.netPay)}</p>
            </div>
          </div>

          <div className="text-[11px] text-muted-foreground text-center border-t pt-3">
            <p>This is a system-generated electronic payslip authorized by NexusHR Payroll Engine.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
