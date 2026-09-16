"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Search,
  Download,
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Users,
  Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Employee } from "@/types";

export default function EmployeesPage() {
  const { employees, departments, deleteEmployee, toggleEmployeeStatus } = useApp();
  const router = useRouter();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortField, setSortField] = useState<keyof Employee>("fullName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Deletion Modal State
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  // Filtered & Sorted Employees
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesQuery =
          emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.designation.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = selectedDepartment === "all" || emp.departmentId === selectedDepartment;
        const matchesStatus = selectedStatus === "all" || emp.status === selectedStatus;
        const matchesType = selectedType === "all" || emp.employmentType === selectedType;

        return matchesQuery && matchesDept && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        const valA = a[sortField] || "";
        const valB = b[sortField] || "";
        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortOrder === "asc" ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      });
  }, [employees, searchQuery, selectedDepartment, selectedStatus, selectedType, sortField, sortOrder]);

  const handleExportCSV = () => {
    toast.success("Export Complete", `Exported ${filteredEmployees.length} employee records to employees_roster.csv`);
  };

  const getStatusBadge = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "probation":
        return <Badge variant="warning">Probation</Badge>;
      case "on_leave":
        return <Badge variant="info">On Leave</Badge>;
      case "inactive":
      case "terminated":
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Employee Directory"
        description="Manage company personnel records, designations, department rosters, and onboarding statuses."
      >
        <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2 text-xs font-semibold">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        <Link href="/dashboard/employees/new">
          <Button size="sm" className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </PageHeader>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex-1 min-w-[240px]">
          <Input
            placeholder="Search by employee name, ID, email, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-40">
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-36">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="probation">Probation</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>

          <div className="w-36">
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full_time">Full-Time</option>
              <option value="part_time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </Select>
          </div>

          {(searchQuery || selectedDepartment !== "all" || selectedStatus !== "all" || selectedType !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment("all");
                setSelectedStatus("all");
                setSelectedType("all");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Employees Table */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No employees match your search"
          description="Try adjusting your keywords, department selection, or status filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery("");
            setSelectedDepartment("all");
            setSelectedStatus("all");
            setSelectedType("all");
          }}
        />
      ) : (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[280px]">Employee</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="cursor-pointer group">
                  <TableCell
                    onClick={() => router.push(`/dashboard/employees/${emp.id}`)}
                    className="font-medium"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar src={emp.avatarUrl} name={emp.fullName} size="sm" />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {emp.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                    <span className="font-mono text-xs font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                      {emp.employeeCode}
                    </span>
                  </TableCell>
                  <TableCell onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                    <span className="text-xs font-medium text-foreground">{emp.departmentName}</span>
                  </TableCell>
                  <TableCell onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                    <span className="text-xs text-muted-foreground">{emp.designation}</span>
                  </TableCell>
                  <TableCell onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                    {getStatusBadge(emp.status)}
                  </TableCell>
                  <TableCell onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                    <span className="text-xs text-muted-foreground">{formatDate(emp.joiningDate)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      trigger={
                        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      }
                    >
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/employees/${emp.id}`)}>
                        <Eye className="mr-2 h-3.5 w-3.5" /> View Profile
                      </DropdownMenuItem>

                      {emp.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => {
                            toggleEmployeeStatus(emp.id, "inactive");
                            toast.info("Status Changed", `${emp.fullName} marked as inactive.`);
                          }}
                        >
                          <XCircle className="mr-2 h-3.5 w-3.5 text-amber-500" /> Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => {
                            toggleEmployeeStatus(emp.id, "active");
                            toast.success("Status Changed", `${emp.fullName} marked as active.`);
                          }}
                        >
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-emerald-500" /> Activate
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        destructive
                        onClick={() => setDeleteTarget(emp)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Record
                      </DropdownMenuItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Table Footer Summary */}
          <div className="border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> total employees
            </span>
            <span className="font-medium">Page 1 of 1</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Employee Delete */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Employee Record?"
        description={`Are you sure you want to delete ${deleteTarget?.fullName} (${deleteTarget?.employeeCode})? This will remove all their associated profile records.`}
        confirmText="Yes, Delete Record"
        onConfirm={() => {
          if (deleteTarget) {
            deleteEmployee(deleteTarget.id);
            toast.success("Employee Deleted", `${deleteTarget.fullName} was deleted from database.`);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
