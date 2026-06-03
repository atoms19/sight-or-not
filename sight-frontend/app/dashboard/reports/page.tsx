"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  FileBarChart,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";

interface Report {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly" | "alert";
  date: string;
  status: "ready" | "generating";
  metrics: {
    consumption: string;
    change: number;
    anomalies: number;
  };
}

const reports: Report[] = [
  { id: "1", title: "Daily Energy Report", description: "May 25, 2026 - Complete breakdown", type: "daily", date: "2026-05-25", status: "ready", metrics: { consumption: "44.2 kWh", change: -8, anomalies: 1 } },
  { id: "2", title: "Daily Energy Report", description: "May 24, 2026 - Complete breakdown", type: "daily", date: "2026-05-24", status: "ready", metrics: { consumption: "48.1 kWh", change: 5, anomalies: 0 } },
  { id: "3", title: "Weekly Summary", description: "May 19 - May 25, 2026", type: "weekly", date: "2026-05-25", status: "ready", metrics: { consumption: "311 kWh", change: -12, anomalies: 2 } },
  { id: "4", title: "Monthly Analysis", description: "April 2026 - Full report", type: "monthly", date: "2026-04-30", status: "ready", metrics: { consumption: "1,289 kWh", change: -5, anomalies: 4 } },
  { id: "5", title: "Anomaly Alert", description: "Kitchen node spike detected", type: "alert", date: "2026-05-25", status: "ready", metrics: { consumption: "280W peak", change: 45, anomalies: 1 } },
  { id: "6", title: "Monthly Analysis", description: "March 2026 - Full report", type: "monthly", date: "2026-03-31", status: "ready", metrics: { consumption: "1,356 kWh", change: 3, anomalies: 6 } },
];

const typeStyles = {
  daily: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", label: "Daily" },
  weekly: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", label: "Weekly" },
  monthly: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", label: "Monthly" },
  alert: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", label: "Alert" },
};

function ReportCard({ report }: { report: Report }) {
  const style = typeStyles[report.type];
  const isPositive = report.metrics.change > 0;

  return (
    <motion.div
      className="bg-neutral-950 rounded-xl border border-neutral-900 p-5 hover:border-neutral-800 transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      {/* Header - REMOVED THREE DOTS MENU */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center`}>
            {report.type === "alert" ? (
              <AlertTriangle className={`w-6 h-6 ${style.text}`} />
            ) : (
              <FileBarChart className={`w-6 h-6 ${style.text}`} />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{report.title}</h4>
            <p className="text-xs text-neutral-500">{report.description}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full ${style.bg} ${style.text} font-medium`}>
          {style.label}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-3 rounded-lg bg-neutral-900/50 mb-4">
        <div>
          <p className="text-xs text-neutral-500 mb-1">Consumption</p>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-sm font-semibold text-white">{report.metrics.consumption}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">Change</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-rose-400" />
            ) : (
              <TrendingDown className="w-3 h-3 text-green-400" />
            )}
            <span className={`text-sm font-semibold ${isPositive ? "text-rose-400" : "text-green-400"}`}>
              {isPositive ? "+" : ""}{report.metrics.change}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">Anomalies</p>
          <span className={`text-sm font-semibold ${report.metrics.anomalies > 0 ? "text-amber-400" : "text-white"}`}>
            {report.metrics.anomalies}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Clock className="w-3 h-3" />
          <span className="text-xs">
            {new Date(report.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-neutral-400 hover:text-white hover:bg-neutral-900">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            PDF
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-900">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReportsPage() {
  const [filter, setFilter] = useState<"all" | "daily" | "weekly" | "monthly" | "alert">("all");

  const filteredReports = filter === "all" ? reports : reports.filter(r => r.type === filter);

  const stats = {
    total: reports.length,
    daily: reports.filter(r => r.type === "daily").length,
    weekly: reports.filter(r => r.type === "weekly").length,
    monthly: reports.filter(r => r.type === "monthly").length,
    alerts: reports.filter(r => r.type === "alert").length,
  };

  return (
    <DashboardLayout title="Reports" description="Energy consumption reports and analysis">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Daily</p>
          <p className="text-2xl font-bold text-green-400">{stats.daily}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Weekly</p>
          <p className="text-2xl font-bold text-blue-400">{stats.weekly}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Monthly</p>
          <p className="text-2xl font-bold text-purple-400">{stats.monthly}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Alerts</p>
          <p className="text-2xl font-bold text-rose-400">{stats.alerts}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(["all", "daily", "weekly", "monthly", "alert"] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800 capitalize"
              }
            >
              {type === "all" ? "All Reports" : type}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredReports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ReportCard report={report} />
          </motion.div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-neutral-500" />
          </div>
          <p className="text-neutral-400 mb-2">No reports found</p>
          <p className="text-sm text-neutral-600">Try adjusting your filter selection</p>
        </div>
      )}
    </DashboardLayout>
  );
}
