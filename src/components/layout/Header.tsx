"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  Search,
  ChevronsUpDown,
  Sparkles,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Check,
  CheckCircle2,
  X,
  Send,
  Bot,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const toast = useToast();
  const {
    currentUser,
    setMobileSidebarOpen,
    setGlobalSearchOpen,
  } = useApp();

  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("Ashish");
  const [selectedProject, setSelectedProject] = useState("nameless-hat-32308811");
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponses, setAiResponses] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Hi there! I am your NexusHR AI Database Copilot. How can I assist you with queries, schema migrations, or workforce metrics today?",
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setGlobalSearchOpen]);

  const handleLogout = () => {
    toast.info("Logged Out", "You have been signed out successfully.");
    router.push("/login");
  };

  const handleSendAi = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || aiQuestion).trim();
    if (!query) return;

    setAiResponses((prev) => [...prev, { role: "user", text: query }]);
    setAiQuestion("");
    setIsAiThinking(true);

    setTimeout(() => {
      setIsAiThinking(false);
      let answer = `Analysis for "${query}": Workspace cluster is fully synchronized. All 8 worker pods are active with 0 latency spikes and 99.99% sync SLA.`;
      const lower = query.toLowerCase();

      if (lower.includes("leave") || lower.includes("pto") || lower.includes("absent")) {
        answer = "Currently, 1 employee (Priya Patel) is on approved PTO today. Attendance rate is 75% with 9 active check-ins recorded.";
      } else if (lower.includes("payroll") || lower.includes("salary") || lower.includes("pay")) {
        answer = "Current Monthly Payroll forecast is $97,349. Next batch execution is scheduled on time with automated direct deposits and tax withholdings verified.";
      } else if (lower.includes("branch") || lower.includes("environment")) {
        answer = "Active branch: `production` (protected). You can create zero-copy staging branches in <850ms to run dry-run payroll simulations.";
      } else if (lower.includes("soc2") || lower.includes("audit") || lower.includes("security")) {
        answer = "Security status: SOC2 Type II compliance active. All recent administrator actions and employee records are cryptographically logged.";
      } else if (lower.includes("department") || lower.includes("headcount")) {
        answer = "Headcount breakdown: Engineering (42), Product & UI/UX (16), Sales & Enterprise (28), People & HR (9). Total: 95 staff.";
      }

      setAiResponses((prev) => [...prev, { role: "assistant", text: answer }]);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border/80 bg-background/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* ========================================================= */}
      {/* LEFT SECTION: Logo + Org/User Breadcrumb + Project Breadcrumb */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="md:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo Icon */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group shrink-0"
          title="NexusHR Dashboard"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs shadow-primary/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
        </Link>

        {/* Slash divider */}
        <span className="text-muted-foreground/40 text-sm font-light select-none">
          /
        </span>

        {/* Org / User Dropdown Breadcrumb */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOrgDropdownOpen(!orgDropdownOpen);
              setProjectDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-muted/60 text-xs sm:text-[13px] font-medium text-foreground transition-colors cursor-pointer"
          >
            <span className="truncate max-w-[90px] sm:max-w-none">{selectedOrg}</span>
            <span className="rounded-full border border-border/80 bg-muted/30 px-1.5 py-0.2 text-[10px] text-muted-foreground font-normal">
              Free
            </span>
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0" />
          </button>

          {orgDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-48 bg-card border border-border rounded-xl shadow-xl py-1 z-50 text-xs animate-in fade-in-50 zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/60">
                Organizations & Teams
              </div>
              {["Ashish", "NexusTech Core", "Personal Workspace"].map((org) => (
                <button
                  key={org}
                  onClick={() => {
                    setSelectedOrg(org);
                    setOrgDropdownOpen(false);
                    toast.info("Organization Switched", `Active context: ${org}`);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-muted flex items-center justify-between transition-colors"
                >
                  <span className={selectedOrg === org ? "font-semibold text-primary" : "text-foreground"}>
                    {org}
                  </span>
                  {selectedOrg === org && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Slash divider */}
        <span className="text-muted-foreground/40 text-sm font-light select-none hidden sm:inline">
          /
        </span>

        {/* Project Dropdown Breadcrumb */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => {
              setProjectDropdownOpen(!projectDropdownOpen);
              setOrgDropdownOpen(false);
            }}
            className="flex items-center gap-1.5 py-1 px-1.5 rounded-md hover:bg-muted/60 text-xs sm:text-[13px] font-medium text-foreground transition-colors cursor-pointer"
          >
            <span className="truncate max-w-[120px] md:max-w-[160px]">{selectedProject}</span>
            <span className="rounded-full border border-border/80 bg-muted/30 px-1.5 py-0.2 text-[10px] text-muted-foreground font-normal">
              Admin
            </span>
            <ChevronsUpDown className="h-3 w-3 text-muted-foreground shrink-0" />
          </button>

          {projectDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-60 bg-card border border-border rounded-xl shadow-xl py-1 z-50 text-xs animate-in fade-in-50 zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/60">
                Projects
              </div>
              {[
                "nameless-hat-32308811",
                "nexus-hrms-production",
                "aurora-staging-cluster",
              ].map((proj) => (
                <button
                  key={proj}
                  onClick={() => {
                    setSelectedProject(proj);
                    setProjectDropdownOpen(false);
                    toast.info("Project Selected", `Switched to project ${proj}`);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-muted flex items-center justify-between transition-colors truncate"
                >
                  <span className={cn("truncate", selectedProject === proj ? "font-semibold text-primary" : "text-foreground")}>
                    {proj}
                  </span>
                  {selectedProject === proj && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* MIDDLE SECTION: Search Bar with ⌘K */}
      {/* ========================================================= */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <button
          type="button"
          onClick={() => setGlobalSearchOpen(true)}
          className="w-full h-8 px-3 rounded-lg border border-border/80 bg-card/60 dark:bg-zinc-900/60 hover:bg-muted/50 hover:border-border text-xs text-muted-foreground flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Search...</span>
          </div>
          <kbd className="inline-flex h-4 items-center rounded border border-border/80 bg-background/90 px-1 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* ========================================================= */}
      {/* RIGHT SECTION: Status + Ask AI + Help + Upgrade + Avatar */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Mobile search button */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="md:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Status: All OK */}
        <div
          onClick={() => toast.success("System Status", "All 12 regional clusters operating normally.")}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 bg-card/60 dark:bg-zinc-900/60 hover:bg-muted/40 text-[11px] font-medium text-foreground transition-colors cursor-pointer"
          title="All systems operational"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
          <span>All OK</span>
        </div>

        {/* Ask AI Pill Button */}
        <button
          type="button"
          onClick={() => setShowAiModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask AI</span>
        </button>

        {/* Help Question Mark */}
        <button
          type="button"
          onClick={() => router.push("/dashboard/settings?tab=help")}
          className="h-7 w-7 rounded-full border border-border/80 hover:border-border bg-card/60 dark:bg-zinc-900/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer"
          title="Help & Documentation"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Upgrade Button */}
        <Link
          href="/pricing"
          className="px-3 py-1 rounded-lg bg-foreground text-background hover:opacity-90 text-xs font-semibold transition-opacity cursor-pointer shadow-2xs"
        >
          Upgrade
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile Avatar (Pink/Violet Circle Badge matching screenshot) */}
        <DropdownMenu
          trigger={
            <div className="h-7 w-7 rounded-md bg-pink-500 text-white font-bold text-xs flex items-center justify-center ring-1 ring-pink-400/50 hover:opacity-90 transition-opacity cursor-pointer shadow-xs">
              A
            </div>
          }
          className="w-56"
        >
          <DropdownMenuLabel className="border-b pb-2 mb-1">
            <p className="font-semibold text-foreground">Ashish (Admin)</p>
            <p className="text-[11px] text-muted-foreground font-normal truncate">
              {currentUser.email}
            </p>
            <p className="text-[10px] text-primary font-medium mt-0.5">
              NexusHR Free Tier
            </p>
          </DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile Overview
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/pricing")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Billing & Plans
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem destructive onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* ========================================================= */}
      {/* Ask AI Copilot Side-Drawer (Slide-over panel from right) */}
      {/* ========================================================= */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md sm:max-w-lg bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 text-card-foreground">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    NexusHR AI Copilot
                    <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[9px] font-mono font-bold">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Context: {selectedProject} ({selectedOrg})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close Ask AI panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Suggested Quick Prompts */}
            <div className="p-4 border-b border-border/50 bg-background/50 flex flex-wrap gap-2">
              {[
                "Who is on leave today?",
                "Calculate monthly payroll run",
                "Show department headcount",
                "Check SOC2 audit compliance",
              ].map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendAi(undefined, prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat message thread */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {aiResponses.map((res, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed",
                    res.role === "assistant"
                      ? "bg-muted/40 text-foreground border border-border/70 mr-4"
                      : "bg-primary text-primary-foreground ml-6 shadow-md"
                  )}
                >
                  <p>{res.text}</p>
                </div>
              ))}
              {isAiThinking && (
                <div className="p-3.5 rounded-2xl bg-muted/40 text-muted-foreground text-xs flex items-center gap-2 border border-border/60">
                  <Sparkles className="h-4 w-4 animate-spin text-emerald-400" />
                  <span>Analyzing workforce schema and computing metrics...</span>
                </div>
              )}
            </div>

            {/* Prompt input at bottom */}
            <form onSubmit={(e) => handleSendAi(e)} className="p-4 border-t border-border bg-card">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask about queries, branches, or team stats..."
                  className="w-full h-11 px-4 pr-12 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!aiQuestion.trim() || isAiThinking}
                  className="absolute right-2 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-all cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </header>
  );
}

