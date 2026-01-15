import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Code2, 
  Rocket, 
  Globe2, 
  Sparkles, 
  Target,
  CheckCircle2,
  Circle,
  ArrowRight
} from 'lucide-react';

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'Ideation & Research',
    status: 'completed',
    icon: Lightbulb,
    items: [
      'Problem identification - Linear waste economy',
      'Market research - Smart city needs',
      'Technology stack selection',
      'AI model architecture design',
      'Circular economy principles mapping'
    ],
    color: 'primary'
  },
  {
    phase: 'Phase 2',
    title: 'Core Development',
    status: 'completed',
    icon: Code2,
    items: [
      '3D visualization engine (Three.js/R3F)',
      'AI analysis integration (Gemini)',
      'Waste-type classification system',
      'Transformation animation pipeline',
      'Real-time metrics calculation'
    ],
    color: 'secondary'
  },
  {
    phase: 'Phase 3',
    title: 'MVP Launch',
    status: 'current',
    icon: Rocket,
    items: [
      'Interactive demo deployment',
      'User interface polish',
      'Performance optimization',
      'Mobile responsiveness',
      'Sound effects integration'
    ],
    color: 'primary'
  },
  {
    phase: 'Phase 4',
    title: 'Scale & Impact',
    status: 'upcoming',
    icon: Globe2,
    items: [
      'Multi-language support',
      'API for city integrations',
      'Real waste data connections',
      'Policy maker dashboard',
      'Educational modules'
    ],
    color: 'accent'
  },
  {
    phase: 'Phase 5',
    title: 'Future Vision',
    status: 'upcoming',
    icon: Sparkles,
    items: [
      'AR/VR waste visualization',
      'Blockchain waste tracking',
      'Global circular network',
      'AI-powered city planning',
      'Carbon credit integration'
    ],
    color: 'secondary'
  }
];

const targetMetrics = [
  { label: 'Cities Connected', current: 24, target: 100 },
  { label: 'Waste Types Analyzed', current: 5, target: 20 },
  { label: 'CO₂ Reduction Target', current: 12580, target: 100000, unit: 'kg' },
  { label: 'User Engagement', current: 85, target: 95, unit: '%' }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Development Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our journey from concept to global circular economy transformation platform
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-8 lg:space-y-0">
            {roadmapPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={phase.phase}
                  className={`relative lg:flex lg:items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Content card */}
                  <div className={`lg:w-5/12 ${isLeft ? 'lg:pr-8 lg:text-right' : 'lg:pl-8'}`}>
                    <div className={`glass-panel p-6 ${
                      phase.status === 'current' ? 'border-primary/50 eco-glow' : ''
                    }`}>
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          phase.color === 'primary' ? 'bg-primary/20' :
                          phase.color === 'secondary' ? 'bg-secondary/20' :
                          'bg-accent/20'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            phase.color === 'primary' ? 'text-primary' :
                            phase.color === 'secondary' ? 'text-secondary' :
                            'text-accent'
                          }`} />
                        </div>
                        <div className={isLeft ? 'lg:text-right' : ''}>
                          <span className="text-xs text-muted-foreground">{phase.phase}</span>
                          <h3 className="font-display font-semibold text-foreground">{phase.title}</h3>
                        </div>
                      </div>
                      
                      <ul className={`space-y-2 ${isLeft ? 'lg:text-right' : ''}`}>
                        {phase.items.map((item, i) => (
                          <li key={i} className={`flex items-center gap-2 text-sm text-muted-foreground ${
                            isLeft ? 'lg:flex-row-reverse' : ''
                          }`}>
                            {phase.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            ) : phase.status === 'current' ? (
                              <Circle className="w-4 h-4 text-secondary flex-shrink-0 animate-pulse" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Status badge */}
                      <div className={`mt-4 flex ${isLeft ? 'lg:justify-end' : ''}`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          phase.status === 'completed' ? 'bg-primary/20 text-primary' :
                          phase.status === 'current' ? 'bg-secondary/20 text-secondary animate-pulse' :
                          'bg-muted/30 text-muted-foreground'
                        }`}>
                          {phase.status === 'completed' ? '✓ Completed' :
                           phase.status === 'current' ? '⚡ In Progress' :
                           '○ Upcoming'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Center node */}
                  <div className="hidden lg:flex lg:w-2/12 justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      phase.status === 'completed' ? 'bg-primary' :
                      phase.status === 'current' ? 'bg-secondary animate-pulse' :
                      'bg-muted'
                    }`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Target Metrics */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="font-display text-xl font-bold text-foreground">Target Metrics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetMetrics.map((metric) => {
              const progress = (metric.current / metric.target) * 100;
              
              return (
                <div key={metric.label} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-2xl font-display font-bold text-foreground">
                      {metric.current.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mb-1" />
                    <span className="text-lg text-primary font-semibold">
                      {metric.target.toLocaleString()}{metric.unit || ''}
                    </span>
                  </div>
                  <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-eco rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(progress, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{progress.toFixed(0)}% achieved</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
