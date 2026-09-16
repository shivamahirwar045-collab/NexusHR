"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Youtube, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function NeonFooter() {
  return (
    <footer className="w-full border-t border-border/80 bg-background/95 dark:bg-black-pure text-foreground transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-16">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand & Status & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
                  NexusHR
                  <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
                    PRO
                  </span>
                </span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Next-generation B2B workforce management SaaS platform designed for high-growth engineering and operations teams.
            </p>

            {/* Neon-Style Live System Status Pill */}
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 hover:bg-muted/70 px-3 py-1 text-xs font-medium text-foreground transition-colors shadow-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>All Systems Operational</span>
                <span className="text-muted-foreground font-mono text-[10px] ml-1">99.99%</span>
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Discord"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.894a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/shivamahirwar045-collab/NexusHR"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border/80 bg-muted/30 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="font-semibold text-[11px]">23.1k</span>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Columns: 4 Navigation Columns (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: Company */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Company
              </p>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/reports" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/employees" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                    Careers
                    <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1 py-0.2 text-[9px] font-bold">
                      Hiring
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Sales
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/audit-logs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Security & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Trust Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Product */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Product
              </p>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/dashboard/employees" className="text-muted-foreground hover:text-foreground transition-colors">
                    Employee Directory
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/attendance" className="text-muted-foreground hover:text-foreground transition-colors">
                    Attendance Sync
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leave" className="text-muted-foreground hover:text-foreground transition-colors">
                    Leave & PTO
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/payroll" className="text-muted-foreground hover:text-foreground transition-colors">
                    Payroll Engine
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/reports" className="text-muted-foreground hover:text-foreground transition-colors">
                    Workforce Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/audit-logs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Enterprise Audit
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Autoscaling Plans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Solutions
              </p>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Full-stack Apps
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    AI Agents
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Platforms
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mid-market
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/employees" className="text-muted-foreground hover:text-foreground transition-colors">
                    Remote Teams
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Resources
              </p>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/dashboard/reports" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/notifications" className="text-muted-foreground hover:text-foreground transition-colors">
                    Changelog
                  </Link>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Discord Community
                  </a>
                </li>
                <li>
                  <Link href="/dashboard/audit-logs" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                    HIPAA & SOC2
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing Calculator
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Legal & Copyright Bar (Exact Neon Styling) */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} NexusHR Inc. All rights reserved. Next-Gen Workforce Architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/dashboard/audit-logs" className="hover:text-foreground transition-colors">
              Privacy Notice
            </Link>
            <Link href="/dashboard/audit-logs" className="hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <Link href="/dashboard/audit-logs" className="hover:text-foreground transition-colors">
              Platform Terms
            </Link>
            <Link href="/dashboard/audit-logs" className="hover:text-foreground transition-colors">
              Security Statement
            </Link>
            <Link href="/dashboard/settings" className="hover:text-foreground transition-colors">
              California Privacy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
