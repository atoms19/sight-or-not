"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Activity,
  Cpu,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Power,
  Thermometer,
  Droplets,
  Wifi,
  WifiOff,
  RefreshCw,
  ChevronRight,
  Bell,
  Home,
  BarChart3,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Server,
  Database,
  Globe,
  Leaf,
  Building2,
  Users,
  Shield,
  Cloud,
  Radio,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api, DeviceLiveState, DeviceHistoryData, ESGSummaryResponse } from "@/lib/api";

function generatePowerData() {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    const baseLoad = hour >= 9 && hour <= 18 ? 500 : 300;
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      power: Math.round(baseLoad + Math.sin(i / 3) * 100 + Math.random() * 80),
      baseline: Math.round(baseLoad * 0.8),
    });
  }
  return data;
}

const roomDistribution = [
  { name: "HVAC", value: 42, color: "#22c55e" },
  { name: "Lighting", value: 25, color: "#3b82f6" },
  { name: "Equipment", value: 18, color: "#8b5cf6" },
  { name: "Other", value: 15, color: "#f59e0b" },
];

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Cpu, label: "Devices", href: "/dashboard/devices" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface ESPNode {
  id: string;
  name: string;
  location: string;
  online: boolean;
  power: number;
  temp: number;
  humidity: number;
  relayOn: boolean;
}

const initialNodes: ESPNode[] = [
  { id: "ESP-001", name: "Main Hall", location: "Building A", online: true, power: 245, temp: 24.5, humidity: 45, relayOn: true },
  { id: "ESP-002", name: "Server Room", location: "Building A", online: true, power: 890, temp: 19.2, humidity: 35, relayOn: true },
  { id: "ESP-003", name: "Kitchen Area", location: "Building B", online: true, power: 156, temp: 26.1, humidity: 52, relayOn: true },
  { id: "ESP-004", name: "Parking Lot", location: "External", online: false, power: 0, temp: 0, humidity: 0, relayOn: false },
  { id: "ESP-005", name: "Conference", location: "Building A", online: true, power: 78, temp: 23.8, humidity: 48, relayOn: false },
];

const sdgGoals = [
  { id: 7, title: "Affordable & Clean Energy", icon: Zap, color: "from-yellow-500 to-amber-600" },
  { id: 9, title: "Industry, Innovation & Infrastructure", icon: Building2, color: "from-orange-500 to-red-600" },
  { id: 11, title: "Sustainable Cities & Communities", icon: Users, color: "from-amber-500 to-yellow-600" },
  { id: 12, title: "Responsible Consumption", icon: Leaf, color: "from-green-500 to-emerald-600" },
  { id: 13, title: "Climate Action", icon: Globe, color: "from-emerald-500 to-green-600" },
];

const architectureNodes = [
  { id: "esp32", label: "ESP32 Nodes", icon: Cpu, description: "Sensor data collection" },
  { id: "mqtt", label: "MQTT Broker", icon: Radio, description: "Real-time messaging" },
  { id: "cloud", label: "Cloud Server", icon: Cloud, description: "Data processing" },
  { id: "ai", label: "AI Engine", icon: Activity, description: "ML predictions" },
  { id: "dashboard", label: "Dashboard", icon: BarChart3, description: "Visualization" },
];

