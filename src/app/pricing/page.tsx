"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NeonNavbar } from "@/components/landing/NeonNavbar";
import { NeonFooter } from "@/components/landing/NeonFooter";
import {
  Check,
  Minus,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Database,
  GitBranch,
  RefreshCw,
  HardDrive,
  Cpu,
  Bot,
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  X,
  Send,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isGetHelpOpen, setIsGetHelpOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSendAi = (queryText?: string) => {
    const textToSend = queryText || aiInput;
    if (!textToSend.trim()) return;

    const userMsg = { role: "user" as const, text: textToSend };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setIsAiLoading(true);

    setTimeout(() => {
      let reply = "NexusHR provides serverless Postgres database branching, automated employee management, transparent metered pricing, and enterprise-grade security. How can I assist you further?";
      const lower = textToSend.toLowerCase();
      if (lower.includes("demo")) {
        reply = "You can request a custom live demo by clicking 'Talk to Sales' or heading to our contact page. Our solution architects will schedule a 30-minute tailored walkthrough.";
      } else if (lower.includes("enterprise") || lower.includes("pricing")) {
        reply = "Our Enterprise plan includes custom storage capacity, 99.99% uptime SLAs, dedicated VPC peering, and custom billing terms. Contact sales for tailored volume discounts.";
      } else if (lower.includes("hipaa")) {
        reply = "Yes! NexusHR supports HIPAA compliance on Scale and Enterprise plans, complete with Business Associate Agreements (BAAs) and encrypted audit logs.";
      } else if (lower.includes("security")) {
        reply = "NexusHR features SOC2 Type II certification, role-based access control (RBAC), end-to-end TLS encryption, IP allowlisting, and automated daily compliance logging.";
      } else if (lower.includes("support") || lower.includes("help") || lower.includes("contact")) {
        reply = "NexusHR Support is available 24/7! You can reach our dedicated engineering and support team at support@nexushr.io or ask any technical/billing question directly here in this AI assistant.";
      }

      setAiMessages((prev) => [...prev, { role: "assistant" as const, text: reply }]);
      setIsAiLoading(false);
    }, 600);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pricingPlans = [
    {
      name: "Free",
      badge: null,
      price: "$0",
      period: "forever",
      description: "Get started with a serverless Postgres database and instant branching.",
      cta: "Get started",
      ctaLink: "/register",
      ctaVariant: "outline" as const,
      popular: false,
      features: [
        "0.5 GB storage included",
        "10 database branches",
        "24-hour Point-in-time restore",
        "Shared compute pool",
        "Community support",
      ],
      usage: [
        { label: "Extra storage", value: "N/A" },
        { label: "Extra compute", value: "N/A" },
        { label: "Extra branches", value: "N/A" },
      ],
    },
    {
      name: "Launch",
      badge: "RECOMMENDED",
      price: billingCycle === "monthly" ? "$19" : "$15",
      period: "per month",
      description: "For production applications, scaling projects, and engineering teams.",
      cta: "Start free trial",
      ctaLink: "/register",
      ctaVariant: "default" as const,
      popular: true,
      features: [
        "10 GB storage included",
        "100 database branches",
        "7-day Point-in-time restore",
        "Dedicated autoscaling compute",
        "Standard 24/7 support",
        "IP allowlisting & connection pooling",
      ],
      usage: [
        { label: "Extra storage", value: "$1.50 / GB" },
        { label: "Extra compute", value: "$0.16 / CU-hr" },
        { label: "Extra branches", value: "Included" },
      ],
    },
    {
      name: "Scale",
      badge: null,
      price: billingCycle === "monthly" ? "$69" : "$55",
      period: "per month",
      description: "For high-traffic production workloads requiring enterprise reliability.",
      cta: "Start free trial",
      ctaLink: "/register",
      ctaVariant: "outline" as const,
      popular: false,
      features: [
        "50 GB storage included",
        "Unlimited database branches",
        "30-day Point-in-time restore",
        "High-performance compute sizing",
        "Priority 1-hour SLA support",
        "SOC2 Type II & HIPAA compliance",
        "Read replicas & custom regions",
      ],
      usage: [
        { label: "Extra storage", value: "$1.25 / GB" },
        { label: "Extra compute", value: "$0.14 / CU-hr" },
        { label: "Extra branches", value: "Included" },
      ],
    },
  ];

  const comparisonCategories = [
    {
      category: "Core Database & Storage",
      rows: [
        { feature: "Included Storage", free: "0.5 GB", launch: "10 GB", scale: "50 GB" },
        { feature: "Additional Storage", free: "—", launch: "$1.50 / GB", scale: "$1.25 / GB" },
        { feature: "Database Branches", free: "10", launch: "100", scale: "Unlimited" },
        { feature: "Point-in-Time Recovery", free: "24 hours", launch: "7 days", scale: "30 days" },
        { feature: "Connection Pooling (PgBouncer)", free: true, launch: true, scale: true },
        { feature: "S3 Object Storage Integration", free: true, launch: true, scale: true },
      ],
    },
    {
      category: "Compute & Performance",
      rows: [
        { feature: "Autoscaling Compute", free: "0.25 CU max", launch: "Up to 8 CU", scale: "Up to 32 CU" },
        { feature: "Cold Start Time", free: "< 500ms", launch: "< 250ms", scale: "Instant (< 50ms)" },
        { feature: "Dedicated Endpoints", free: false, launch: true, scale: true },
        { feature: "Read Replicas", free: false, launch: "Up to 3", scale: "Unlimited" },
        { feature: "Query Performance Insights", free: "Basic", launch: "Advanced", scale: "Real-time + Profiler" },
      ],
    },
    {
      category: "Security & Compliance",
      rows: [
        { feature: "SSL / TLS Encryption in Transit & Rest", free: true, launch: true, scale: true },
        { feature: "IP Allowlisting", free: false, launch: true, scale: true },
        { feature: "SOC2 Type II & HIPAA Compliance", free: false, launch: false, scale: true },
        { feature: "Single Sign-On (SAML / Okta / Azure)", free: false, launch: false, scale: true },
        { feature: "Audit Logging Export", free: false, launch: "7-day logs", scale: "90-day logs" },
      ],
    },
    {
      category: "Support & Operations",
      rows: [
        { feature: "Uptime SLA", free: "Best effort", launch: "99.9%", scale: "99.95%" },
        { feature: "Support Tier", free: "Community Discord", launch: "Standard (24/7 Email)", scale: "Priority (1-hr SLA)" },
        { feature: "Dedicated Slack Channel", free: false, launch: false, scale: true },
        { feature: "Custom Invoicing & PO", free: false, launch: false, scale: true },
      ],
    },
  ];

  const defaultCapabilities = [
    {
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      title: "Instant Database Branching",
      description: "Create complete, isolated copy-on-write database clones in under 1 second for staging, testing, or CI/CD.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-primary" />,
      title: "Serverless Postgres Engine",
      description: "Decoupled storage and compute that scales up automatically during traffic spikes and scales to zero when idle.",
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-primary" />,
      title: "Point-in-Time Restore",
      description: "Rewind any branch or database to any exact second in the past without manual snapshot maintenance.",
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Fast Connection Pooling",
      description: "Built-in serverless connection pooling capable of handling tens of thousands of concurrent client connections.",
    },
    {
      icon: <HardDrive className="h-5 w-5 text-primary" />,
      title: "S3-Compatible Storage Tier",
      description: "Limitless storage durability with automatic tiering to highly cost-effective distributed object storage.",
    },
    {
      icon: <Bot className="h-5 w-5 text-primary" />,
      title: "AI Gateway & Embeddings",
      description: "Built-in vector search with pgvector extension and streamlined integration with modern LLM workflows.",
    },
  ];

  const faqs = [
    {
      question: "How does billing and usage work?",
      answer: "NexusHR plans include a base allocation of storage, compute, and branches. If you exceed included limits on paid plans, additional usage is metered transparently by the second with zero overage penalties or surprise charges.",
    },
    {
      question: "Can I upgrade, downgrade, or cancel at any time?",
      answer: "Yes, you can modify or cancel your plan at any point directly from the project settings. When upgrading or downgrading, prorated adjustments are calculated automatically.",
    },
    {
      question: "How does serverless compute scaling calculate cost?",
      answer: "Compute is billed by Compute Units (CUs) per hour. When your database is idle, compute can scale down to zero, ensuring you never pay for unutilized server capacity.",
    },
    {
      question: "What happens if I exceed my Free plan limits?",
      answer: "On the Free tier, databases that reach storage or branch limits will prevent new branch creation until space is cleared or you upgrade to Launch. We never lock read access to your data.",
    },
    {
      question: "Do you offer custom Enterprise agreements and SLAs?",
      answer: "Yes! Our Enterprise tier provides tailored high-volume pricing, custom 99.99% SLAs, dedicated VPC peering, HIPAA BAAs, and assigned technical account managers.",
    },
    {
      question: "What payment methods are supported?",
      answer: "We support all major credit and debit cards (Visa, MasterCard, American Express), as well as annual invoicing via ACH/wire transfer for Scale and Enterprise customers.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Top Subtle Announcement Bar */}
      <div className="border-b border-border/60 bg-muted/40 text-xs py-2 px-4 text-center text-muted-foreground flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Export from Postgres without taking an outage.
        </span>
        <Link href="/dashboard/reports" className="text-primary hover:underline font-medium flex items-center gap-0.5">
          Read announcement <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Main Header */}
      <NeonNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          Simple, Transparent Pricing
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          NexusHR pricing
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
          All the power of Postgres, with pricing built for scale.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="mt-8 inline-flex items-center p-1 rounded-full border border-border bg-card/60 backdrop-blur-sm shadow-xs">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Annual billing
            <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* 3 Main Pricing Cards */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-primary bg-card shadow-xl shadow-primary/10 dark:shadow-primary/5 ring-1 ring-primary/20"
                  : "border border-border/80 bg-card/50 hover:border-border hover:bg-card shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Title & Price */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">/{plan.period}</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>

                {/* Action CTA Button */}
                <div className="mt-6">
                  <Link href={plan.ctaLink} className="block w-full">
                    <Button
                      variant={plan.ctaVariant}
                      className={`w-full rounded-full font-semibold text-sm h-10 ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>

                {/* Included Highlights */}
                <div className="mt-8 pt-6 border-t border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Included in {plan.name}:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-foreground">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Extra Usage Rates */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Additional usage:
                </p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {plan.usage.map((u, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{u.label}</span>
                      <span className="font-semibold text-foreground">{u.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scale / Enterprise Banner Card */}
        <div className="mt-8 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-muted/30 to-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Scale / Enterprise</span>
              <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded">Custom</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Tailored storage capacity, custom commit volume discounts, 99.99% SLAs, dedicated VPC peering, and enterprise security compliance.
            </p>
          </div>
          <Link href="/dashboard/settings" className="shrink-0">
            <Button variant="outline" className="rounded-full font-semibold text-sm h-10 px-6 border-border hover:bg-muted">
              Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Proof / Trusted By */}
      <section className="border-y border-border/60 bg-muted/20 py-10">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by modern engineering teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-lg tracking-tight text-foreground">Vercel</span>
            <span className="font-bold text-lg tracking-tight text-foreground">Replit</span>
            <span className="font-bold text-lg tracking-tight text-foreground">Retool</span>
            <span className="font-bold text-lg tracking-tight text-foreground">Databricks</span>
            <span className="font-bold text-lg tracking-tight text-foreground">Cursor</span>
            <span className="font-bold text-lg tracking-tight text-foreground">Branch</span>
          </div>
        </div>
      </section>

      {/* Detailed Feature Comparison Table */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Compare plan features
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            A comprehensive breakdown of all database capabilities, compute tiers, security, and SLAs.
          </p>
        </div>

        <div className="border border-border rounded-2xl overflow-x-auto bg-card shadow-sm">
          <div className="min-w-[560px]">
            {/* Sticky Header Row */}
            <div className="grid grid-cols-12 bg-muted/60 border-b border-border py-4 px-6 font-semibold text-xs sm:text-sm text-foreground">
            <div className="col-span-6 sm:col-span-5 text-muted-foreground uppercase text-[11px] tracking-wider self-center">
              Plan Features
            </div>
            <div className="col-span-2 sm:col-span-2 text-center font-bold">Free</div>
            <div className="col-span-2 sm:col-span-2 text-center font-bold text-primary">Launch</div>
            <div className="col-span-2 sm:col-span-3 text-center font-bold">Scale</div>
          </div>

          {/* Comparison Rows */}
          {comparisonCategories.map((cat, catIdx) => (
            <div key={cat.category}>
              <div className="bg-muted/30 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/80">
                {cat.category}
              </div>
              {cat.rows.map((row, rowIdx) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-12 py-3.5 px-6 text-xs sm:text-sm items-center border-b border-border/50 hover:bg-muted/20 transition-colors ${
                    rowIdx % 2 === 0 ? "bg-transparent" : "bg-muted/[0.07]"
                  }`}
                >
                  <div className="col-span-6 sm:col-span-5 font-medium text-foreground">
                    {row.feature}
                  </div>
                  
                  {/* Free Value */}
                  <div className="col-span-2 sm:col-span-2 text-center text-muted-foreground">
                    {typeof row.free === "boolean" ? (
                      row.free ? (
                        <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span>{row.free}</span>
                    )}
                  </div>

                  {/* Launch Value */}
                  <div className="col-span-2 sm:col-span-2 text-center font-medium text-foreground">
                    {typeof row.launch === "boolean" ? (
                      row.launch ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span className="text-primary font-semibold">{row.launch}</span>
                    )}
                  </div>

                  {/* Scale Value */}
                  <div className="col-span-2 sm:col-span-3 text-center font-medium text-foreground">
                    {typeof row.scale === "boolean" ? (
                      row.scale ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                      )
                    ) : (
                      <span>{row.scale}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included with every Neon database, on every plan section */}
      <section className="border-t border-border/80 bg-muted/20 py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Included with every NexusHR database, on every plan, by default.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              These are core platform capabilities that come out of the box with NexusHR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {defaultCapabilities.map((cap, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  {cap.icon}
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">{cap.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section: Your questions, answered */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Title */}
          <div className="md:col-span-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Your questions, answered
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
              Everything you need to know about our database plans, billing, compute units, and enterprise contracts.
            </p>
          </div>

          {/* Right Accordion */}
          <div className="md:col-span-8 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-5 text-left font-semibold text-sm sm:text-base flex items-center justify-between gap-4 hover:text-primary transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      openFaq === index ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom AI CTA Banner (Original Aesthetic with Tree Silhouette) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-[#0a0a0c] dark:bg-[#070709] text-white p-8 sm:p-14 min-h-[300px] flex flex-col justify-center shadow-2xl">
          {/* Stylized Tree Silhouette SVG on the right */}
          <div className="absolute right-0 bottom-0 top-0 w-full sm:w-[50%] pointer-events-none opacity-40 dark:opacity-45 overflow-hidden flex items-end justify-end">
            <svg
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover object-bottom"
            >
              {/* Main Trunk and primary branches */}
              <path
                d="M500 380 C440 370 380 340 330 310 C290 285 260 250 220 220 C180 190 140 160 100 130 C80 115 60 95 40 70"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M330 310 C360 270 400 230 450 200 C470 185 490 175 500 170"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M260 250 C280 200 320 160 370 130 C410 105 450 85 490 70"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M220 220 C230 170 250 130 290 100 C330 70 380 50 430 30"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M140 160 C160 120 190 90 230 70 C270 50 310 35 360 20"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Dense fine twigs / neural matrix foliage */}
              <path
                d="M370 130 C380 110 400 90 430 80 M400 230 C420 200 450 180 480 170 M290 100 C300 80 320 65 350 55 M100 130 C110 105 130 85 160 70 M450 200 C470 170 490 150 500 140 M330 70 C350 50 380 40 410 30"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-xl">
            {/* Top Badge: ▶ ASK AI */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase mb-4">
              <span className="text-red-500 text-[9px]">▶</span>
              <span className="font-bold">ASK AI</span>
            </div>

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-tight">
              Still have questions? Ask our AI.
            </h3>

            {/* Subtitle */}
            <p className="mt-2 text-lg sm:text-2xl text-[#8e8e93] font-normal">
              It knows NexusHR inside and out.
            </p>

            {/* Get Answers Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Get Answers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Assistant Modal / Popup */}
      {isAiModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-0 duration-150"
          onClick={() => setIsAiModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[560px] rounded-2xl bg-card border border-border text-card-foreground shadow-2xl p-6 sm:p-7 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header with Sparkles & Greeting */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-base text-foreground">Hi!</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  I'm an AI assistant here to help you learn about NexusHR and answer any questions you have.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                  Feel free to ask about pricing, features, enterprise solutions, or anything else!
                </p>
              </div>
            </div>

            {/* 2x2 Suggestion Question Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {[
                "How to get a Demo request?",
                "What are the Enterprise Pricing?",
                "HIPAA Compliance",
                "Security Overview",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => handleSendAi(question)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl border border-border/80 bg-muted/30 hover:border-primary/60 hover:bg-muted/60 text-xs sm:text-[13px] font-medium text-foreground transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{question}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Interactive Chat Messages */}
            {aiMessages.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-3 mb-4 p-3.5 rounded-xl bg-muted/20 border border-border/50 text-xs sm:text-sm">
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-card border border-border text-foreground leading-relaxed shadow-2xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping" />
                    NexusHR AI is answering...
                  </div>
                )}
              </div>
            )}

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAi();
              }}
              className="relative flex items-center mb-4"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="How do I get started?"
                className="w-full h-11 pl-4 pr-12 rounded-xl border border-border bg-muted/40 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              <button
                type="submit"
                disabled={!aiInput.trim()}
                className="absolute right-2.5 p-1.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Footer Bar */}
            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50 relative">
              <div className="flex items-center gap-1.5">
                <span>Powered by</span>
                <span className="font-semibold text-foreground">inkeep</span>
                <span>&</span>
                <span className="font-semibold text-foreground">NexusHR</span>
              </div>

              {/* Get Help Popover Menu */}
              <div className="relative">
                {isGetHelpOpen && (
                  <div className="absolute right-0 bottom-full mb-2.5 w-44 rounded-xl border border-border bg-card text-card-foreground shadow-2xl p-1.5 z-30 animate-in fade-in-0 zoom-in-95 duration-150">
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsGetHelpOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground transition-colors group"
                    >
                      <svg className="h-4 w-4 fill-emerald-500 shrink-0" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      <span>Discord</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setIsGetHelpOpen(false);
                        handleSendAi("How can I contact NexusHR Support team directly?");
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>NexusHR Support</span>
                    </button>

                    {/* Popover caret pointing down to Get help button */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsGetHelpOpen(!isGetHelpOpen)}
                  className="px-2.5 py-1 rounded-md border border-border hover:bg-muted font-medium text-foreground text-[11px] transition-colors cursor-pointer"
                >
                  Get help
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neon-Style Modern Footer */}
      <NeonFooter />
    </div>
  );
}
