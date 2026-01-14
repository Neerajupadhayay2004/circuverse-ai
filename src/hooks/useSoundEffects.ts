import { useRef, useEffect, useState, useCallback } from 'react';

interface SoundEffects {
  playTransition: () => void;
  playSuccess: () => void;
  playClick: () => void;
  playAmbient: () => void;
  stopAmbient: () => void;
  setEnabled: (enabled: boolean) => void;
  isEnabled: boolean;
}

export function useSoundEffects(): SoundEffects {
  const [isEnabled, setIsEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTransition = useCallback(() => {
    if (!isEnabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not available');
    }
  }, [isEnabled, getAudioContext]);

  const playSuccess = useCallback(() => {
    if (!isEnabled) return;
    
    try {
      const ctx = getAudioContext();
      
      // Play a chord
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        const startTime = ctx.currentTime + i * 0.1;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5);
      });
    } catch (e) {
      console.log('Audio not available');
    }
  }, [isEnabled, getAudioContext]);

  const playClick = useCallback(() => {
    if (!isEnabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.value = 1000;
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.log('Audio not available');
    }
  }, [isEnabled, getAudioContext]);

  const playAmbient = useCallback(() => {
    if (!isEnabled) return;
    
    try {
      const ctx = getAudioContext();
      
      if (ambientOscillatorRef.current) {
        ambientOscillatorRef.current.stop();
      }
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 60;
      
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
      
      oscillator.start();
      
      ambientOscillatorRef.current = oscillator;
      ambientGainRef.current = gainNode;
    } catch (e) {
      console.log('Audio not available');
    }
  }, [isEnabled, getAudioContext]);

  const stopAmbient = useCallback(() => {
    if (ambientOscillatorRef.current && ambientGainRef.current) {
      try {
        const ctx = getAudioContext();
        ambientGainRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
        setTimeout(() => {
          ambientOscillatorRef.current?.stop();
          ambientOscillatorRef.current = null;
        }, 1000);
      } catch (e) {
        console.log('Audio not available');
      }
    }
  }, [getAudioContext]);

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    if (!enabled) {
      stopAmbient();
    }
  }, [stopAmbient]);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopAmbient]);

  return {
    playTransition,
    playSuccess,
    playClick,
    playAmbient,
    stopAmbient,
    setEnabled,
    isEnabled
  };
}
