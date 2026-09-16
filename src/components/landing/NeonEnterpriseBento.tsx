"use client";

import React from "react";
import { ShieldCheck, Lock, Globe2, Award, Zap, CheckCircle2, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NeonEnterpriseBento() {
  return (
    <section className="relative py-24 bg-muted/10 border-t border-border/60">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-500 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            ENTERPRISE GRADE INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
            Security, compliance, and reliability <br />
            <span className="text-muted-foreground">trusted by global industry leaders.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From Fortune 500 multinationals to fast-growing startups, NexusHR meets the strictest regulatory and operational requirements out of the box.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Compliance Badges & Encryption (7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-border/80 bg-card/60 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Enterprise Security Standard</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                SOC2 Type II, HIPAA & GDPR Certified
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-6">
                End-to-end encryption at rest (AES-256) and in transit (TLS 1.3). Immutable audit logs track every employee record modification with full cryptographic verification.
              </p>
            </div>

            {/* Compliance Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/50">
              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="font-bold text-xs text-foreground block">SOC2 Type II</span>
                <span className="text-[10px] text-emerald-500 font-semibold">Audited Annually</span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="font-bold text-xs text-foreground block">HIPAA</span>
                <span className="text-[10px] text-emerald-500 font-semibold">BAA Supported</span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="font-bold text-xs text-foreground block">ISO 27001</span>
                <span className="text-[10px] text-emerald-500 font-semibold">Certified</span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-center">
                <span className="font-bold text-xs text-foreground block">GDPR & CCPA</span>
                <span className="text-[10px] text-emerald-500 font-semibold">EU Compliant</span>
              </div>
            </div>
          </div>

          {/* Card 2: 99.99% SLA & Multi-Region (5 cols) */}
          <div className="md:col-span-5 rounded-2xl border border-border/80 bg-card/60 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-emerald-500 mb-3">
                <Globe2 className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Multi-Region Redundancy</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                99.99% Uptime Guarantee
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Active-active hot replicas across 6 global regions with automatic sub-second failover and continuous point-in-time state backups.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Direct Deposit Execution</span>
                <span className="font-mono text-emerald-500 font-semibold">&lt; 1.2s avg</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Replica Replication Lag</span>
                <span className="font-mono text-foreground font-semibold">&lt; 15 ms</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Global Availability</span>
                <span className="font-mono text-foreground font-semibold">99.993% (Past 365d)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Customer Proof Testimonial (12 cols) */}
          <div className="md:col-span-12 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card/90 to-primary/5 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-base sm:text-lg font-medium text-foreground leading-relaxed italic mb-4">
                &ldquo;Switching our multi-state engineering and operations payroll to NexusHR reduced our month-end reconciliation time from 5 days to 8 minutes. The branching preview environment made our compliance audit completely painless.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary">
                  DL
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">David Lin</p>
                  <p className="text-[11px] text-muted-foreground">VP of People & Operations, HyperScale Cloud</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="p-4 rounded-xl bg-background border border-border/70 text-center min-w-[140px]">
                <span className="text-2xl font-black font-mono text-emerald-500">84%</span>
                <span className="text-[11px] text-muted-foreground block">Payroll Overhead Saved</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/70 text-center min-w-[140px]">
                <span className="text-2xl font-black font-mono text-primary">100%</span>
                <span className="text-[11px] text-muted-foreground block">Audit Pass Rate</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
