"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Validation Error", "Please fill in all password fields.");
      return;
    }
    if (password.length < 8) {
      toast.error("Weak Password", "Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Password Updated", "Your password has been changed successfully.");
    }, 700);
  };

  return (
    <Card className="shadow-xl border-border/80">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
        <CardDescription>
          Create a new strong password for your administrator account
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isSuccess ? (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-foreground">Password reset successful</h3>
            <p className="text-xs text-muted-foreground">
              You can now sign in using your new credentials.
            </p>
            <div className="pt-2">
              <Button onClick={() => router.push("/login")} className="w-full font-semibold">
                Go to Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">New Password</label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Confirm New Password</label>
              <Input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>

            <Button type="submit" className="w-full font-semibold" isLoading={isLoading}>
              Update Password
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Return to login
        </Link>
      </CardFooter>
    </Card>
  );
}
