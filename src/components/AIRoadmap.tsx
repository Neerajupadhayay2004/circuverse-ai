import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  Lightbulb, 
  Brain,
  Recycle,
  Building2,
  BarChart3,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Cpu
} from 'lucide-react';

// Problem-connected roadmap showing AI approach to solving each problem
const aiSolutionRoadmap = [
  {
    problem: 'Linear Economy Model',
    problemDesc: 'Take-Make-Dispose wastes 90% of resources',
    solution: 'Circular AI Mapping',
    solutionDesc: 'AI calculates optimal reuse, repair, recycle routes',
    approach: [
      'Material composition analysis via ML',
      'Circular pathway optimization algorithm',
      'Resource recovery maximization',
      'Zero-waste destination matching'
    ],
    icon: Recycle,
    aiModel: 'Gemini Pro',
    accuracy: '94%',
    status: 'active'
  },
  {
    problem: 'Invisible Waste Impact',
    problemDesc: 'People cannot see waste-to-pollution transformation',
    solution: '3D Generative Visualization',
    solutionDesc: 'Real-time WebGL rendering of transformation',
    approach: [
      'Three.js procedural 3D scenes',
      'Particle system animations',
      'Before/after impact rendering',
      'Interactive city simulation'
    ],
    icon: Sparkles,
    aiModel: 'Three.js + R3F',
    accuracy: '60 FPS',
    status: 'active'
  },
  {
    problem: 'Poor Recycling Adoption',
    problemDesc: 'Only 9% of global plastic is actually recycled',
    solution: 'Gamified Impact Dashboard',
    solutionDesc: 'Engaging metrics that inspire action',
    approach: [
      'Real-time CO₂ savings counter',
      'Energy recovery visualization',
      'Product output showcase',
      'Community impact leaderboard'
    ],
    icon: BarChart3,
    aiModel: 'Analytics Engine',
    accuracy: 'Real-time',
    status: 'active'
  },
  {
    problem: 'Unsustainable Cities',
    problemDesc: 'Urban areas produce 70% of global carbon',
    solution: 'Smart City Integration',
    solutionDesc: 'Visualize recycled materials building infrastructure',
    approach: [
      'Plastic roads & eco-bricks',
      'Solar panel from e-waste',
      'Biogas from organic waste',
      'Modular housing materials'
    ],
    icon: Building2,
    aiModel: 'City Planner AI',
    accuracy: '87%',
    status: 'active'
  }
];

const aiCapabilities = [
  { 
    title: 'Natural Language Processing', 
    desc: 'Understands waste descriptions in plain text',
    icon: Brain,
    tech: 'Gemini AI'
  },
  { 
    title: 'Computer Vision Ready', 
    desc: 'Future: Identify waste from images',
    icon: Cpu,
    tech: 'Vision API'
  },
  { 
    title: 'Generative 3D', 
    desc: 'Procedural city & transformation scenes',
    icon: Sparkles,
    tech: 'Three.js'
  },
  { 
    title: 'Real-time Analytics', 
    desc: 'Live impact calculations & projections',
    icon: Zap,
    tech: 'Custom Engine'
  }
];

export default function AIRoadmap() {
  return (
    <section id="ai-roadmap" className="py-16 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-secondary/30 mb-4">
            <Brain className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary font-medium">AI-Powered Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Problem → AI Solution Roadmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every problem has an AI-powered solution. See how CIRCUVERSE AI tackles waste management challenges.
          </p>
        </motion.div>

        {/* Problem-Solution Flow */}
        <div className="space-y-8 mb-16">
          {aiSolutionRoadmap.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.problem}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Problem Card */}
                <div className="lg:col-span-3 glass-panel p-4 border-destructive/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-xs text-destructive font-medium">PROBLEM</span>
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.problem}</h4>
                  <p className="text-xs text-muted-foreground">{item.problemDesc}</p>
                </div>

                {/* Arrow */}
                <div className="lg:col-span-1 flex justify-center">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-eco flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                </div>

                {/* AI Processing */}
                <div className="lg:col-span-2 glass-panel p-4 border-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-secondary font-medium">AI MODEL</span>
                  </div>
                  <p className="font-display font-semibold text-foreground text-sm">{item.aiModel}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-primary">{item.accuracy}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="lg:col-span-1 flex justify-center">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>

                {/* Solution Card */}
                <div className="lg:col-span-5 glass-panel p-4 border-primary/30 eco-glow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary font-medium">SOLUTION</span>
                      </div>
                      <h4 className="font-display font-semibold text-foreground text-sm mb-1">{item.solution}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.solutionDesc}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.approach.slice(0, 2).map((step, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary">
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Capabilities */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h3 className="font-display text-xl font-bold text-foreground">AI Capabilities Stack</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiCapabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  className="p-4 rounded-xl bg-muted/20 border border-border/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-eco flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm mb-1">{cap.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{cap.desc}</p>
                  <span className="text-[10px] px-2 py-1 rounded bg-secondary/20 text-secondary">{cap.tech}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
