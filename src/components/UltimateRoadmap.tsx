import { motion, AnimatePresence } from 'framer-motion';
import { useState, Suspense } from 'react';
import { 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Brain,
  Recycle,
  Building2,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  Cpu,
  Globe,
  Leaf,
  Factory,
  TrendingUp,
  Play,
  ChevronDown,
  ChevronUp,
  Eye,
  Lightbulb,
  Settings,
  Database,
  Code2,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProcessVisualization3D from '@/components/3d/ProcessVisualization3D';

interface Phase {
  id: number;
  problem: {
    title: string;
    description: string;
    stats: string;
    impact: string[];
  };
  solution: {
    title: string;
    description: string;
    approach: string[];
    technology: string[];
  };
  aiDetails: {
    model: string;
    method: string;
    accuracy: string;
    speed: string;
  };
  metrics: { label: string; value: string; icon: React.ElementType }[];
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const phases: Phase[] = [
  {
    id: 1,
    problem: {
      title: "Linear Economy Crisis",
      description: "Take-Make-Dispose model wastes 90% of global resources",
      stats: "Only 9% recycled",
      impact: [
        "2 billion tons waste annually",
        "Resources depleted faster than renewed",
        "No visibility into transformation potential",
        "Disconnected recycling ecosystem"
      ]
    },
    solution: {
      title: "Circular AI Mapping",
      description: "AI calculates optimal reuse, repair, recycle pathways",
      approach: [
        "Material composition analysis via deep learning",
        "Circular pathway optimization algorithm",
        "Zero-waste destination matching",
        "Resource recovery maximization engine"
      ],
      technology: ["Gemini Pro NLP", "Material Database", "Optimization AI", "Knowledge Graph"]
    },
    aiDetails: {
      model: "Gemini Pro",
      method: "Natural Language Processing + Material Science ML",
      accuracy: "94%",
      speed: "<2 seconds"
    },
    metrics: [
      { label: "Materials", value: "500+", icon: Database },
      { label: "Accuracy", value: "94%", icon: Target },
      { label: "Speed", value: "<2s", icon: Zap }
    ],
    icon: Recycle,
    color: "primary",
    gradient: "from-emerald-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    problem: {
      title: "Invisible Waste Impact",
      description: "People cannot visualize waste-to-pollution transformation",
      stats: "0% emotional connection",
      impact: [
        "Abstract statistics fail to inspire",
        "No emotional connection to harm",
        "Complex data overwhelms decision makers",
        "Recycling benefits remain invisible"
      ]
    },
    solution: {
      title: "3D Generative Visualization",
      description: "Real-time WebGL rendering of transformation process",
      approach: [
        "Procedural 3D scene generation",
        "Particle system animations",
        "Before/after impact comparison",
        "Interactive city simulation"
      ],
      technology: ["Three.js", "React Three Fiber", "WebGL 2.0", "GLSL Shaders"]
    },
    aiDetails: {
      model: "Three.js + R3F",
      method: "Procedural Generation + Physics Simulation",
      accuracy: "60 FPS",
      speed: "Real-time"
    },
    metrics: [
      { label: "Frame Rate", value: "60fps", icon: Eye },
      { label: "Waste Types", value: "5", icon: Layers },
      { label: "City Elements", value: "50+", icon: Building2 }
    ],
    icon: Sparkles,
    color: "secondary",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    problem: {
      title: "Poor Recycling Adoption",
      description: "Lack of engagement and immediate feedback",
      stats: "Low participation",
      impact: [
        "No gamification incentives",
        "Disconnected from community",
        "Boring data presentation",
        "No reward for eco-actions"
      ]
    },
    solution: {
      title: "Gamified Impact Dashboard",
      description: "Engaging real-time metrics that inspire action",
      approach: [
        "Real-time CO₂ savings counter with animations",
        "Energy recovery visualization",
        "Product output showcase with 3D models",
        "Community impact leaderboard"
      ],
      technology: ["Recharts", "Framer Motion", "Real-time Counters", "Impact Calculator"]
    },
    aiDetails: {
      model: "Analytics Engine",
      method: "Real-time Data Processing + Visualization",
      accuracy: "99.9%",
      speed: "Instant"
    },
    metrics: [
      { label: "Updates", value: "Real-time", icon: Zap },
      { label: "Metrics", value: "12+", icon: BarChart3 },
      { label: "Charts", value: "8 types", icon: TrendingUp }
    ],
    icon: BarChart3,
    color: "primary",
    gradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 4,
    problem: {
      title: "Unsustainable Urban Growth",
      description: "Cities produce 70% of global carbon emissions",
      stats: "70% CO₂ from cities",
      impact: [
        "Traditional construction depletes resources",
        "Waste ends in landfills, not infrastructure",
        "No connection between waste and building",
        "Linear urban development model"
      ]
    },
    solution: {
      title: "Smart City Integration",
      description: "Visualize recycled materials building infrastructure",
      approach: [
        "Plastic roads from recycled bottles",
        "Solar panels from e-waste components",
        "Biogas plants from organic waste",
        "Modular housing from construction debris"
      ],
      technology: ["3D City Models", "Material Mapping", "Infrastructure AI", "SDG Alignment"]
    },
    aiDetails: {
      model: "City Planner AI",
      method: "Urban Planning + Material Science Integration",
      accuracy: "87%",
      speed: "3 seconds"
    },
    metrics: [
      { label: "City Elements", value: "15+", icon: Building2 },
      { label: "SDGs", value: "3", icon: Globe },
      { label: "Accuracy", value: "87%", icon: Target }
    ],
    icon: Building2,
    color: "secondary",
    gradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 5,
    problem: {
      title: "No Actionable Insights",
      description: "Data without recommendations or next steps",
      stats: "Zero guidance",
      impact: [
        "Missing long-term projections",
        "Disconnected from policy decisions",
        "No clear ROI calculation",
        "Stakeholders lack convincing data"
      ]
    },
    solution: {
      title: "AI Impact Analysis & Reporting",
      description: "Complete environmental impact breakdown with projections",
      approach: [
        "Comprehensive impact analysis reports",
        "10-year savings projections",
        "Actionable recommendations",
        "Export-ready stakeholder reports"
      ],
      technology: ["Report Generator", "Projection Engine", "PDF Export", "Data Aggregation"]
    },
    aiDetails: {
      model: "Analysis Engine",
      method: "Predictive Analytics + Report Generation",
      accuracy: "92%",
      speed: "5 seconds"
    },
    metrics: [
      { label: "Reports", value: "3 types", icon: Database },
      { label: "Projection", value: "10 years", icon: TrendingUp },
      { label: "Export", value: "PDF/JSON", icon: Code2 }
    ],
    icon: TrendingUp,
    color: "primary",
    gradient: "from-green-500/20 to-emerald-500/20"
  }
];

function Loading3D() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-card/30">
      <motion.div className="flex flex-col items-center gap-3" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-display">Loading 3D Process...</p>
      </motion.div>
    </div>
  );
}

