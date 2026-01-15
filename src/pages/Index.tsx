import { useState, Suspense, useEffect, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, ChevronDown, Volume2, VolumeX, Globe } from 'lucide-react';
import Header from '@/components/Header';
import PhaseIndicator from '@/components/PhaseIndicator';
import AIAnalysisPanel from '@/components/AIAnalysisPanel';
import CircularFlowDiagram from '@/components/CircularFlowDiagram';
import SmartCityShowcase from '@/components/SmartCityShowcase';
import ImpactMetrics from '@/components/ImpactMetrics';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';
import ChatInterface, { ChatToggleButton } from '@/components/ChatInterface';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Roadmap from '@/components/Roadmap';
import ProcessFlow from '@/components/ProcessFlow';
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
        <p className="text-sm text-muted-foreground font-display">Loading 3D Environment...</p>
      </motion.div>
    </div>
  );
}

export default function Index() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [wasteInput, setWasteInput] = useState('City plastic waste problem - transform into sustainable urban infrastructure');
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const { analyzeWaste, analysis, isAnalyzing } = useGeminiAnalysis();
  const sound = useSoundEffects();

  useEffect(() => {
    if (sound.isEnabled) sound.playAmbient();
    return () => sound.stopAmbient();
  }, []);

  const handleVisualize = async () => {
    if (!wasteInput.trim()) return;
    setIsRunning(true);
    setCurrentPhase(0);
    sound.playClick();
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentPhase(1);
    sound.playTransition();
    
    await analyzeWaste(wasteInput);
    setCurrentPhase(2);
    sound.playTransition();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentPhase(3);
    sound.playTransition();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentPhase(4);
    sound.playSuccess();
    setIsRunning(false);
  };

  const toggleSound = () => sound.setEnabled(!sound.isEnabled);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Controls */}
      <motion.button onClick={toggleSound} className="fixed top-20 right-4 z-50 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        {sound.isEnabled ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
      </motion.button>

      <motion.button onClick={() => setShowGlobe(!showGlobe)} className="fixed top-20 right-16 z-50 w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Globe className={`w-5 h-5 ${showGlobe ? 'text-primary' : 'text-muted-foreground'}`} />
      </motion.button>

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
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Transform waste data into real-time 3D sustainable city visualizations.</p>
          </motion.div>
          <motion.a href="#demo" className="flex flex-col items-center gap-2 cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span className="text-sm text-muted-foreground">Scroll to Demo</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.a>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-eco">Interactive AI Demo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Enter a waste scenario and watch AI transform it into sustainable smart city infrastructure</p>
          </motion.div>

          <motion.div className="max-w-3xl mx-auto mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass-panel p-6">
              <Textarea value={wasteInput} onChange={(e) => setWasteInput(e.target.value)} placeholder="Describe a waste problem..." className="bg-muted/30 border-border/50 text-foreground placeholder:text-muted-foreground resize-none mb-4" rows={3} disabled={isRunning} />
              <Button onClick={handleVisualize} disabled={isRunning || !wasteInput.trim()} className="w-full bg-gradient-eco hover:opacity-90 text-primary-foreground font-display font-semibold py-6 text-lg">
                {isRunning ? <motion.div className="flex items-center gap-2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}><div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /><span>AI Processing...</span></motion.div> : <span className="flex items-center gap-2"><Play className="w-5 h-5" />Visualize Transformation</span>}
              </Button>
            </div>
          </motion.div>

          <div className="mb-8"><PhaseIndicator currentPhase={currentPhase} onPhaseClick={(p) => !isRunning && setCurrentPhase(p)} /></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel overflow-hidden" style={{ height: '500px' }}>
              <Suspense fallback={<Loading3D />}><CityScene phase={currentPhase} /></Suspense>
            </div>
            <div className="h-[500px]"><AIAnalysisPanel phase={currentPhase} wasteInput={wasteInput} analysis={analysis} isAnalyzing={isAnalyzing} /></div>
          </div>

          {/* Waste Type Specific 3D */}
          {currentPhase >= 2 && analysis && (
            <motion.div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass-panel overflow-hidden h-[300px]">
                <div className="p-3 border-b border-border/50">
                  <h4 className="font-display text-sm font-semibold text-foreground">Waste Type: {analysis.wasteType}</h4>
                </div>
                <div className="h-[calc(100%-45px)]">
                  <Suspense fallback={<Loading3D />}><WasteTypeVisualization wasteType={analysis.wasteType} phase={currentPhase} /></Suspense>
                </div>
              </div>
              <div className="glass-panel overflow-hidden h-[300px]">
                <Suspense fallback={<Loading3D />}><TransformAnimation phase={currentPhase} /></Suspense>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Process Flow - How it works */}
      <ProcessFlow />

      {/* Circular Flow */}
      <section id="flow" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto"><CircularFlowDiagram /></div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Smart City */}
      <SmartCityShowcase />

      {/* Roadmap */}
      <Roadmap />

      {/* Impact & Tech */}
      <ImpactMetrics />
      <TechStack />

      <Footer />

      {/* Chat */}
      <AnimatePresence>
        {showChat ? <ChatInterface onClose={() => setShowChat(false)} soundEnabled={sound.isEnabled} onToggleSound={toggleSound} /> : <ChatToggleButton onClick={() => { setShowChat(true); sound.playClick(); }} />}
      </AnimatePresence>
    </div>
  );
}
