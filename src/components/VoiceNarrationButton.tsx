import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceNarrationButtonProps {
  enabled: boolean;
  isNarrating: boolean;
  onToggle: () => void;
  currentNarration?: string;
}

export default function VoiceNarrationButton({ 
  enabled, 
  isNarrating, 
  onToggle,
  currentNarration 
}: VoiceNarrationButtonProps) {
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        className={`w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-colors ${
          enabled ? 'border-secondary/50 hover:border-secondary' : 'hover:border-primary/50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={enabled ? 'Disable Voice Narration' : 'Enable Voice Narration'}
      >
        {isNarrating ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Volume2 className="w-5 h-5 text-secondary" />
          </motion.div>
        ) : enabled ? (
          <Mic className="w-5 h-5 text-secondary" />
        ) : (
          <MicOff className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.button>
      
      {/* Narration Text Popup */}
      {isNarrating && currentNarration && (
        <motion.div
          className="absolute right-12 top-0 w-64 glass-panel p-3 text-xs text-muted-foreground"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-secondary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="font-display font-semibold text-secondary text-[10px]">NARRATING</span>
          </div>
          <p className="line-clamp-3">{currentNarration}</p>
        </motion.div>
      )}
    </div>
  );
}
