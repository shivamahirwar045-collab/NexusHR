"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("sarah.jenkins@company.com");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Validation Error", "Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", "Signed in successfully as HR Administrator.");
      router.push("/dashboard");
    }, 600);
  };

  const handleDemoFill = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("password123");
    toast.info("Demo Credentials Applied", `Ready to sign in as ${roleEmail}`);
  };

  return (
    <Card className="shadow-xl border-border/80">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your corporate credentials to access your HR portal
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Work Email</label>
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary h-4 w-4"
              />
              <span className="text-muted-foreground">Keep me signed in</span>
            </label>
          </div>

          <Button type="submit" className="w-full font-semibold" isLoading={isLoading}>
            Sign In to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Demo Fast Login Shortcuts */}
        <div className="mt-6 rounded-lg bg-muted/40 p-3 text-xs border">
          <p className="font-semibold text-foreground flex items-center gap-1.5 mb-2">
            <Shield className="h-3.5 w-3.5 text-primary" /> Instant Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill("sarah.jenkins@company.com")}
              className="rounded bg-card px-2.5 py-1.5 text-[11px] font-medium border hover:border-primary text-foreground text-left transition-colors truncate"
            >
              👩‍💼 HR Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("alexander.wright@company.com")}
              className="rounded bg-card px-2.5 py-1.5 text-[11px] font-medium border hover:border-primary text-foreground text-left transition-colors truncate"
            >
              👨‍💻 VP Engineering
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
        <span>Don&apos;t have an organization account? </span>
        <Link href="/register" className="text-primary font-semibold hover:underline ml-1">
          Register company
        </Link>
      </CardFooter>
    </Card>
  );
}
