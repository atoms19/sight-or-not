"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Wifi,
  Database,
  Mail,
  Smartphone,
  Globe,
  Key,
  Save,
  Check,
  Palette,
  Trash2,
  RefreshCw,
  Copy,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Wifi },
  { id: "data", label: "Data & Storage", icon: Database },
];

function ProfileSettings() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Profile Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-neutral-300">First Name</Label>
            <Input id="firstName" defaultValue="Admin" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-neutral-300">Last Name</Label>
            <Input id="lastName" defaultValue="User" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
            <Input id="email" type="email" defaultValue="admin@company.com" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="company" className="text-neutral-300">Company</Label>
            <Input id="company" defaultValue="Acme Corporation" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Timezone</p>
                <p className="text-xs text-neutral-500">UTC-5 (Eastern Time)</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">Change</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Theme</p>
                <p className="text-xs text-neutral-500">Dark mode (System)</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">Change</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushAlerts: true,
    anomalyAlerts: true,
    deviceOffline: true,
    dailyDigest: true,
    weeklyReport: true,
    maintenance: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Alert Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Email Alerts</p>
                <p className="text-xs text-neutral-500">Receive alerts via email</p>
              </div>
            </div>
            <Switch checked={settings.emailAlerts} onCheckedChange={() => toggle("emailAlerts")} className="data-[state=checked]:bg-green-500" />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Push Notifications</p>
                <p className="text-xs text-neutral-500">Receive mobile push notifications</p>
              </div>
            </div>
            <Switch checked={settings.pushAlerts} onCheckedChange={() => toggle("pushAlerts")} className="data-[state=checked]:bg-green-500" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Alert Types</h3>
        <div className="space-y-3">
          {[
            { key: "anomalyAlerts" as const, title: "Anomaly Detection", desc: "Alert when unusual patterns detected" },
            { key: "deviceOffline" as const, title: "Device Offline", desc: "Alert when a device goes offline" },
            { key: "maintenance" as const, title: "Maintenance Reminders", desc: "Scheduled maintenance notifications" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
              <Switch checked={settings[item.key]} onCheckedChange={() => toggle(item.key)} className="data-[state=checked]:bg-green-500" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Reports</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div>
              <p className="text-sm font-medium text-white">Daily Digest</p>
              <p className="text-xs text-neutral-500">Summary of daily consumption</p>
            </div>
            <Switch checked={settings.dailyDigest} onCheckedChange={() => toggle("dailyDigest")} className="data-[state=checked]:bg-green-500" />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
            <div>
              <p className="text-sm font-medium text-white">Weekly Report</p>
              <p className="text-xs text-neutral-500">Detailed weekly analysis</p>
            </div>
            <Switch checked={settings.weeklyReport} onCheckedChange={() => toggle("weeklyReport")} className="data-[state=checked]:bg-green-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SecuritySettings() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPass" className="text-neutral-300">Current Password</Label>
            <Input id="currentPass" type="password" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPass" className="text-neutral-300">New Password</Label>
            <Input id="newPass" type="password" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPass" className="text-neutral-300">Confirm New Password</Label>
            <Input id="confirmPass" type="password" className="h-11 bg-neutral-900 border-neutral-800 text-white" />
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Update Password</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Two-Factor Authentication</h3>
        <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Key className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">2FA Status</p>
              <p className="text-xs text-neutral-500">Not enabled - Enable for extra security</p>
            </div>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white w-full">Enable 2FA</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Active Sessions</h3>
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-900 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Chrome on macOS</p>
              <p className="text-xs text-neutral-500">Active now - This device</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Current</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IntegrationSettings() {
  const integrations = [
    { name: "MQTT Broker", status: "connected", url: "mqtt://broker.local:1883", color: "teal" },
    { name: "InfluxDB", status: "connected", url: "http://influxdb.local:8086", color: "blue" },
    { name: "Home Assistant", status: "disconnected", url: "", color: "neutral" },
    { name: "Slack Webhooks", status: "disconnected", url: "", color: "neutral" },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Connected Services</h3>
        <div className="space-y-3">
          {integrations.map(integration => (
            <div key={integration.name} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
              <div className="flex items-center gap-4">
                <span className={`w-3 h-3 rounded-full ${integration.status === "connected" ? "bg-green-400" : "bg-neutral-600"}`} />
                <div>
                  <p className="text-sm font-medium text-white">{integration.name}</p>
                  <p className="text-xs text-neutral-500">{integration.status === "connected" ? integration.url : "Not configured"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
                {integration.status === "connected" ? "Configure" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">API Access</h3>
        <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white">API Key</p>
              <p className="text-xs text-neutral-500">Use this key to access the GridSense API</p>
            </div>
            <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm bg-black p-3 rounded-lg text-neutral-400">
              gs_live_••••••••••••••••••••••••••••
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DataSettings() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Data Retention</h3>
        <div className="space-y-3 max-w-md">
          {[
            { label: "Raw Sensor Data", desc: "High-resolution readings", value: "30 days" },
            { label: "Aggregated Data", desc: "Hourly averages", value: "1 year" },
            { label: "Reports", desc: "Generated reports", value: "Forever" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-900">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
              <span className="text-sm text-green-400 font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Storage Usage</h3>
        <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 max-w-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white">2.4 GB of 10 GB used</span>
            <span className="text-sm text-neutral-500">24%</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: "24%" }} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-5">Export Data</h3>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">Export as CSV</Button>
          <Button variant="outline" size="sm" className="bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800">Export as JSON</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-rose-400 mb-5">Danger Zone</h3>
        <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 max-w-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Delete All Data</p>
              <p className="text-xs text-neutral-400">This action cannot be undone</p>
            </div>
          </div>
          <Button variant="destructive" className="w-full bg-rose-500 hover:bg-rose-600">Delete All Data</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Settings" description="Manage your account and preferences">
      {/* Save button */}
      <div className="flex justify-end mb-6">
        <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-neutral-950 rounded-xl border border-neutral-900 p-6">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "integrations" && <IntegrationSettings />}
          {activeTab === "data" && <DataSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}
