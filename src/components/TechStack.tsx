import { motion } from 'framer-motion';
import { Brain, Cpu, Box, Sparkles, Globe, BarChart3 } from 'lucide-react';

const technologies = [
  {
    icon: Brain,
    layer: 'Reasoning AI',
    tech: 'Large Language Models',
    description: 'Advanced NLP for waste classification and circular pathway planning',
  },
  {
    icon: Box,
    layer: '3D Generation',
    tech: 'Diffusion + NeRF',
    description: 'Photorealistic 3D asset generation from text descriptions',
  },
  {
    icon: Sparkles,
    layer: 'Animation',
    tech: 'Sora / Runway-style',
    description: 'Cinematic transformation sequences and morphing effects',
  },
  {
    icon: Globe,
    layer: 'Visualization',
    tech: 'WebGL / Three.js',
    description: 'Interactive 3D smart city environments in browser',
  },
  {
    icon: BarChart3,
    layer: 'Simulation',
    tech: 'AI Estimations',
    description: 'Real-time environmental impact calculations',
  },
  {
    icon: Cpu,
    layer: 'Inference',
    tech: 'Edge Computing',
    description: 'Low-latency processing for real-time interactions',
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Technology Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pure AI architecture - No IoT hardware required. Scalable, cost-effective, and ready for deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.layer}
                className="glass-panel p-6 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{tech.layer}</p>
                      <h3 className="font-display font-semibold text-foreground">{tech.tech}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* USP Badges */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            '✅ Pure AI (No IoT Cost)',
            '✅ Visual Storytelling',
            '✅ Scalable for Any Waste',
            '✅ Smart Cities + SDG Ready',
            '✅ Policy & Industry Ready',
          ].map((usp) => (
            <div
              key={usp}
              className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-center"
            >
              <span className="text-sm font-medium text-foreground">{usp}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
