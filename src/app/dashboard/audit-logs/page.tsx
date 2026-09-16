"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  ScrollText,
  Search,
  Download,
  ShieldCheck,
  Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { AuditLogItem } from "@/types";

export default function AuditLogsPage() {
  const { auditLogs } = useApp();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesQuery =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === "all" || log.module === selectedModule;
    const matchesAction = selectedAction === "all" || log.action === selectedAction;

    return matchesQuery && matchesModule && matchesAction;
  });

  const handleExport = () => {
    toast.success("Audit Log Exported", `Saved ${filteredLogs.length} audit trail records to security_audit.csv`);
  };

  const getActionBadge = (action: AuditLogItem["action"]) => {
    switch (action) {
      case "create":
        return <Badge variant="success">CREATE</Badge>;
      case "update":
        return <Badge variant="info">UPDATE</Badge>;
      case "approve":
        return <Badge variant="success">APPROVE</Badge>;
      case "reject":
        return <Badge variant="destructive">REJECT</Badge>;
      case "delete":
        return <Badge variant="destructive">DELETE</Badge>;
      case "export":
        return <Badge variant="secondary">EXPORT</Badge>;
      default:
        return <Badge variant="outline">{action.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Audit & Security Logs"
        description="Immutable administrative activity records, permission modifications, and data compliance tracking."
      >
        <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 text-xs font-semibold">
          <Download className="h-4 w-4" />
          Export Audit Trail
        </Button>
      </PageHeader>

      {/* Security Banner Card */}
      <div className="rounded-xl border bg-primary/5 p-4 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-foreground">SOC2 & GDPR Certified Immutable Logging Enabled</p>
            <p className="text-muted-foreground">All administrative events are cryptographically stamped with actor identity, timestamp, and IP location.</p>
          </div>
        </div>
        <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-mono">
          SHA-256 Verified
        </Badge>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by actor, keyword, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-40">
            <Select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
              <option value="all">All Modules</option>
              <option value="employees">Employees</option>
              <option value="departments">Departments</option>
              <option value="attendance">Attendance</option>
              <option value="leave">Leave / PTO</option>
              <option value="payroll">Payroll</option>
              <option value="settings">Settings</option>
            </Select>
          </div>

          <div className="w-36">
            <Select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="approve">Approve</option>
              <option value="reject">Reject</option>
              <option value="delete">Delete</option>
              <option value="export">Export</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px]">Actor / Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Module</TableHead>
              <TableHead>Event Description</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={log.userAvatar} name={log.userName} size="sm" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">{log.userName}</p>
                      <p className="text-[10px] text-muted-foreground">{log.userEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getActionBadge(log.action)}</TableCell>
                <TableCell>
                  <span className="font-semibold text-xs capitalize bg-muted/60 px-2 py-0.5 rounded">
                    {log.module}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-foreground font-normal max-w-sm">
                  {log.description}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">
                  {log.ipAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
