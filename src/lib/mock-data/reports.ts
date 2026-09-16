export interface ReportDefinition {
  id: string;
  title: string;
  category: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  recordsCount: number;
}

export const reportTypes: ReportDefinition[] = [
  {
    id: "rep-employees",
    title: "Employee Demographics & Headcount",
    category: "Employees",
    description: "Detailed breakdown of employee headcounts, department distribution, designations, and tenure.",
    frequency: "Monthly",
    lastGenerated: "2026-09-01",
    recordsCount: 12,
  },
  {
    id: "rep-attendance",
    title: "Monthly Attendance & Punctuality Summary",
    category: "Attendance",
    description: "Calculates total working hours, punctuality percentages, overtime logs, and attendance anomalies.",
    frequency: "Monthly",
    lastGenerated: "2026-09-10",
    recordsCount: 340,
  },
  {
    id: "rep-leave",
    title: "Leave Utilization & Balances",
    category: "Leave / PTO",
    description: "Tracks allocated, taken, and remaining leave quotas categorized by leave types across departments.",
    frequency: "Quarterly",
    lastGenerated: "2026-09-12",
    recordsCount: 48,
  },
  {
    id: "rep-payroll",
    title: "Payroll Register & Tax Deductions",
    category: "Payroll",
    description: "Gross to net compensation reconciliation, tax withholdings, bonuses, and payment audit logs.",
    frequency: "Monthly",
    lastGenerated: "2026-08-31",
    recordsCount: 12,
  },
  {
    id: "rep-department",
    title: "Department Budget & Cost Allocation",
    category: "Departments",
    description: "Compares allocated department budgets against active personnel headcount costs and hiring plans.",
    frequency: "Quarterly",
    lastGenerated: "2026-09-05",
    recordsCount: 7,
  },
];
