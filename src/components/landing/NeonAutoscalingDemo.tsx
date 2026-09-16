"use client";

import React, { useState } from "react";
import { Zap, Cpu, Gauge, ShieldCheck, ArrowUpRight, Check, Activity, TrendingDown, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NeonAutoscalingDemo() {
  const [headcount, setHeadcount] = useState<number>(2400);

  // Computed metrics based on simulated scale
  const computeUnits = (headcount / 400).toFixed(1);
  const memoryGB = (headcount * 0.008).toFixed(1);
  const costSavings = Math.min(88, Math.round(50 + (headcount / 1000) * 4));
  const batchPayrollSeconds = Math.max(0.4, (headcount * 0.00035)).toFixed(2);
  const activeWorkers = Math.max(1, Math.round(headcount / 800));

  return (
    <section className="relative py-24 bg-muted/10 border-t border-border/60">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-500 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            AUTOSCALING WORKFORCE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
            Compute that scales up in milliseconds. <br />
            <span className="text-muted-foreground">And scales down to zero when idle.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Never over-provision for peak payroll cycles again. NexusHR automatically spins up micro-workers during shift changes and batch payroll execution, then sleeps when your team logs off.
          </p>
        </div>

        {/* Interactive Simulation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls & Metrics Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="headcount-slider" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  Simulate Workforce Scale
                </label>
                <span className="font-mono text-sm font-extrabold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  {headcount.toLocaleString()} Employees
                </span>
              </div>

              {/* Headcount Slider */}
              <input
                id="headcount-slider"
                type="range"
                min="100"
                max="25000"
                step="100"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[11px] text-muted-foreground font-mono mt-2">
                <span>100 (Seed)</span>
                <span>5,000 (Mid-Market)</span>
                <span>25,000 (Global)</span>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/60">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-primary" />
                    Allocated CU
                  </span>
                  <p className="text-lg font-bold font-mono text-foreground mt-1">
                    {computeUnits} <span className="text-xs font-normal text-muted-foreground">CU</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3 text-emerald-500" />
                    Payroll Execution
                  </span>
                  <p className="text-lg font-bold font-mono text-emerald-500 mt-1">
                    {batchPayrollSeconds}s
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/40">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground flex items-center gap-1">
                    <Zap className="h-3 w-3 text-amber-500" />
                    Worker Pods
                  </span>
                  <p className="text-lg font-bold font-mono text-foreground mt-1">
                    {activeWorkers} <span className="text-xs font-normal text-muted-foreground">Pods</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3" />
                    Cost Efficiency
                  </span>
                  <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    -{costSavings}%
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs text-muted-foreground">
                  Idle State: <strong>Auto-sleep in 5 minutes</strong>
                </span>
              </div>
              <Link href="/pricing" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Pricing details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Visual Live Scaling Chart / Node Simulator (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    nexushr-cluster-live:us-east-1
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  HEALTHY · SCALE READY
                </span>
              </div>

              {/* Visual Node Cluster Representation */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {Array.from({ length: 8 }).map((_, i) => {
                  const isNodeActive = i < activeWorkers;
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border transition-all duration-300 text-center ${
                        isNodeActive
                          ? "bg-primary/10 border-primary/40 shadow-md shadow-primary/10"
                          : "bg-muted/10 border-border/30 opacity-40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-muted-foreground">Worker-{i + 1}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${isNodeActive ? "bg-emerald-500" : "bg-zinc-500"}`} />
                      </div>
                      <p className="text-xs font-bold text-foreground truncate">
                        {isNodeActive ? "Active" : "Idle Sleep"}
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground">
                        {isNodeActive ? `${Math.round(100 / activeWorkers)}% load` : "0.00 CU"}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Throughput Graph Bars */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Simulated Real-time Throughput (Req/Sec)</span>
                  <span className="font-mono text-foreground font-semibold">{Math.round(headcount * 1.8)} req/s</span>
                </div>
                <div className="h-24 flex items-end gap-1.5 pt-2">
                  {Array.from({ length: 24 }).map((_, idx) => {
                    const heightPercent = Math.min(100, Math.max(15, ((Math.sin(idx * 0.5) + 1.2) * 20 * (headcount / 4000))));
                    return (
                      <div
                        key={idx}
                        style={{ height: `${heightPercent}%` }}
                        className="flex-1 bg-gradient-to-t from-primary/30 to-primary rounded-t-xs transition-all duration-500"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
