"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function MicrosoftAuthPage() {
  const router = useRouter();
  const toast = useToast();
  const [identifier, setIdentifier] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Microsoft Sign In", "Signing in to NexusHR...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between items-center p-4 bg-[#e9eff6] overflow-hidden">
      {/* Ambient background curves */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-slate-200 via-sky-100 to-blue-50 blur-3xl" />
      </div>

      {/* Top Bar with back link */}
      <div className="w-full max-w-md pt-4 z-10 flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Microsoft Login Container */}
      <div className="w-full max-w-[440px] z-10 my-auto">
        {/* Main Card */}
        <div className="bg-white p-8 sm:p-11 shadow-2xl border border-zinc-200/80 rounded-sm">
          {/* Microsoft Brand Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0">
              <div className="bg-[#f25022] w-2.5 h-2.5" />
              <div className="bg-[#7fba00] w-2.5 h-2.5" />
              <div className="bg-[#00a4ef] w-2.5 h-2.5" />
              <div className="bg-[#ffb900] w-2.5 h-2.5" />
            </div>
            <span className="text-base font-semibold text-[#737373] tracking-tight">
              Microsoft
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-3 tracking-tight">
            Sign in
          </h1>

          {/* Form */}
          <form onSubmit={handleNext}>
            {/* Input */}
            <div className="mt-4 mb-4">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email, phone, or Skype"
                className="w-full border-b border-zinc-500 focus:border-[#0067b8] outline-none py-1.5 text-sm text-zinc-900 placeholder:text-zinc-500 bg-transparent transition-colors"
              />
            </div>

            {/* Links */}
            <div className="space-y-3 mt-4 text-xs">
              <div>
                <span className="text-zinc-600">No account? </span>
                <span className="text-[#0067b8] hover:underline cursor-pointer">
                  Create one!
                </span>
              </div>
              <div>
                <span className="text-[#0067b8] hover:underline cursor-pointer">
                  Can&apos;t access your account?
                </span>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-[#0067b8] hover:bg-[#005da6] text-white px-8 py-1.5 text-sm font-normal rounded-none sm:rounded-xs transition-colors cursor-pointer shadow-sm"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Lower Options Box */}
        <div
          onClick={() => {
            toast.info("Sign-in options", "Signing in with security key or GitHub...");
            router.push("/dashboard");
          }}
          className="mt-5 bg-white p-3.5 px-6 flex items-center gap-3 border border-zinc-200/80 shadow-md cursor-pointer hover:bg-zinc-50 transition-colors rounded-sm"
        >
          <KeyRound className="h-5 w-5 text-zinc-700" />
          <span className="text-xs font-medium text-zinc-800">
            Sign-in options
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full z-10 py-3 flex items-center justify-end px-6 text-[11px] text-zinc-600 gap-4">
        <span className="hover:underline cursor-pointer">Terms of use</span>
        <span className="hover:underline cursor-pointer">Privacy & cookies</span>
        <span className="hover:underline cursor-pointer font-bold">...</span>
      </footer>
    </div>
  );
}
