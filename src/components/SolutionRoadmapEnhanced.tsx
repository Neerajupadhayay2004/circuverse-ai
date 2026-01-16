import { motion } from 'framer-motion';
import { useState } from 'react';
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
  Users,
  Volume2,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Phase {
  id: number;
  problem: string;
  problemDetails: string[];
  solution: string;
  solutionDetails: string[];
  aiApproach: string;
  technology: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  color: string;
}

const phases: Phase[] = [
  {
    id: 1,
    problem: "Linear Economy Model",
    problemDetails: [
      "Take-Make-Dispose wastes 90% of resources",
      "Only 9% of global plastic is recycled",
      "2 billion tons of waste generated annually",
      "No visibility into waste transformation potential"
    ],
    solution: "Circular AI Mapping",
    solutionDetails: [
      "AI calculates optimal reuse, repair, recycle routes",
      "Material composition analysis via ML",
      "Zero-waste destination matching algorithm",
      "Resource recovery maximization engine"
    ],
    aiApproach: "Gemini Pro analyzes waste input text and extracts material composition, quantity, contamination levels, and recyclability scores",
    technology: ["Gemini AI", "NLP Processing", "Material Database", "Optimization Algorithm"],
    metrics: [
      { label: "Recovery Rate", value: "94%" },
      { label: "Materials Identified", value: "500+" },
      { label: "Processing Time", value: "<2s" }
    ],
    icon: Recycle,
    color: "primary"
  },
  {
    id: 2,
    problem: "Invisible Waste Impact",
    problemDetails: [
      "People cannot visualize waste-to-pollution link",
      "Abstract statistics fail to inspire action",
      "No emotional connection to environmental harm",
      "Complex data overwhelms decision makers"
    ],
    solution: "3D Generative Visualization",
    solutionDetails: [
      "Real-time WebGL rendering of transformation",
      "Before/after impact comparison",
      "Interactive city simulation with recycled materials",
      "Particle system animations showing conversion"
    ],
    aiApproach: "Three.js + React Three Fiber creates procedural 3D scenes that respond to AI analysis, showing waste morphing into sustainable products",
    technology: ["Three.js", "React Three Fiber", "WebGL", "GLSL Shaders"],
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Waste Types", value: "5 Types" },
      { label: "City Elements", value: "50+" }
    ],
    icon: Sparkles,
    color: "secondary"
  },
  {
    id: 3,
    problem: "Poor Recycling Adoption",
    problemDetails: [
      "Lack of immediate feedback on recycling impact",
      "No gamification or engagement incentives",
      "Disconnected from community efforts",
      "Boring data presentation"
    ],
    solution: "Gamified Impact Dashboard",
    solutionDetails: [
      "Real-time CO₂ savings counter with animations",
      "Energy recovery visualization",
      "Product output showcase with 3D models",
      "Community impact leaderboard (future)"
    ],
    aiApproach: "Analytics engine processes AI outputs and converts abstract numbers into engaging visual metrics that users can understand and share",
    technology: ["Recharts", "Framer Motion", "Real-time Counters", "Impact Calculator"],
    metrics: [
      { label: "Update Speed", value: "Real-time" },
      { label: "Metrics Tracked", value: "12+" },
      { label: "Visualization Types", value: "8" }
    ],
    icon: BarChart3,
    color: "primary"
  },
  {
    id: 4,
    problem: "Unsustainable Urban Growth",
    problemDetails: [
      "Cities produce 70% of global carbon emissions",
      "Traditional construction depletes resources",
      "Waste ends up in landfills, not infrastructure",
      "No connection between waste and city building"
    ],
    solution: "Smart City Integration",
    solutionDetails: [
      "Visualize plastic roads from recycled bottles",
      "Solar panels manufactured from e-waste",
      "Biogas plants from organic waste",
      "Modular eco-housing from construction debris"
    ],
    aiApproach: "City Planner AI maps recycled outputs to specific urban infrastructure needs, showing exactly how waste becomes buildings, roads, and energy",
    technology: ["3D City Models", "Material Mapping", "Infrastructure AI", "SDG Alignment"],
    metrics: [
      { label: "City Elements", value: "15+" },
      { label: "SDGs Covered", value: "3" },
      { label: "Accuracy", value: "87%" }
    ],
    icon: Building2,
    color: "secondary"
  },
  {
    id: 5,
    problem: "No Actionable Insights",
    problemDetails: [
      "Data without recommendations",
      "No clear next steps for users",
      "Missing long-term impact projections",
      "Disconnected from policy decisions"
    ],
    solution: "AI Impact Analysis & Reporting",
    solutionDetails: [
      "Complete environmental impact breakdown",
      "Projected savings over time",
      "Actionable recommendations",
      "Export-ready reports for stakeholders"
    ],
    aiApproach: "Final analysis phase aggregates all transformation data into comprehensive reports showing CO₂ saved, energy recovered, water conserved, and products generated",
    technology: ["Report Generator", "Projection Engine", "PDF Export", "Data Aggregation"],
    metrics: [
      { label: "Report Types", value: "3" },
      { label: "Projections", value: "10 Years" },
      { label: "Export Formats", value: "PDF/JSON" }
    ],
    icon: TrendingUp,
    color: "primary"
  }
];

