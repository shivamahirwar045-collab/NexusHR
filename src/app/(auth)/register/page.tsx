"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Validation Error", "Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account Created!", "Welcome to NexusHR. Your workspace is ready.");
      router.push("/dashboard");
    }, 600);
  };

  const handleOAuthSignup = (provider: string) => {
    toast.info(`${provider} Auth`, `Signing up with ${provider}...`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account Created!", `Successfully registered with ${provider}.`);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-background text-foreground overflow-hidden">
      {/* ========================================================= */}
      {/* LEFT SECTION: BRAND VISUAL & GLOW MATRIX */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative bg-[#060609] text-white flex-col items-center justify-center p-10 overflow-hidden border-r border-border/40">
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.4) 1.2px, transparent 1.2px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* Ambient Top-Left Primary Indigo Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 20% 20%, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.08) 50%, transparent 75%)",
          }}
        />

        {/* Ambient Bottom-Right Violet Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 75% 65% at 85% 80%, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.08) 50%, transparent 75%)",
          }}
        />

        {/* Brand Center Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          {/* Stylized Logo Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center shadow-2xl shadow-primary/30 mb-6 transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Build your Postgres backend on NexusHR.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Serverless database branching, automated workforce management, and enterprise scalability out of the box.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT SECTION: INTERACTIVE SIGNUP FORM */}
      {/* ========================================================= */}
      <div className="flex-1 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative overflow-y-auto lg:overflow-hidden">
        {/* Top Header: Home Link & Theme Toggle */}
        <div className="flex items-center justify-between w-full shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Main Centered Form Container */}
        <div className="w-full max-w-[400px] mx-auto my-auto py-2">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Create your free account
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5">
              Connect to NexusHR with:
            </p>
          </div>

          {/* 3 Stacked Full-Width OAuth Buttons */}
          <div className="space-y-2.5 mb-5">
            {/* Google */}
            <Link
              href="/auth/google"
              className="w-full flex items-center justify-center gap-2.5 h-10 px-4 rounded-lg border border-border/80 dark:border-zinc-800 bg-card hover:bg-muted/40 hover:border-border text-xs sm:text-[13px] font-medium text-foreground transition-all shadow-2xs group cursor-pointer"
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
              <span>Google</span>
            </Link>

            {/* GitHub */}
            <Link
              href="/auth/github"
              className="w-full flex items-center justify-center gap-2.5 h-10 px-4 rounded-lg border border-border/80 dark:border-zinc-800 bg-card hover:bg-muted/40 hover:border-border text-xs sm:text-[13px] font-medium text-foreground transition-all shadow-2xs group cursor-pointer"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </Link>

            {/* Microsoft */}
            <Link
              href="/auth/microsoft"
              className="w-full flex items-center justify-center gap-2.5 h-10 px-4 rounded-lg border border-border/80 dark:border-zinc-800 bg-card hover:bg-muted/40 hover:border-border text-xs sm:text-[13px] font-medium text-foreground transition-all shadow-2xs group cursor-pointer"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#00A4EF" d="M1 13h10v10H1z" />
                <path fill="#7FBA00" d="M13 1h10v10H13z" />
                <path fill="#FFB900" d="M13 13h10v10H13z" />
              </svg>
              <span>Microsoft</span>
            </Link>
          </div>

          {/* Divider: Or continue with Email */}
          <div className="relative my-5 text-center text-xs text-muted-foreground">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-background px-3 font-normal">
              Or continue with Email
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@email.com"
                className="w-full h-10 sm:h-10.5 px-3.5 rounded-lg border border-border/80 dark:border-zinc-800 bg-background/50 dark:bg-[#0c0c0f] text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-foreground">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a unique password"
                  className="w-full h-10 sm:h-10.5 pl-3.5 pr-11 rounded-lg border border-border/80 dark:border-zinc-800 bg-background/50 dark:bg-[#0c0c0f] text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-muted-foreground hover:text-foreground p-1 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Continue Action Button */}
            <div className="pt-2">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full h-10 sm:h-10.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/25 transition-all cursor-pointer"
              >
                Continue
              </Button>
            </div>
          </form>

          {/* Terms & Privacy Notice */}
          <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed text-center sm:text-left">
            By creating an account you agree to the{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and our{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            . We&apos;ll occasionally send you emails about news, products, and services; you can opt-out anytime.
          </p>

          {/* Already have an account */}
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline ml-0.5"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Bottom Spacing Anchor */}
        <div className="h-2 shrink-0" />
      </div>
    </div>
  );
}
