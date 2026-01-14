import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Zap, Droplets, Factory, Globe, Users } from 'lucide-react';

const metrics = [
  { icon: Leaf, label: 'CO₂ Reduction', value: 45000, unit: 'kg', color: 'primary' },
  { icon: Zap, label: 'Energy Saved', value: 120000, unit: 'kWh', color: 'secondary' },
  { icon: Droplets, label: 'Water Conserved', value: 85000, unit: 'L', color: 'accent' },
  { icon: Factory, label: 'Waste Processed', value: 15000, unit: 'tons', color: 'primary' },
  { icon: Globe, label: 'SDG Impact', value: 3, unit: 'Goals', suffix: ' Addressed', color: 'secondary' },
  { icon: Users, label: 'Communities', value: 50, unit: '+', suffix: ' Impacted', color: 'accent' },
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function ImpactMetrics() {
  return (
    <section id="impact" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Environmental Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time AI-estimated sustainability metrics from circular economy transformations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                className="glass-panel p-5 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  metric.color === 'primary' ? 'bg-primary/20' :
                  metric.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    metric.color === 'primary' ? 'text-primary' :
                    metric.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <div className="mb-1">
                  <span className={`text-2xl font-display font-bold ${
                    metric.color === 'primary' ? 'text-primary' :
                    metric.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`}>
                    <AnimatedCounter value={metric.value} />
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {metric.unit}{metric.suffix || ''}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* SDG Badges */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { num: 11, title: 'Sustainable Cities' },
            { num: 12, title: 'Responsible Consumption' },
            { num: 13, title: 'Climate Action' },
          ].map((sdg) => (
            <div
              key={sdg.num}
              className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-primary/30"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-eco flex items-center justify-center">
                <span className="text-sm font-display font-bold text-primary-foreground">{sdg.num}</span>
              </div>
              <span className="text-sm font-medium text-foreground">SDG {sdg.num}: {sdg.title}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
