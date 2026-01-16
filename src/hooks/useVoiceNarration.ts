import { useState, useCallback, useRef } from 'react';

interface NarrationStep {
  phase: number;
  title: string;
  text: string;
}

const narrationSteps: NarrationStep[] = [
  {
    phase: 0,
    title: "Welcome to CIRCUVERSE",
    text: "Welcome to CIRCUVERSE AI, your intelligent circular economy visualization platform. We transform waste data into stunning 3D sustainable city simulations. Select a waste type or describe your scenario, then click Visualize Transformation to witness AI-powered recycling in action."
  },
  {
    phase: 1,
    title: "AI Analysis Phase",
    text: "Initiating AI analysis. Gemini artificial intelligence is now scanning your waste input. We're identifying material composition, contamination levels, quantity estimates, and recyclability potential. Our neural networks process over 500 material types with 94% accuracy. Analysis will complete in seconds."
  },
  {
    phase: 2,
    title: "Material Transformation",
    text: "Transformation sequence activated! Watch the 3D visualization as waste particles morph into valuable resources. Our circular economy algorithm calculates optimal pathways: reuse, repair, recycle, and redesign. Plastic becomes road material, e-waste transforms to solar panels, organic matter converts to biogas."
  },
  {
    phase: 3,
    title: "Sustainable Products",
    text: "Product generation complete! Recycled materials are now visualized as sustainable city components. See plastic roads handling urban traffic, solar panels powering buildings, eco-bricks constructing modular housing, and wind turbines generating clean energy. Each product represents real circular economy outcomes."
  },
  {
    phase: 4,
    title: "Environmental Impact",
    text: "Impact analysis finalized! Your waste transformation has achieved remarkable results: significant carbon dioxide reduction, megawatt-hours of energy recovered, and thousands of liters of water conserved. This visualization demonstrates how AI enables sustainable development aligned with SDG 11, 12, and 13. The circular economy is now visible."
  }
];

// Extended narrations for different sections
const sectionNarrations: Record<string, string> = {
  hero: "CIRCUVERSE AI visualizes the circular economy using generative AI. No IoT or hardware required. Pure artificial intelligence transforms waste data into interactive 3D sustainable city simulations.",
  problem: "The current linear economy model follows a take-make-dispose pattern, wasting 90% of resources. Only 9% of global plastic is recycled. Cities produce 70% of carbon emissions. CIRCUVERSE AI solves these problems through visualization and AI-powered insights.",
  solution: "Our solution uses Gemini AI for natural language processing, Three.js for 3D visualization, and real-time analytics to make the invisible visible. Transform any waste scenario into a sustainable smart city in under 60 seconds.",
  roadmap: "The CIRCUVERSE roadmap shows 5 key phases: Circular AI Mapping solves the linear economy problem. 3D Generative Visualization makes impact visible. Gamified Dashboard drives engagement. Smart City Integration shows real applications. Impact Analysis provides actionable insights.",
  demo: "Try the interactive demo now. Select from plastic, e-waste, organic, construction, or textile waste types. Or describe your own waste scenario. Then click Visualize Transformation to see AI in action.",
  impact: "Every transformation shows real environmental metrics: carbon dioxide saved in kilograms, energy recovered in kilowatt-hours, water conserved in liters, and sustainable products generated. These are calculated based on industry recycling standards."
};

export function useVoiceNarration() {
  const [isNarrating, setIsNarrating] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [currentNarration, setCurrentNarration] = useState<string>('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!enabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Configure voice settings
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;

    // Try to use a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Microsoft'))
    ) || voices.find(v => v.lang.includes('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsNarrating(true);
      setCurrentNarration(text);
    };

    utterance.onend = () => {
      setIsNarrating(false);
      setCurrentNarration('');
    };

    utterance.onerror = () => {
      setIsNarrating(false);
      setCurrentNarration('');
    };

    window.speechSynthesis.speak(utterance);
  }, [enabled]);

  const narratePhase = useCallback((phase: number) => {
    const step = narrationSteps.find(s => s.phase === phase);
    if (step) {
      speak(step.text);
    }
  }, [speak]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsNarrating(false);
    setCurrentNarration('');
  }, []);

  const toggle = useCallback(() => {
    if (isNarrating) {
      stop();
    }
    setEnabled(prev => !prev);
  }, [isNarrating, stop]);

  const narrateCustom = useCallback((text: string) => {
    speak(text);
  }, [speak]);

  const narrateSection = useCallback((section: string) => {
    const text = sectionNarrations[section];
    if (text) {
      speak(text);
    }
  }, [speak]);

  return {
    isNarrating,
    enabled,
    currentNarration,
    narratePhase,
    narrateCustom,
    narrateSection,
    stop,
    toggle,
    setEnabled
  };
}
