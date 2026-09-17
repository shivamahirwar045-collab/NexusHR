"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { reportTypes } from "@/lib/mock-data/reports";
import { formatDate } from "@/lib/utils";
import {
  FileBarChart,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter,
  Play,
  CheckCircle2,
  Users,
  Clock,
  DollarSign,
  Building2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function ReportsPage() {
  const toast = useToast();

  const [selectedReportId, setSelectedReportId] = useState(reportTypes[0].id);
  const [dateRange, setDateRange] = useState("last_30");
  const [isGenerating, setIsGenerating] = useState(false);

  const activeReport = reportTypes.find((r) => r.id === selectedReportId) || reportTypes[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(
        "Report Compiled",
        `${activeReport.title} has been generated with latest data.`
      );
    }, 900);
  };

  const handleExportCSV = (title: string) => {
    toast.success("CSV Generated", `${title.replace(/\s+/g, "_")}.csv downloaded successfully.`);
  };

  const handleExportPDF = (title: string) => {
    toast.success("PDF Generated", `${title.replace(/\s+/g, "_")}.pdf downloaded successfully.`);
  };

  const getReportIcon = (category: string) => {
    switch (category) {
      case "Employees":
        return <Users className="h-5 w-5 text-primary" />;
      case "Attendance":
        return <Clock className="h-5 w-5 text-emerald-500" />;
      case "Payroll":
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case "Departments":
        return <Building2 className="h-5 w-5 text-purple-500" />;
      default:
        return <FileBarChart className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Compliance Reports"
        description="Generate standard HR reports, download compliance spreadsheets, and analyze workforce trends."
      />

      {/* Report Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((rep) => {
          const isSelected = rep.id === selectedReportId;
          return (
            <div
              key={rep.id}
              onClick={() => setSelectedReportId(rep.id)}
              className={`rounded-xl border p-5 cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                  : "bg-card hover:border-border/80 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {getReportIcon(rep.category)}
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {rep.frequency}
                </Badge>
              </div>

              <h3 className="font-bold text-sm text-foreground mt-3">{rep.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rep.description}</p>

              <div className="flex items-center justify-between border-t pt-3 mt-4 text-[11px] text-muted-foreground">
                <span>Last run: {formatDate(rep.lastGenerated)}</span>
                <span className="font-semibold text-foreground">{rep.recordsCount} Rows</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Report Parameters & Generation Console */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <FileBarChart className="h-4 w-4 text-primary" />
                Configure: {activeReport.title}
              </CardTitle>
              <CardDescription>{activeReport.description}</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportCSV(activeReport.title)}
                className="gap-1.5 text-xs flex-1 sm:flex-initial"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" /> Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportPDF(activeReport.title)}
                className="gap-1.5 text-xs flex-1 sm:flex-initial"
              >
                <FileText className="h-3.5 w-3.5" /> Export PDF
              </Button>
              <Button
                size="sm"
                onClick={handleGenerate}
                isLoading={isGenerating}
                className="gap-1.5 text-xs font-semibold shadow-sm shadow-primary/20 w-full sm:w-auto"
              >
                <Play className="h-3.5 w-3.5" /> Compile Live Report
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Time Window / Range</label>
              <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="last_30">Last 30 Days (Rolling)</option>
                <option value="quarter_to_date">Quarter to Date (Q3 2026)</option>
                <option value="year_to_date">Year to Date (2026)</option>
                <option value="fiscal_prev">Previous Fiscal Year (2025)</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Department Filter</label>
              <Select defaultValue="all">
                <option value="all">All Company Departments</option>
                <option value="eng">Engineering & Technology</option>
                <option value="prod">Product & Design</option>
                <option value="sales">Sales & Enterprise Accounts</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Output Format Preset</label>
              <Select defaultValue="detailed">
                <option value="detailed">Executive Detailed Register</option>
                <option value="summary">Aggregated Group Summary</option>
                <option value="audit">Tax & Compliance Audit Only</option>
              </Select>
            </div>
          </div>

          {/* Sample Data Table Output Preview */}
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Compiled Sample Preview (12 Rows Active)
            </p>
            <div className="rounded-lg border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sample Metric Code</TableHead>
                    <TableHead>Category / Segment</TableHead>
                    <TableHead>Headcount</TableHead>
                    <TableHead>Benchmark Rate</TableHead>
                    <TableHead>Compliance Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-semibold">REP-SEG-01</TableCell>
                    <TableCell className="text-xs font-medium">Engineering & Platform</TableCell>
                    <TableCell className="text-xs">42 Active</TableCell>
                    <TableCell className="text-xs font-bold text-emerald-600">98.4% Attendance</TableCell>
                    <TableCell><Badge variant="success">Fully Compliant</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-semibold">REP-SEG-02</TableCell>
                    <TableCell className="text-xs font-medium">Product & UI/UX</TableCell>
                    <TableCell className="text-xs">16 Active</TableCell>
                    <TableCell className="text-xs font-bold text-emerald-600">96.2% Attendance</TableCell>
                    <TableCell><Badge variant="success">Fully Compliant</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs font-semibold">REP-SEG-03</TableCell>
                    <TableCell className="text-xs font-medium">Sales & Accounts</TableCell>
                    <TableCell className="text-xs">28 Active</TableCell>
                    <TableCell className="text-xs font-bold text-amber-600">94.0% Attendance</TableCell>
                    <TableCell><Badge variant="warning">Review Travel PTO</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
