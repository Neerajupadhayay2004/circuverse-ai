import { useState, Suspense, useEffect, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, ChevronDown, Volume2, VolumeX, Globe, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import PhaseIndicator from '@/components/PhaseIndicator';
import AIAnalysisPanel from '@/components/AIAnalysisPanel';
import CircularFlowDiagram from '@/components/CircularFlowDiagram';
import SmartCityShowcase from '@/components/SmartCityShowcase';
import Footer from '@/components/Footer';
import ChatInterface, { ChatToggleButton } from '@/components/ChatInterface';
import ProblemSolution from '@/components/ProblemSolution';
import WasteTypeSelector from '@/components/WasteTypeSelector';
import RealTimeMetrics from '@/components/RealTimeMetrics';
import { useGeminiAnalysis } from '@/hooks/useGeminiAnalysis';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CityScene = lazy(() => import('@/components/3d/CityScene'));
const TransformAnimation = lazy(() => import('@/components/3d/TransformAnimation'));
const GlobalVisualization = lazy(() => import('@/components/3d/GlobalVisualization'));
const HeroBackground = lazy(() => import('@/components/3d/HeroBackground'));
const WasteTypeVisualization = lazy(() => import('@/components/3d/WasteTypeScenes'));

function Loading3D() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-card/50">
      <motion.div className="flex flex-col items-center gap-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-display">Loading 3D...</p>
      </motion.div>
    </div>
  );
}

