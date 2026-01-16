import { motion } from 'framer-motion';
import { 
  Database,
  Brain,
  Cpu,
  Globe,
  Layers,
  Zap,
  Code2,
  Server,
  MonitorPlay,
  Workflow,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const architectureLayers = [
  {
    layer: "Input Layer",
    icon: MonitorPlay,
    color: "from-destructive/20 to-destructive/10",
    borderColor: "border-destructive/30",
    components: [
      { name: "Text Input", desc: "Natural language waste descriptions" },
      { name: "Waste Type Selector", desc: "5 pre-configured waste categories" },
      { name: "Voice Commands", desc: "Speech-to-text input (future)" }
    ]
  },
  {
    layer: "AI Processing Layer",
    icon: Brain,
    color: "from-secondary/20 to-secondary/10",
    borderColor: "border-secondary/30",
    components: [
      { name: "Gemini AI", desc: "NLP & material analysis" },
      { name: "Transformation Engine", desc: "Circular pathway optimization" },
      { name: "Impact Calculator", desc: "Environmental metrics computation" }
    ]
  },
  {
    layer: "Visualization Layer",
    icon: Layers,
    color: "from-primary/20 to-primary/10",
    borderColor: "border-primary/30",
    components: [
      { name: "Three.js / R3F", desc: "3D scene rendering" },
      { name: "Particle Systems", desc: "Transformation animations" },
      { name: "City Simulator", desc: "Smart city 3D model" }
    ]
  },
  {
    layer: "Output Layer",
    icon: Zap,
    color: "from-primary/20 to-primary/10",
    borderColor: "border-primary/30",
    components: [
      { name: "Analytics Dashboard", desc: "Real-time impact metrics" },
      { name: "Product Showcase", desc: "Generated sustainable products" },
      { name: "Report Generator", desc: "Exportable impact reports" }
    ]
  }
];

const techStack = [
  { name: "React 18", category: "Frontend", icon: Code2 },
  { name: "TypeScript", category: "Language", icon: Code2 },
  { name: "Three.js", category: "3D Engine", icon: Layers },
  { name: "React Three Fiber", category: "React + 3D", icon: Layers },
  { name: "Framer Motion", category: "Animations", icon: Workflow },
  { name: "Tailwind CSS", category: "Styling", icon: MonitorPlay },
  { name: "Gemini AI", category: "AI/ML", icon: Brain },
  { name: "Web Speech API", category: "Voice", icon: Globe },
  { name: "Recharts", category: "Charts", icon: Database },
  { name: "Vite", category: "Build Tool", icon: Zap }
];

const dataFlow = [
  { step: "User Input", icon: MonitorPlay, desc: "Waste description via text/selection" },
  { step: "AI Analysis", icon: Brain, desc: "Gemini extracts materials & quantities" },
  { step: "Transformation", icon: Cpu, desc: "Circular pathways calculated" },
  { step: "3D Rendering", icon: Layers, desc: "Real-time visualization generated" },
  { step: "Impact Output", icon: Zap, desc: "Metrics & products displayed" }
];

export default function TechArchitecture() {
  return (
    <section id="architecture" className="py-20 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-secondary/30 mb-6">
            <Cpu className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">Technical Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient-eco">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Complete technical breakdown of CIRCUVERSE AI's architecture, data flow, and technology stack.
          </p>
        </motion.div>

        {/* Data Flow */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-center mb-8 text-foreground">Data Flow Pipeline</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {dataFlow.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="glass-panel p-4 text-center min-w-[140px]">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-eco flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="text-sm font-display font-semibold text-foreground">{item.step}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  {i < dataFlow.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Architecture Layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {architectureLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.layer}
                className={`glass-panel overflow-hidden ${layer.borderColor}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`p-4 bg-gradient-to-b ${layer.color}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h4 className="font-display font-bold text-foreground">{layer.layer}</h4>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {layer.components.map((comp, j) => (
                    <div key={comp.name} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{comp.name}</p>
                        <p className="text-xs text-muted-foreground">{comp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-center mb-8 text-gradient-eco">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  className="p-4 rounded-xl bg-muted/20 border border-border/30 text-center hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-display font-semibold text-foreground">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
