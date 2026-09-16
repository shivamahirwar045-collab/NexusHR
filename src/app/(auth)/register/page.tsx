"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companyName || !formData.adminName || !formData.email || !formData.password) {
      toast.error("Validation Error", "Please fill in all required company and admin fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Mismatch", "Passwords do not match. Please re-enter.");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("Terms Required", "Please accept the Terms of Service to create your workspace.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        "Workspace Created!",
        `Welcome ${formData.adminName}. ${formData.companyName} is ready.`
      );
      router.push("/dashboard");
    }, 800);
  };

  return (
    <Card className="shadow-xl border-border/80">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Register your company</CardTitle>
        <CardDescription>
          Start your 14-day full enterprise free trial in seconds
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Company Name *</label>
            <Input
              name="companyName"
              placeholder="e.g. Acme Innovations Inc."
              value={formData.companyName}
              onChange={handleChange}
              icon={<Building2 className="h-4 w-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Admin Full Name *</label>
              <Input
                name="adminName"
                placeholder="Sarah Jenkins"
                value={formData.adminName}
                onChange={handleChange}
                icon={<User className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Mobile Phone</label>
              <Input
                name="mobile"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.mobile}
                onChange={handleChange}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Work Email Address *</label>
            <Input
              name="email"
              type="email"
              placeholder="admin@company.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Password *</label>
              <Input
                name="password"
                type="password"
                placeholder="Min 8 chars"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Confirm Password *</label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-0.5 rounded border-input text-primary focus:ring-primary h-4 w-4"
              />
              <span className="text-muted-foreground leading-tight">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <Button type="submit" className="w-full font-semibold mt-2" isLoading={isLoading}>
            Create Workspace & Start
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
        <span>Already have an account? </span>
        <Link href="/login" className="text-primary font-semibold hover:underline ml-1">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