// Animated Orb with orbiting atoms
function EnergyOrb() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 blur-3xl" />
      
      {/* Main orb */}
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 shadow-2xl shadow-blue-500/30"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 60px rgba(59, 130, 246, 0.4)",
            "0 0 80px rgba(34, 197, 94, 0.4)",
            "0 0 60px rgba(59, 130, 246, 0.4)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/20" />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-16 h-16 text-white drop-shadow-lg" />
        </div>
      </motion.div>

      {/* Orbiting atoms */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "center center" }}
        >
          <motion.div
            className={`absolute w-4 h-4 rounded-full ${
              i % 2 === 0 
                ? "bg-gradient-to-br from-blue-400 to-blue-600" 
                : "bg-gradient-to-br from-green-400 to-green-600"
            } shadow-lg`}
            style={{
              top: `${10 + i * 5}%`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        </motion.div>
      ))}

      {/* Orbital rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-blue-500/20"
          style={{
            inset: `${ring * 8}px`,
          }}
          animate={{
            rotate: ring % 2 === 0 ? 360 : -360,
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: { duration: 20 + ring * 5, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity },
          }}
        />
      ))}
    </div>
  );
}

// Architecture Flow Diagram
function ArchitectureFlow() {
  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {architectureNodes.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center mb-2"
                whileHover={{ scale: 1.1, borderColor: "#22c55e" }}
              >
                <node.icon className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
              </motion.div>
              <span className="text-xs md:text-sm font-medium text-white text-center">{node.label}</span>
              <span className="text-xs text-neutral-500 text-center hidden md:block">{node.description}</span>
            </motion.div>
            
            {index < architectureNodes.length - 1 && (
              <motion.div
                className="hidden md:flex items-center mx-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className="w-8 lg:w-16 h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50" />
                <ChevronRight className="w-4 h-4 text-green-400 -ml-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
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
  changeType: "up" | "down" | "neutral";
  color: string;
}) {
  return (
    <motion.div
      className="bg-neutral-950 rounded-xl border border-neutral-900 p-5 hover:border-neutral-800 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          changeType === "up" ? "text-green-400" : changeType === "down" ? "text-rose-400" : "text-neutral-400"
        }`}>
          {changeType === "up" && <TrendingUp className="w-4 h-4" />}
          {changeType === "down" && <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-neutral-400 mt-1">{label}</p>
    </motion.div>
  );
}

function NodeCard({ node, onToggle }: { node: ESPNode; onToggle: (id: string) => void }) {
  return (
    <motion.div
      className={`bg-neutral-950 rounded-xl border p-4 transition-all ${
        node.online ? "border-neutral-900 hover:border-green-500/50" : "border-neutral-900/50 opacity-60"
      }`}
      whileHover={node.online ? { scale: 1.02 } : {}}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            node.online ? "bg-green-500/20" : "bg-neutral-900"
          }`}>
            <Cpu className={`w-5 h-5 ${node.online ? "text-green-400" : "text-neutral-500"}`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{node.id}</h4>
            <p className="text-xs text-neutral-500">{node.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {node.online ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-neutral-500" />
          )}
          <Switch
            checked={node.relayOn}
            onCheckedChange={() => onToggle(node.id)}
            disabled={!node.online}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>
      
      {node.online && (
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-900">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Power className="w-3 h-3" />
              <span className="text-sm font-semibold">{node.power}W</span>
            </div>
            <p className="text-xs text-neutral-500">Power</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-rose-400">
              <Thermometer className="w-3 h-3" />
              <span className="text-sm font-semibold">{node.temp}°C</span>
            </div>
            <p className="text-xs text-neutral-500">Temp</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400">
              <Droplets className="w-3 h-3" />
              <span className="text-sm font-semibold">{node.humidity}%</span>
            </div>
            <p className="text-xs text-neutral-500">Humidity</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function SystemStatus({ label, status }: { label: string; status: "online" | "offline" | "warning" }) {
  const colors = {
    online: "bg-green-400",
    offline: "bg-rose-400",
    warning: "bg-amber-400",
  };
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-neutral-900/50 transition-colors">
      <span className="text-sm text-neutral-300">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colors[status]} ${status === "online" ? "animate-pulse" : ""}`} />
        <span className="text-xs text-neutral-400 capitalize font-medium">{status}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [powerData, setPowerData] = useState<any[]>([]);
  const [currentPower, setCurrentPower] = useState(0);
  const [nodes, setNodes] = useState<ESPNode[]>([]);
  const [esgData, setEsgData] = useState<ESGSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // 1. Fetch ESG Summary
      const esg = await api.getESGSummary("-24h");
      setEsgData(esg);

      // 2. Fetch Devices
      const deviceIds = await api.getDevices();
      
      // 3. Fetch Live State for each device
      const nodePromises = deviceIds.map(async (id) => {
        try {
          const live = await api.getLiveState(id);
          return {
            id: live.device_id,
            name: `Device ${live.device_id.slice(-4)}`,
            location: "Site A",
            online: true,
            power: live.power_w,
            temp: live.temp_c || 0,
            humidity: live.humidity_rh || 0,
            relayOn: !!live.relay_state,
          };
        } catch (e) {
          return { id, name: id, location: "Unknown", online: false, power: 0, temp: 0, humidity: 0, relayOn: false };
        }
      });
      
      const fetchedNodes = await Promise.all(nodePromises);
      setNodes(fetchedNodes);

      // 4. Calculate total current power
      const totalPower = fetchedNodes.reduce((acc, node) => acc + node.power, 0);
      setCurrentPower(Math.round(totalPower));

      // 5. Fetch History for the first device if available
      if (deviceIds.length > 0) {
        const history = await api.getHistory(deviceIds[0], "-24h");
        const chartData = history.data.map((d) => ({
          time: new Date(d.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          power: Math.round(d.power_w),
          baseline: Math.round(d.power_w * 0.8), // Mock baseline
        }));
        setPowerData(chartData);
      } else {
        setPowerData(generatePowerData());
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleRelay = async (id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    try {
      await api.setRelay(id, !node.relayOn);
      // Optimistic update
      setNodes(prev => prev.map(n => 
        n.id === id ? { ...n, relayOn: !n.relayOn } : n
      ));
    } catch (error) {
      console.error("Failed to toggle relay:", error);
    }
  };

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
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
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
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                <p className="text-sm text-neutral-500">Real-time energy monitoring</p>
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

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          
          {/* Hero Section with Orb and Project Info */}
          <motion.div
            className="bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 rounded-2xl border border-neutral-900 p-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Background gradient effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Left - Project Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Smart Energy Management
                  </h2>
                  <p className="text-neutral-400 text-lg">
                    AI-powered IoT system for real-time energy monitoring, optimization, and sustainable consumption tracking.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-neutral-400">Active Nodes</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {nodes.filter(n => n.online).length}/{nodes.length}
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-neutral-400">Total Energy</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {esgData ? `${esgData.total_energy_kwh} kWh` : "---"}
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-amber-400" />
                      <span className="text-sm text-neutral-400">Total CO2</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {esgData ? `${esgData.total_co2_kg} kg` : "---"}
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-neutral-400">CO2 Saved</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {esgData ? `${esgData.saved_co2_kg} kg` : "---"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right - Animated Orb */}
              <div className="flex justify-center">
                <EnergyOrb />
              </div>
            </div>
          </motion.div>

          {/* IoT Architecture Flow */}
          <motion.div
            className="bg-neutral-950 rounded-2xl border border-neutral-900 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">IoT Architecture Flow</h3>
                <p className="text-sm text-neutral-500">End-to-end data pipeline</p>
              </div>
            </div>
            <ArchitectureFlow />
          </motion.div>

          {/* SDG Goals */}
          <motion.div
            className="bg-neutral-950 rounded-2xl border border-neutral-900 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">UN Sustainable Development Goals</h3>
                <p className="text-sm text-neutral-500">Aligned SDG targets</p>
              </div>
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sdgGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  className="bg-black/50 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition-colors group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-neutral-500 mb-1">SDG {goal.id}</p>
                  <p className="text-sm font-medium text-white leading-tight">{goal.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              icon={Zap}
              label="Current Power"
              value={`${currentPower}W`}
              change="+12%"
              changeType="up"
              color="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatCard
              icon={Activity}
              label="Today's Usage"
              value="32.4 kWh"
              change="-8% vs avg"
              changeType="down"
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <StatCard
              icon={AlertTriangle}
              label="Active Alerts"
              value="3"
              change="Needs attention"
              changeType="neutral"
              color="bg-gradient-to-br from-amber-500 to-amber-600"
            />
            <StatCard
              icon={Cpu}
              label="Online Nodes"
              value={`${nodes.filter(n => n.online).length}/${nodes.length}`}
              change={nodes.some(n => !n.online) ? "Action needed" : "All online"}
              changeType="neutral"
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Power Chart */}
            <motion.div
              className="xl:col-span-2 bg-neutral-950 rounded-xl border border-neutral-900 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">Power Consumption</h3>
                  <p className="text-sm text-neutral-500">Last 24 hours vs baseline</p>
                </div>
                <Link href="/dashboard/analytics" className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors">
                  View Analytics
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={powerData}>
                    <defs>
                      <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />
                    <XAxis
                      dataKey="time"
                      stroke="#404040"
                      tick={{ fill: "#525252", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#404040"
                      tick={{ fill: "#525252", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #171717",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="#262626"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                      fill="transparent"
                      name="Baseline"
                    />
                    <Area
                      type="monotone"
                      dataKey="power"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#powerGradient)"
                      name="Power"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Distribution */}
            <motion.div
              className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-lg font-semibold text-white mb-5">Energy Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {roomDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0a0a0a",
                        border: "1px solid #171717",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(value) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {roomDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-neutral-400">{item.name}</span>
                    <span className="text-xs font-semibold text-white ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Nodes and Status */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ESP32 Nodes */}
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">ESP32 Nodes</h3>
                <Link href="/dashboard/devices" className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors">
                  Manage Devices
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nodes.map((node) => (
                  <NodeCard key={node.id} node={node} onToggle={toggleRelay} />
                ))}
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              className="bg-neutral-950 rounded-xl border border-neutral-900 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-1">
                <SystemStatus label="MQTT Broker" status="online" />
                <SystemStatus label="Cloud Server" status="online" />
                <SystemStatus label="AI Engine" status="online" />
                <SystemStatus label="Database" status="online" />
                <SystemStatus label="Backup System" status="warning" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
