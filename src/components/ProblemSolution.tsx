import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  Recycle,
  Building2,
  Leaf,
  Zap,
  TrendingUp
} from 'lucide-react';

const problems = [
  {
    title: 'Linear Economy Model',
    description: 'Take-Make-Dispose approach wastes 90% of resources',
    icon: XCircle
  },
  {
    title: 'Invisible Waste Impact',
    description: 'People cannot see how waste transforms into pollution',
    icon: XCircle
  },
  {
    title: 'Poor Recycling Adoption',
    description: 'Only 9% of global plastic is actually recycled',
    icon: XCircle
  },
  {
    title: 'Unsustainable Cities',
    description: 'Urban areas produce 70% of global carbon emissions',
    icon: XCircle
  }
];

const solutions = [
  {
    title: 'AI-Powered Visualization',
    description: 'See waste transform into valuable resources in real-time 3D',
    icon: Lightbulb
  },
  {
    title: 'Circular Pathway Mapping',
    description: 'AI calculates optimal reuse, repair, and recycle routes',
    icon: Recycle
  },
  {
    title: 'Smart City Integration',
    description: 'Visualize how recycled materials build sustainable infrastructure',
    icon: Building2
  },
  {
    title: 'Impact Measurement',
    description: 'Real-time CO₂, energy, and water savings calculations',
    icon: Leaf
  }
];

const methodSteps = [
  {
    step: 1,
    title: 'Waste Input',
    description: 'User describes waste problem (plastic, e-waste, organic, etc.)',
    action: 'Text input processed by NLP'
  },
  {
    step: 2,
    title: 'AI Analysis',
    description: 'Gemini AI analyzes composition, quantity, and recyclability',
    action: 'Classification & scoring'
  },
  {
    step: 3,
    title: 'Pathway Calculation',
    description: 'Circular economy routes mapped for maximum value recovery',
    action: 'Product transformation logic'
  },
  {
    step: 4,
    title: '3D Visualization',
    description: 'Real-time rendering of waste-to-resource transformation',
    action: 'Three.js + WebGL'
  },
  {
    step: 5,
    title: 'City Integration',
    description: 'Show recycled materials building smart city infrastructure',
    action: 'Dynamic scene generation'
  },
  {
    step: 6,
    title: 'Impact Report',
    description: 'Calculate and display environmental benefits achieved',
    action: 'Metrics dashboard'
  }
];

const outcomes = [
  { metric: '45%', label: 'Emission Reduction', icon: Leaf },
  { metric: '80%', label: 'Resource Recovery', icon: Recycle },
  { metric: '3x', label: 'Economic Value', icon: TrendingUp },
  { metric: '10x', label: 'Engagement Increase', icon: Zap }
];

export default function ProblemSolution() {
  return (
    <section id="solution" className="py-16">
      <div className="container mx-auto px-4">
        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Problem Side */}
          <motion.div
            className="glass-panel p-6 border-destructive/30"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">The Problem</h3>
                <p className="text-sm text-muted-foreground">Current Waste Management</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={problem.title}
                  className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{problem.title}</h4>
                    <p className="text-xs text-muted-foreground">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            className="glass-panel p-6 border-primary/30"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Our Solution</h3>
                <p className="text-sm text-muted-foreground">CIRCUVERSE AI Approach</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {solutions.map((solution, i) => {
                const Icon = solution.icon;
                return (
                  <motion.div
                    key={solution.title}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{solution.title}</h4>
                      <p className="text-xs text-muted-foreground">{solution.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Method - How We Solve It */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-center mb-8 text-gradient-eco">
            How We Solve It
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {methodSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="glass-panel p-4 text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-eco text-primary-foreground font-display font-bold flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded">{step.action}</span>
                
                {i < methodSteps.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary hidden lg:block z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expected Outcomes */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-display font-bold text-center mb-6 text-foreground">Expected Outcomes</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {outcomes.map((outcome, i) => {
              const Icon = outcome.icon;
              return (
                <motion.div
                  key={outcome.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-3xl font-display font-bold text-gradient-eco">{outcome.metric}</p>
                  <p className="text-sm text-muted-foreground">{outcome.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
