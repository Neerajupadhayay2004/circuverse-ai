import { motion } from 'framer-motion';
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
  Recycle
} from 'lucide-react';

const processSteps = [
  {
    step: 1,
    title: 'Input Collection',
    description: 'User describes waste problem or uploads data',
    details: [
      'Text description of waste scenario',
      'Waste type classification',
      'Quantity estimation',
      'Location context'
    ],
    icon: FileText,
    color: 'primary'
  },
  {
    step: 2,
    title: 'AI Analysis',
    description: 'Gemini AI processes and understands the input',
    details: [
      'Natural language processing',
      'Waste composition analysis',
      'Pattern recognition',
      'Historical data matching'
    ],
    icon: Brain,
    color: 'secondary'
  },
  {
    step: 3,
    title: 'Circular Pathway Calculation',
    description: 'AI determines optimal recycling and reuse routes',
    details: [
      'Recyclability scoring',
      'Product transformation mapping',
      'Energy recovery calculation',
      'Smart city application matching'
    ],
    icon: Cpu,
    color: 'primary'
  },
  {
    step: 4,
    title: '3D Visualization Generation',
    description: 'Real-time 3D scene creation using Three.js',
    details: [
      'Dynamic scene building',
      'Waste-to-product morphing',
      'City infrastructure integration',
      'Animated transformations'
    ],
    icon: Sparkles,
    color: 'accent'
  },
  {
    step: 5,
    title: 'Smart City Integration',
    description: 'Visualize how recycled materials build sustainable cities',
    details: [
      'Plastic roads rendering',
      'Green building generation',
      'Solar panel deployment',
      'Urban forest growth'
    ],
    icon: Building2,
    color: 'secondary'
  },
  {
    step: 6,
    title: 'Impact Analysis',
    description: 'Calculate and display environmental benefits',
    details: [
      'CO₂ reduction metrics',
      'Energy savings calculation',
      'Water conservation estimate',
      'Circular economy score'
    ],
    icon: BarChart3,
    color: 'primary'
  }
];

const technicalStack = [
  { name: 'React 18', category: 'Frontend' },
  { name: 'Three.js / R3F', category: '3D Engine' },
  { name: 'Gemini AI', category: 'AI/ML' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Recharts', category: 'Analytics' },
  { name: 'Web Audio API', category: 'Sound' }
];

const circularPrinciples = [
  { name: 'USE', desc: 'Maximize product lifespan' },
  { name: 'REUSE', desc: 'Find new purposes for materials' },
  { name: 'REPAIR', desc: 'Fix instead of replace' },
  { name: 'RECYCLE', desc: 'Transform into new materials' },
  { name: 'REDESIGN', desc: 'Create for circularity' },
  { name: 'REPEAT', desc: 'Close the loop' }
];

export default function ProcessFlow() {
  return (
    <section id="process" className="py-16 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            How CIRCUVERSE AI Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete end-to-end process from waste input to sustainable city visualization
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;
            
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-6 mb-4">
                  {/* Step number and icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      step.color === 'primary' ? 'bg-primary/20' :
                      step.color === 'secondary' ? 'bg-secondary/20' :
                      'bg-accent/20'
                    }`}>
                      <Icon className={`w-7 h-7 ${
                        step.color === 'primary' ? 'text-primary' :
                        step.color === 'secondary' ? 'text-secondary' :
                        'text-accent'
                      }`} />
                    </div>
                    {!isLast && (
                      <div className="w-0.5 h-full min-h-[60px] bg-border/50 mt-2">
                        <motion.div
                          className="w-full bg-gradient-eco"
                          initial={{ height: 0 }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 glass-panel p-5 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded">
                        STEP {step.step}
                      </span>
                      <h3 className="font-display font-semibold text-foreground text-lg">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Architecture & Circular Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-primary" />
              <h3 className="font-display text-xl font-bold text-foreground">Technical Architecture</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {technicalStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="p-3 rounded-lg bg-muted/20 border border-border/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                  <p className="font-display font-semibold text-foreground">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Circular Principles */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="w-6 h-6 text-primary" />
              <h3 className="font-display text-xl font-bold text-foreground">Circular Economy Model</h3>
            </div>
            
            <div className="relative">
              {/* Circular flow visualization */}
              <div className="grid grid-cols-3 gap-3">
                {circularPrinciples.map((principle, i) => (
                  <motion.div
                    key={principle.name}
                    className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center relative"
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="font-display font-bold text-primary text-sm">{principle.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{principle.desc}</p>
                    {i < circularPrinciples.length - 1 && i !== 2 && (
                      <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Loop arrow */}
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-primary">
                  <Recycle className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-medium">Continuous Loop</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Key Differentiators */}
        <motion.div
          className="mt-12 glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-xl font-bold text-foreground text-center mb-6">
            Why CIRCUVERSE AI Wins
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Pure AI', desc: 'No IoT hardware costs', icon: '🤖' },
              { title: 'Visual Impact', desc: 'Judges love 3D demos', icon: '🎨' },
              { title: 'Scalable', desc: 'Works for any waste type', icon: '📈' },
              { title: 'SDG Aligned', desc: 'Goals 11, 12 & 13', icon: '🌍' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <h4 className="font-display font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
