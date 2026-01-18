import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import { 
  FileText, 
  Brain, 
  Cpu, 
  Sparkles, 
  Building2, 
  BarChart3,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Layers,
  Recycle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Zap,
  Target,
  Database,
  Code2,
  Globe,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProcessVisualization3D from '@/components/3d/ProcessVisualization3D';

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  inputOutput: { input: string; output: string };
  techStack: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  color: string;
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Data Input',
    subtitle: 'Waste Problem Definition',
    description: 'User describes waste scenario through natural language or selects from predefined categories',
    details: [
      'Natural language text input',
      '5 pre-configured waste types',
      'Quantity estimation',
      'Location context (optional)',
      'Custom scenario support'
    ],
    inputOutput: {
      input: 'User text: "City has 10,000 tons of plastic waste"',
      output: 'Structured data ready for AI processing'
    },
    techStack: ['React', 'TypeScript', 'Form Validation', 'State Management'],
    metrics: [
      { label: 'Input Types', value: '6' },
      { label: 'Waste Categories', value: '5' },
      { label: 'Languages', value: 'Multi' }
    ],
    icon: FileText,
    color: 'cyan',
    duration: '0.5s'
  },
  {
    id: 2,
    title: 'AI Analysis',
    subtitle: 'Gemini Intelligence Processing',
    description: 'Gemini AI processes input to understand material composition, quantities, and recycling potential',
    details: [
      'Natural Language Processing',
      'Material composition detection',
      'Contamination level analysis',
      'Recyclability scoring',
      'Historical pattern matching'
    ],
    inputOutput: {
      input: 'Raw text description of waste',
      output: 'Extracted: type, quantity, materials, recyclability'
    },
    techStack: ['Gemini Pro API', 'NLP Engine', 'ML Classification', 'Knowledge Base'],
    metrics: [
      { label: 'Accuracy', value: '94%' },
      { label: 'Materials', value: '500+' },
      { label: 'Speed', value: '<2s' }
    ],
    icon: Brain,
    color: 'purple',
    duration: '2s'
  },
  {
    id: 3,
    title: 'Circular Transformation',
    subtitle: 'Pathway Optimization Engine',
    description: 'AI calculates optimal circular economy pathways: reuse, repair, recycle, and redesign routes',
    details: [
      'Circular pathway calculation',
      'Product transformation mapping',
      'Energy recovery estimation',
      'Smart city application matching',
      'Impact projection modeling'
    ],
    inputOutput: {
      input: 'Analyzed waste data with properties',
      output: 'Transformation pathways, products, impacts'
    },
    techStack: ['Optimization AI', 'Graph Algorithms', 'Impact Calculator', 'SDG Mapper'],
    metrics: [
      { label: 'Pathways', value: '10+' },
      { label: 'Products', value: '50+' },
      { label: 'Efficiency', value: '87%' }
    ],
    icon: Cpu,
    color: 'amber',
    duration: '1s'
  },
  {
    id: 4,
    title: '3D Visualization',
    subtitle: 'Real-time Scene Generation',
    description: 'Three.js generates dynamic 3D scenes showing waste-to-product transformation and city integration',
    details: [
      'Procedural scene building',
      'Particle system animations',
      'Waste morphing effects',
      'City infrastructure rendering',
      'Interactive camera controls'
    ],
    inputOutput: {
      input: 'Transformation data and product list',
      output: '3D animated city with sustainable elements'
    },
    techStack: ['Three.js', 'React Three Fiber', 'WebGL 2.0', 'GLSL Shaders'],
    metrics: [
      { label: 'Frame Rate', value: '60fps' },
      { label: 'Objects', value: '100+' },
      { label: 'Effects', value: '15+' }
    ],
    icon: Sparkles,
    color: 'emerald',
    duration: '2s'
  },
  {
    id: 5,
    title: 'Smart City',
    subtitle: 'Urban Infrastructure Integration',
    description: 'Visualizes how recycled materials become sustainable city components: roads, buildings, energy',
    details: [
      'Plastic roads generation',
      'Green building construction',
      'Solar panel deployment',
      'Wind turbine placement',
      'Urban forest growth'
    ],
    inputOutput: {
      input: '3D scene with transformation progress',
      output: 'Complete sustainable smart city'
    },
    techStack: ['City Models', 'Material Mapper', 'Animation Engine', 'LOD System'],
    metrics: [
      { label: 'Buildings', value: '15+' },
      { label: 'Vehicles', value: '10+' },
      { label: 'Trees', value: '50+' }
    ],
    icon: Building2,
    color: 'blue',
    duration: '2s'
  },
  {
    id: 6,
    title: 'Impact Analysis',
    subtitle: 'Environmental Metrics Dashboard',
    description: 'Calculates and displays environmental benefits: CO₂ reduction, energy savings, water conservation',
    details: [
      'CO₂ reduction calculation',
      'Energy recovery metrics',
      'Water conservation estimate',
      'Circular economy score',
      'SDG alignment mapping'
    ],
    inputOutput: {
      input: 'Complete transformation data',
      output: 'Impact dashboard, reports, projections'
    },
    techStack: ['Recharts', 'Analytics Engine', 'Report Generator', 'PDF Export'],
    metrics: [
      { label: 'Metrics', value: '12+' },
      { label: 'Charts', value: '8' },
      { label: 'Export', value: 'PDF' }
    ],
    icon: BarChart3,
    color: 'green',
    duration: '1s'
  }
];

