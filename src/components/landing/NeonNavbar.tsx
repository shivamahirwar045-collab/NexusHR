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
  Bot,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function DatabaseCylinder({ active }: { active?: boolean }) {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={active ? "text-primary" : "text-muted-foreground/30 dark:text-zinc-700"}
    >
      <ellipse cx="8" cy="4" rx="6.5" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 8.5C1.5 10.2 4.5 11 8 11C11.5 11 14.5 10.2 14.5 8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 4V13.5C1.5 15.2 4.5 16 8 16C11.5 16 14.5 15.2 14.5 13.5V4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function NeonNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiResponses, setAiResponses] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    {
      role: "assistant",
      text: "Hi! I am the NexusHR AI Copilot. Ask me about workforce branch environments, autoscaling limits, multi-state payroll, or SOC2 compliance!",
    },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSendAi = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || aiQuestion).trim();
    if (!query) return;

    setAiResponses((prev) => [...prev, { role: "user", text: query }]);
    setAiQuestion("");
    setIsAiThinking(true);

    setTimeout(() => {
      let answer = "NexusHR provides a serverless workforce infrastructure with instant zero-copy database branching, automated multi-state payroll processing, and continuous SOC2 compliance.";
      const lower = query.toLowerCase();

      if (lower.includes("branch") || lower.includes("environment")) {
        answer = "Workforce branching uses Copy-on-Write snapshots created in <850ms. You can test payroll simulations or acquisitions on ephemeral branches without affecting live production data.";
      } else if (lower.includes("payroll") || lower.includes("pay") || lower.includes("salary")) {
        answer = "The Async Payroll Engine processes 12,000+ employees in under 1.2 seconds across all 50 US states and 14 global currencies with direct deposit API integration.";
      } else if (lower.includes("scale") || lower.includes("autoscal") || lower.includes("cu")) {
        answer = "Compute units (CU) scale automatically from 0.25 to 64 CU based on shift clock-ins and payroll run loads. When idle, workers scale to zero to save up to 88% in infrastructure costs.";
      } else if (lower.includes("soc2") || lower.includes("hipaa") || lower.includes("security") || lower.includes("complian")) {
        answer = "NexusHR is SOC2 Type II, HIPAA, and ISO 27001 certified with 256-bit AES encryption at rest, TLS 1.3 in transit, and immutable cryptographically signed audit logs.";
      }

      setAiResponses((prev) => [...prev, { role: "assistant", text: answer }]);
      setIsAiThinking(false);
    }, 600);
  };

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
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/80 text-foreground transition-colors"
      ref={dropdownRef}
    >
      <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        
        {/* Left Section: NexusHR Original Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          {/* Original NexusHR Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
                NexusHR
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
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
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-sm ${
                activeDropdown === "product"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Product</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "product" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* 2. Solutions Dropdown */}
            <button
              onClick={() => toggleDropdown("solutions")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-sm ${
                activeDropdown === "solutions"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "solutions" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* 3. Docs / Reports Link */}
            <Link
              href="/dashboard/reports"
              className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>

            {/* 4. Pricing Link */}
            <Link
              href="/pricing"
              className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>

            {/* 5. Resources Dropdown */}
            <button
              onClick={() => toggleDropdown("resources")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all text-sm ${
                activeDropdown === "resources"
                  ? "border border-primary bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  activeDropdown === "resources" ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
          </nav>
        </div>

        {/* Right Section: Discord, GitHub, ThemeToggle, Log in, Sign up */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Discord Link */}
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>23.1k</span>
          </a>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Ask AI Pill Button */}
          <button
            type="button"
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>Ask AI</span>
          </button>

          {/* Log In Button */}
          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-full border-border/80 dark:border-zinc-700 bg-transparent text-foreground hover:bg-muted/50 font-medium text-sm px-5 h-9 whitespace-nowrap inline-flex items-center justify-center transition-colors"
            >
              Log in
            </Button>
          </Link>

          {/* Sign Up / Launch App Demo Button */}
          <Link href="/register">
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm px-5 h-9 whitespace-nowrap inline-flex items-center justify-center shadow-sm shadow-primary/20 transition-colors"
            >
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

            {/* Column 3: Featured Visual Banner Card (Translucent Theme-Aligned Dot Matrix) */}
            <div className="flex flex-col justify-end">
              <Link
                href="/dashboard"
                onClick={() => setActiveDropdown(null)}
                className="relative overflow-hidden rounded-2xl border border-border/50 dark:border-border/30 bg-transparent hover:bg-primary/[0.02] dark:hover:bg-white/[0.02] p-6 h-full min-h-[260px] flex flex-col justify-end group hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300"
              >
                {/* 1. Base Dot Matrix Grid (Delicate Transparent) */}
                <div
                  className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.35) 1px, transparent 1px)`,
                    backgroundSize: "8px 8px",
                  }}
                />

                {/* 2. Top-Left Primary Indigo Glow (Soft Subtle Transparent) */}
                <div
                  className="block dark:hidden absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 70% 60% at 20% 15%, rgba(99, 102, 241, 0.08), rgba(79, 70, 229, 0.02) 50%, transparent 75%)",
                  }}
                />
                {/* 2. Top-Left Primary Indigo Glow (Dark Mode Transparent) */}
                <div
                  className="hidden dark:block absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 70% 60% at 20% 15%, rgba(99, 102, 241, 0.22), rgba(79, 70, 229, 0.06) 45%, transparent 75%)",
                  }}
                />

                {/* 3. Top-Right Violet/Purple Glow (Soft Subtle Transparent) */}
                <div
                  className="block dark:hidden absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 75% 65% at 88% 22%, rgba(168, 85, 247, 0.09), rgba(59, 130, 246, 0.02) 50%, transparent 75%)",
                  }}
                />
                {/* 3. Top-Right Violet Glow (Dark Mode Transparent) */}
                <div
                  className="hidden dark:block absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 75% 65% at 88% 25%, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.08) 45%, transparent 75%)",
                  }}
                />

                {/* 4. Translucent Bottom Fade */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent"
                />

                {/* 5. Clean Typography */}
                <div className="relative z-10">
                  <h4 className="text-xl font-extrabold text-foreground dark:text-white tracking-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span>What is Neon</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </h4>
                  <p className="text-xs text-muted-foreground dark:text-[#a1a1aa] mt-1.5 leading-relaxed font-normal">
                    Built around Lakebase Postgres, by Databricks
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
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>Agents</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Infra for app-generation agents like Replit & v0
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pl-4 shrink-0">
                    <div className="w-8 h-8 rounded-lg border border-border/80 dark:border-zinc-700 bg-background/50 dark:bg-zinc-900 flex items-center justify-center shadow-xs">
                      <span className="text-[11px] font-medium text-foreground dark:text-white">AI</span>
                    </div>
                    <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="text-muted-foreground/40 dark:text-zinc-700">
                      <path d="M0 30H10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 10V50" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 10H20" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 30H20" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 50H20" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <div className="flex flex-col gap-1 items-center">
                      <DatabaseCylinder active />
                      <DatabaseCylinder />
                      <DatabaseCylinder />
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
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>Platforms</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                      Deploy isolated backends for your end users
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-x-3 gap-y-1 pl-4 shrink-0">
                    <DatabaseCylinder />
                    <DatabaseCylinder active />
                    <DatabaseCylinder />

                    <DatabaseCylinder active />
                    <DatabaseCylinder />
                    <DatabaseCylinder />

                    <DatabaseCylinder />
                    <DatabaseCylinder />
                    <DatabaseCylinder active />
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
      {/* ========================================================= */}
      {/* Ask AI Side Drawer (Slide-Over Panel) */}
      {/* ========================================================= */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 text-card-foreground">
            
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
                    Instant answers on architecture, branches & payroll
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
                "How do workspace branches work?",
                "Explain autoscaling to zero",
                "What are the SOC2 compliance specs?",
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

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {aiResponses.map((res, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    res.role === "assistant"
                      ? "bg-muted/40 text-foreground border border-border/70 mr-4"
                      : "bg-primary text-primary-foreground ml-6 shadow-md"
                  }`}
                >
                  {res.text}
                </div>
              ))}
              {isAiThinking && (
                <div className="p-3.5 rounded-2xl bg-muted/40 text-muted-foreground text-xs flex items-center gap-2 border border-border/60">
                  <Sparkles className="h-4 w-4 animate-spin text-emerald-500" />
                  <span>Analyzing architecture docs...</span>
                </div>
              )}
            </div>

            {/* Input Form at Bottom */}
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
