"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({
      title,
      description,
      type = "info",
      duration = 4000,
    }: {
      title: string;
      description?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: "success" });
  }, [addToast]);

  const error = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: "error" });
  }, [addToast]);

  const info = useCallback((title: string, description?: string) => {
    addToast({ title, description, type: "info" });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none p-4 sm:p-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 transform translate-y-0",
              "bg-card text-card-foreground",
              t.type === "success" && "border-emerald-500/30 dark:border-emerald-500/20",
              t.type === "error" && "border-rose-500/30 dark:border-rose-500/20",
              t.type === "info" && "border-blue-500/30 dark:border-blue-500/20"
            )}
          >
            {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
            {t.type === "error" && <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />}
            {t.type === "info" && <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}

            <div className="flex-1 text-sm">
              <p className="font-semibold text-foreground">{t.title}</p>
              {t.description && <p className="text-muted-foreground text-xs mt-0.5">{t.description}</p>}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
