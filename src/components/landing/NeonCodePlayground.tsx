"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, Code2, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NeonCodePlayground() {
  const [activeLang, setActiveLang] = useState<"ts" | "py" | "sql" | "curl">("ts");
  const [copied, setCopied] = useState(false);

  const snippets = {
    ts: `import { NexusHR } from "@nexushr/sdk";

// Initialize the branchable client
const nexus = new NexusHR({
  apiKey: process.env.NEXUS_API_KEY,
  branch: "main", // or ephemeral preview branch
});

// Run atomic multi-state payroll computation
const payrollRun = await nexus.payroll.processBatch({
  period: "2026-Q3-AUG",
  orgId: "org_enterprise_491",
  dryRun: false,
  autoDirectDeposit: true,
});

console.log(\`Batch processed in \${payrollRun.latencyMs}ms!\`);`,
    py: `from nexushr import NexusClient

# Connect to branchable workforce database
nexus = NexusClient(
    api_key="nex_live_secret_key",
    environment="production"
)

# Provision employee with automated RBAC & benefits
employee = nexus.employees.create(
    full_name="Sarah Chen",
    role="Principal Engineer",
    department="Core Infrastructure",
    salary_usd=195000,
    benefits_tier="executive_health"
)

print(f"Employee provisioned: {employee.id}")`,
    sql: `-- Query active workforce with zero-latency replica
SELECT 
  e.id,
  e.full_name,
  e.department,
  p.gross_pay,
  p.tax_withholding
FROM employees e
JOIN payroll_ledger p ON e.id = p.employee_id
WHERE p.period_code = '2026-AUG-B1'
  AND e.employment_status = 'ACTIVE'
ORDER BY p.gross_pay DESC;`,
    curl: `curl -X POST "https://api.nexushr.com/v1/payroll/batch" \\
  -H "Authorization: Bearer nex_live_secret_key" \\
  -H "Nexus-Branch: main" \\
  -H "Content-Type: application/json" \\
  -d '{
    "org_id": "org_491",
    "batch_type": "REGULAR_SEMI_MONTHLY",
    "currency": "USD"
  }'`,
  };

  const outputs = {
    ts: `{
  "status": "COMPLETED",
  "batchId": "pay_batch_99214a",
  "employeesProcessed": 12480,
  "totalDisbursement": "$1,482,900.00",
  "latencyMs": 84,
  "zeroErrors": true
}`,
    py: `{
  "id": "emp_sarah_chen_848",
  "status": "ONBOARDING_ACTIVE",
  "ssoProvisioned": true,
  "w4Verified": true,
  "syncedLedger": "main"
}`,
    sql: `Result: 12,480 rows returned in 12ms. (Replica cache hit: 99.8%)`,
    curl: `{
  "accepted": true,
  "jobId": "job_batch_0816a",
  "estimatedSeconds": 0.45
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 bg-background border-t border-border/60">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            DEVELOPER-FIRST API & SDK
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mt-4 mb-4">
            Built for developers. <br />
            <span className="text-muted-foreground">Every HR primitive exposed via API.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Integrate employee directories, automated payroll webhooks, and attendance streams in minutes with typed SDKs for your favorite languages.
          </p>
        </div>

        {/* Code IDE Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border/80 bg-zinc-950 shadow-2xl overflow-hidden text-zinc-100 font-mono">
          
          {/* Top Bar with Language Tabs & Copy Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-zinc-800 bg-zinc-900/80 gap-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <div className="hidden xs:flex space-x-1.5 mr-2 shrink-0">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 shrink-0">
                <button
                  onClick={() => setActiveLang("ts")}
                  className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeLang === "ts" ? "bg-primary text-white shadow-xs" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setActiveLang("py")}
                  className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeLang === "py" ? "bg-primary text-white shadow-xs" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveLang("sql")}
                  className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeLang === "sql" ? "bg-primary text-white shadow-xs" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  SQL
                </button>
                <button
                  onClick={() => setActiveLang("curl")}
                  className={`px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    activeLang === "curl" ? "bg-primary text-white shadow-xs" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  cURL
                </button>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-8 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 self-end sm:self-auto shrink-0"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy Code
                </>
              )}
            </Button>
          </div>

          {/* Code Editor Body */}
          <div className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed text-zinc-300">
            <pre className="selection:bg-primary/30">
              <code>{snippets[activeLang]}</code>
            </pre>
          </div>

          {/* Terminal Simulated Output Box */}
          <div className="border-t border-zinc-800 bg-black/80 px-6 py-4">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                Simulated Sandbox Response
              </span>
              <span className="text-emerald-400 font-semibold">200 OK · 12ms</span>
            </div>
            <pre className="text-xs text-emerald-300/90 overflow-x-auto">
              <code>{outputs[activeLang]}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
