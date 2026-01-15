import { motion } from 'framer-motion';
import { Recycle, Cpu, Leaf, Building2, Shirt } from 'lucide-react';

interface WasteTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string, description: string) => void;
}

const wasteTypes = [
  {
    id: 'plastic',
    name: 'Plastic Waste',
    icon: Recycle,
    description: 'City has 10,000 tons of plastic waste from packaging and bottles',
    color: 'primary',
    outputs: ['Plastic Roads', 'Eco-Bricks', 'Urban Furniture', 'Drainage Pipes']
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    icon: Cpu,
    description: 'Electronic waste including old phones, computers and circuit boards',
    color: 'secondary',
    outputs: ['Solar Panels', 'Smart Sensors', 'EV Batteries', 'Precious Metals']
  },
  {
    id: 'organic',
    name: 'Organic Waste',
    icon: Leaf,
    description: 'Food waste and agricultural residue from urban markets',
    color: 'primary',
    outputs: ['Biogas', 'Compost', 'Bio-fertilizer', 'Bioplastics']
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: Building2,
    description: 'Demolition debris including concrete, bricks and metals',
    color: 'accent',
    outputs: ['Road Base', 'Concrete Blocks', 'Recycled Aggregate', 'Landscaping']
  },
  {
    id: 'textile',
    name: 'Textile Waste',
    icon: Shirt,
    description: 'Discarded clothing and fabric from fashion industry',
    color: 'secondary',
    outputs: ['Insulation', 'Cleaning Rags', 'Acoustic Panels', 'Recycled Fiber']
  }
];

export default function WasteTypeSelector({ selectedType, onSelect }: WasteTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {wasteTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType.toLowerCase().includes(type.id);
        
        return (
          <motion.button
            key={type.id}
            onClick={() => onSelect(type.name, type.description)}
            className={`p-4 rounded-xl border transition-all text-left ${
              isSelected 
                ? 'bg-primary/20 border-primary/50 eco-glow' 
                : 'glass-panel hover:border-primary/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${
              type.color === 'primary' ? 'bg-primary/20' :
              type.color === 'secondary' ? 'bg-secondary/20' :
              'bg-accent/20'
            }`}>
              <Icon className={`w-5 h-5 ${
                type.color === 'primary' ? 'text-primary' :
                type.color === 'secondary' ? 'text-secondary' :
                'text-accent'
              }`} />
            </div>
            <h4 className="font-display font-semibold text-foreground text-sm mb-1">{type.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{type.description}</p>
            
            {isSelected && (
              <motion.div
                className="mt-3 flex flex-wrap gap-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {type.outputs.slice(0, 2).map((output) => (
                  <span key={output} className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary">
                    {output}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export { wasteTypes };
