"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Bell,
  Check,
  Trash2,
  CalendarOff,
  CreditCard,
  Users,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useApp();
  const toast = useToast();

  const [filterType, setFilterType] = useState<string>("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filterType === "unread") return !n.isRead;
    if (filterType === "all") return true;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotifIcon = (type: string) => {
    switch (type) {
      case "leave":
        return <CalendarOff className="h-4 w-4 text-amber-500" />;
      case "payroll":
        return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case "employee":
        return <Users className="h-4 w-4 text-primary" />;
      case "attendance":
        return <AlertTriangle className="h-4 w-4 text-rose-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Notification Center"
        description="System alerts, workflow action requests, and administrative status updates."
      >
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              markAllNotificationsAsRead();
              toast.success("All Marked Read", "All updates marked as read.");
            }}
            className="gap-1.5 text-xs font-semibold"
          >
            <Check className="h-3.5 w-3.5" /> Mark All as Read
          </Button>
        )}
      </PageHeader>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-3 text-xs">
        {[
          { id: "all", label: `All (${notifications.length})` },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "leave", label: "Leave Requests" },
          { id: "payroll", label: "Payroll" },
          { id: "attendance", label: "Attendance" },
          { id: "employee", label: "Employees" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              filterType === tab.id
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications Stream */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-8 w-8" />}
          title="No notifications here"
          description="You are completely caught up! No unread activity matching this filter."
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`transition-all hover:border-border ${
                !notif.isRead ? "border-l-4 border-l-primary bg-primary/[0.02]" : "opacity-80"
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                    {getNotifIcon(notif.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${!notif.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                    <span className="text-[10px] text-muted-foreground mt-2 block">{notif.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {!notif.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => markNotificationAsRead(notif.id)}
                      className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Check className="h-3.5 w-3.5 mr-1" /> Mark read
                    </Button>
                  )}

                  {notif.actionUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        router.push(notif.actionUrl!);
                      }}
                      className="h-8 text-xs gap-1 font-semibold"
                    >
                      View <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      deleteNotification(notif.id);
                      toast.info("Notification Removed");
                    }}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
