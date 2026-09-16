"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";

export function NeonAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 overflow-hidden border-b border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-background to-teal-950/30 px-4 py-2 text-xs font-medium text-foreground transition-all duration-300">
      {/* Subtle Background Glow Line */}
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3 w-3" />
            NEW
          </span>

          <Link
            href="/dashboard/payroll"
            className="group inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span className="font-semibold text-foreground">NexusHR Engine v2.4:</span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">
              Zero-latency multi-state payroll calculation & automated compliance branching.
            </span>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors sm:hidden">
              Zero-latency payroll engine.
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
