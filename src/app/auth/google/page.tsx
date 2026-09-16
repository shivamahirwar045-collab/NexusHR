"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface GoogleAccount {
  name: string;
  email: string;
  avatarBg?: string;
  initials?: string;
  avatarUrl?: string;
}

export default function GoogleAuthPage() {
  const router = useRouter();
  const toast = useToast();

  const accounts: GoogleAccount[] = [
    {
      name: "Shivam Ahirwar",
      email: "shivamahirwar773@gmail.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Shivam Ahirwar",
      email: "shivamahirwar045@gmail.com",
      avatarBg: "bg-purple-600",
      initials: "S",
    },
    {
      name: "Ashish jain1",
      email: "ashishmittal23467@gmail.com",
      avatarBg: "bg-emerald-600",
      initials: "A",
    },
    {
      name: "Prashant Chaurasia",
      email: "chaurasia.prashant0507@gmail.com",
      avatarBg: "bg-amber-600",
      initials: "P",
    },
    {
      name: "Shivam Ahirwar",
      email: "shivam.antigravity@gmail.com",
      avatarBg: "bg-purple-600",
      initials: "S",
    },
    {
      name: "Ashish Jain",
      email: "prashantkumer32727@gmail.com",
      avatarBg: "bg-pink-600",
      initials: "A",
    },
    {
      name: "Shivam Ahirwar",
      email: "shivam.antigravity1@gmail.com",
      avatarBg: "bg-emerald-600",
      initials: "S",
    },
    {
      name: "Admin Stp",
      email: "astp750@gmail.com",
      avatarBg: "bg-rose-600",
      initials: "A",
    },
  ];

  const handleSelectAccount = (account: GoogleAccount) => {
    toast.success("Welcome back!", `Signed in as ${account.name} (${account.email})`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-blue-600 selection:text-white">
      {/* Top Back Link */}
      <div className="w-full max-w-[460px] mb-4 flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Google Container */}
      <div className="w-full max-w-[460px] bg-[#121318] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Google Header */}
        <div className="flex items-center gap-2 mb-6">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
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
          <span className="text-xs text-zinc-300 font-medium">Sign in with Google</span>
        </div>

        {/* Heading & Subheading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-normal text-white">
            Choose an account
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            to continue to <span className="text-sky-400 font-medium">neon.tech</span>
          </p>
        </div>

        {/* Accounts List */}
        <div className="divide-y divide-zinc-800/80 border-t border-b border-zinc-800/80 mb-4 max-h-[380px] overflow-y-auto pr-1">
          {accounts.map((acc, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectAccount(acc)}
              className="w-full py-3 px-2 flex items-center gap-3.5 hover:bg-zinc-800/40 rounded-lg text-left transition-colors cursor-pointer group"
            >
              {acc.avatarUrl ? (
                <img
                  src={acc.avatarUrl}
                  alt={acc.name}
                  className="h-8 w-8 rounded-full object-cover shrink-0 ring-1 ring-zinc-700"
                />
              ) : (
                <div
                  className={`h-8 w-8 rounded-full ${acc.avatarBg} text-white font-medium text-xs flex items-center justify-center shrink-0`}
                >
                  {acc.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-100 group-hover:text-white truncate">
                  {acc.name}
                </p>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {acc.email}
                </p>
              </div>
            </button>
          ))}

          {/* Use another account option */}
          <button
            type="button"
            onClick={() => {
              toast.info("Google Sign In", "Redirecting to account login...");
              router.push("/login");
            }}
            className="w-full py-3.5 px-2 flex items-center gap-3.5 hover:bg-zinc-800/40 rounded-lg text-left transition-colors cursor-pointer group"
          >
            <div className="h-8 w-8 rounded-full bg-transparent border border-zinc-600 text-zinc-300 flex items-center justify-center shrink-0">
              <User className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
              Use another account
            </p>
          </button>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-zinc-500 leading-relaxed text-center">
          To continue, Google will share your name, email address, language preference, and profile picture with neon.tech.
        </p>
      </div>
    </div>
  );
}
