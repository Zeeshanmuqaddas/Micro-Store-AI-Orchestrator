import { AgentInfo, Metric, ProductOpportunity, ChartDataPoint, AgentMetricsData } from './types';

export const llmPerformanceData = [
  { provider: 'OpenAI', model: 'GPT-4o', latency: 450, tokens: 1200, fill: '#10b981' },
  { provider: 'OpenAI', model: 'GPT-3.5-Turbo', latency: 200, tokens: 3500, fill: '#10b981' },
  { provider: 'Google', model: 'Gemini 1.5 Pro', latency: 400, tokens: 1800, fill: '#4f46e5' },
  { provider: 'Google', model: 'Gemini 1.5 Flash', latency: 150, tokens: 4200, fill: '#4f46e5' },
  { provider: 'Anthropic', model: 'Claude 3.5 Sonnet', latency: 380, tokens: 1500, fill: '#fb923c' },
  { provider: 'Anthropic', model: 'Claude 3 Haiku', latency: 180, tokens: 3800, fill: '#fb923c' },
  { provider: 'Mistral', model: 'Mistral Large', latency: 500, tokens: 900, fill: '#8b5cf6' },
];

// Mock data generator for agent metrics (last hour, every 5 mins = 12 points)
export const getAgentMetrics = (agentId: string): AgentMetricsData[] => {
  const seed = parseInt(agentId) * 10;
  return Array.from({ length: 12 }).map((_, i) => ({
    time: `-${60 - i * 5}m`,
    latency: Math.floor(100 + (Math.sin(i + seed) * 50) + Math.random() * 20),
    tokens: Math.floor(500 + (Math.cos(i + seed) * 200) + Math.random() * 100),
  }));
};

export const agents: AgentInfo[] = [
  { id: '1', name: 'Core Orchestrator Agent', role: 'Master Controller', status: 'running', lastActive: 'Just now', currentTask: 'Coordinating multi-agent workflows', model: 'Vertex AI (Gemini 1.5 Pro)' },
  { id: '2', name: 'Observability Intelligence Agent', role: 'Splunk Observability Track', status: 'idle', lastActive: '2m ago', currentTask: 'Real-time anomaly detection', model: 'BigQuery Analytics' },
  { id: '3', name: 'Security Intelligence Agent', role: 'Splunk Security Track', status: 'running', lastActive: 'Just now', currentTask: 'SIEM correlation rules execution', model: 'Vertex AI Threat Models' },
  { id: '4', name: 'Developer Experience Agent', role: 'Splunk Dev Platform Track', status: 'running', lastActive: '1m ago', currentTask: 'CI/CD pipeline optimization', model: 'LangChain/LangGraph' },
  { id: '5', name: 'Machine Learning & Prediction', role: 'Vertex AI Layer', status: 'idle', lastActive: '15m ago', currentTask: 'Demand forecasting', model: 'Vertex AI Pipelines' },
  { id: '6', name: 'Multi-LLM Orchestration Agent', role: 'External AI Layer', status: 'idle', lastActive: '1h ago', currentTask: 'Routing dynamic LLM tasks', model: 'OpenRouter / Hybrid' },
  { id: '7', name: 'Governance & Compliance Agent', role: 'Compliance Validation', status: 'running', lastActive: 'Just now', currentTask: 'Validating data privacy policies', model: 'Policy-as-Code Engine' },
];

export const keyMetrics: Metric[] = [
  { label: 'Total Revenue (30d)', value: '$24,500', change: '+12.5%', isPositive: true },
  { label: 'Active Products', value: '142', change: '+5', isPositive: true },
  { label: 'Avg Margin', value: '38.2%', change: '+1.2%', isPositive: true },
  { label: 'System Errors', value: '4', change: '-2', isPositive: true },
];

export const productOpportunities: ProductOpportunity[] = [
  { id: 'p1', name: 'Ergonomic Desk Accessories', category: 'Office Supply', demandScore: 92, competitionScore: 45, estimatedMargin: 48, status: 'recommended' },
  { id: 'p2', name: 'Smart Home Plant Monitors', category: 'Electronics', demandScore: 85, competitionScore: 60, estimatedMargin: 55, status: 'recommended' },
  { id: 'p3', name: 'Minimalist Travel Backpacks', category: 'Apparel', demandScore: 78, competitionScore: 80, estimatedMargin: 35, status: 'monitoring' },
  { id: 'p4', name: 'Biodegradable Phone Cases', category: 'Accessories', demandScore: 65, competitionScore: 55, estimatedMargin: 60, status: 'monitoring' },
];

export const revenueData: ChartDataPoint[] = [
  { name: 'Mon', value: 4000, secondaryValue: 84 },
  { name: 'Tue', value: 3000, secondaryValue: 65 },
  { name: 'Wed', value: 2000, secondaryValue: 42 },
  { name: 'Thu', value: 2780, secondaryValue: 58 },
  { name: 'Fri', value: 1890, secondaryValue: 39 },
  { name: 'Sat', value: 2390, secondaryValue: 51 },
  { name: 'Sun', value: 3490, secondaryValue: 72 },
];

export const inventoryData: ChartDataPoint[] = [
  { name: 'Week 1', value: 400, secondaryValue: 240 },
  { name: 'Week 2', value: 300, secondaryValue: 139 },
  { name: 'Week 3', value: 200, secondaryValue: 980 },
  { name: 'Week 4', value: 278, secondaryValue: 390 },
  { name: 'Week 5', value: 189, secondaryValue: 480 },
];

export const inventoryListData = [
  { id: '1', name: 'Ergonomic Mouse', sku: 'ACC-MOU-001', stockLevel: 145, unitPrice: 44.99, status: 'In Stock' },
  { id: '2', name: 'Mechanical Keyboard', sku: 'ACC-KEY-002', stockLevel: 12, unitPrice: 139.99, status: 'Low Stock' },
  { id: '3', name: 'Smart Home Hub', sku: 'SMT-HUB-001', stockLevel: 0, unitPrice: 89.99, status: 'Out of Stock' },
  { id: '4', name: 'USB-C Cable (2m)', sku: 'ACC-CAB-004', stockLevel: 850, unitPrice: 14.99, status: 'Overstocked' },
  { id: '5', name: 'Laptop Stand', sku: 'ACC-STD-005', stockLevel: 45, unitPrice: 34.99, status: 'In Stock' },
  { id: '6', name: 'Wireless Earbuds', sku: 'AUD-EAR-001', stockLevel: 8, unitPrice: 129.99, status: 'Low Stock' },
  { id: '7', name: 'Monitor Arm', sku: 'ACC-MNT-002', stockLevel: 210, unitPrice: 59.99, status: 'In Stock' },
  { id: '8', name: 'Desk Mat', sku: 'ACC-MAT-003', stockLevel: 520, unitPrice: 24.99, status: 'Overstocked' },
] as const;
