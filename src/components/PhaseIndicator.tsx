import { motion } from 'framer-motion';
import { Factory, Cpu, Sparkles, Building2, TreePine } from 'lucide-react';

interface PhaseIndicatorProps {
  currentPhase: number;
  onPhaseClick: (phase: number) => void;
}

const phases = [
  { id: 0, label: 'Polluted City', icon: Factory, description: 'Initial waste scenario' },
  { id: 1, label: 'AI Scan', icon: Cpu, description: 'Neural network analysis' },
  { id: 2, label: 'Transform', icon: Sparkles, description: 'Waste to material' },
  { id: 3, label: 'Build', icon: Building2, description: 'Smart city creation' },
  { id: 4, label: 'Sustainable', icon: TreePine, description: 'Circular ecosystem' },
];

export default function PhaseIndicator({ currentPhase, onPhaseClick }: PhaseIndicatorProps) {
  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between gap-2">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isActive = currentPhase === phase.id;
          const isPast = currentPhase > phase.id;
          
          return (
            <div key={phase.id} className="flex items-center flex-1">
              <motion.button
                onClick={() => onPhaseClick(phase.id)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer flex-1 ${
                  isActive 
                    ? 'bg-primary/20 border border-primary/50' 
                    : isPast 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted/20 border border-border/30 hover:bg-muted/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive 
                    ? 'bg-primary text-primary-foreground eco-glow' 
                    : isPast 
                      ? 'bg-primary/50 text-primary-foreground' 
                      : 'bg-muted/30 text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className={`text-xs font-display font-semibold ${
                    isActive ? 'text-primary' : isPast ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {phase.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground hidden md:block">
                    {phase.description}
                  </p>
                </div>
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
              
              {index < phases.length - 1 && (
                <div className="flex-shrink-0 w-8 h-0.5 mx-1">
                  <motion.div
                    className={`h-full rounded-full ${
                      isPast ? 'bg-primary' : 'bg-border'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPast ? 1 : 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
