"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GitBranch, GitCommit, RefreshCw, Check, Sparkles, Copy, Database, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NeonBranchingVisualizer() {
  const [selectedBranch, setSelectedBranch] = useState<string>("main");
  const [copiedBranch, setCopiedBranch] = useState<string | null>(null);

  const branches = [
    {
      id: "main",
      name: "main",
      type: "Production",
      employees: 12480,
      lastSync: "3 mins ago",
      color: "emerald",
      dbSize: "8.4 GB",
      status: "Protected (Zero-Downtime)",
      connectionString: "nexushr://prod.tenant-491.nexus.db/main",
    },
    {
      id: "payroll-preview",
      name: "payroll-q4-dryrun",
      type: "Ephemeral Staging",
      employees: 12480,
      lastSync: "Cloned from main (Instant)",
      color: "blue",
      dbSize: "0 GB (Copy-on-Write)",
      status: "Active Simulation",
      connectionString: "nexushr://staging.tenant-491.nexus.db/payroll-q4-dryrun",
    },
    {
      id: "merger-eu",
      name: "acquisition-eu-import",
      type: "Sandbox Test",
      employees: 840,
      lastSync: "1 hour ago",
      color: "purple",
      dbSize: "0 GB (Copy-on-Write)",
      status: "Isolated Sandbox",
      connectionString: "nexushr://sandbox.tenant-491.nexus.db/acquisition-eu-import",
    },
  ];

  const handleCopy = (conn: string, id: string) => {
    navigator.clipboard.writeText(conn);
    setCopiedBranch(id);
    setTimeout(() => setCopiedBranch(null), 2000);
  };

  const currentBranchData = branches.find((b) => b.id === selectedBranch) || branches[0];

  return (
    <section className="relative py-24 border-t border-border/60">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            ZERO-COPY WORKFORCE BRANCHING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
            Test payroll runs and reorganizations <br />
            <span className="text-muted-foreground">on instant, isolated branches.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Create an instant copy of your production HR database in seconds with Copy-on-Write. Run dry-run payroll batches or test benefits open enrollment without risking live production records.
          </p>
        </div>

        {/* Branching Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Branch Tree Nodes (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              Active Workspace Branches
            </p>

            {branches.map((b) => {
              const isSelected = selectedBranch === b.id;

              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranch(b.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary/60 bg-muted/40 shadow-lg shadow-primary/10 ring-1 ring-primary/30"
                      : "border-border/60 bg-card/40 hover:bg-muted/30 hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${
                        b.id === "main" ? "bg-emerald-500" : b.id === "payroll-preview" ? "bg-blue-500" : "bg-purple-500"
                      }`} />
                      <span className="font-mono text-sm font-bold text-foreground">
                        {b.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                      {b.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                    <span>{b.employees.toLocaleString()} Members</span>
                    <span className="font-mono text-[11px] text-foreground/80">{b.dbSize}</span>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <Button variant="outline" className="w-full text-xs font-semibold border-dashed border-border/80 hover:bg-muted py-5">
                <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
                + Create New Branch in 0.8s
              </Button>
            </div>
          </div>

          {/* Branch Details & Terminal View (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-foreground">
                      branch/{currentBranchData.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      {currentBranchData.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentBranchData.lastSync}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(currentBranchData.connectionString, currentBranchData.id)}
                  className="text-xs font-mono h-8 border-border"
                >
                  {copiedBranch === currentBranchData.id ? (
                    <>
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      Copy URI
                    </>
                  )}
                </Button>
              </div>

              {/* Branch Connection String Box */}
              <div className="p-3.5 rounded-xl bg-background border border-border/70 font-mono text-xs text-muted-foreground flex items-center justify-between gap-2 overflow-x-auto mb-6">
                <code className="text-foreground truncate">
                  {currentBranchData.connectionString}
                </code>
              </div>

              {/* Branch Capabilities Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-muted/20 border border-border/40">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Storage Cost</span>
                  <span className="text-sm font-bold font-mono text-foreground">Zero Extra ($0)</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Copy-on-Write Delta</p>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/20 border border-border/40">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Creation Latency</span>
                  <span className="text-sm font-bold font-mono text-emerald-500">&lt; 850 ms</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Instant Snapshot</p>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/20 border border-border/40">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Isolation Tier</span>
                  <span className="text-sm font-bold font-mono text-primary">100% Hermetic</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Separate Compute Sandbox</p>
                </div>
              </div>

              {/* Time Travel Instant Restore Callout */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Point-In-Time Instant Restore</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Accidentally modified records? Rewind any branch to any second in the past 30 days.
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/audit-logs" className="w-full sm:w-auto">
                  <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs whitespace-nowrap border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10">
                    Audit Logs
                  </Button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
