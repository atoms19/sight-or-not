"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Wifi,
  WifiOff,
  Thermometer,
  Droplets,
  Zap,
  Power,
  Plus,
  Search,
  RefreshCw,
  MapPin,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";

interface Device {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
  power: number;
  relay: boolean;
  temp: number;
  humidity: number;
  lastSeen: string;
  firmware: string;
  signal: number;
}

const initialDevices: Device[] = [
  { id: "ESP-001", name: "Main Hall Sensor", location: "Building A - Floor 1", status: "online", power: 245, relay: true, temp: 24.5, humidity: 45, lastSeen: "Just now", firmware: "v2.1.4", signal: 95 },
  { id: "ESP-002", name: "Server Room Monitor", location: "Building A - Basement", status: "online", power: 890, relay: true, temp: 19.2, humidity: 35, lastSeen: "Just now", firmware: "v2.1.4", signal: 88 },
  { id: "ESP-003", name: "Kitchen Area Node", location: "Building B - Floor 1", status: "online", power: 156, relay: true, temp: 26.1, humidity: 52, lastSeen: "Just now", firmware: "v2.1.4", signal: 72 },
  { id: "ESP-004", name: "Parking Lot Sensor", location: "External - Lot A", status: "offline", power: 0, relay: false, temp: 0, humidity: 0, lastSeen: "2 hours ago", firmware: "v2.1.3", signal: 0 },
  { id: "ESP-005", name: "Conference Room", location: "Building A - Floor 2", status: "online", power: 78, relay: false, temp: 23.8, humidity: 48, lastSeen: "Just now", firmware: "v2.1.4", signal: 91 },
  { id: "ESP-006", name: "Reception Desk", location: "Building A - Floor 1", status: "online", power: 112, relay: true, temp: 24.1, humidity: 44, lastSeen: "Just now", firmware: "v2.1.4", signal: 98 },
];

function DeviceCard({ device, onToggle }: { device: Device; onToggle: (id: string) => void }) {
  const isOnline = device.status === "online";

  return (
    <motion.div
      className={`bg-neutral-950 rounded-xl border p-5 transition-all ${
        isOnline ? "border-neutral-900 hover:border-green-500/50" : "border-neutral-900/50 opacity-60"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isOnline ? { y: -2 } : {}}
    >
      {/* Header - REMOVED THREE DOTS MENU */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isOnline ? "bg-green-500/20" : "bg-neutral-900"
          }`}>
            <Cpu className={`w-6 h-6 ${isOnline ? "text-green-400" : "text-neutral-500"}`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{device.name}</h4>
            <p className="text-xs text-neutral-500">{device.id}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-4 text-neutral-400">
        <MapPin className="w-3 h-3" />
        <span className="text-xs">{device.location}</span>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 mb-4">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-neutral-500" />
          )}
          <span className={`text-sm font-medium ${isOnline ? "text-green-400" : "text-neutral-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        {isOnline && (
          <span className="text-xs text-neutral-500">{device.signal}% signal</span>
        )}
      </div>

      {/* Metrics */}
      {isOnline && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-neutral-900/30">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              <Zap className="w-3 h-3" />
              <span className="text-sm font-bold">{device.power}</span>
            </div>
            <p className="text-xs text-neutral-500">Watts</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-neutral-900/30">
            <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
              <Thermometer className="w-3 h-3" />
              <span className="text-sm font-bold">{device.temp}</span>
            </div>
            <p className="text-xs text-neutral-500">°C</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-neutral-900/30">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <Droplets className="w-3 h-3" />
              <span className="text-sm font-bold">{device.humidity}</span>
            </div>
            <p className="text-xs text-neutral-500">%RH</p>
          </div>
        </div>
      )}

      {/* Relay Control */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <div className="flex items-center gap-2">
          <Power className={`w-4 h-4 ${device.relay ? "text-green-400" : "text-neutral-500"}`} />
          <span className="text-sm text-neutral-300">Relay Control</span>
        </div>
        <Switch
          checked={device.relay}
          onCheckedChange={() => onToggle(device.id)}
          disabled={!isOnline}
          className="data-[state=checked]:bg-green-500"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-900">
        <span className="text-xs text-neutral-500">Last: {device.lastSeen}</span>
        <span className="text-xs text-neutral-600">{device.firmware}</span>
      </div>
    </motion.div>
  );
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const deviceIds = await api.getDevices();
      const devicePromises = deviceIds.map(async (id) => {
        try {
          const live = await api.getLiveState(id);
          return {
            id: live.device_id,
            name: `Device ${live.device_id.slice(-4)}`,
            location: "Building A - Floor 1", // Mock location
            status: "online" as const,
            power: live.power_w,
            relay: !!live.relay_state,
            temp: live.temp_c || 0,
            humidity: live.humidity_rh || 0,
            lastSeen: new Date(live.updated_at).toLocaleTimeString(),
            firmware: "v2.1.4",
            signal: 90,
          };
        } catch (e) {
          return {
            id,
            name: id,
            location: "Unknown",
            status: "offline" as const,
            power: 0,
            relay: false,
            temp: 0,
            humidity: 0,
            lastSeen: "Disconnected",
            firmware: "---",
            signal: 0,
          };
        }
      });
      const fetchedDevices = await Promise.all(devicePromises);
      setDevices(fetchedDevices);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch devices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleRelay = async (id: string) => {
    const device = devices.find(d => d.id === id);
    if (!device) return;
    
    try {
      await api.setRelay(id, !device.relay);
      setDevices(prev => prev.map(d =>
        d.id === id ? { ...d, relay: !d.relay } : d
      ));
    } catch (error) {
      console.error("Failed to toggle relay:", error);
    }
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineCount = devices.filter(d => d.status === "online").length;
  const totalPower = devices.filter(d => d.status === "online").reduce((sum, d) => sum + d.power, 0);

  return (
    <DashboardLayout title="Devices" description={`${onlineCount} of ${devices.length} devices online`}>
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Online</p>
          <p className="text-2xl font-bold text-green-400">{onlineCount}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Offline</p>
          <p className="text-2xl font-bold text-rose-400">{devices.length - onlineCount}</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Total Power</p>
          <p className="text-2xl font-bold text-amber-400">{totalPower}W</p>
        </div>
        <div className="bg-neutral-950 rounded-xl border border-neutral-900 p-4">
          <p className="text-sm text-neutral-500">Avg Signal</p>
          <p className="text-2xl font-bold text-blue-400">{Math.round(devices.filter(d => d.status === "online").reduce((sum, d) => sum + d.signal, 0) / onlineCount)}%</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 w-full sm:w-72 h-11 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDevices.map((device, i) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <DeviceCard device={device} onToggle={toggleRelay} />
          </motion.div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 text-neutral-500" />
          </div>
          <p className="text-neutral-400 mb-2">No devices found</p>
          <p className="text-sm text-neutral-600">Try adjusting your search query</p>
        </div>
      )}
    </DashboardLayout>
  );
}
