"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  Sparkles,
  ChevronDown,
  Github,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  FileBarChart,
  ShieldCheck,
  Building2,
  Clock,
  Briefcase,
  HelpCircle,
  FileText,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function NeonNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/80 text-foreground transition-colors"
      ref={dropdownRef}
    >
      <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Left Section: NexusHR Original Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Original NexusHR Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
                NexusHR
                <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                  PRO
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Multi-Column Megamenus */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {/* 1. Product Dropdown */}
            <button
              onClick={() => toggleDropdown("product")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
                activeDropdown === "product"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Product</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "product" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* 2. Solutions Dropdown */}
            <button
              onClick={() => toggleDropdown("solutions")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
                activeDropdown === "solutions"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "solutions" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* 3. Docs / Reports Link */}
            <Link
              href="/dashboard/reports"
              className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>

            {/* 4. Pricing Link */}
            <a
              href="#pricing"
              className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>

            {/* 5. Resources Dropdown */}
            <button
              onClick={() => toggleDropdown("resources")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
                activeDropdown === "resources"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
          </nav>
        </div>

        {/* Right Section: Discord, GitHub, ThemeToggle, Log in, Sign up */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Discord Link */}
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord</span>
          </a>

          {/* GitHub Stars */}
          <a
            href="https://github.com/shivamahirwar045-collab/NexusHR"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>23.1k</span>
          </a>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Log In Button */}
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-semibold text-xs">
              Log in
            </Button>
          </Link>

          {/* Sign Up / Launch App Demo Button */}
          <Link href="/register">
            <Button size="sm" className="font-semibold text-xs shadow-sm shadow-primary/25">
              Sign up
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PRODUCT MEGAMENU DROPDOWN */}
      {/* ========================================================= */}
      {activeDropdown === "product" && (
        <div className="absolute top-16 left-0 w-full bg-card border-b border-border shadow-2xl py-8 animate-in fade-in-0 duration-150 text-card-foreground">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1: CORE PRIMITIVES */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                CORE PRIMITIVES
              </p>
              <div className="space-y-4">
                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Lakebase Postgres
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Serverless Postgres database
                  </p>
                </Link>

                <Link href="/dashboard/employees" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Auth
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Authentication built into your database
                  </p>
                </Link>

                <Link href="/dashboard/departments" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Functions
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Serverless compute next to your data
                  </p>
                </Link>

                <Link href="/dashboard/attendance" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Object Storage
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    S3-compatible storage that branches
                  </p>
                </Link>

                <Link href="/dashboard/reports" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    AI Gateway
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    One API for frontier and open-source models
                  </p>
                </Link>
              </div>
            </div>

            {/* Column 2: FEATURES */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                FEATURES
              </p>
              <div className="space-y-4">
                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Lakebase Architecture
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Storage-compute separation
                  </p>
                </Link>

                <Link href="/dashboard/payroll" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Autoscaling
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Automatic instance sizing
                  </p>
                </Link>

                <Link href="/dashboard/leave" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Branching
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Faster Postgres workflows
                  </p>
                </Link>

                <Link href="/dashboard/audit-logs" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Search
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Vector, keyword, and hybrid search
                  </p>
                </Link>

                <Link href="/dashboard/settings" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Instant Restore
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Instant recovery when mistakes happen
                  </p>
                </Link>
              </div>
            </div>

            {/* Column 3: Featured Visual Banner Card */}
            <div className="flex flex-col justify-end">
              <Link
                href="/dashboard"
                onClick={() => setActiveDropdown(null)}
                className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-muted/40 p-6 h-full min-h-[220px] flex flex-col justify-end group hover:border-primary/60 transition-all shadow-inner"
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    What is NexusHR
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    Built around Lakebase Postgres & Next-Gen Workforce Architecture
                  </p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SOLUTIONS MEGAMENU DROPDOWN */}
      {/* ========================================================= */}
      {activeDropdown === "solutions" && (
        <div className="absolute top-16 left-0 w-full bg-card border-b border-border shadow-2xl py-8 animate-in fade-in-0 duration-150 text-card-foreground">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1: USE CASES */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                USE CASES
              </p>
              <div className="space-y-5">
                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Full-stack apps
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Deploy backends via your agent
                  </p>
                </Link>

                <Link href="/dashboard/employees" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Branching workflows
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Simplify DB ops to ship faster & safer
                  </p>
                </Link>

                <Link href="/dashboard/attendance" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Bursty workloads
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Avoid overprovisioning & optimize performance
                  </p>
                </Link>

                <Link href="/dashboard/payroll" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Large databases
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Restore & replicate your DB in seconds
                  </p>
                </Link>
              </div>
            </div>

            {/* Column 2: DEPLOY AT SCALE Cards */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                DEPLOY AT SCALE
              </p>
              <div className="space-y-4">
                {/* Agents Card */}
                <Link
                  href="/dashboard"
                  onClick={() => setActiveDropdown(null)}
                  className="rounded-xl border bg-muted/30 hover:border-primary/60 p-5 flex items-center justify-between group transition-all"
                >
                  <div>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      Agents
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Infra for app-generation agents like Replit & v0
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-card border rounded-lg p-2.5 shadow-sm">
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">AI</span>
                    <div className="flex flex-col gap-1">
                      <div className="w-4 h-1.5 bg-primary rounded" />
                      <div className="w-4 h-1.5 bg-muted rounded" />
                      <div className="w-4 h-1.5 bg-muted rounded" />
                    </div>
                  </div>
                </Link>

                {/* Platforms Card */}
                <Link
                  href="/dashboard"
                  onClick={() => setActiveDropdown(null)}
                  className="rounded-xl border bg-muted/30 hover:border-primary/60 p-5 flex items-center justify-between group transition-all"
                >
                  <div>
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      Platforms
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Deploy isolated backends for your end users
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 bg-card border rounded-lg p-2.5 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-3 h-2 bg-primary rounded-sm" />
                      <div className="w-3 h-2 bg-primary rounded-sm" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-2 bg-muted rounded-sm" />
                      <div className="w-3 h-2 bg-muted rounded-sm" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. RESOURCES MEGAMENU DROPDOWN */}
      {/* ========================================================= */}
      {activeDropdown === "resources" && (
        <div className="absolute top-16 left-0 w-full bg-card border-b border-border shadow-2xl py-8 animate-in fade-in-0 duration-150 text-card-foreground">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1: LEARN */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                LEARN
              </p>
              <div className="space-y-4">
                <Link href="/dashboard/reports" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Blog
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Technical posts & product updates
                  </p>
                </Link>

                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Case studies
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Explore customer stories
                  </p>
                </Link>

                <Link href="/dashboard/notifications" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Changelog
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Product updates
                  </p>
                </Link>

                <a href="https://discord.com" target="_blank" rel="noreferrer" className="group block">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Community
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Connect on Discord
                  </p>
                </a>

                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Startups
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Build with NexusHR
                  </p>
                </Link>
              </div>
            </div>

            {/* Column 2: COMPANY */}
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                COMPANY
              </p>
              <div className="space-y-4">
                <Link href="/dashboard/settings" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    About us
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    The company and the mission
                  </p>
                </Link>

                <Link href="/dashboard/employees" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Careers
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Join the team
                  </p>
                </Link>

                <Link href="/dashboard/settings" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Contact sales
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Contact sales team
                  </p>
                </Link>

                <Link href="/dashboard/audit-logs" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Security
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Compliance & privacy
                  </p>
                </Link>

                <Link href="/dashboard" className="group block" onClick={() => setActiveDropdown(null)}>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    Status
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Service status
                  </p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
