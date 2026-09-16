"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Building2,
  Plus,
  Users,
  DollarSign,
  Search,
  MoreVertical,
  Trash2,
  Edit2,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Department } from "@/types";

export default function DepartmentsPage() {
  const { departments, addDepartment, updateDepartment, deleteDepartment, employees } = useApp();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    description: string;
    managerName: string;
    budget: number;
    status: "active" | "archived";
  }>({
    name: "",
    code: "",
    description: "",
    managerName: "Sarah Jenkins",
    budget: 250000,
    status: "active",
  });

  const filteredDepartments = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.managerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({
      name: "",
      code: "",
      description: "",
      managerName: "Sarah Jenkins",
      budget: 250000,
      status: "active",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      code: dept.code,
      description: dept.description,
      managerName: dept.managerName,
      budget: dept.budget,
      status: dept.status,
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      toast.error("Validation Error", "Department name and code are required.");
      return;
    }

    if (editingDept) {
      updateDepartment(editingDept.id, formData);
      toast.success("Department Updated", `${formData.name} details have been updated.`);
    } else {
      addDepartment(formData);
      toast.success("Department Created", `${formData.name} is now available.`);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments & Cost Centers"
        description="Organize your company structure, allocate departmental budgets, and assign leadership."
      >
        <Button onClick={handleOpenAdd} size="sm" className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </PageHeader>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="w-full sm:w-96">
          <Input
            placeholder="Search departments or managers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <p className="text-xs text-muted-foreground hidden sm:block">
          Total Divisions: <strong>{departments.length}</strong>
        </p>
      </div>

      {/* Grid of Department Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="flex flex-col justify-between hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">{dept.name}</CardTitle>
                    <span className="font-mono text-[11px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      CODE: {dept.code}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEdit(dept)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(dept)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-xs line-clamp-2 mt-2">
                {dept.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 border-t mt-3">
              <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Department Lead</p>
                  <p className="font-semibold text-foreground truncate">{dept.managerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Staff Strength</p>
                  <p className="font-semibold text-foreground flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-primary" /> {dept.employeeCount} Members
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Allocated Budget</p>
                  <p className="font-semibold text-foreground">{formatCurrency(dept.budget)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Department Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingDept ? "Edit Department" : "Add New Department"}</DialogTitle>
            <DialogDescription>
              Configure organizational department attributes, code, and annual operational budget.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Department Name *</label>
              <Input
                placeholder="e.g. Artificial Intelligence Research"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Dept Code *</label>
                <Input
                  placeholder="e.g. AIR"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Annual Budget ($)</label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Department Lead / Manager</label>
              <Input
                placeholder="Manager full name"
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Description</label>
              <Input
                placeholder="Brief department scope..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="font-semibold">
                {editingDept ? "Save Changes" : "Create Department"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Department Confirmation */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Department?"
        description={`Are you sure you want to remove ${deleteTarget?.name}? Any employees assigned to this department should be re-assigned.`}
        confirmText="Delete Department"
        onConfirm={() => {
          if (deleteTarget) {
            deleteDepartment(deleteTarget.id);
            toast.success("Department Removed", `${deleteTarget.name} has been deleted.`);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
