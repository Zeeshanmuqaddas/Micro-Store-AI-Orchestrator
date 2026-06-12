export type AgentStatus = 'idle' | 'running' | 'error' | 'offline';

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastActive: string;
  currentTask?: string;
  model: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ProductOpportunity {
  id: string;
  name: string;
  category: string;
  demandScore: number;
  competitionScore: number;
  estimatedMargin: number;
  status: 'monitoring' | 'recommended' | 'active';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondaryValue?: number;
}

export interface AgentMetricsData {
  time: string;
  latency: number;
  tokens: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stockLevel: number;
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
}