function Loading3D() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-card/30">
      <motion.div className="flex flex-col items-center gap-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-display">Loading 3D...</p>
      </motion.div>
    </div>
  );
}

export default function FullProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= 6) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setActiveStep(step);
      }
    }, 2000);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  const colorMap: Record<string, string> = {
    cyan: 'from-cyan-500/20 to-cyan-500/10 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-500/10 border-purple-500/30',
    amber: 'from-amber-500/20 to-amber-500/10 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/10 border-emerald-500/30',
    blue: 'from-blue-500/20 to-blue-500/10 border-blue-500/30',
    green: 'from-green-500/20 to-green-500/10 border-green-500/30'
  };

  const iconColorMap: Record<string, string> = {
    cyan: 'text-cyan-500',
    purple: 'text-purple-500',
    amber: 'text-amber-500',
    emerald: 'text-emerald-500',
    blue: 'text-blue-500',
    green: 'text-green-500'
  };

  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel border border-secondary/30 mb-4 sm:mb-6">
            <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-xs sm:text-sm text-secondary font-medium">Complete Process Flow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 text-gradient-eco">
            How CIRCUVERSE AI Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            End-to-end transformation pipeline from waste input to sustainable city visualization
          </p>
        </motion.div>

        {/* 3D Process Visualization */}
        <motion.div
          className="mb-8 sm:mb-12 glass-panel overflow-hidden"
          style={{ height: '250px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="p-3 sm:p-4 border-b border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="font-display font-semibold text-foreground text-sm sm:text-base">Live Process Pipeline</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isPlaying ? "outline" : "default"}
                onClick={isPlaying ? () => setIsPlaying(false) : handlePlayDemo}
                className="gap-1 sm:gap-2 text-xs sm:text-sm h-8"
              >
                {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
                <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset} className="h-8 w-8 p-0">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
          <div className="h-[calc(100%-60px)]">
            <Suspense fallback={<Loading3D />}>
              <ProcessVisualization3D activeStep={activeStep} />
            </Suspense>
          </div>
        </motion.div>

        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.button
                key={step.id}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all text-[10px] sm:text-sm ${
                  activeStep === i 
                    ? 'bg-gradient-eco text-primary-foreground eco-glow' 
                    : activeStep > i
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                }`}
                onClick={() => setActiveStep(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium hidden sm:block">{step.title}</span>
                <span className="opacity-60 hidden md:inline">({step.duration})</span>
              </motion.button>
            );
          })}
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer ${isCurrent ? 'lg:col-span-1' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <motion.div
                  className={`glass-panel h-full overflow-hidden transition-all duration-300 ${
                    isCurrent ? 'border-primary/50 eco-glow' : isActive ? 'border-primary/20' : 'opacity-60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Header */}
                  <div className={`p-4 bg-gradient-to-r ${colorMap[step.color]} border-b border-border/30`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${iconColorMap[step.color]}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold bg-background/50 px-2 py-0.5 rounded text-foreground">
                            STEP {step.id}
                          </span>
                          <span className="text-xs text-muted-foreground">{step.duration}</span>
                        </div>
                        <h3 className="font-display font-bold text-foreground">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-2">
                      {step.details.slice(0, 3).map((detail, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-muted-foreground">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                      {step.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs bg-muted/30 px-2 py-1 rounded-full">
                          <span className="text-muted-foreground">{metric.label}:</span>
                          <span className={`font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>{metric.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {step.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Data Flow Summary */}
        <motion.div
          className="mt-8 sm:mt-12 glass-panel p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 text-gradient-eco">
            Complete Data Flow
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {['User Input', 'NLP', 'AI Analysis', 'Optimize', '3D Gen', 'Impact'].map((step, i) => (
              <motion.div key={step} className="flex items-center gap-1 sm:gap-3">
                <div className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${i <= activeStep ? 'bg-gradient-eco text-primary-foreground' : 'bg-muted/30 text-muted-foreground'}`}>
                  <span className="text-[10px] sm:text-sm font-medium">{step}</span>
                </div>
                {i < 5 && (
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
