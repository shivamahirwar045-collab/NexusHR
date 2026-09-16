"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import {
  CalendarOff,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Check,
  X,
  FileText,
  Search,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { LeaveType, LeaveRequest } from "@/types";

export default function LeavePage() {
  const { leaveRequests, employees, approveLeaveRequest, rejectLeaveRequest, addLeaveRequest, currentUser } = useApp();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [detailModalItem, setDetailModalItem] = useState<LeaveRequest | null>(null);

  // Form State for Leave Application
  const [formData, setFormData] = useState({
    employeeId: "emp-4",
    employeeName: currentUser.name,
    employeeCode: "EMP-1004",
    departmentName: "People & Human Resources",
    avatarUrl: currentUser.avatarUrl,
    leaveType: "annual" as LeaveType,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    daysCount: 3,
    reason: "",
    attachmentName: "",
  });

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesQuery =
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || req.status === selectedStatus;
    const matchesType = selectedType === "all" || req.leaveType === selectedType;

    return matchesQuery && matchesStatus && matchesType;
  });

  // Top summary numbers
  const totalRequests = leaveRequests.length;
  const pendingCount = leaveRequests.filter((r) => r.status === "pending").length;
  const approvedCount = leaveRequests.filter((r) => r.status === "approved").length;
  const rejectedCount = leaveRequests.filter((r) => r.status === "rejected").length;

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reason) {
      toast.error("Reason Required", "Please provide a brief reason for your leave request.");
      return;
    }

    addLeaveRequest(formData);
    toast.success("Leave Request Submitted", "Your request has been queued for manager approval.");
    setRequestModalOpen(false);
    setFormData({
      ...formData,
      reason: "",
      attachmentName: "",
    });
  };

  const getStatusBadge = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "pending":
        return <Badge variant="warning">Pending Review</Badge>;
      case "rejected":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Leave & PTO Management"
        description="Review time-off applications, manage vacation balances, and authorize employee PTO."
      >
        <Button onClick={() => setRequestModalOpen(true)} size="sm" className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25">
          <Plus className="h-4 w-4" />
          Request Leave
        </Button>
      </PageHeader>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Annual Policy Quota</p>
          <p className="text-2xl font-bold mt-1 text-foreground">24 Days</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Per full-time employee</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Pending Approvals</p>
          <p className="text-2xl font-bold mt-1 text-amber-600">{pendingCount}</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Awaiting decision</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Approved Days</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">{approvedCount}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Active / scheduled PTO</p>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Declined Requests</p>
          <p className="text-2xl font-bold mt-1 text-rose-600">{rejectedCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Operational conflicts</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by employee, reason, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-40">
            <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
          </div>

          <div className="w-40">
            <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Leave Types</option>
              <option value="annual">Annual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="paternity">Paternity</option>
              <option value="unpaid">Unpaid Leave</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Leave Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[260px]">Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Dates & Duration</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar src={req.avatarUrl} name={req.employeeName} size="sm" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">{req.employeeName}</p>
                      <p className="text-[11px] text-muted-foreground">{req.departmentName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-xs capitalize bg-muted/60 px-2 py-0.5 rounded">
                    {req.leaveType}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatDate(req.startDate)} → {formatDate(req.endDate)}
                </TableCell>
                <TableCell className="text-xs font-bold text-foreground">{req.daysCount} Days</TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate" title={req.reason}>
                  {req.reason}
                </TableCell>
                <TableCell>{getStatusBadge(req.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {req.status === "pending" ? (
                      <>
                        <Button
                          size="sm"
                          variant="emerald"
                          onClick={() => {
                            approveLeaveRequest(req.id);
                            toast.success("Approved", `Leave application for ${req.employeeName} is approved.`);
                          }}
                          className="h-7 px-2 text-xs"
                        >
                          <Check className="h-3.5 w-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            rejectLeaveRequest(req.id);
                            toast.error("Declined", `Leave application for ${req.employeeName} declined.`);
                          }}
                          className="h-7 px-2 text-xs"
                        >
                          <X className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDetailModalItem(req)}
                        className="h-7 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Details
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Leave Application Modal */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Leave / PTO Application</DialogTitle>
            <DialogDescription>
              Select your leave category and date range for administrative approval.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Leave Type *</label>
              <Select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as LeaveType })}
              >
                <option value="annual">Annual / Vacation Leave</option>
                <option value="sick">Sick / Medical Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="paternity">Paternity Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Start Date *</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">End Date *</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Total Working Days</label>
              <Input
                type="number"
                value={formData.daysCount}
                onChange={(e) => setFormData({ ...formData, daysCount: Number(e.target.value) })}
                min={1}
                max={30}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Reason / Comments *</label>
              <Input
                placeholder="Describe reason for time-off..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRequestModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-semibold">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={Boolean(detailModalItem)} onOpenChange={(open) => !open && setDetailModalItem(null)}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>Full record summary and audit notes</DialogDescription>
          </DialogHeader>

          {detailModalItem && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Employee</span>
                <span className="font-semibold text-foreground">{detailModalItem.employeeName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Leave Classification</span>
                <span className="font-semibold capitalize">{detailModalItem.leaveType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Duration</span>
                <span>{formatDate(detailModalItem.startDate)} to {formatDate(detailModalItem.endDate)} ({detailModalItem.daysCount} days)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Status</span>
                <span>{getStatusBadge(detailModalItem.status)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Reason Stated:</span>
                <p className="rounded bg-muted p-2 font-medium">{detailModalItem.reason}</p>
              </div>
              {detailModalItem.reviewedBy && (
                <div className="border-t pt-2 text-[11px] text-muted-foreground">
                  Reviewed by <strong>{detailModalItem.reviewedBy}</strong> on {formatDate(detailModalItem.reviewedAt || "")}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDetailModalItem(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
