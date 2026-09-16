"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email Required", "Please enter your work email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Reset Link Sent", `Check ${email} for password recovery instructions.`);
    }, 700);
  };

  return (
    <Card className="shadow-xl border-border/80">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>
          No worries! We will send a secure password reset link to your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submitted ? (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-foreground">Recovery email dispatched</h3>
            <p className="text-xs text-muted-foreground">
              We have sent instructions to <strong className="text-foreground">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <div className="pt-2">
              <Link href="/reset-password">
                <Button variant="outline" size="sm" className="text-xs font-semibold">
                  Test simulated reset link →
                </Button>
              </Link>
            </div>
          </div>
        ) : (
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

            <Button type="submit" className="w-full font-semibold" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
        <Link href="/login" className="text-foreground hover:underline flex items-center gap-1 font-medium">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
