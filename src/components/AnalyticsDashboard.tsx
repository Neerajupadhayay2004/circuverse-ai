import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Recycle, 
  Leaf, 
  Zap, 
  Droplets,
  Globe2,
  Building2,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

// Sample data for charts
const wasteProcessedData = [
  { month: 'Jan', plastic: 4000, organic: 2400, electronic: 1200, construction: 800 },
  { month: 'Feb', plastic: 4500, organic: 2800, electronic: 1400, construction: 900 },
  { month: 'Mar', plastic: 5200, organic: 3200, electronic: 1600, construction: 1100 },
  { month: 'Apr', plastic: 4800, organic: 2900, electronic: 1300, construction: 950 },
  { month: 'May', plastic: 5800, organic: 3600, electronic: 1800, construction: 1300 },
  { month: 'Jun', plastic: 6200, organic: 4000, electronic: 2000, construction: 1500 },
];

const circularScoreData = [
  { week: 'W1', score: 65 },
  { week: 'W2', score: 68 },
  { week: 'W3', score: 72 },
  { week: 'W4', score: 75 },
  { week: 'W5', score: 78 },
  { week: 'W6', score: 82 },
  { week: 'W7', score: 85 },
  { week: 'W8', score: 88 },
];

const wasteDistribution = [
  { name: 'Plastic', value: 40, color: '#00d4aa' },
  { name: 'Organic', value: 25, color: '#00d4ff' },
  { name: 'E-Waste', value: 15, color: '#ff6644' },
  { name: 'Construction', value: 12, color: '#ffaa44' },
  { name: 'Textile', value: 8, color: '#aa44ff' },
];

const impactMetrics = [
  { label: 'CO₂ Saved', value: 12580, unit: 'kg', change: 12.5, icon: Leaf },
  { label: 'Energy Saved', value: 45200, unit: 'kWh', change: 8.3, icon: Zap },
  { label: 'Water Saved', value: 8900, unit: 'L', change: 15.2, icon: Droplets },
  { label: 'Cities Impacted', value: 24, unit: '', change: 4, icon: Building2 },
];

const globalStats = [
  { region: 'Asia', processed: 45000, recycled: 38000 },
  { region: 'Europe', processed: 32000, recycled: 28000 },
  { region: 'Americas', processed: 28000, recycled: 22000 },
  { region: 'Africa', processed: 15000, recycled: 11000 },
  { region: 'Oceania', processed: 8000, recycled: 6500 },
];

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

function MetricCard({ label, value, unit, change, icon: Icon, delay = 0 }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          const step = Math.ceil(value / 50);
          if (prev + step >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + step;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay * 100);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      className="glass-panel p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs ${change >= 0 ? 'text-primary' : 'text-destructive'}`}>
          {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-foreground">
        {displayValue.toLocaleString()}{unit && <span className="text-sm ml-1">{unit}</span>}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'impact', label: 'Impact', icon: TrendingUp },
    { id: 'global', label: 'Global', icon: Globe2 },
  ];

  return (
    <section id="analytics" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics tracking waste transformation and environmental impact
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-panel hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {impactMetrics.map((metric, i) => (
            <MetricCard key={metric.label} {...metric} delay={i} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waste Processed Over Time */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Waste Processed (Tons)</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteProcessedData}>
                  <defs>
                    <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a15', 
                      border: '1px solid #00d4aa40',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="plastic" stroke="#00d4aa" fillOpacity={1} fill="url(#colorPlastic)" />
                  <Area type="monotone" dataKey="organic" stroke="#00d4ff" fillOpacity={1} fill="url(#colorOrganic)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Circular Score Trend */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Recycle className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Circular Score Trend</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={circularScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="week" stroke="#666" />
                  <YAxis stroke="#666" domain={[50, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a15', 
                      border: '1px solid #00d4aa40',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#00d4aa" 
                    strokeWidth={3}
                    dot={{ fill: '#00d4aa', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#00ff88' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Waste Distribution Pie */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Waste Distribution</h3>
            </div>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a15', 
                      border: '1px solid #00d4aa40',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Global Stats Bar */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe2 className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Global Processing (Tons)</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={globalStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="region" type="category" stroke="#666" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a15', 
                      border: '1px solid #00d4aa40',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="processed" fill="#00d4aa" name="Processed" />
                  <Bar dataKey="recycled" fill="#00d4ff" name="Recycled" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
