import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { AppProvider } from "@/context/AppContext";
import { SearchCommand } from "@/components/shared/SearchCommand";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusHR — Modern B2B Workforce & Employee Management SaaS",
  description: "Enterprise employee directory, attendance tracking, leave management, automated payroll calculations, and compliance analytics platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <AppProvider>
              {children}
              <SearchCommand />
            </AppProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
