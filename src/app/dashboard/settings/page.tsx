"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Clock,
  CalendarOff,
  CreditCard,
  Bell,
  HelpCircle,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("company");
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [companySettings, setCompanySettings] = useState({
    name: "NexusTech Enterprises Inc.",
    email: "admin@company.com",
    phone: "+1 (555) 019-2834",
    address: "500 Howard Street, Suite 400",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    currency: "USD ($)",
    timezone: "America/Los_Angeles (PST)",
  });

  const [attendanceSettings, setAttendanceSettings] = useState({
    dailyHours: 8,
    lateThresholdMins: 15,
    halfDayThresholdHours: 4,
    autoCheckout: true,
    weekendWorkAllowed: false,
  });

  const [leaveSettings, setLeaveSettings] = useState({
    annualQuota: 24,
    sickQuota: 12,
    casualQuota: 6,
    carryOverDays: 5,
    requireAttachmentForSick: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailOnLeaveRequest: true,
    emailOnPayrollProcessed: true,
    emailOnAttendanceAnomaly: true,
    weeklyExecutiveDigest: true,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings Saved", "Your organization configurations have been updated successfully.");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Organization & System Settings"
        description="Configure your enterprise policies, default workflows, work shifts, and payroll configurations."
      >
        <Button onClick={handleSave} isLoading={isSaving} size="sm" className="gap-2 text-xs font-semibold shadow-sm shadow-primary/25">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="employee">Employee Rules</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Policies</TabsTrigger>
          <TabsTrigger value="leave">Leave / PTO Rules</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Config</TabsTrigger>
          <TabsTrigger value="notifications">Alert Preferences</TabsTrigger>
          <TabsTrigger value="help">Help & Docs</TabsTrigger>
        </TabsList>

        {/* TAB 1: COMPANY PROFILE */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Corporate Identity & Localization
              </CardTitle>
              <CardDescription>Primary organization profile and default currency/timezone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Legal Company Name</label>
                  <Input
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Primary Contact Email</label>
                  <Input
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Headquarters Phone</label>
                  <Input
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Default Operating Currency</label>
                  <Select
                    value={companySettings.currency}
                    onChange={(e) => setCompanySettings({ ...companySettings, currency: e.target.value })}
                  >
                    <option value="USD ($)">USD ($) - United States Dollar</option>
                    <option value="EUR (€)">EUR (€) - Euro</option>
                    <option value="GBP (£)">GBP (£) - British Pound</option>
                    <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                    <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-foreground">Headquarters Street Address</label>
                  <Input
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: EMPLOYEE RULES */}
        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Employee ID & Onboarding Rules
              </CardTitle>
              <CardDescription>Configure numbering schema and standard probation windows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Employee ID Format Prefix</label>
                  <Input defaultValue="EMP-#### (e.g. EMP-1001)" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Standard Probation Period</label>
                  <Select defaultValue="90">
                    <option value="30">30 Days (1 Month)</option>
                    <option value="60">60 Days (2 Months)</option>
                    <option value="90">90 Days (3 Months)</option>
                    <option value="180">180 Days (6 Months)</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: ATTENDANCE POLICIES */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Attendance & Shift Rules
              </CardTitle>
              <CardDescription>Punctuality thresholds, working hour quotas, and biometric validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Daily Shift Duration (Hours)</label>
                  <Input
                    type="number"
                    value={attendanceSettings.dailyHours}
                    onChange={(e) => setAttendanceSettings({ ...attendanceSettings, dailyHours: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Late Tolerance (Minutes)</label>
                  <Input
                    type="number"
                    value={attendanceSettings.lateThresholdMins}
                    onChange={(e) => setAttendanceSettings({ ...attendanceSettings, lateThresholdMins: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Half-Day Threshold (Hours)</label>
                  <Input
                    type="number"
                    value={attendanceSettings.halfDayThresholdHours}
                    onChange={(e) => setAttendanceSettings({ ...attendanceSettings, halfDayThresholdHours: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Auto Check-Out at End of Shift</p>
                    <p className="text-muted-foreground text-[11px]">Automatically mark standard 8-hour check-out if biometric ping is missing.</p>
                  </div>
                  <Switch
                    checked={attendanceSettings.autoCheckout}
                    onCheckedChange={(checked) => setAttendanceSettings({ ...attendanceSettings, autoCheckout: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: LEAVE / PTO */}
        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarOff className="h-4 w-4 text-primary" /> Leave Quotas & Approval Rules
              </CardTitle>
              <CardDescription>Standard annual time-off allowances by leave category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Annual Vacation Quota (Days)</label>
                  <Input
                    type="number"
                    value={leaveSettings.annualQuota}
                    onChange={(e) => setLeaveSettings({ ...leaveSettings, annualQuota: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Sick Leave Quota (Days)</label>
                  <Input
                    type="number"
                    value={leaveSettings.sickQuota}
                    onChange={(e) => setLeaveSettings({ ...leaveSettings, sickQuota: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Casual Leave Quota (Days)</label>
                  <Input
                    type="number"
                    value={leaveSettings.casualQuota}
                    onChange={(e) => setLeaveSettings({ ...leaveSettings, casualQuota: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Mandatory Medical Certificate for &gt; 2 Days Sick Leave</p>
                    <p className="text-muted-foreground text-[11px]">Require document upload attachment before submission.</p>
                  </div>
                  <Switch
                    checked={leaveSettings.requireAttachmentForSick}
                    onCheckedChange={(checked) => setLeaveSettings({ ...leaveSettings, requireAttachmentForSick: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: PAYROLL CONFIG */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" /> Payroll Schedule & Tax Modes
              </CardTitle>
              <CardDescription>Disbursement cycles and default statutory tax withholdings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Standard Pay Frequency</label>
                  <Select defaultValue="monthly">
                    <option value="monthly">Monthly (Last business day)</option>
                    <option value="biweekly">Bi-weekly (Every 2nd Friday)</option>
                    <option value="weekly">Weekly</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-foreground">Tax Withholding Engine Mode</label>
                  <Select defaultValue="auto">
                    <option value="auto">Automated Federal & State Tier Tables</option>
                    <option value="flat">Flat Percentage Statutory Rate</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 6: NOTIFICATIONS */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Email & In-App Notification Alerts
              </CardTitle>
              <CardDescription>Configure which events trigger automated administrator emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-foreground">New Leave Applications</p>
                    <p className="text-muted-foreground text-[11px]">Notify immediately when an employee requests time-off.</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailOnLeaveRequest}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailOnLeaveRequest: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-foreground">Payroll Batch Ready for Review</p>
                    <p className="text-muted-foreground text-[11px]">Send reminder 3 days before month-end payroll processing.</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailOnPayrollProcessed}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailOnPayrollProcessed: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-semibold text-foreground">Attendance Anomalies & Unexcused Absences</p>
                    <p className="text-muted-foreground text-[11px]">Alert managers when employees fail to check in without prior leave notice.</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailOnAttendanceAnomaly}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailOnAttendanceAnomaly: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Weekly Executive Workforce Digest</p>
                    <p className="text-muted-foreground text-[11px]">Receive summary email every Monday morning with headcount and attendance stats.</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyExecutiveDigest}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, weeklyExecutiveDigest: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 7: HELP & DOCS */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" /> Support & Documentation
              </CardTitle>
              <CardDescription>Knowledge base articles and HR administrator cheat sheets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 hover:bg-muted/30 transition-colors">
                  <h4 className="font-bold text-foreground">Quickstart: Onboarding New Employees</h4>
                  <p className="text-muted-foreground mt-1 text-[11px]">Step-by-step walkthrough of adding employees, generating access codes, and setting up payroll.</p>
                </div>
                <div className="rounded-xl border p-4 hover:bg-muted/30 transition-colors">
                  <h4 className="font-bold text-foreground">Setting Up Custom Leave Quotas</h4>
                  <p className="text-muted-foreground mt-1 text-[11px]">How to configure maternity, paternity, medical, and carry-over vacation policies.</p>
                </div>
                <div className="rounded-xl border p-4 hover:bg-muted/30 transition-colors">
                  <h4 className="font-bold text-foreground">Running Monthly Payroll & Taxes</h4>
                  <p className="text-muted-foreground mt-1 text-[11px]">Guide to reviewing allowances, deducting income taxes, and generating electronic payslips.</p>
                </div>
                <div className="rounded-xl border p-4 hover:bg-muted/30 transition-colors">
                  <h4 className="font-bold text-foreground">Audit Trail & Compliance Standards</h4>
                  <p className="text-muted-foreground mt-1 text-[11px]">Exporting security logs and maintaining SOC2 / GDPR workforce compliance.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
