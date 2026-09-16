# NexusHR — Modern B2B Workforce & Employee Management SaaS

NexusHR is a complete, production-grade **B2B Employee Management & HRMS SaaS Frontend** built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features

- **Public Marketing SaaS Landing Page**:
  - High-converting hero section with live dashboard pulse preview.
  - Features grid, 3-step onboarding workflow, ROI metrics, pricing plans, and footer.
- **Full Authentication Suite**:
  - Sign in with one-click demo accounts (HR Admin & VP Engineering).
  - Multi-field organization registration wizard.
  - Forgot password and reset password simulation.
- **Executive Workforce Dashboard**:
  - 5 KPI summary cards (Total Employees, Attendance Rate, On Leave, Pending Approvals, Monthly Payroll).
  - Attendance segmented progress bar & 6-month headcount trajectory chart.
  - Quick Attendance check-in action.
  - Inline leave approval workflows.
- **Employee Directory & Profiles**:
  - Filterable, searchable, and sortable directory table.
  - Multi-step Add Employee form with document dropzone mockup.
  - Deep 8-tab Employee Profile view (Overview, Personal, Employment, Attendance, Leave, Payroll, Documents, Activity).
- **Core Operations Modules**:
  - **Departments**: Add/Edit modal, department leads, and allocated budget tracking.
  - **Attendance**: Dual **Table View** and **Interactive Visual Monthly Calendar View**.
  - **Leave / PTO**: Policy quota counters, leave request modal, and inline approvals.
  - **Payroll**: Monthly disbursement register, batch processing action, and **Printable Electronic Payslip Modal**.
  - **Reports & Analytics**: 5 standard HR report categories with CSV/PDF export triggers.
  - **Notification Center**: Filterable activity stream with read/unread toggle.
  - **Audit Logs**: Cryptographically stamped administrative activity logs.
  - **Settings & Profile**: Tabbed organization policies, shift rules, and admin password change.
- **Global Command Menu (`⌘K`)**:
  - Jump directly to employees, departments, routes, and actions from anywhere.
- **Dark & Light Mode**:
  - Full theme switching support with centralized CSS variables.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Icons**: Lucide React
- **Theme**: `next-themes`

---

## 🏁 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run local development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## 🔒 Future Backend Architecture

This project is built 100% frontend-ready with clean domain types in `src/types/` and centralized reactive state in `src/context/AppContext.tsx`.

It is structured to seamlessly plug into:
```text
Next.js App Router  →  Auth.js / Better Auth  →  Prisma / Drizzle ORM  →  Neon PostgreSQL
```
