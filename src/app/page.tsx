"use client";

import React from "react";
import Link from "next/link";
import { NeonNavbar } from "@/components/landing/NeonNavbar";
import {
  Sparkles,
  Users,
  CalendarCheck,
  CalendarOff,
  CreditCard,
  FileBarChart,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  Building,
  Lock,
  ChevronRight,
  BarChart3,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Employee Directory & Profiles",
      description: "Centralize all employee records, job history, contact information, and compliance documents in one secure directory.",
    },
    {
      icon: <CalendarCheck className="h-6 w-6 text-emerald-500" />,
      title: "Real-time Attendance Tracking",
      description: "Automated daily check-ins, punctuality metrics, overtime calculations, and visual calendar-based monthly tracking.",
    },
    {
      icon: <CalendarOff className="h-6 w-6 text-amber-500" />,
      title: "Leave & PTO Management",
      description: "Custom leave types, transparent quota balances, multi-tier approval workflows, and vacation tracking.",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-500" />,
      title: "Automated Payroll & Payslips",
      description: "One-click payroll disbursement, earnings and tax withholding breakdowns, and printable PDF payslip generation.",
    },
    {
      icon: <FileBarChart className="h-6 w-6 text-purple-500" />,
      title: "Workforce Analytics & Reports",
      description: "Instant executive dashboards, headcount trends, cost distributions, and one-click CSV / PDF compliance exports.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-500" />,
      title: "Enterprise Audit & Security",
      description: "Granular role-based access, full audit trail logging of all administrative actions, and enterprise data privacy.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Company Account",
      description: "Set up your organization workspace, invite administrators, and configure custom department hierarchies in under 3 minutes.",
    },
    {
      number: "02",
      title: "Onboard Your Team Members",
      description: "Add employees manually with detailed profile wizards or import your full roster with automated validation.",
    },
    {
      number: "03",
      title: "Manage Workforce Seamlessly",
      description: "Review attendance, approve leave requests with one click, run error-free payroll, and track growth analytics in real-time.",
    },
  ];

  const benefits = [
    {
      title: "Save 75% Administrative Time",
      description: "Eliminate messy spreadsheets and endless email chains. Automate repetitive HR workflows and approval chains.",
      stat: "14 hrs/wk",
      statLabel: "Saved per HR Manager",
    },
    {
      title: "100% Payroll & Tax Precision",
      description: "Automated gross-to-net calculations, tax withholdings, and bonus allocations with zero manual math errors.",
      stat: "99.9%",
      statLabel: "Calculation Accuracy",
    },
    {
      title: "Unified Workforce Visibility",
      description: "Empower managers and executives with instant clarity on employee status, attendance rates, and team budgets.",
      stat: "Real-time",
      statLabel: "Attendance & Headcount Sync",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for growing startups and small businesses up to 25 employees.",
      features: [
        "Up to 25 active employees",
        "Employee directory & profiles",
        "Attendance tracking & calendar",
        "Standard leave management",
        "Basic monthly payroll",
        "Email support",
      ],
      popular: false,
      ctaText: "Start 14-Day Free Trial",
      href: "/register",
    },
    {
      name: "Professional",
      price: "$89",
      period: "/month",
      description: "Built for scaling companies needing advanced approvals and custom reports.",
      features: [
        "Up to 100 active employees",
        "Everything in Starter, plus:",
        "Multi-tier leave approval chains",
        "Custom compensation & bonus rules",
        "Automated PDF payslip generation",
        "Audit log history & export",
        "Priority 24/7 support",
      ],
      popular: true,
      ctaText: "Start 14-Day Free Trial",
      href: "/register",
    },
    {
      name: "Enterprise",
      price: "$249",
      period: "/month",
      description: "For large organizations demanding custom integrations and dedicated SLA.",
      features: [
        "Unlimited employee headcount",
        "Everything in Professional, plus:",
        "Custom role-based permissions",
        "Dedicated account manager",
        "Custom API & webhook integrations",
        "Single Sign-On (SSO / SAML)",
        "99.99% Uptime SLA guarantee",
      ],
      popular: false,
      ctaText: "Contact Enterprise Sales",
      href: "/register",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Exact Neon Header with Megamenu Dropdowns */}
      <NeonNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          {/* Badge Announcement */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3.5 py-1 text-xs font-semibold text-foreground mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Next-Gen Workforce Management Suite 2.0
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl max-w-4xl mx-auto leading-tight sm:leading-none">
            Manage Your Workforce. <br />
            <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Simplify Your Business.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
            The all-in-one B2B employee management SaaS platform built for fast-growing companies.
            Streamline employee profiles, attendance tracking, leave requests, and payroll with zero complexity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 shadow-lg shadow-primary/25 h-12 px-8">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold gap-2 h-12 px-8">
                <BarChart3 className="h-4 w-4 text-primary" />
                Explore Live Demo
              </Button>
            </Link>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant 2-minute setup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> SOC2 compliant & encrypted
            </span>
          </div>

          {/* Dashboard Preview Visual */}
          <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border bg-card p-3 shadow-2xl ring-1 ring-border/60">
            <div className="rounded-xl border bg-background/50 overflow-hidden text-left p-6 sm:p-8 space-y-6">
              {/* Header preview mock */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-foreground">NexusTech Workforce Dashboard</h2>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Live Pulse
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real-time attendance, leave requests, and payroll summary
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/dashboard">
                    <Button size="sm" className="text-xs">
                      Open Full Screen View
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stat Cards Grid Preview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground font-medium">Total Headcount</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">149</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +12% this quarter</p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground font-medium">Present Today</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">141</p>
                  <p className="text-[11px] text-muted-foreground mt-1">94.6% attendance rate</p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground font-medium">Pending Approvals</p>
                  <p className="text-2xl font-bold mt-1 text-amber-600">3</p>
                  <p className="text-[11px] text-muted-foreground mt-1">2 leave, 1 payroll batch</p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground font-medium">Monthly Payroll</p>
                  <p className="text-2xl font-bold mt-1 text-foreground">$146,800</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Disbursed on time</p>
                </div>
              </div>

              {/* Sample Activity Feed */}
              <div className="rounded-lg border bg-muted/20 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Recent Platform Activity
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-medium text-foreground">
                      Sarah Jenkins approved 5 days Annual Leave for Priya Patel
                    </span>
                    <span className="text-muted-foreground text-[11px]">10m ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      September 2026 direct deposit payroll generated ($146,800)
                    </span>
                    <span className="text-muted-foreground text-[11px]">1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by forward-thinking HR teams and 500+ modern companies
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Building className="h-5 w-5" /> ApexGlobal
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Zap className="h-5 w-5" /> PulseLogic
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Layers className="h-5 w-5" /> HyperScale Labs
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Lock className="h-5 w-5" /> TrustGuard Inc
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5" /> ChronoFlow
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Comprehensive Capabilities
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything Your Organization Needs to Scale Workforce Operations
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Designed from the ground up to replace fragmented HR tools with a single unified platform.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/40 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Simple 3-Step Setup
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get Up and Running in Minutes
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Transitioning your team to NexusHR is effortless with our guided onboarding workflow.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="text-4xl font-black text-primary/20 block mb-2">{step.number}</span>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical SaaS Benefits Section */}
      <section id="benefits" className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                Measurable ROI
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built to Save Time, Cut Overhead, and Drive Compliance
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Our customers consistently report significant reduction in administrative burden and near-zero payroll disputes.
              </p>

              <div className="mt-8 space-y-6">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-foreground">{b.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Admin Time Saved</p>
                  <p className="text-4xl font-extrabold text-primary mt-2">14 hrs</p>
                  <p className="text-xs text-muted-foreground mt-1">Per HR professional each week</p>
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-4">↑ 75% efficiency boost</p>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Payroll Accuracy</p>
                  <p className="text-4xl font-extrabold text-emerald-600 mt-2">99.9%</p>
                  <p className="text-xs text-muted-foreground mt-1">Eliminates calculation discrepancies</p>
                </div>
                <p className="text-xs text-muted-foreground font-semibold mt-4">Automated tax tables</p>
              </div>

              <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col justify-between sm:col-span-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Employee Retention</p>
                  <p className="text-4xl font-extrabold text-foreground mt-2">98.4%</p>
                  <p className="text-xs text-muted-foreground mt-1">Higher employee satisfaction with transparent PTO and automated payslips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Transparent Pricing
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Simple, Predictable Plans for Every Stage
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              All plans include 14-day free trial. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border bg-card p-8 shadow-sm flex flex-col justify-between ${
                  tier.popular ? "border-primary shadow-xl ring-2 ring-primary/20" : ""
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{tier.description}</p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-black text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{tier.period}</span>
                  </div>

                  <div className="mt-8 space-y-3">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t">
                  <Link href={tier.href}>
                    <Button
                      variant={tier.popular ? "default" : "outline"}
                      className="w-full font-semibold"
                    >
                      {tier.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-primary via-indigo-600 to-purple-700 p-8 sm:p-14 text-center text-white shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Ready to Modernize Your Workforce Management?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto font-normal">
              Join thousands of businesses managing their teams effortlessly with NexusHR.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-lg">
                  Start Your Free Trial Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                  View Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-14 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-bold text-base text-foreground">NexusHR</span>
              </Link>
              <p className="mt-3 text-xs text-muted-foreground max-w-sm">
                Next-generation B2B workforce management SaaS platform designed for high-growth companies.
              </p>
              <p className="mt-6 text-xs text-muted-foreground">
                © {new Date().getFullYear()} NexusHR Inc. All rights reserved.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2 text-xs">
                <li><Link href="/dashboard/employees" className="hover:text-foreground">Employees</Link></li>
                <li><Link href="/dashboard/attendance" className="hover:text-foreground">Attendance</Link></li>
                <li><Link href="/dashboard/leave" className="hover:text-foreground">Leave / PTO</Link></li>
                <li><Link href="/dashboard/payroll" className="hover:text-foreground">Payroll Engine</Link></li>
                <li><Link href="/dashboard/reports" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">Solutions</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-foreground">Startups</a></li>
                <li><a href="#" className="hover:text-foreground">Mid-market</a></li>
                <li><a href="#" className="hover:text-foreground">Enterprise</a></li>
                <li><a href="#" className="hover:text-foreground">Remote Teams</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider mb-3">Company & Legal</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Security & Compliance</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
