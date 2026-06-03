"use client";

import { useState } from "react";
import {
  Zap,
  Home,
  BarChart3,
  Cpu,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Cpu, label: "Devices", href: "/dashboard/devices" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-950 border-r border-neutral-900 transform transition-transform duration-300 lg:translate-x-0 lg:static ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-neutral-900">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                GridSense<span className="text-green-400">AI</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-neutral-900">
            <Link 
              href="/login"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-neutral-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-white">{title}</h1>
                {description && <p className="text-sm text-neutral-500">{description}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-900">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-neutral-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
