"use client";

import React from "react";
import { Building2, ShieldCheck, Zap, Sparkles, Layers, Cpu, Database, Network } from "lucide-react";

export function NeonLogoMarquee() {
  const logos = [
    { name: "Replit", icon: CodeIcon, stat: "12,000+ Team Members" },
    { name: "DoorDash", icon: Network, stat: "Multi-State Payroll" },
    { name: "Retool", icon: Layers, stat: "SOC2 Automated Sync" },
    { name: "BCG Global", icon: Building2, stat: "Enterprise Workforce" },
    { name: "Framer", icon: Sparkles, stat: "Global HR Scaling" },
    { name: "Databricks", icon: Database, stat: "Analytics Lakehouse" },
    { name: "Vercel", icon: Zap, stat: "Instant Deployments" },
    { name: "Stripe", icon: ShieldCheck, stat: "Direct Deposit Processing" },
  ];

  return (
    <section className="relative py-12 border-y border-border/40 bg-background/50 backdrop-blur-xs overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
          TRUSTED BY MODERN ENGINEERING, FINTECH & GLOBAL ENTERPRISE TEAMS
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        {/* Animated Marquee Strip */}
        <div className="flex shrink-0 animate-marquee items-center gap-12 whitespace-nowrap pr-12">
          {logos.concat(logos).map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/50 transition-colors group cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {item.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex shrink-0 animate-marquee items-center gap-12 whitespace-nowrap pr-12" aria-hidden="true">
          {logos.concat(logos).map((item, idx) => (
            <div
              key={`${item.name}-dup-${idx}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/50 transition-colors group cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {item.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
