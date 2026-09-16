"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  PlugZap,
  LayoutGrid,
  GitBranch,
  Puzzle,
  Settings,
  ChevronsUpDown,
  ShieldCheck,
  TrendingUp,
  CornerDownRight,
  Database,
  ChevronDown,
  ChevronRight,
  Table,
  Terminal,
  RotateCcw,
  Cpu,
  Share2,
  Users,
  ShieldAlert,
  KeyRound,
  Folder,
  Code2,
  Sparkles,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  X,
  Copy,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useApp();

  const [postgresExpanded, setPostgresExpanded] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string>("Dashboard");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("production");
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [showModalBranchMenu, setShowModalBranchMenu] = useState(false);
  const [connectTab, setConnectTab] = useState("Postgres database");
  const [storageCodeTab, setStorageCodeTab] = useState<"s3-client.ts" | ".env">("s3-client.ts");
  const [connectionPooling, setConnectionPooling] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCompute, setSelectedCompute] = useState("Primary");
  const [showComputeMenu, setShowComputeMenu] = useState(false);
  const [selectedDb, setSelectedDb] = useState("neondb");
  const [showDbMenu, setShowDbMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState("neondb_owner");
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [selectedPgClient, setSelectedPgClient] = useState<
    "Connection string" | "psql" | "Prisma" | "Drizzle" | "Node.js (pg)" | "Next.js" | "Python (psycopg2)" | "Go"
  >("Connection string");
  const [showPgClientMenu, setShowPgClientMenu] = useState(false);
  const [selectedStorageClient, setSelectedStorageClient] = useState<
    "S3 client" | "AWS CLI" | "Python (boto3)" | "Go SDK"
  >("S3 client");
  const [showStorageClientMenu, setShowStorageClientMenu] = useState(false);

  const handleLogout = () => {
    setMobileSidebarOpen(false);
    toast.info("Logged Out", "You have been logged out successfully.");
    router.push("/login");
  };

  const isLinkActive = (label: string, href: string) => {
    if (activeNavItem) {
      return activeNavItem === label;
    }
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Close open dropdowns helper
  const closeAllModalDropdowns = () => {
    setShowModalBranchMenu(false);
    setShowComputeMenu(false);
    setShowDbMenu(false);
    setShowRoleMenu(false);
    setShowPgClientMenu(false);
    setShowStorageClientMenu(false);
  };

  const getPostgresSnippet = () => {
    const pwd = showPassword ? "N3xusHr_Secr3t_99!" : "****************";
    const host = `ep-summer-field-b5ic9ltt${connectionPooling ? "-pooler" : ""}.c-7.us-east-2.aws.neon.tech`;
    const port = connectionPooling ? "6543" : "5432";
    const connStr = `postgresql://${selectedRole}:${pwd}@${host}:${port}/${selectedDb}?sslmode=require&channel_binding=require`;

    switch (selectedPgClient) {
      case "psql":
        return `psql '${connStr}'`;
      case "Prisma":
        return `// .env\nDATABASE_URL="${connStr}"\n\n// prisma/schema.prisma\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}`;
      case "Drizzle":
        return `import { drizzle } from "drizzle-orm/node-postgres";\nimport { Pool } from "pg";\n\nconst pool = new Pool({ connectionString: "${connStr}" });\nexport const db = drizzle(pool);`;
      case "Node.js (pg)":
        return `import { Client } from "pg";\n\nconst client = new Client({\n  connectionString: "${connStr}",\n});\nawait client.connect();\nconst res = await client.query("SELECT NOW()");\nconsole.log(res.rows[0]);\nawait client.end();`;
      case "Next.js":
        return `import { neon } from "@neondatabase/serverless";\n\nconst sql = neon(process.env.DATABASE_URL!);\nconst response = await sql\`SELECT version()\`;\nconsole.log(response);`;
      case "Python (psycopg2)":
        return `import psycopg2\n\nconn = psycopg2.connect("${connStr}")\ncur = conn.cursor()\ncur.execute("SELECT version();")\nprint(cur.fetchone())\ncur.close()\nconn.close()`;
      case "Go":
        return `package main\n\nimport (\n  "database/sql"\n  _ "github.com/lib/pq"\n  "log"\n)\n\nfunc main() {\n  db, err := sql.Open("postgres", "${connStr}")\n  if err != nil {\n    log.Fatal(err)\n  }\n  defer db.Close()\n}`;
      case "Connection string":
      default:
        return connStr;
    }
  };

  const copyConnectionString = () => {
    const snippet = getPostgresSnippet();
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    toast.success("Copied to clipboard", `${selectedPgClient} snippet copied.`);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStorageInstallCommand = () => {
    switch (selectedStorageClient) {
      case "AWS CLI":
        return "aws --version # requires awscli installed";
      case "Python (boto3)":
        return "pip install boto3 python-dotenv";
      case "Go SDK":
        return "go get github.com/aws/aws-sdk-go-v2/service/s3";
      case "S3 client":
      default:
        return "npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner dotenv";
    }
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText(getStorageInstallCommand());
    setCopiedInstall(true);
    toast.success("Copied to clipboard", "Install command copied.");
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const getStorageSnippet = () => {
    if (storageCodeTab === ".env") {
      return `AWS_ACCESS_KEY_ID=nexus_s3_storage_key_9281\nAWS_SECRET_ACCESS_KEY=nexus_s3_secret_token_882910\nAWS_REGION=us-east-2\nAWS_ENDPOINT_URL=https://storage.neon.tech/v1/nexushr-assets`;
    }

    switch (selectedStorageClient) {
      case "AWS CLI":
        return `# Upload file\naws s3 cp file.txt s3://assets/uploads/file.txt --endpoint-url https://storage.neon.tech/v1/nexushr-assets\n\n# List files\naws s3 ls s3://assets/ --endpoint-url https://storage.neon.tech/v1/nexushr-assets`;
      case "Python (boto3)":
        return `import boto3, os\nfrom dotenv import load_dotenv\nload_dotenv()\n\ns3 = boto3.client(\n  's3',\n  endpoint_url=os.getenv('AWS_ENDPOINT_URL'),\n  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),\n  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),\n  region_name=os.getenv('AWS_REGION')\n)\ns3.put_object(Bucket='assets', Key='uploads/file.txt', Body=b'Hello World!')`;
      case "Go SDK":
        return `package main\n\nimport (\n  "context"\n  "github.com/aws/aws-sdk-go-v2/config"\n  "github.com/aws/aws-sdk-go-v2/service/s3"\n)\n\nfunc main() {\n  cfg, _ := config.LoadDefaultConfig(context.TODO())\n  client := s3.NewFromConfig(cfg)\n  _ = client\n}`;
      case "S3 client":
      default:
        return `import "dotenv/config";\nimport { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";\nimport { getSignedUrl } from "@aws-sdk/s3-request-presigner";\n\nconst s3 = new S3Client({ forcePathStyle: true });\nconst bucket = "assets";\nconst key = "uploads/file.txt";\n\nawait s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: "Hello World!" }));\n\nconst url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 3600 });\nconsole.log(\`[view] \${url}\`);`;
    }
  };

  const copyStorageSnippet = () => {
    const snippet = getStorageSnippet();
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    toast.success("Copied to clipboard", `${storageCodeTab} snippet copied.`);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Branches", href: "/dashboard/departments", icon: GitBranch },
    { label: "Integrations", href: "/dashboard/reports", icon: Puzzle },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const branchItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutGrid },
    { label: "Credentials", href: "/dashboard/audit-logs", icon: ShieldCheck },
    { label: "Monitoring", href: "/dashboard/reports", icon: TrendingUp },
    { label: "Child branches", href: "/dashboard/departments", icon: CornerDownRight },
  ];

  const postgresSubItems = [
    { label: "Tables", href: "/dashboard/employees", icon: Table },
    { label: "SQL Editor", href: "/dashboard/reports", icon: Terminal },
    { label: "Backup & Restore", href: "/dashboard/audit-logs", icon: RotateCcw },
    { label: "Computes", href: "/dashboard/departments", icon: Cpu },
    { label: "Data API", href: "/dashboard/attendance", icon: Share2 },
    { label: "Roles", href: "/dashboard/leave", icon: Users },
    { label: "Databases", href: "/dashboard/payroll", icon: Database },
    { label: "Data masking", href: "/dashboard/settings", icon: ShieldAlert },
  ];

  const resourceItems = [
    { label: "Auth", href: "/dashboard/employees", icon: KeyRound },
    { label: "Object storage", href: "/dashboard/reports", icon: Folder },
    { label: "Functions", href: "/dashboard/payroll", icon: Code2 },
    { label: "AI Gateway", href: "/dashboard/attendance", icon: Sparkles },
    { label: "Feedback", href: "/dashboard/settings?tab=help", icon: MessageSquare },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-sidebar text-sidebar-foreground">
      {/* Top Header / Project section */}
      <div className="p-3 space-y-4">
        {/* Mobile Close Bar */}
        <div className="flex items-center justify-between md:hidden pb-2 border-b border-sidebar-border">
          <span className="font-bold text-sm tracking-tight text-sidebar-foreground">
            NexusHR Console
          </span>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PROJECT Header & Connect Button */}
        <div>
          {!sidebarCollapsed && (
            <p className="px-2 pb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              PROJECT
            </p>
          )}

          {/* Connect Button */}
          <button
            type="button"
            onClick={() => setShowConnectModal(true)}
            title={sidebarCollapsed ? "Connect" : undefined}
            className={cn(
              "w-full h-10 rounded-lg flex items-center justify-center gap-2.5 font-medium text-sm transition-all shadow-xs cursor-pointer",
              "bg-[#008f5d] hover:bg-[#007b4f] text-white active:scale-[0.98]",
              sidebarCollapsed ? "px-0" : "px-4"
            )}
          >
            <PlugZap className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Connect</span>}
          </button>
        </div>

        {/* Project Navigation Items */}
        <div className="space-y-0.5">
          {projectItems.map((item) => {
            const active = isLinkActive(item.label, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveNavItem(item.label);
                  setMobileSidebarOpen(false);
                }}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-100 cursor-pointer select-none",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:text-sidebar-foreground active:scale-[0.98]",
                  sidebarCollapsed ? "justify-center" : "gap-3"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* BRANCH Section */}
        <div className="pt-2">
          {!sidebarCollapsed && (
            <p className="px-2 pb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              BRANCH
            </p>
          )}

          {/* Branch Selector */}
          {!sidebarCollapsed ? (
            <div className="relative mb-2">
              <button
                type="button"
                onClick={() => setShowBranchMenu(!showBranchMenu)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/60 active:bg-sidebar-accent/90 text-xs font-medium text-sidebar-foreground transition-all duration-100 cursor-pointer select-none active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 truncate">
                  <GitBranch className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">{selectedBranch}</span>
                </div>
                <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>

              {showBranchMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-xl py-1 z-50 text-xs">
                  {["production", "staging", "dev-feature-branch"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setSelectedBranch(b);
                        setShowBranchMenu(false);
                        toast.info("Branch Switched", `Active branch changed to ${b}`);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 hover:bg-muted active:bg-muted/80 transition-colors flex items-center justify-between cursor-pointer",
                        selectedBranch === b ? "text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      <span>{b}</span>
                      {selectedBranch === b && <Check className="h-3.5 w-3.5 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center mb-2" title="Branch: production">
              <div className="p-1.5 rounded-lg bg-sidebar-accent/40 text-muted-foreground">
                <GitBranch className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Branch Navigation Items */}
          <div className="space-y-0.5">
            {branchItems.map((item) => {
              const active = isLinkActive(item.label, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveNavItem(item.label);
                    setMobileSidebarOpen(false);
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-100 cursor-pointer select-none",
                    active
                      ? "bg-sidebar-accent text-sidebar-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:text-sidebar-foreground active:scale-[0.98]",
                    sidebarCollapsed ? "justify-center" : "gap-3"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sidebar-border" />

        {/* Resource Items / Postgres Database Accordion */}
        <div className="space-y-0.5">
          {/* Postgres database accordion */}
          <div>
            <button
              type="button"
              onClick={() => setPostgresExpanded(!postgresExpanded)}
              title={sidebarCollapsed ? "Postgres database" : undefined}
              className={cn(
                "w-full flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-100 cursor-pointer select-none",
                postgresExpanded
                  ? "text-sidebar-foreground hover:bg-sidebar-accent/60 active:bg-sidebar-accent/90 active:scale-[0.98]"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:scale-[0.98]",
                sidebarCollapsed ? "justify-center" : "justify-between"
              )}
            >
              <div className="flex items-center gap-3 truncate">
                <Database className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">Postgres database</span>}
              </div>
              {!sidebarCollapsed && (
                postgresExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )
              )}
            </button>

            {/* Sub-items */}
            {!sidebarCollapsed && postgresExpanded && (
              <div className="pl-6 pr-1 pt-1 space-y-0.5">
                {postgresSubItems.map((sub) => {
                  const active = isLinkActive(sub.label, sub.href);
                  const SubIcon = sub.icon;
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => {
                        setActiveNavItem(sub.label);
                        setMobileSidebarOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-100 cursor-pointer select-none",
                        active
                          ? "bg-sidebar-accent text-sidebar-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:text-sidebar-foreground active:scale-[0.98]"
                      )}
                    >
                      <SubIcon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span>{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remaining Resource items */}
          {resourceItems.map((item) => {
            const active = isLinkActive(item.label, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveNavItem(item.label);
                  setMobileSidebarOpen(false);
                }}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all duration-100 cursor-pointer select-none",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:text-sidebar-foreground active:scale-[0.98]",
                  sidebarCollapsed ? "justify-center" : "gap-3"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar: Collapse menu + Logout */}
      <div className="border-t border-sidebar-border p-2 space-y-1 bg-sidebar">
        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand menu" : "Collapse menu"}
          className={cn(
            "w-full flex items-center rounded-lg px-2.5 py-2 text-[13px] font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground active:bg-sidebar-accent/90 active:scale-[0.98] transition-all duration-100 cursor-pointer select-none",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4 shrink-0" />
              <span>Collapse menu</span>
            </>
          )}
        </button>

        {/* Logout */}
        <Link
          href="/login"
          onClick={handleLogout}
          title={sidebarCollapsed ? "Logout" : undefined}
          className={cn(
            "w-full flex items-center rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-rose-500/90 hover:text-rose-500 hover:bg-rose-500/10 active:bg-rose-500/20 active:scale-[0.98] transition-all duration-100 cursor-pointer select-none",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Logout</span>}
        </Link>
      </div>

      {/* Connect Details Modal matching exact original screenshot */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50 duration-150">
          <div className="bg-card dark:bg-[#13151b] border border-border/80 rounded-2xl max-w-[620px] w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 text-foreground relative">
            {/* Header: Title + Close */}
            <div className="flex items-center justify-between pb-3 mb-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Connect to your branch
              </h2>
              <button
                type="button"
                onClick={() => setShowConnectModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Branch Selector */}
            <div className="relative mb-4">
              <label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                Branch
              </label>
              <button
                type="button"
                onClick={() => {
                  const next = !showModalBranchMenu;
                  closeAllModalDropdowns();
                  setShowModalBranchMenu(next);
                }}
                className="w-full h-10 px-3.5 rounded-lg border border-border/80 bg-background hover:bg-muted/40 transition-colors flex items-center justify-between text-xs sm:text-sm text-foreground cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selectedBranch}</span>
                  {selectedBranch === "production" && (
                    <span className="rounded-full border border-border/80 bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground font-normal">
                      Default
                    </span>
                  )}
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showModalBranchMenu && "rotate-180")} />
              </button>

              {showModalBranchMenu && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 text-xs sm:text-sm">
                  {[
                    { name: "production", isDefault: true },
                    { name: "staging", isDefault: false },
                    { name: "dev-feature-branch", isDefault: false },
                  ].map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => {
                        setSelectedBranch(b.name);
                        setShowModalBranchMenu(false);
                        toast.info("Branch Switched", `Active branch set to ${b.name}`);
                      }}
                      className={cn(
                        "w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                        selectedBranch === b.name ? "text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span>{b.name}</span>
                        {b.isDefault && (
                          <span className="rounded-full border border-border/80 bg-muted/60 px-1.5 py-0.2 text-[10px] text-muted-foreground">
                            Default
                          </span>
                        )}
                      </div>
                      {selectedBranch === b.name && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Horizontal Tabs: Postgres database | Storage | Data API | Auth */}
            <div className="flex items-center gap-6 border-b border-border/80 text-xs sm:text-sm font-medium text-muted-foreground mt-4 mb-5">
              {[
                { id: "postgres", label: "Postgres database" },
                { id: "storage", label: "Storage" },
                { id: "data_api", label: "Data API" },
                { id: "auth", label: "Auth" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    closeAllModalDropdowns();
                    setConnectTab(tab.label);
                  }}
                  className={cn(
                    "pb-2.5 transition-colors cursor-pointer relative",
                    connectTab === tab.label
                      ? "text-foreground font-semibold border-b-2 border-foreground"
                      : "hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Postgres database */}
            {connectTab === "Postgres database" && (
              <div className="space-y-4">
                {/* Compute Selection */}
                <div className="relative">
                  <label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                    Compute
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !showComputeMenu;
                      closeAllModalDropdowns();
                      setShowComputeMenu(next);
                    }}
                    className="w-full h-10 px-3.5 rounded-lg border border-border/80 bg-background hover:bg-muted/40 transition-colors flex items-center justify-between text-xs sm:text-sm text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{selectedCompute}</span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showComputeMenu && "rotate-180")} />
                  </button>

                  {showComputeMenu && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 text-xs sm:text-sm">
                      {[
                        { name: "Primary", status: "Active" },
                        { name: "Read-replica (us-east-2)", status: "Active" },
                        { name: "Analytics Compute (0.25 CU)", status: "Idle" },
                      ].map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedCompute(c.name);
                            setShowComputeMenu(false);
                            toast.info("Compute Selected", `Switched to ${c.name}`);
                          }}
                          className={cn(
                            "w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                            selectedCompute === c.name ? "text-primary font-semibold" : "text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span>{c.name}</span>
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full border font-medium",
                                c.status === "Active"
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                                  : "border-border bg-muted text-muted-foreground"
                              )}
                            >
                              {c.status}
                            </span>
                          </div>
                          {selectedCompute === c.name && <Check className="h-4 w-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2-Column Row: Database & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Database */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-foreground/80 mb-1.5 block">
                      Database
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !showDbMenu;
                        closeAllModalDropdowns();
                        setShowDbMenu(next);
                      }}
                      className="w-full h-10 px-3.5 rounded-lg border border-border/80 bg-background hover:bg-muted/40 transition-colors flex items-center justify-between text-xs sm:text-sm text-foreground cursor-pointer"
                    >
                      <span className="font-medium">{selectedDb}</span>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showDbMenu && "rotate-180")} />
                    </button>

                    {showDbMenu && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 text-xs sm:text-sm">
                        {["neondb", "analytics_db", "staging_db", "production_main"].map((db) => (
                          <button
                            key={db}
                            type="button"
                            onClick={() => {
                              setSelectedDb(db);
                              setShowDbMenu(false);
                              toast.info("Database Selected", `Switched to ${db}`);
                            }}
                            className={cn(
                              "w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                              selectedDb === db ? "text-primary font-semibold" : "text-foreground"
                            )}
                          >
                            <span>{db}</span>
                            {selectedDb === db && <Check className="h-4 w-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Role */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-foreground/80">
                        Role
                      </label>
                      <button
                        type="button"
                        onClick={() => toast.success("Password Reset", `New credentials for ${selectedRole} copied to clipboard.`)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-normal cursor-pointer"
                      >
                        Reset password
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !showRoleMenu;
                        closeAllModalDropdowns();
                        setShowRoleMenu(next);
                      }}
                      className="w-full h-10 px-3.5 rounded-lg border border-border/80 bg-background hover:bg-muted/40 transition-colors flex items-center justify-between text-xs sm:text-sm text-foreground cursor-pointer"
                    >
                      <span className="font-medium">{selectedRole}</span>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", showRoleMenu && "rotate-180")} />
                    </button>

                    {showRoleMenu && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 text-xs sm:text-sm">
                        {["neondb_owner", "authenticated_user", "readonly_role", "service_role"].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setSelectedRole(r);
                              setShowRoleMenu(false);
                              toast.info("Role Selected", `Switched to role ${r}`);
                            }}
                            className={cn(
                              "w-full text-left px-3.5 py-2 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                              selectedRole === r ? "text-primary font-semibold" : "text-foreground"
                            )}
                          >
                            <span>{r}</span>
                            {selectedRole === r && <Check className="h-4 w-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connection String Header & Connection pooling toggle */}
                <div className="flex items-center justify-between pt-1 relative">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const next = !showPgClientMenu;
                        closeAllModalDropdowns();
                        setShowPgClientMenu(next);
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{selectedPgClient}</span>
                      <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", showPgClientMenu && "rotate-180")} />
                    </button>

                    {showPgClientMenu && (
                      <div className="absolute left-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 w-48 text-xs">
                        {[
                          "Connection string",
                          "psql",
                          "Prisma",
                          "Drizzle",
                          "Node.js (pg)",
                          "Next.js",
                          "Python (psycopg2)",
                          "Go",
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSelectedPgClient(item as any);
                              setShowPgClientMenu(false);
                            }}
                            className={cn(
                              "w-full text-left px-3 py-1.5 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                              selectedPgClient === item ? "text-primary font-semibold" : "text-foreground"
                            )}
                          >
                            <span>{item}</span>
                            {selectedPgClient === item && <Check className="h-3.5 w-3.5 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Toggle Switch: Connection pooling */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setConnectionPooling(!connectionPooling)}
                      className={cn(
                        "w-9 h-5 rounded-full transition-colors relative cursor-pointer p-0.5 flex items-center",
                        connectionPooling ? "bg-emerald-500" : "bg-muted border border-border"
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
                          connectionPooling ? "translate-x-4" : "translate-x-0"
                        )}
                      />
                    </button>
                    <span className="text-xs font-medium text-foreground">Connection pooling</span>
                    <span title="Connection pooling enables scalable serverless queries" className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
                      ⓘ
                    </span>
                  </div>
                </div>

                {/* Connection String Code Box with sub-bar inside */}
                <div className="rounded-xl border border-border/80 bg-muted/20 dark:bg-[#090a0e] overflow-hidden shadow-xs">
                  <div className="p-4 font-mono text-xs text-foreground/90 leading-relaxed min-h-[50px] max-h-[160px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap break-all font-mono">
                      {getPostgresSnippet()}
                    </pre>
                  </div>

                  {/* Bottom Actions inside Code Block */}
                  <div className="flex items-center gap-5 px-4 py-2.5 border-t border-border/80 bg-muted/30 dark:bg-[#0e1017] text-muted-foreground text-xs">
                    {/* Copy snippet */}
                    <button
                      type="button"
                      onClick={copyConnectionString}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">Copied snippet</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy snippet</span>
                        </>
                      )}
                    </button>

                    {/* Show/Hide password */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                    >
                      <span className="h-3.5 w-3.5">👁</span>
                      <span>{showPassword ? "Hide password" : "Show password"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Storage */}
            {connectTab === "Storage" && (
              <div className="space-y-4">
                {/* S3 Client Dropdown Header */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !showStorageClientMenu;
                      closeAllModalDropdowns();
                      setShowStorageClientMenu(next);
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{selectedStorageClient}</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", showStorageClientMenu && "rotate-180")} />
                  </button>

                  {showStorageClientMenu && (
                    <div className="absolute left-0 top-full mt-1 bg-card dark:bg-[#181a20] border border-border rounded-lg shadow-xl py-1 z-50 w-48 text-xs">
                      {["S3 client", "AWS CLI", "Python (boto3)", "Go SDK"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSelectedStorageClient(item as any);
                            setShowStorageClientMenu(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 hover:bg-muted transition-colors flex items-center justify-between cursor-pointer",
                            selectedStorageClient === item ? "text-primary font-semibold" : "text-foreground"
                          )}
                        >
                          <span>{item}</span>
                          {selectedStorageClient === item && <Check className="h-3.5 w-3.5 text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Install command box */}
                <div className="rounded-xl border border-border/80 bg-muted/20 dark:bg-[#090a0e] overflow-hidden shadow-xs">
                  <div className="p-3.5 font-mono text-xs text-foreground/90 leading-relaxed">
                    <p className="whitespace-pre-wrap break-all">{getStorageInstallCommand()}</p>
                  </div>
                  <div className="px-3.5 py-2 border-t border-border/80 bg-muted/30 dark:bg-[#0e1017]">
                    <button
                      type="button"
                      onClick={copyInstallCommand}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {copiedInstall ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">Copied install command</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy install command</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* File Code Box (s3-client.ts / .env) */}
                <div className="rounded-xl border border-border/80 bg-muted/20 dark:bg-[#090a0e] overflow-hidden shadow-xs">
                  {/* File tabs */}
                  <div className="flex items-center gap-6 px-4 pt-3 border-b border-border/80 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setStorageCodeTab("s3-client.ts")}
                      className={cn(
                        "pb-2 transition-colors cursor-pointer font-medium",
                        storageCodeTab === "s3-client.ts"
                          ? "text-foreground font-semibold border-b-2 border-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {selectedStorageClient === "Python (boto3)"
                        ? "s3_client.py"
                        : selectedStorageClient === "Go SDK"
                        ? "main.go"
                        : selectedStorageClient === "AWS CLI"
                        ? "commands.sh"
                        : "s3-client.ts"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStorageCodeTab(".env")}
                      className={cn(
                        "pb-2 transition-colors cursor-pointer font-medium",
                        storageCodeTab === ".env"
                          ? "text-foreground font-semibold border-b-2 border-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      .env
                    </button>
                  </div>

                  {/* Code Body */}
                  <div className="p-4 font-mono text-xs leading-relaxed max-h-[190px] overflow-y-auto">
                    <pre className="text-foreground/90 whitespace-pre-wrap break-all">
                      {getStorageSnippet()}
                    </pre>
                  </div>

                  {/* Copy Code snippet bottom bar */}
                  <div className="px-4 py-2.5 border-t border-border/80 bg-muted/30 dark:bg-[#0e1017]">
                    <button
                      type="button"
                      onClick={copyStorageSnippet}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">Copied snippet</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Data API */}
            {connectTab === "Data API" && (
              <div className="py-8 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The Data API is not enabled on this branch.{" "}
                <Link
                  href="/dashboard/attendance"
                  onClick={() => setShowConnectModal(false)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Open the Data API page
                </Link>{" "}
                to enable it.
              </div>
            )}

            {/* Tab 4: Auth */}
            {connectTab === "Auth" && (
              <div className="py-8 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Auth is not enabled on this branch.{" "}
                <Link
                  href="/dashboard/employees"
                  onClick={() => setShowConnectModal(false)}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Open the Auth page
                </Link>{" "}
                to set it up.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "hidden md:flex h-screen sticky top-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 shrink-0",
          sidebarCollapsed ? "w-16" : "w-60"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-sidebar shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

