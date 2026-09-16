"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  UploadCloud,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { EmploymentType, Gender, EmployeeStatus } from "@/types";

export default function AddEmployeePage() {
  const router = useRouter();
  const { departments, addEmployee } = useApp();
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "male" as Gender,
    avatarUrl: "",

    // Employment
    employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
    departmentId: departments[0]?.id || "dept-1",
    designation: "",
    joiningDate: new Date().toISOString().split("T")[0],
    employmentType: "full_time" as EmploymentType,
    managerName: "Alexander Wright",
    status: "active" as EmployeeStatus,

    // Location
    address: "",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    postalCode: "94105",

    // Salary
    baseSalary: 95000,
    paymentFrequency: "monthly" as const,
    bankName: "Chase Bank",
    accountNumber: "**** " + Math.floor(1000 + Math.random() * 9000),
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "baseSalary" ? Number(value) : value,
    }));
  };

  const handleSave = (addAnother: boolean = false) => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.designation) {
      toast.error("Required Fields Missing", "Please complete all required employee details marked with *.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const selectedDept = departments.find((d) => d.id === formData.departmentId);

      addEmployee({
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        departmentName: selectedDept?.name || "General Department",
        avatarUrl:
          formData.avatarUrl ||
          `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      });

      setIsLoading(false);
      toast.success(
        "Employee Onboarded!",
        `${formData.firstName} ${formData.lastName} has been added to ${selectedDept?.name || "the organization"}.`
      );

      if (addAnother) {
        setFormData({
          ...formData,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          employeeCode: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          designation: "",
        });
        setUploadedFileName(null);
      } else {
        router.push("/dashboard/employees");
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Link href="/dashboard/employees">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Directory
          </Button>
        </Link>
      </div>

      <PageHeader
        title="Add New Employee"
        description="Fill out the sections below to register and onboard a new team member."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
        className="space-y-6"
      >
        {/* Section 1: Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Personal Information
            </CardTitle>
            <CardDescription>Primary employee identity and contact records</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">First Name *</label>
              <Input
                name="firstName"
                placeholder="e.g. Liam"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Last Name *</label>
              <Input
                name="lastName"
                placeholder="e.g. Vance"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Work Email Address *</label>
              <Input
                name="email"
                type="email"
                placeholder="liam.vance@company.com"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Phone Number</label>
              <Input
                name="phone"
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={handleChange}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Date of Birth</label>
              <Input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                icon={<Calendar className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Gender</label>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non_binary">Non-Binary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" /> Employment & Role Details
            </CardTitle>
            <CardDescription>Department assignment, code, and reporting hierarchy</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Employee ID / Code *</label>
              <Input
                name="employeeCode"
                value={formData.employeeCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Department *</label>
              <Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Designation / Job Title *</label>
              <Input
                name="designation"
                placeholder="e.g. Senior Software Engineer"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Joining Date</label>
              <Input
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Employment Type</label>
              <Select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="full_time">Full-Time</option>
                <option value="part_time">Part-Time</option>
                <option value="contract">Contractor</option>
                <option value="internship">Intern</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Reporting Manager</label>
              <Input
                name="managerName"
                placeholder="Manager Name"
                value={formData.managerName}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Compensation & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" /> Compensation & Address
            </CardTitle>
            <CardDescription>Salary structure and residential details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Base Salary (Annual USD) *</label>
              <Input
                name="baseSalary"
                type="number"
                value={formData.baseSalary}
                onChange={handleChange}
                icon={<DollarSign className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Payment Frequency</label>
              <Select
                name="paymentFrequency"
                value={formData.paymentFrequency}
                onChange={handleChange}
              >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">Street Address</label>
              <Input
                name="address"
                placeholder="e.g. 500 Market Street, Suite 200"
                value={formData.address}
                onChange={handleChange}
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">City</label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Postal / Zip Code</label>
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Document Dropzone Mockup */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-primary" /> Compliance & Documents
            </CardTitle>
            <CardDescription>Upload candidate resume, government ID, or signed contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onClick={() => setUploadedFileName("Resume_Official_Signed.pdf")}
              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/40 transition-colors border-border/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-3">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {uploadedFileName ? (
                  <span className="text-emerald-600 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> {uploadedFileName} Attached
                  </span>
                ) : (
                  "Click to attach Resume or Government ID (PDF, DOCX up to 10MB)"
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag and drop files here to automatically attach to this employee profile
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t">
          <Link href="/dashboard/employees" className="w-full sm:w-auto">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Cancel
            </Button>
          </Link>
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleSave(true)}
            isLoading={isLoading}
            className="w-full sm:w-auto font-medium"
          >
            Save & Add Another
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full sm:w-auto font-semibold shadow-md shadow-primary/20"
          >
            Save Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
