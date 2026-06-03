const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface DeviceLiveState {
  device_id: string;
  irms_a: number;
  vrms_v: number;
  power_w: number;
  energy_wh: number;
  relay_state: number; // 0 or 1
  updated_at: string;
  // Some fields might be missing if they come from other sources, but these are the ones from ingest
  temp_c?: number;
  humidity_rh?: number;
}

export interface DeviceHistoryData {
  time: string;
  power_w: number;
  irms_a: number;
  vrms_v: number;
  energy_wh: number;
  relay: number;
}

export interface DeviceHistoryResponse {
  device_id: string;
  range: string;
  data: DeviceHistoryData[];
}

export interface ESGSummaryResponse {
  range: string;
  total_energy_kwh: number;
  total_co2_kg: number;
  saved_co2_kg: number;
  intensity_factor: number;
}

export const api = {
  async getDevices(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/devices`);
    if (!res.ok) throw new Error('Failed to fetch devices');
    const data = await res.json();
    return data.devices;
  },

  async getLiveState(deviceId: string): Promise<DeviceLiveState> {
    const res = await fetch(`${API_BASE_URL}/devices/${deviceId}/live`);
    if (!res.ok) throw new Error(`Failed to fetch live state for ${deviceId}`);
    return await res.json();
  },

  async getHistory(deviceId: string, range = '-1h'): Promise<DeviceHistoryResponse> {
    const res = await fetch(`${API_BASE_URL}/devices/${deviceId}/history?range=${range}`);
    if (!res.ok) throw new Error(`Failed to fetch history for ${deviceId}`);
    return await res.json();
  },

  async setRelay(deviceId: string, relay: boolean): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/devices/${deviceId}/relay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ relay }),
    });
    if (!res.ok) throw new Error(`Failed to set relay for ${deviceId}`);
  },

  async getESGSummary(range = '-30d'): Promise<ESGSummaryResponse> {
    const res = await fetch(`${API_BASE_URL}/esg/summary?range=${range}`);
    if (!res.ok) throw new Error('Failed to fetch ESG summary');
    return await res.json();
  },

  getWebSocketUrl(deviceId: string): string {
    const url = new URL(API_BASE_URL);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${url.origin}/ws/${deviceId}`;
  }
};
