"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Check, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NeonCtaBanner() {
  const [copied, setCopied] = useState(false);
  const command = "npx create-nexushr-app@latest";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Glow Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-primary/10 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/15 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <div className="relative rounded-3xl border border-primary/30 bg-card/80 backdrop-blur-xl p-8 sm:p-14 shadow-2xl overflow-hidden text-center">
          
          {/* Subtle Corner Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready for Production Workloads</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto mb-4">
            Build and scale your workforce infrastructure with NexusHR.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Deploy in minutes with serverless employee databases, automated multi-state payroll, and instant sandbox branching.
          </p>

          {/* Quick CLI Starter Copy Box */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between p-2 pl-4 rounded-xl border border-border bg-background font-mono text-xs text-foreground shadow-inner">
              <span className="flex items-center gap-2 truncate">
                <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate">{command}</span>
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-8 h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/pricing">
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-sm font-medium border-border/80 hover:bg-muted transition-all">
                Contact Enterprise Sales
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              SOC2 Type II Certified
            </span>
            <span>·</span>
            <span>99.99% Uptime SLA</span>
            <span>·</span>
            <span>Zero-Downtime Migration</span>
          </div>

        </div>
      </div>
    </section>
  );
}
