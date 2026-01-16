import { useState, useCallback, useRef } from 'react';

interface NarrationStep {
  phase: number;
  title: string;
  text: string;
}

const narrationSteps: NarrationStep[] = [
  {
    phase: 0,
    title: "Welcome",
    text: "Welcome to CIRCUVERSE AI. We transform waste into sustainable resources using artificial intelligence. Click 'Visualize Transformation' to begin."
  },
  {
    phase: 1,
    title: "AI Scanning",
    text: "AI is now scanning and analyzing the waste input. We identify composition, quantity, and recyclability potential using advanced machine learning algorithms."
  },
  {
    phase: 2,
    title: "Transformation",
    text: "Transformation in progress! Watch as waste materials are converted into valuable resources. Our AI calculates the optimal circular economy pathways for maximum value recovery."
  },
  {
    phase: 3,
    title: "Products Generated",
    text: "New sustainable products have been generated! These recycled materials are now ready for smart city integration, including roads, buildings, and urban infrastructure."
  },
  {
    phase: 4,
    title: "Impact Analysis",
    text: "Transformation complete! View the environmental impact: carbon emissions reduced, energy saved, and water conserved. This is the power of circular economy visualized."
  }
];

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

  return {
    isNarrating,
    enabled,
    currentNarration,
    narratePhase,
    narrateCustom,
    stop,
    toggle,
    setEnabled
  };
}
