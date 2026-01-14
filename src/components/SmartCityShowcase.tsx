import { motion } from 'framer-motion';
import { Building2, TreePine, Zap, Droplets, Wind, Sun, Car, Home } from 'lucide-react';

const cityFeatures = [
  {
    icon: Building2,
    title: 'Recycled Buildings',
    description: 'Structures made from plastic waste composites',
    color: 'primary',
  },
  {
    icon: TreePine,
    title: 'Green Corridors',
    description: 'Urban forests powered by organic waste compost',
    color: 'primary',
  },
  {
    icon: Zap,
    title: 'Waste-to-Energy',
    description: 'Power generation from non-recyclable waste',
    color: 'secondary',
  },
  {
    icon: Droplets,
    title: 'Water Recycling',
    description: 'Closed-loop water management systems',
    color: 'secondary',
  },
  {
    icon: Wind,
    title: 'Clean Air Zones',
    description: 'Zero-emission districts with air purification',
    color: 'accent',
  },
  {
    icon: Car,
    title: 'Plastic Roads',
    description: 'Highways built with recycled plastic asphalt',
    color: 'primary',
  },
  {
    icon: Home,
    title: 'Modular Housing',
    description: 'Affordable homes from recycled materials',
    color: 'secondary',
  },
  {
    icon: Sun,
    title: 'Solar Integration',
    description: 'E-waste recycled into solar infrastructure',
    color: 'accent',
  },
];

export default function SmartCityShowcase() {
  return (
    <section id="city" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">
            Smart City Integration
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-generated sustainable urban infrastructure powered by circular economy principles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="glass-panel p-5 hover:border-primary/50 transition-all cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  feature.color === 'primary' ? 'bg-primary/20' :
                  feature.color === 'secondary' ? 'bg-secondary/20' :
                  'bg-accent/20'
                } group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'secondary' ? 'text-secondary' :
                    'text-accent'
                  }`} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
