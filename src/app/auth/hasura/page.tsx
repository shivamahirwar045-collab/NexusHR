"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function HasuraAuthPage() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleProviderLogin = (provider: string) => {
    toast.success("Hasura Connected", `Logged in via ${provider}. Opening dashboard...`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Hasura Magic Link", `Sign-in link sent to ${email}`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col justify-between p-6 sm:p-8 relative selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="w-full flex items-center justify-between z-10">
        {/* Hasura Brand Logo */}
        <Link href="/login" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
            </svg>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-5 text-xs sm:text-sm">
          <Link
            href="/dashboard/settings?tab=help"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-full border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Centered Login Card */}
      <main className="w-full max-w-[440px] mx-auto my-auto py-6 z-10">
        <div className="bg-[#1b1d23] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
            Log in to Hasura
          </h1>

          {/* Stacked Pill OAuth Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleProviderLogin("Google")}
              className="w-full h-11 px-4 rounded-full bg-[#272a33] hover:bg-[#313540] border border-zinc-700/40 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleProviderLogin("GitHub")}
              className="w-full h-11 px-4 rounded-full bg-[#272a33] hover:bg-[#313540] border border-zinc-700/40 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm"
            >
              <svg className="h-4 w-4 fill-white shrink-0" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Continue with Github</span>
            </button>

            {/* Slack */}
            <button
              type="button"
              onClick={() => handleProviderLogin("Slack")}
              className="w-full h-11 px-4 rounded-full bg-[#272a33] hover:bg-[#313540] border border-zinc-700/40 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.528 2.528 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
                <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
                <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
                <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
              <span>Continue with Slack</span>
            </button>

            {/* SSO */}
            <button
              type="button"
              onClick={() => handleProviderLogin("Enterprise SSO")}
              className="w-full h-11 px-4 rounded-full bg-[#272a33] hover:bg-[#313540] border border-zinc-700/40 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm"
            >
              <Building2 className="h-4 w-4 text-zinc-400" />
              <span>Continue with SSO</span>
            </button>
          </div>

          {/* Divider: OR */}
          <div className="relative my-6 text-center text-xs">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <span className="relative bg-[#1b1d23] px-3 font-semibold text-zinc-500 text-[11px] uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Continue with Email */}
          {showEmailInput ? (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 px-4 rounded-full bg-[#22242b] border border-zinc-700/60 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Send Magic Link
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowEmailInput(true)}
              className="w-full h-11 px-4 rounded-full bg-[#22242b] hover:bg-[#282b33] border border-zinc-700/40 text-xs sm:text-sm font-medium text-zinc-300 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <Mail className="h-4 w-4 text-zinc-400" />
              <span>Continue with Email</span>
            </button>
          )}
        </div>
      </main>

      {/* Floating reCAPTCHA Badge */}
      <div className="fixed bottom-4 right-4 bg-white/95 text-zinc-700 p-2 px-3 rounded shadow-lg flex items-center gap-2 text-[10px] z-20 border border-zinc-200">
        <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
        <div className="leading-tight">
          <p className="font-semibold text-zinc-800">reCAPTCHA</p>
          <p className="text-[9px] text-zinc-500">Privacy - Terms</p>
        </div>
      </div>
    </div>
  );
}