const whyCircuverse = [
  { icon: Brain, title: "Pure AI", desc: "No IoT/hardware dependency - runs entirely on AI" },
  { icon: Globe, title: "Web-Based", desc: "Works in any browser, any device, anywhere" },
  { icon: Zap, title: "Real-Time", desc: "Instant visualization and analysis" },
  { icon: Target, title: "Hackathon Ready", desc: "Complete demo in under 60 seconds" }
];

export default function SolutionRoadmapEnhanced() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-background via-card/10 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Complete Solution Roadmap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient-eco">Problem</span>
            <span className="text-foreground"> → </span>
            <span className="text-gradient-eco">AI Solution</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            See exactly how CIRCUVERSE AI transforms every waste management challenge into a sustainable opportunity using cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Phase Timeline */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary transform md:-translate-x-1/2" />
          
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isExpanded = expandedPhase === phase.id;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={phase.id}
                className={`relative mb-12 ${isEven ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline node */}
                <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-eco flex items-center justify-center z-10 border-4 border-background`}>
                  <span className="text-primary-foreground font-display font-bold">{phase.id}</span>
                </div>
                
                {/* Content card */}
                <div className={`ml-16 md:ml-0 ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                  <motion.div
                    className={`glass-panel overflow-hidden cursor-pointer ${isExpanded ? 'border-primary/50 eco-glow' : ''}`}
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-${phase.color}/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${phase.color}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-destructive font-medium bg-destructive/10 px-2 py-0.5 rounded">PROBLEM</span>
                              <ArrowRight className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">SOLUTION</span>
                            </div>
                            <h3 className="font-display font-bold text-foreground text-lg">{phase.solution}</h3>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      {/* Metrics preview */}
                      <div className="flex gap-4 mt-4">
                        {phase.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-xs text-muted-foreground">{metric.label}:</span>
                            <span className="text-xs text-primary font-semibold">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <motion.div
                        className="border-t border-border/30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {/* Tabs */}
                        <div className="flex border-b border-border/30">
                          <button
                            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'problem' ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={(e) => { e.stopPropagation(); setActiveTab('problem'); }}
                          >
                            <AlertTriangle className="w-4 h-4 inline mr-2" />
                            Problem Details
                          </button>
                          <button
                            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'solution' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={(e) => { e.stopPropagation(); setActiveTab('solution'); }}
                          >
                            <CheckCircle2 className="w-4 h-4 inline mr-2" />
                            AI Solution
                          </button>
                        </div>

                        <div className="p-6">
                          {activeTab === 'problem' ? (
                            <div className="space-y-4">
                              <h4 className="font-display font-semibold text-destructive">{phase.problem}</h4>
                              <ul className="space-y-2">
                                {phase.problemDetails.map((detail, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                  >
                                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <h4 className="font-display font-semibold text-primary">{phase.solution}</h4>
                              <ul className="space-y-2">
                                {phase.solutionDetails.map((detail, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>

                              {/* AI Approach */}
                              <div className="mt-4 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                                <div className="flex items-center gap-2 mb-2">
                                  <Brain className="w-4 h-4 text-secondary" />
                                  <span className="text-xs font-medium text-secondary">AI APPROACH</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{phase.aiApproach}</p>
                              </div>

                              {/* Technology stack */}
                              <div className="flex flex-wrap gap-2 mt-4">
                                {phase.technology.map((tech, i) => (
                                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why CIRCUVERSE AI */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-gradient-eco mb-2">Why CIRCUVERSE AI Wins</h3>
            <p className="text-muted-foreground">Built for hackathons, designed for impact</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {whyCircuverse.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-eco flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
