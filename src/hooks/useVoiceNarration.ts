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
    text: "Welcome to CIRCUVERSE AI, the world's first circular economy visualization platform powered entirely by artificial intelligence. We transform waste data into stunning real-time 3D sustainable city simulations. No hardware required, no IoT sensors needed. Pure AI transforms your waste problems into sustainable solutions. Select a waste type or describe your scenario, then click Visualize Transformation to witness the power of AI-driven recycling in action."
  },
  {
    phase: 1,
    title: "AI Analysis Phase",
    text: "Initiating advanced AI analysis. Gemini Pro artificial intelligence is now scanning your waste input using natural language processing. We're identifying material composition, contamination levels, quantity estimates, and recyclability potential. Our neural networks process over 500 material types with 94% accuracy. The system evaluates circular economy pathways including reuse, repair, recycle, and redesign options. Analysis will complete in under 2 seconds."
  },
  {
    phase: 2,
    title: "Material Transformation",
    text: "Transformation sequence activated! Watch the stunning 3D visualization as waste particles morph into valuable resources. Our circular economy optimization algorithm calculates the most efficient pathways. Plastic waste transforms into durable road materials. Electronic waste converts to high-efficiency solar panels. Organic matter generates clean biogas energy. Construction debris becomes modular eco-housing. Every atom finds its sustainable destination."
  },
  {
    phase: 3,
    title: "Sustainable Products",
    text: "Product generation complete! Recycled materials are now visualized as sustainable smart city components. Observe plastic roads handling urban traffic with 40% longer lifespan. Solar panels power green buildings with zero carbon emissions. Eco-bricks construct earthquake-resistant modular housing. Wind turbines harvest renewable energy. Urban forests grow, cleaning the air and reducing temperatures. Each product represents real, achievable circular economy outcomes."
  },
  {
    phase: 4,
    title: "Environmental Impact",
    text: "Impact analysis finalized! Your waste transformation has achieved remarkable environmental results. Significant carbon dioxide reduction measured in kilograms. Megawatt-hours of clean energy recovered from waste materials. Thousands of liters of water conserved through efficient processing. This visualization demonstrates how AI enables sustainable development aligned with United Nations Sustainable Development Goals 11, 12, and 13. The circular economy is now visible, measurable, and actionable."
  }
];

// Extended narrations for different sections with more detail
const sectionNarrations: Record<string, string> = {
  hero: "Welcome to CIRCUVERSE AI, the revolutionary platform that visualizes the circular economy using generative artificial intelligence. Unlike traditional solutions requiring expensive IoT sensors and hardware infrastructure, CIRCUVERSE runs entirely on AI. This means any organization, any city, any community can transform their waste data into interactive 3D sustainable city simulations. Built for hackathons, designed for real-world impact.",
  
  problem: "The current linear economy model follows a destructive take-make-dispose pattern, wasting over 90% of our precious resources. Globally, only 9% of plastic is actually recycled. Cities produce 70% of the world's carbon emissions. The problem is invisibility. People cannot see the connection between their waste and environmental destruction. CIRCUVERSE AI solves this through powerful visualization and AI-driven insights that make the invisible visible.",
  
  solution: "Our solution combines the power of Gemini AI for natural language understanding, Three.js for breathtaking 3D visualization, and real-time analytics for actionable insights. Users describe waste scenarios in plain text. AI analyzes materials and calculates optimal recycling pathways. 3D engines render stunning transformation animations. Impact dashboards display environmental benefits. Transform any waste scenario into a sustainable smart city in under 60 seconds.",
  
  roadmap: "The CIRCUVERSE roadmap addresses 5 critical challenges with AI-powered solutions. Phase 1: Circular AI Mapping solves the linear economy problem by calculating optimal reuse and recycle routes. Phase 2: 3D Generative Visualization makes invisible waste impact tangible and emotional. Phase 3: Gamified Dashboard drives engagement through real-time metrics. Phase 4: Smart City Integration shows exactly how waste becomes infrastructure. Phase 5: Impact Analysis provides actionable recommendations and exportable reports.",
  
  process: "CIRCUVERSE follows a 6-step AI pipeline. Step 1: Data Input collects waste descriptions through natural language. Step 2: AI Analysis uses Gemini Pro to extract material composition and recyclability. Step 3: Circular Transformation calculates optimal pathways. Step 4: 3D Visualization generates real-time scenes using WebGL. Step 5: Smart City Integration places recycled products in urban context. Step 6: Impact Analysis calculates and displays environmental benefits.",
  
  demo: "Try the interactive demo now. Choose from 5 waste categories: plastic packaging and bottles, electronic waste and batteries, organic food and agricultural waste, construction and demolition debris, or textile and fashion waste. Or describe your own custom waste scenario in natural language. Then click Visualize Transformation to experience AI-powered circular economy in real-time 3D.",
  
  impact: "Every transformation displays real environmental metrics calculated using industry-standard recycling efficiency data. Carbon dioxide saved measured in kilograms based on avoided landfill emissions. Energy recovered in kilowatt-hours from waste-to-energy conversion. Water conserved in liters through efficient recycling processes. Products generated ranging from road materials to solar panels. These metrics align with UN Sustainable Development Goals for responsible consumption and climate action.",
  
  architecture: "CIRCUVERSE is built on a modern, scalable architecture. The input layer accepts natural language through React forms. The AI processing layer uses Gemini Pro for NLP and custom optimization algorithms. The visualization layer leverages Three.js and React Three Fiber for 60 frames-per-second 3D rendering. The output layer displays analytics through Recharts and generates exportable PDF reports. All running in the browser with zero server dependencies.",
  
  why: "CIRCUVERSE AI wins because of 4 key differentiators. First, Pure AI means no expensive IoT hardware costs. Second, web-based architecture works on any device, anywhere in the world. Third, real-time visualization delivers instant emotional impact that inspires action. Fourth, alignment with SDG 11, 12, and 13 demonstrates global relevance and impact potential. Perfect for hackathons, ready for production deployment."
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
    
    // Configure voice settings for professional narration
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 0.95;

    // Try to use a high-quality English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.includes('en') && (
        v.name.includes('Google') || 
        v.name.includes('Microsoft') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel')
      )
    ) || voices.find(v => v.lang.includes('en-US')) || voices.find(v => v.lang.includes('en'));
    
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
