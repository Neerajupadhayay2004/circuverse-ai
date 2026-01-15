import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Droplets, Recycle, TrendingUp, Activity } from 'lucide-react';

interface RealTimeMetricsProps {
  isActive: boolean;
  analysis: {
    co2Saved: number;
    energySaved: number;
    recyclability: number;
    circularScore: number;
  } | null;
}

export default function RealTimeMetrics({ isActive, analysis }: RealTimeMetricsProps) {
  const [co2, setCo2] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [water, setWater] = useState(0);
  const [trees, setTrees] = useState(0);

  useEffect(() => {
    if (isActive && analysis) {
      // Animate metrics counting up
      const targetCo2 = analysis.co2Saved;
      const targetEnergy = analysis.energySaved;
      const targetWater = Math.floor(analysis.energySaved * 0.8);
      const targetTrees = Math.floor(analysis.co2Saved / 20);

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setCo2(Math.floor(targetCo2 * easeProgress));
        setEnergy(Math.floor(targetEnergy * easeProgress));
        setWater(Math.floor(targetWater * easeProgress));
        setTrees(Math.floor(targetTrees * easeProgress));

        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setCo2(0);
      setEnergy(0);
      setWater(0);
      setTrees(0);
    }
  }, [isActive, analysis]);

  const metrics = [
    { label: 'CO₂ Saved', value: co2, unit: 'kg', icon: Leaf, color: 'primary' },
    { label: 'Energy Saved', value: energy, unit: 'kWh', icon: Zap, color: 'secondary' },
    { label: 'Water Saved', value: water, unit: 'L', icon: Droplets, color: 'primary' },
    { label: 'Trees Equivalent', value: trees, unit: '', icon: Recycle, color: 'accent' }
  ];

  return (
    <motion.div
      className="glass-panel p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className={`w-4 h-4 ${isActive ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
        <span className="text-sm font-display font-semibold text-foreground">Real-Time Impact</span>
        {isActive && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary animate-pulse">
            LIVE
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div 
              key={metric.label} 
              className={`p-3 rounded-lg ${
                metric.color === 'primary' ? 'bg-primary/10 border border-primary/20' :
                metric.color === 'secondary' ? 'bg-secondary/10 border border-secondary/20' :
                'bg-accent/10 border border-accent/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${
                  metric.color === 'primary' ? 'text-primary' :
                  metric.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`} />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-xl font-display font-bold text-foreground">
                {metric.value.toLocaleString()}
                {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
              </p>
            </div>
          );
        })}
      </div>

      {analysis && isActive && (
        <motion.div
          className="mt-4 p-3 rounded-lg bg-gradient-eco/10 border border-primary/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Circular Score</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient-eco">
              {analysis.circularScore}/100
            </span>
          </div>
          <div className="mt-2 h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-eco rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${analysis.circularScore}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
