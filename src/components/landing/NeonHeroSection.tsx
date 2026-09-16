"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Zap,
  HardDrive,
  Bot,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function NeonHeroSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const heroCards = [
    {
      id: "core-engine",
      title: "Workforce Core Engine",
      tagline: "Serverless employee directory that branches and scales with your team.",
      badge: "Real-time Sync",
      icon: Users,
      color: "emerald",
      preview: {
        metric: "12,480 Active Staff",
        subMetric: "99.99% Sync SLA",
        details: [
          { label: "Engineering Org", val: "420 Members" },
          { label: "Global Payroll", val: "14 Currencies" },
          { label: "Auto-Provisioning", val: "Instant Active" },
        ],
      },
    },
    {
      id: "auth-rbac",
      title: "Managed RBAC & Auth",
      tagline: "Granular role permissions with audit-logged sessions and SAML/SSO.",
      badge: "Zero Trust",
      icon: Shield,
      color: "blue",
      preview: {
        metric: "Enterprise SSO / SAML",
        subMetric: "SOC2 Type II Verified",
        details: [
          { label: "Role Policies", val: "Custom Scopes" },
          { label: "Multi-Factor", val: "Hardware FIDO2" },
          { label: "Session Security", val: "Encrypted JWT" },
        ],
      },
    },
    {
      id: "async-payroll",
      title: "Async Payroll Engine",
      tagline: "Automated multi-tier salary calculations with zero timeouts.",
      badge: "Fault-Tolerant",
      icon: Zap,
      color: "amber",
      preview: {
        metric: "$1.48M Processed",
        subMetric: "Batch Cycle: <1.2s",
        details: [
          { label: "Direct Deposits", val: "Automated ACH" },
          { label: "Tax Withholding", val: "50 States Validated" },
          { label: "Ledger Reconcile", val: "Real-time Match" },
        ],
      },
    },
    {
      id: "document-vault",
      title: "Encrypted Document Vault",
      tagline: "S3-compatible immutable document vault for contracts & W-2s.",
      badge: "256-bit AES",
      icon: HardDrive,
      color: "purple",
      preview: {
        metric: "Immutable Retention",
        subMetric: "HIPAA Compliant",
        details: [
          { label: "Offer Letters", val: "E-Sign Linked" },
          { label: "Tax Filings", val: "Encrypted Vault" },
          { label: "Audit Evidence", val: "10-Yr Archival" },
        ],
      },
    },
    {
      id: "ai-gateway",
      title: "HR AI Copilot Gateway",
      tagline: "One unified intelligence API for workforce forecasting & policy reasoning.",
      badge: "LLM Powered",
      icon: Bot,
      color: "rose",
      preview: {
        metric: "Automated Reasoning",
        subMetric: "35ms Response Latency",
        details: [
          { label: "Policy Inquiries", val: "Self-Service AI" },
          { label: "Attrition Risk", val: "Predictive Neural" },
          { label: "Headcount Model", val: "Adaptive Q4 Run" },
        ],
      },
    },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Mesh & Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-primary/15 via-emerald-500/5 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-24 right-1/4 w-[400px] h-[400px] bg-teal-500/10 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Top Eyebrow Pill */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-muted/40 hover:bg-muted/70 text-xs font-medium text-foreground transition-all duration-200 shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              NEXUSHR PLATFORM ARCHITECTURE
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </Link>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tighter text-foreground leading-[1.08] max-w-4xl mb-6">
          The workforce platform for modern enterprises,{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-primary bg-clip-text text-transparent">
            built to scale on NexusHR.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          The all-in-one infrastructure for high-velocity teams. Run employee directories, live attendance sync, multi-state payroll, and AI agents: instant, branchable, and serverless.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8 h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/pricing">
            <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-sm font-medium border-border/80 hover:bg-muted transition-all">
              View Pricing & Plans
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>No credit card required · Free 14-day enterprise trial</span>
          </div>
        </div>

        {/* Neon-Style 5-Column Interactive Feature Media Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {heroCards.map((card, idx) => {
              const isSelected = activeTab === idx;
              const Icon = card.icon;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-primary/60 bg-muted/40 shadow-xl shadow-primary/10 ring-1 ring-primary/30"
                      : "border-border/60 bg-card/40 hover:bg-muted/30 hover:border-border"
                  }`}
                >
                  {/* Subtle Card Glow */}
                  {isSelected && (
                    <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                  )}

                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`p-2 rounded-xl transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {card.tagline}
                    </p>
                  </div>

                  {/* Live Mini Preview Box */}
                  <div className="mt-6 pt-4 border-t border-border/40">
                    <div className="rounded-xl border border-border/60 bg-background/80 p-3 shadow-inner">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-foreground truncate">
                          {card.preview.metric}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-500 font-semibold">
                          {card.preview.subMetric}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {card.preview.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground truncate">{detail.label}</span>
                            <span className="font-mono text-foreground font-medium">{detail.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
