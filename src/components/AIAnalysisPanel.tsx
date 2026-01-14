import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Leaf, Building, Recycle, CheckCircle2 } from 'lucide-react';

interface AIAnalysisPanelProps {
  phase: number;
  wasteInput: string;
  analysis: {
    wasteType: string;
    recyclability: number;
    products: string[];
    co2Saved: number;
    energySaved: number;
    circularScore: number;
  } | null;
  isAnalyzing: boolean;
}

export default function AIAnalysisPanel({ phase, wasteInput, analysis, isAnalyzing }: AIAnalysisPanelProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { icon: Brain, text: 'AI Neural Network Activated...', color: 'text-secondary' },
    { icon: Cpu, text: 'Processing Waste Composition...', color: 'text-primary' },
    { icon: Recycle, text: 'Calculating Circular Pathways...', color: 'text-accent' },
    { icon: Leaf, text: 'Optimizing Sustainability Impact...', color: 'text-primary' },
    { icon: Building, text: 'Generating Smart City Integration...', color: 'text-secondary' },
    { icon: CheckCircle2, text: 'Analysis Complete!', color: 'text-primary' },
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [isAnalyzing]);

  // Typewriter effect for analysis text
  useEffect(() => {
    if (analysis && !isAnalyzing) {
      const text = `Waste Type: ${analysis.wasteType}\nRecyclability: ${analysis.recyclability}%\nCircular Score: ${analysis.circularScore}/100`;
      let index = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [analysis, isAnalyzing]);

  return (
    <div className="glass-panel p-6 h-full overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">AI Analysis</h3>
          <p className="text-xs text-muted-foreground">Real-time Processing</p>
        </div>
      </div>

      {/* Input Display */}
      <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <p className="text-xs text-muted-foreground mb-1">Input Scenario:</p>
        <p className="text-sm text-foreground font-medium">{wasteInput || 'No input provided'}</p>
      </div>

      {/* Analysis Steps */}
      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3 mb-6"
          >
            {analysisSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: isComplete || isActive ? 1 : 0.3 
                  }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    isActive ? 'bg-primary/10 border border-primary/30' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-primary/30' : isActive ? 'bg-primary/20 animate-pulse' : 'bg-muted/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${step.color}`} />
                  </div>
                  <span className={`text-sm ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {step.text}
                  </span>
                  {isActive && (
                    <motion.div
                      className="ml-auto flex gap-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Recyclability</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-display font-bold text-primary">{analysis.recyclability}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-eco rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.recyclability}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/30">
                <p className="text-xs text-muted-foreground mb-1">Circular Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-display font-bold text-secondary">{analysis.circularScore}</span>
                  <span className="text-xs text-muted-foreground mb-1">/100</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Generated Products:</p>
              <div className="flex flex-wrap gap-2">
                {analysis.products.map((product, index) => (
                  <motion.span
                    key={product}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                  >
                    {product}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-primary/5 border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">CO₂ Saved</span>
                </div>
                <span className="text-lg font-display font-bold text-foreground">{analysis.co2Saved} kg</span>
              </div>
              <div className="p-3 rounded-lg bg-secondary/5 border border-border/30">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="text-xs text-muted-foreground">Energy Saved</span>
                </div>
                <span className="text-lg font-display font-bold text-foreground">{analysis.energySaved} kWh</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
