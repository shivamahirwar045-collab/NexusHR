"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, User, ChevronDown, Slash, Clock, Building2, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function GitHubAuthPage() {
  const router = useRouter();
  const toast = useToast();
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    toast.success("GitHub Authorized", "Redirecting to your dashboard...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col justify-between items-center p-6 selection:bg-[#1f6feb] selection:text-white">
      {/* Top Main Section */}
      <div className="w-full max-w-[480px] flex flex-col items-center pt-8 sm:pt-12">
        {/* Connected Logos */}
        <div className="flex items-center gap-3 mb-6">
          {/* Neon Logo Box */}
          <div className="w-16 h-16 rounded-2xl bg-black border border-[#30363d] flex items-center justify-center shadow-lg shadow-emerald-950/40">
            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="#05080c" />
              <path
                d="M12 12V28M12 15L28 25M28 12V28"
                stroke="#00E599"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Green Checkmark Circle */}
          <div className="h-7 w-7 rounded-full bg-[#238636] text-white flex items-center justify-center shrink-0 shadow-md">
            <Check className="h-4 w-4 stroke-[3]" />
          </div>

          {/* GitHub Logo Box */}
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            <svg className="w-11 h-11 text-[#0d1117] fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-6">
          Authorize Neon Console
        </h1>

        {/* Main Authorization Card */}
        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-2xl">
          {/* Header Row */}
          <div className="flex items-start gap-3 pb-5 border-b border-[#30363d]">
            <div className="h-10 w-10 rounded-lg bg-pink-600/30 border border-pink-500/50 flex items-center justify-center text-pink-300 font-bold shrink-0">
              <span className="text-sm">⊞</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Neon Console by{" "}
                <span className="text-[#58a6ff] hover:underline cursor-pointer">
                  neondatabase
                </span>
              </p>
              <p className="text-xs text-[#8b949e] mt-0.5">
                wants to access your{" "}
                <span className="text-white font-medium">shivamahirwar045-collab</span>{" "}
                account
              </p>
            </div>
          </div>

          {/* Scope Accordion */}
          <div className="py-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-[#8b949e]" />
                <div>
                  <p className="font-semibold text-white">Personal user data</p>
                  <p className="text-xs text-[#8b949e]">Email addresses (read-only)</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-[#8b949e]" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#30363d] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-2 px-4 rounded-md bg-[#21262d] hover:bg-[#30363d] text-white text-sm font-medium border border-[#30363d] transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAuthorize}
                disabled={isAuthorizing}
                className="w-full py-2 px-4 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold shadow-sm transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
              >
                {isAuthorizing ? "Authorizing..." : "Authorize neondatabase"}
              </button>
            </div>

            <p className="text-[11px] text-[#8b949e] text-center">
              Authorizing will redirect to{" "}
              <span className="text-white font-semibold">https://console.neon.tech</span>
            </p>
          </div>

          {/* Trust Metadata */}
          <div className="mt-6 pt-4 border-t border-[#30363d] grid grid-cols-3 gap-2 text-center text-[10px] text-[#8b949e]">
            <div className="flex flex-col items-center gap-1">
              <div className="h-4 w-4 rounded-full border border-[#8b949e] flex items-center justify-center text-[8px]">
                /
              </div>
              <span>Not owned or operated by GitHub</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Created 5 years ago</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>More than 1K GitHub users</span>
            </div>
          </div>
        </div>

        {/* Learn more link */}
        <p className="mt-4 text-xs text-[#58a6ff] hover:underline cursor-pointer">
          Learn more about OAuth
        </p>
      </div>

      {/* GitHub Footer */}
      <footer className="w-full max-w-4xl pt-12 pb-4 text-center text-xs text-[#8b949e] space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-5 h-5 fill-[#8b949e]" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>© 2026 GitHub, Inc.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Terms</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Privacy</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Security</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Status</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Community</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Docs</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Contact</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Manage cookies</span>
          <span className="hover:text-[#58a6ff] hover:underline cursor-pointer">Do not share my personal information</span>
        </div>
      </footer>
    </div>
  );
}
