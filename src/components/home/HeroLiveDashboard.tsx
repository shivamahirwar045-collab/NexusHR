"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowUpRight,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  CreditCard,
  TrendingUp,
} from "lucide-react";

interface HeroLiveDashboardProps {
  tiltX: number;
  tiltY: number;
}

export const HeroLiveDashboard: React.FC<HeroLiveDashboardProps> = ({ tiltX, tiltY }) => {
  const [pulseTick, setPulseTick] = useState(0);

  // Periodic pulse simulating live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="mt-14 relative mx-auto max-w-5xl transition-transform duration-700 ease-out"
      style={{
        perspective: 1400,
        transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
    >
      {/* LAYER 1: Deep Volumetric Glow & Dynamic Radial Light Cone */}
      <div className="pointer-events-none absolute -inset-10 -z-20 overflow-hidden rounded-[48px] opacity-75">
        <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[780px] rounded-full bg-gradient-to-tr from-primary/25 via-indigo-600/20 to-purple-600/25 blur-[120px] dark:from-primary/30 dark:via-indigo-500/25 dark:to-purple-600/35" />
        <div className="absolute -bottom-10 left-1/3 h-52 w-[420px] rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      {/* LAYER 2: Satellite HR Product Badges with True Parallax Depth */}

      {/* Satellite 1: Top-Right "Employee Onboarding Completed" */}
      <div
        className="animate-satellite-1 absolute -top-9 -right-4 sm:-right-8 z-30 hidden sm:flex items-center gap-3.5 rounded-2xl border border-emerald-500/40 bg-card/95 dark:bg-card/90 backdrop-blur-2xl p-3.5 shadow-2xl shadow-emerald-500/15 transition-all duration-300 hover:scale-105 hover:border-emerald-500/70 group"
        style={{
          transform: `translate3d(${tiltY * -1.8}px, ${tiltX * -1.8}px, 50px)`,
        }}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 group-hover:scale-110 transition-transform">
          <UserCheck className="h-5 w-5" />
        </div>
        <div className="text-left pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground">Employee Onboarding Completed</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-[11px] text-muted-foreground font-medium">Marcus Vance • Senior Engineer (ID: NX-1049)</p>
        </div>
      </div>

      {/* Satellite 2: Bottom-Left "Payroll Processing Running" */}
      <div
        className="animate-satellite-2 absolute -bottom-9 -left-4 sm:-left-8 z-30 hidden sm:flex items-center gap-3.5 rounded-2xl border border-primary/40 bg-card/95 dark:bg-card/90 backdrop-blur-2xl p-3.5 shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/70 group"
        style={{
          transform: `translate3d(${tiltY * -2.2}px, ${tiltX * -2.2}px, 55px)`,
        }}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/25 group-hover:scale-110 transition-transform">
          <CreditCard className="h-5 w-5" />
        </div>
        <div className="text-left pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground">Payroll Processing Running</span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[10px] font-bold">
              $146,800
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground font-medium">Direct Deposit Batch • 149 Employees Disbursed</p>
        </div>
      </div>

      {/* Satellite 3: Top-Left "AI Workforce Insights & Attendance Sync" */}
      <div
        className="animate-satellite-3 absolute -top-7 -left-3 sm:-left-6 z-30 hidden md:flex items-center gap-2.5 rounded-full border border-indigo-500/35 bg-card/90 dark:bg-card/85 backdrop-blur-xl px-4 py-1.5 shadow-xl transition-all hover:scale-105 hover:border-indigo-500/60"
        style={{
          transform: `translate3d(${tiltY * -1.2}px, ${tiltX * -1.2}px, 35px)`,
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
          AI Workforce Insights: <span className="text-emerald-500 font-mono font-bold">Attendance Sync Active</span>
        </span>
      </div>

      {/* LAYER 3: Main Glassmorphic Living Dashboard Object */}
      <div className="animate-float-slow relative rounded-2xl border border-white/25 dark:border-white/10 bg-card/95 backdrop-blur-2xl p-3 shadow-neon-3d transition-all duration-500 hover:shadow-[0_45px_100px_-15px_rgba(99,102,241,0.4)] overflow-hidden">
        
        {/* Specular Light Reflection Sweep across the glass pane */}
        <div className="animate-glass-sheen pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] -z-0" />

        {/* Outer Frame Glass Shell */}
        <div className="rounded-xl border border-border/80 bg-background/70 backdrop-blur-xl overflow-hidden text-left p-6 sm:p-8 space-y-6 relative z-10">
          
          {/* Header Preview Mock */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  NexusTech Workforce Dashboard
                </h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live Pulse
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Real-time attendance, leave requests, and payroll summary
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button size="sm" className="text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-primary/25 gap-1.5">
                  Open Full Screen View
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stat Cards Grid Preview with Active Telemetry Progress */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">Total Headcount</p>
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-2xl font-bold mt-1 text-foreground">149</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                ↑ +12% this quarter
              </p>
              <div className="mt-2.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out shadow-sm shadow-primary/50"
                  style={{ width: `${85 + (pulseTick % 10)}%` }}
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">Present Today</p>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-2xl font-bold mt-1 text-foreground">141</p>
              <p className="text-[11px] text-muted-foreground mt-1">94.6% attendance rate</p>
              <div className="mt-2.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-in-out shadow-sm shadow-emerald-500/50"
                  style={{ width: `${92 + (pulseTick % 6)}%` }}
                />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">Pending Approvals</p>
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              </div>
              <p className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">3</p>
              <p className="text-[11px] text-muted-foreground mt-1">2 leave, 1 payroll batch</p>
              <div className="mt-2.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-2/5 shadow-sm shadow-amber-500/50" />
              </div>
            </div>

            {/* Stat 4 */}
            <div className="relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">Monthly Payroll</p>
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <p className="text-2xl font-bold mt-1 text-foreground">$146,800</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Disbursed on time</p>
              <div className="mt-2.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-full shadow-sm shadow-indigo-500/50" />
              </div>
            </div>
          </div>

          {/* Real-Time Dynamic Telemetry Velocity Wave with Neon Glow */}
          <div className="rounded-xl border border-border/80 bg-muted/20 backdrop-blur-md p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Live Workforce Telemetry & Attendance Velocity
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-500 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  60 req/s • Real-time Sync
                </span>
              </div>
            </div>

            {/* Dynamic Animated Vector Wave with Neon Gradient & Glow */}
            <div className="h-18 w-full relative pt-1">
              <svg className="h-16 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 60">
                <defs>
                  <linearGradient id="chartGradientNeon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="rgb(139, 92, 246)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="strokeGradientNeon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="40%" stopColor="#8b5cf6" />
                    <stop offset="80%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 0,45 Q 60,15 120,35 T 240,20 T 360,30 T 500,12 L 500,60 L 0,60 Z"
                  fill="url(#chartGradientNeon)"
                />
                <path
                  d="M 0,45 Q 60,15 120,35 T 240,20 T 360,30 T 500,12"
                  fill="none"
                  stroke="url(#strokeGradientNeon)"
                  strokeWidth="2.5"
                  filter="url(#neonGlowEffect)"
                  className="animate-pulse"
                />
                {/* Moving glowing radar tracking beacon */}
                <circle cx="360" cy="30" r="5" fill="#06b6d4" className="animate-ping" />
                <circle cx="360" cy="30" r="3.5" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {/* Sample Activity Feed */}
          <div className="rounded-xl border border-border/80 bg-muted/20 backdrop-blur-md p-4 transition-colors hover:bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
              Recent Platform Activity
            </p>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  Sarah Jenkins approved 5 days Annual Leave for Priya Patel
                </span>
                <span className="text-muted-foreground text-[11px] shrink-0 ml-2 font-mono">10m ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  September 2026 direct deposit payroll generated ($146,800)
                </span>
                <span className="text-muted-foreground text-[11px] shrink-0 ml-2 font-mono">1h ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
