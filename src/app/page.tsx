"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { NeonAnnouncementBar } from "@/components/landing/NeonAnnouncementBar";
import { NeonNavbar } from "@/components/landing/NeonNavbar";
import { NeonHeroSection } from "@/components/landing/NeonHeroSection";
import { NeonLogoMarquee } from "@/components/landing/NeonLogoMarquee";
import { NeonAutoscalingDemo } from "@/components/landing/NeonAutoscalingDemo";
import { NeonBranchingVisualizer } from "@/components/landing/NeonBranchingVisualizer";
import { NeonCodePlayground } from "@/components/landing/NeonCodePlayground";
import { NeonEnterpriseBento } from "@/components/landing/NeonEnterpriseBento";
import { NeonCtaBanner } from "@/components/landing/NeonCtaBanner";
import { NeonFooter } from "@/components/landing/NeonFooter";
import { HeroMotionBackground } from "@/components/home/HeroMotionBackground";
import { HeroLiveDashboard } from "@/components/home/HeroLiveDashboard";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Scroll reveal observer setup
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    });

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth mouse move handler for hero parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

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
      title: "Create Your Company Workspace",
      description: "Set up your organization in seconds with multi-region replication and instant branchable database environments.",
    },
    {
      number: "02",
      title: "Sync Employees & SAML/SSO",
      description: "Automate identity provisioning with Okta, Azure AD, Google Workspace, or custom SCIM/REST webhooks.",
    },
    {
      number: "03",
      title: "Automate Payroll & Compliance",
      description: "Execute zero-error payroll batches across 50 states with branchable dry-run simulations and automated tax filings.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 overflow-x-hidden">
      {/* 1. Top Announcement Bar */}
      <NeonAnnouncementBar />

      {/* 2. Glassmorphic Sticky Header with Mega Dropdowns */}
      <NeonNavbar />

      {/* 3. Neon 5-Card Media Grid Hero */}
      <NeonHeroSection />

      {/* 4. Infinite Enterprise Logo Ticker */}
      <NeonLogoMarquee />

      {/* 5. Live Product Interactive Scene & 3D Dashboard */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
        className="relative py-24 overflow-hidden border-t border-border/40 bg-muted/5"
      >
        <HeroMotionBackground />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              LIVE PLATFORM EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
              A unified command center <br />
              <span className="text-muted-foreground">for every HR & payroll workflow.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore live analytics, attendance streaming, and automated payroll queues updated continuously with sub-second latency.
            </p>
          </div>

          {/* Interactive Live Dashboard Card */}
          <div className="max-w-5xl mx-auto">
            <HeroLiveDashboard
              tiltX={isHoveringHero ? (mousePos.y - 0.5) * -4 : 0}
              tiltY={isHoveringHero ? (mousePos.x - 0.5) * 4 : 0}
            />
          </div>
        </div>
      </section>

      {/* 6. Autoscaling & Workload Simulation Slider */}
      <NeonAutoscalingDemo />

      {/* 7. Zero-Copy Workforce Branching Visualizer */}
      <NeonBranchingVisualizer />

      {/* 8. Developer Multi-Language Code Playground */}
      <NeonCodePlayground />

      {/* 9. Core Features Bento Grid */}
      <section className="reveal-on-scroll py-24 border-t border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-500 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              COMPLETE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
              Everything high-growth teams need to operate.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A unified system connecting employee directories, time tracking, PTO approvals, payroll disbursements, and enterprise reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/70 bg-card/60 p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted/60 border border-border transition-colors group-hover:bg-primary/10">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. How It Works Steps */}
      <section className="reveal-on-scroll py-24 bg-muted/10 border-t border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
              Up and running in 3 simple steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/40"
              >
                <div className="text-3xl font-mono font-black text-primary/30 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Enterprise Trust & Security Bento */}
      <NeonEnterpriseBento />

      {/* 12. Final High-Impact Conversion Banner */}
      <NeonCtaBanner />
      {/* 13. Neon Multi-Column Footer */}
      <NeonFooter />
    </div>
  );
}
