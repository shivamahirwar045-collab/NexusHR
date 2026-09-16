"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Shield,
  Lock,
  Save,
  CheckCircle2,
  Building2,
  Key,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function ProfilePage() {
  const { currentUser } = useApp();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+1 (555) 567-8901",
    role: currentUser.role,
    companyName: currentUser.companyName,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      toast.success("Profile Updated", "Your administrator profile details have been saved.");
    }, 600);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Password Missing", "Please enter current and new passwords.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mismatch", "New password confirmation does not match.");
      return;
    }

    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password Changed", "Your master administrator password has been updated.");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Admin Profile & Security"
        description="Manage your personal account credentials, assigned administrative privileges, and security settings."
      />

      {/* Top Banner Hero */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar
          src={currentUser.avatarUrl}
          name={currentUser.name}
          size="xl"
          className="ring-4 ring-primary/20 shadow-md"
        />
        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <Badge variant="default" className="text-xs">
              {currentUser.role}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
          <p className="text-xs font-semibold text-primary flex items-center justify-center sm:justify-start gap-1 mt-1">
            <Building2 className="h-3.5 w-3.5" /> {currentUser.companyName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Personal Information
            </CardTitle>
            <CardDescription>Update your contact info and display name</CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveProfile}>
            <CardContent className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Full Name</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  icon={<User className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Work Email Address</label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Contact Phone</label>
                <Input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  icon={<Phone className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Assigned Role & Level</label>
                <Input value={profileData.role} disabled />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button type="submit" isLoading={isSavingProfile} size="sm" className="font-semibold">
                <Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Security & Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Security & Password
            </CardTitle>
            <CardDescription>Modify account password and security settings</CardDescription>
          </CardHeader>
          <form onSubmit={handleChangePassword}>
            <CardContent className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Current Password</label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  icon={<Key className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">New Password</label>
                <Input
                  type="password"
                  placeholder="Min 8 characters"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Confirm New Password</label>
                <Input
                  type="password"
                  placeholder="Repeat new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>

              <div className="rounded-lg bg-muted/40 p-2.5 text-[11px] text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                Two-Factor Authentication (2FA) is enforced by organization policy.
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button type="submit" variant="secondary" isLoading={isSavingPassword} size="sm" className="font-semibold">
                Update Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