export default function Index() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [wasteInput, setWasteInput] = useState('City has 10,000 tons of plastic waste from packaging and bottles');
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const { analyzeWaste, analysis, isAnalyzing, setAnalysis } = useGeminiAnalysis();
  const sound = useSoundEffects();

  useEffect(() => {
    if (sound.isEnabled) sound.playAmbient();
    return () => sound.stopAmbient();
  }, []);

  const handleVisualize = async () => {
    if (!wasteInput.trim()) return;
    setIsRunning(true);
    setDemoCompleted(false);
    setCurrentPhase(0);
    sound.playClick();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentPhase(1);
    sound.playTransition();
    
    await analyzeWaste(wasteInput);
    setCurrentPhase(2);
    sound.playTransition();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentPhase(3);
    sound.playTransition();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCurrentPhase(4);
    sound.playSuccess();
    setIsRunning(false);
    setDemoCompleted(true);
  };

  const handleReset = () => {
    setCurrentPhase(0);
    setDemoCompleted(false);
    setAnalysis(null);
    sound.playClick();
  };

  const handleWasteTypeSelect = (name: string, description: string) => {
    setWasteInput(description);
    sound.playClick();
  };

  const toggleSound = () => sound.setEnabled(!sound.isEnabled);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Fixed Controls */}
      <div className="fixed top-20 right-4 z-50 flex gap-2">
        <motion.button onClick={() => setShowGlobe(!showGlobe)} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Globe className={`w-5 h-5 ${showGlobe ? 'text-primary' : 'text-muted-foreground'}`} />
        </motion.button>
        <motion.button onClick={toggleSound} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {sound.isEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
        </motion.button>
      </div>

      {/* Globe Modal */}
      <AnimatePresence>
        {showGlobe && (
          <motion.div className="fixed inset-0 z-40 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGlobe(false)}>
            <motion.div className="w-full max-w-4xl h-[600px] glass-panel overflow-hidden" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-border/50">
                <h3 className="font-display text-xl font-bold text-gradient-eco">Global Circular Economy Network</h3>
              </div>
              <div className="h-[calc(100%-60px)]">
                <Suspense fallback={<Loading3D />}><GlobalVisualization phase={currentPhase} /></Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
            <HeroBackground />
          </Suspense>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div className="text-center max-w-4xl mx-auto mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/30 mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Pure AI • No IoT • Hackathon Ready</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="text-gradient-eco">CIRCUVERSE</span>
              <span className="text-foreground"> AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">Visualizing Circular Economy with Generative AI</p>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Transform waste data into real-time 3D sustainable city visualizations. AI-powered platform that enables circular innovation without hardware dependency.</p>
          </motion.div>
          <motion.a href="#solution" className="flex flex-col items-center gap-2 cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span className="text-sm text-muted-foreground">See How It Works</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.a>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <ProblemSolution />

      {/* Interactive Demo Section */}
      <section id="demo" className="py-16 min-h-screen bg-gradient-to-b from-card/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">Interactive AI Demo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Select a waste type or describe your scenario, then watch AI transform it in real-time</p>
          </motion.div>

          {/* Waste Type Selector */}
          <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <WasteTypeSelector selectedType={wasteInput} onSelect={handleWasteTypeSelect} />
          </motion.div>

          {/* Input & Controls */}
          <motion.div className="max-w-3xl mx-auto mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-panel p-6">
              <Textarea value={wasteInput} onChange={(e) => setWasteInput(e.target.value)} placeholder="Describe a waste problem..." className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground resize-none mb-4" rows={2} disabled={isRunning} />
              <div className="flex gap-3">
                <Button onClick={handleVisualize} disabled={isRunning || !wasteInput.trim()} className="flex-1 bg-gradient-eco hover:opacity-90 text-primary-foreground font-display font-semibold py-5">
                  {isRunning ? (
                    <motion.div className="flex items-center gap-2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Processing...</span>
                    </motion.div>
                  ) : (
                    <span className="flex items-center gap-2"><Play className="w-4 h-4" />Visualize Transformation</span>
                  )}
                </Button>
                {demoCompleted && (
                  <Button onClick={handleReset} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Phase Indicator */}
          <div className="mb-8"><PhaseIndicator currentPhase={currentPhase} onPhaseClick={(p) => !isRunning && setCurrentPhase(p)} /></div>

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 3D City Scene */}
            <div className="lg:col-span-2 glass-panel overflow-hidden" style={{ height: '450px' }}>
              <Suspense fallback={<Loading3D />}><CityScene phase={currentPhase} /></Suspense>
            </div>

            {/* Waste Type 3D */}
            <div className="glass-panel overflow-hidden" style={{ height: '450px' }}>
              <div className="p-3 border-b border-border/50">
                <h4 className="font-display text-sm font-semibold text-foreground">
                  {analysis ? analysis.wasteType : 'Waste Analysis'}
                </h4>
              </div>
              <div className="h-[calc(100%-45px)]">
                <Suspense fallback={<Loading3D />}>
                  <WasteTypeVisualization wasteType={analysis?.wasteType || wasteInput} phase={currentPhase} />
                </Suspense>
              </div>
            </div>

            {/* Real-Time Metrics */}
            <div className="space-y-4">
              <RealTimeMetrics isActive={currentPhase >= 3} analysis={analysis} />
              
              {/* Products Generated */}
              {analysis && currentPhase >= 3 && (
                <motion.div className="glass-panel p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h4 className="text-sm font-display font-semibold text-foreground mb-3">Products Generated</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.products.map((product, i) => (
                      <motion.span
                        key={product}
                        className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {product}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Smart City Applications */}
              {analysis && currentPhase >= 4 && analysis.smartCityApplications && (
                <motion.div className="glass-panel p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h4 className="text-sm font-display font-semibold text-foreground mb-3">Smart City Uses</h4>
                  <div className="space-y-2">
                    {analysis.smartCityApplications.slice(0, 4).map((app, i) => (
                      <motion.div
                        key={app}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {app}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Transform Animation */}
          {currentPhase >= 2 && (
            <motion.div className="mt-6 glass-panel overflow-hidden" style={{ height: '250px' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Suspense fallback={<Loading3D />}><TransformAnimation phase={currentPhase} /></Suspense>
            </motion.div>
          )}
        </div>
      </section>

      {/* Circular Flow */}
      <section id="flow" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">Circular Economy Model</h2>
            <p className="text-muted-foreground">The continuous loop that powers sustainable transformation</p>
          </motion.div>
          <div className="max-w-lg mx-auto"><CircularFlowDiagram /></div>
        </div>
      </section>

      {/* Smart City Showcase */}
      <SmartCityShowcase />

      <Footer />

      {/* Chat Bot */}
      <AnimatePresence>
        {showChat ? <ChatInterface onClose={() => setShowChat(false)} soundEnabled={sound.isEnabled} onToggleSound={toggleSound} /> : <ChatToggleButton onClick={() => { setShowChat(true); sound.playClick(); }} />}
      </AnimatePresence>
    </div>
  );
}
