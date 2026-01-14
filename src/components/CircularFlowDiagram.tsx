import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Package, Wrench, Recycle, Lightbulb, RotateCcw } from 'lucide-react';

const steps = [
  { id: 'use', label: 'USE', icon: Package, color: 'primary', angle: 0 },
  { id: 'reuse', label: 'REUSE', icon: RefreshCw, color: 'secondary', angle: 60 },
  { id: 'repair', label: 'REPAIR', icon: Wrench, color: 'accent', angle: 120 },
  { id: 'recycle', label: 'RECYCLE', icon: Recycle, color: 'primary', angle: 180 },
  { id: 'redesign', label: 'REDESIGN', icon: Lightbulb, color: 'secondary', angle: 240 },
  { id: 'repeat', label: 'REPEAT', icon: RotateCcw, color: 'accent', angle: 300 },
];

export default function CircularFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = 140;

  return (
    <div className="glass-panel p-8">
      <h3 className="text-xl font-display font-bold text-center mb-8 text-gradient-eco">
        Circular Economy Loop
      </h3>
      
      <div 
        ref={containerRef}
        className="relative mx-auto"
        style={{ width: radius * 2 + 100, height: radius * 2 + 100 }}
      >
        {/* Center circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-eco flex items-center justify-center eco-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-primary-foreground font-display font-bold text-sm text-center">
            CIRCULAR<br/>ECONOMY
          </span>
        </motion.div>

        {/* Rotating ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: radius * 2, height: radius * 2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="w-full h-full" viewBox="0 0 280 280">
            <circle
              cx="140"
              cy="140"
              r="130"
              fill="none"
              stroke="url(#circleGradient)"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(160, 100%, 45%)" />
                <stop offset="50%" stopColor="hsl(200, 100%, 50%)" />
                <stop offset="100%" stopColor="hsl(280, 100%, 60%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Step nodes */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const angleRad = (step.angle - 90) * (Math.PI / 180);
          const x = Math.cos(angleRad) * radius + radius + 50;
          const y = Math.sin(angleRad) * radius + radius + 50;
          
          return (
            <motion.div
              key={step.id}
              className="absolute"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                className={`flex flex-col items-center gap-2 cursor-pointer`}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  step.color === 'primary' ? 'bg-primary/20 border-2 border-primary' :
                  step.color === 'secondary' ? 'bg-secondary/20 border-2 border-secondary' :
                  'bg-accent/20 border-2 border-accent'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    step.color === 'primary' ? 'text-primary' :
                    step.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <span className={`text-xs font-display font-bold ${
                  step.color === 'primary' ? 'text-primary' :
                  step.color === 'secondary' ? 'text-secondary' :
                  'text-accent'
                }`}>
                  {step.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Animated arrows between nodes */}
        {steps.map((_, index) => {
          const nextIndex = (index + 1) % steps.length;
          const angle1 = (steps[index].angle - 90) * (Math.PI / 180);
          const angle2 = (steps[nextIndex].angle - 90) * (Math.PI / 180);
          
          const x1 = Math.cos(angle1) * (radius - 20) + radius + 50;
          const y1 = Math.sin(angle1) * (radius - 20) + radius + 50;
          const x2 = Math.cos(angle2) * (radius - 20) + radius + 50;
          const y2 = Math.sin(angle2) * (radius - 20) + radius + 50;
          
          // Control point for curved arrow
          const midAngle = ((steps[index].angle + steps[nextIndex].angle) / 2 - 90) * (Math.PI / 180);
          const cx = Math.cos(midAngle) * (radius - 50) + radius + 50;
          const cy = Math.sin(midAngle) * (radius - 50) + radius + 50;

          return (
            <svg
              key={`arrow-${index}`}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ width: radius * 2 + 100, height: radius * 2 + 100 }}
            >
              <motion.path
                d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                fill="none"
                stroke="hsl(160, 100%, 45%)"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