export default function UltimateRoadmap() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [activeStep, setActiveStep] = useState(0);
  const [showProcess3D, setShowProcess3D] = useState(true);

  const handlePhaseClick = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    setActiveStep(phaseId - 1);
  };

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-background via-card/10 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-6"
            animate={{ boxShadow: ['0 0 20px rgba(0,212,170,0.2)', '0 0 40px rgba(0,212,170,0.4)', '0 0 20px rgba(0,212,170,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Complete AI Solution Roadmap</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-gradient-eco">Problem</span>
            <motion.span 
              className="inline-block mx-4 text-foreground"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <span className="text-gradient-eco">AI Solution</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Every waste management challenge has an AI-powered solution. See exactly how CIRCUVERSE transforms problems into sustainable opportunities.
          </p>
        </motion.div>

        {/* 3D Process Visualization */}
        {showProcess3D && (
          <motion.div
            className="mb-12 glass-panel overflow-hidden"
            style={{ height: '350px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="p-4 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-eco flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">3D Process Pipeline</h3>
                  <p className="text-xs text-muted-foreground">Interactive visualization of the AI transformation flow</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {phases.map((phase, i) => (
                  <motion.button
                    key={phase.id}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                      activeStep >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                    onClick={() => setActiveStep(i)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="h-[calc(100%-70px)]">
              <Suspense fallback={<Loading3D />}>
                <ProcessVisualization3D activeStep={activeStep} />
              </Suspense>
            </div>
          </motion.div>
        )}

        {/* Step Labels */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Data Input', 'AI Analysis', 'Transform', '3D Generate', 'Impact'].map((label, i) => (
            <motion.button
              key={label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeStep === i 
                  ? 'bg-primary text-primary-foreground eco-glow' 
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
              onClick={() => setActiveStep(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                activeStep === i ? 'bg-primary-foreground/20' : 'bg-muted'
              }`}>
                {i + 1}
              </span>
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Phase Cards */}
        <div className="space-y-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isExpanded = expandedPhase === phase.id;
            
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`glass-panel overflow-hidden cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'border-primary/50 eco-glow' : 'hover:border-primary/30'
                  }`}
                  onClick={() => handlePhaseClick(phase.id)}
                  whileHover={{ scale: 1.005 }}
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-r ${phase.gradient}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Phase Number */}
                        <motion.div 
                          className="w-14 h-14 rounded-2xl bg-gradient-eco flex items-center justify-center flex-shrink-0"
                          animate={isExpanded ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-xl font-display font-bold text-primary-foreground">{phase.id}</span>
                        </motion.div>
                        
                        <div className="flex-1">
                          {/* Problem → Solution Labels */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 text-xs text-destructive font-medium bg-destructive/10 px-2 py-1 rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              {phase.problem.title}
                            </span>
                            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </motion.div>
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              {phase.solution.title}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground text-sm">{phase.solution.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Quick Metrics */}
                        <div className="hidden md:flex items-center gap-4">
                          {phase.metrics.map((metric, i) => {
                            const MetricIcon = metric.icon;
                            return (
                              <div key={i} className="flex items-center gap-2">
                                <MetricIcon className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                                  <p className="text-sm font-bold text-primary">{metric.value}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 border-t border-border/30">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Problem Details */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                <h4 className="font-display font-bold text-destructive">The Problem</h4>
                              </div>
                              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                                <p className="text-sm text-foreground mb-3">{phase.problem.description}</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium mb-4">
                                  <TrendingUp className="w-3 h-3" />
                                  {phase.problem.stats}
                                </div>
                                <ul className="space-y-2">
                                  {phase.problem.impact.map((item, i) => (
                                    <motion.li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.05 }}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                      {item}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* AI Solution */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-secondary" />
                                <h4 className="font-display font-bold text-secondary">AI Approach</h4>
                              </div>
                              <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="p-2 rounded-lg bg-background/50">
                                    <p className="text-xs text-muted-foreground">Model</p>
                                    <p className="text-sm font-semibold text-foreground">{phase.aiDetails.model}</p>
                                  </div>
                                  <div className="p-2 rounded-lg bg-background/50">
                                    <p className="text-xs text-muted-foreground">Accuracy</p>
                                    <p className="text-sm font-semibold text-primary">{phase.aiDetails.accuracy}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">{phase.aiDetails.method}</p>
                                <div className="flex flex-wrap gap-2">
                                  {phase.solution.technology.map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Solution Output */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <h4 className="font-display font-bold text-primary">Solution Output</h4>
                              </div>
                              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <ul className="space-y-3">
                                  {phase.solution.approach.map((item, i) => (
                                    <motion.li
                                      key={i}
                                      className="flex items-start gap-2 text-sm"
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.05 }}
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground">{item}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Why It Works */}
        <motion.div
          className="mt-16 glass-panel p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gradient-eco mb-2">Why CIRCUVERSE AI Wins</h3>
            <p className="text-muted-foreground">Built for impact, designed for hackathons</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Pure AI", desc: "No IoT/hardware costs", color: "from-purple-500 to-pink-500" },
              { icon: Globe, title: "Web-Based", desc: "Works anywhere, any device", color: "from-cyan-500 to-blue-500" },
              { icon: Zap, title: "Real-Time", desc: "Instant 3D visualization", color: "from-amber-500 to-orange-500" },
              { icon: Target, title: "SDG Aligned", desc: "Goals 11, 12 & 13", color: "from-green-500 to-emerald-500" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="text-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
