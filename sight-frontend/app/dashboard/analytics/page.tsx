"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Zap,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { api, ESGSummaryResponse } from "@/lib/api";
import { useEffect } from "react";

const weeklyData = [
  { day: "Mon", consumption: 28.4, baseline: 32 },
  { day: "Tue", consumption: 31.2, baseline: 32 },
  { day: "Wed", consumption: 26.8, baseline: 32 },
  { day: "Thu", consumption: 29.1, baseline: 32 },
  { day: "Fri", consumption: 33.5, baseline: 32 },
  { day: "Sat", consumption: 19.2, baseline: 22 },
  { day: "Sun", consumption: 17.8, baseline: 22 },
];

const monthlyTrend = [
  { month: "Jan", value: 842 },
  { month: "Feb", value: 756 },
  { month: "Mar", value: 823 },
  { month: "Apr", value: 695 },
  { month: "May", value: 712 },
  { month: "Jun", value: 658 },
];

const categoryData = [
  { name: "HVAC", value: 42, color: "#22c55e" },
  { name: "Lighting", value: 25, color: "#3b82f6" },
  { name: "Equipment", value: 18, color: "#8b5cf6" },
  { name: "Other", value: 15, color: "#f59e0b" },
];

const peakHours = [
  { hour: "6AM", usage: 20 },
  { hour: "9AM", usage: 75 },
  { hour: "12PM", usage: 85 },
  { hour: "3PM", usage: 90 },
  { hour: "6PM", usage: 70 },
  { hour: "9PM", usage: 45 },
  { hour: "12AM", usage: 15 },
];

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  changeType,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  color: string;
}) {
  return (
    <motion.div
      className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm text-neutral-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <div className={`flex items-center gap-1 mt-2 text-sm ${
        changeType === "down" ? "text-green-400" : "text-rose-400"
      }`}>
        {changeType === "down" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
        {change}
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [esgData, setEsgData] = useState<ESGSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getESGSummary(`-${timeRange}`);
        setEsgData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  return (
    <DashboardLayout title="Analytics" description="Detailed energy consumption analysis">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              }
            >
              {range}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={Zap}
          label="Total Consumption"
          value={esgData ? `${esgData.total_energy_kwh} kWh` : "---"}
          change={esgData ? `Range: ${esgData.range}` : "Loading..."}
          changeType="down"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <MetricCard
          icon={Target}
          label="Carbon Footprint"
          value={esgData ? `${esgData.total_co2_kg} kg` : "---"}
          change={`Intensity: ${esgData?.intensity_factor || "---"}`}
          changeType="down"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={Clock}
          label="Estimated Savings"
          value={esgData ? `${esgData.saved_co2_kg} kg` : "---"}
          change="via AI Optimization"
          changeType="down"
          color="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <MetricCard
          icon={DollarSign}
          label="Cost Estimate"
          value={esgData ? `$${(esgData.total_energy_kwh * 0.15).toFixed(2)}` : "---"}
          change="at $0.15/kWh"
          changeType="down"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Weekly Consumption */}
        <motion.div
          className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-1">Weekly Consumption</h3>
          <p className="text-sm text-neutral-500 mb-5">Actual vs baseline target</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="day" stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} unit=" kWh" />
                <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #171717", borderRadius: "8px", color: "#fff" }} />
                <Bar dataKey="consumption" fill="#22c55e" radius={[4, 4, 0, 0]} name="Actual" />
                <Bar dataKey="baseline" fill="#262626" radius={[4, 4, 0, 0]} name="Baseline" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-1">Consumption by Category</h3>
          <p className="text-sm text-neutral-500 mb-5">Energy usage breakdown</p>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #171717", borderRadius: "8px", color: "#fff" }} formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-neutral-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-1">Monthly Trend</h3>
          <p className="text-sm text-neutral-500 mb-5">6-month consumption history</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="month" stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} unit=" kWh" />
                <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #171717", borderRadius: "8px", color: "#fff" }} />
                <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Peak Hours */}
        <motion.div
          className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-1">Peak Hours Distribution</h3>
          <p className="text-sm text-neutral-500 mb-5">Typical daily usage pattern</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={peakHours}>
                <defs>
                  <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                <XAxis dataKey="hour" stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#404040" tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #171717", borderRadius: "8px", color: "#fff" }} />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} fill="url(#peakGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
