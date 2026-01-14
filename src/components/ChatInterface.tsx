import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const aiResponses: Record<string, string> = {
  'plastic': `🔄 **Plastic Waste Analysis**

Plastic waste has incredible circular potential! Here's what AI can transform it into:

• **Roads**: Plastic-modified asphalt is 10x more durable
• **Eco-bricks**: Building blocks from compressed plastic
• **Urban furniture**: Benches, bins, playground equipment
• **Insulation**: Thermal panels for green buildings

💡 1 ton of recycled plastic saves 5,774 kWh of energy!`,

  'circular': `♻️ **Circular Economy Explained**

The circular economy follows 6 key principles:

1. **USE** - Maximize product lifespan
2. **REUSE** - Find new purposes
3. **REPAIR** - Fix instead of replace
4. **RECYCLE** - Transform into new materials
5. **REDESIGN** - Create for circularity
6. **REPEAT** - Close the loop

This model can reduce global emissions by 45%!`,

  'smart city': `🏙️ **Smart City Integration**

AI-powered sustainable cities include:

• **Plastic Roads** - 80% recycled material highways
• **Green Corridors** - Urban forests from organic waste
• **Waste-to-Energy** - Power plants using non-recyclables
• **Modular Housing** - Affordable homes from recycled materials
• **Solar Integration** - E-waste recycled into solar panels

These cities reduce waste by 90% and emissions by 70%!`,

  'default': `🌍 **CIRCUVERSE AI Assistant**

I can help you understand:

• Circular economy principles
• Waste transformation technologies
• Smart city innovations
• Environmental impact metrics
• SDG alignment

Try asking about "plastic waste", "circular economy", or "smart cities"!`
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('plastic')) {
    return aiResponses['plastic'];
  } else if (lowerMessage.includes('circular') || lowerMessage.includes('economy')) {
    return aiResponses['circular'];
  } else if (lowerMessage.includes('city') || lowerMessage.includes('smart') || lowerMessage.includes('urban')) {
    return aiResponses['smart city'];
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what')) {
    return aiResponses['default'];
  } else {
    return `🤖 Great question about "${message}"!

Based on circular economy principles, I can analyze how this relates to:

• **Waste reduction** strategies
• **Resource recovery** opportunities  
• **Smart city** applications
• **Environmental impact** calculations

The AI transformation engine can visualize this scenario in 3D. Would you like me to elaborate on any specific aspect?`;
  }
}

interface ChatInterfaceProps {
  onClose?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function ChatInterface({ onClose, soundEnabled, onToggleSound }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Welcome to **CIRCUVERSE AI**!

I'm your circular economy assistant. I can help you understand:

• How waste transforms into value
• Smart city innovations
• Environmental impact metrics
• Circular economy principles

What would you like to explore?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Play sound effect
  const playSound = (type: 'send' | 'receive') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'send') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      } else {
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      }
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      console.log('Audio not available');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    playSound('send');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = getAIResponse(input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
    playSound('receive');
  };

  const quickActions = [
    'How does plastic recycling work?',
    'Explain circular economy',
    'Smart city innovations',
    'Environmental impact'
  ];

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] glass-panel flex flex-col z-50 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-eco flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">AI Assistant</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSound}
            className="h-8 w-8"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-secondary/20' 
                  : 'bg-primary/20'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-secondary" />
                ) : (
                  <Sparkles className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-secondary/20 rounded-tr-sm'
                  : 'bg-muted/30 rounded-tl-sm'
              }`}>
                <p className="text-sm text-foreground whitespace-pre-wrap"
                   dangerouslySetInnerHTML={{ 
                     __html: message.content
                       .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
                       .replace(/\n/g, '<br/>')
                   }}
                />
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted/30 p-3 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => setInput(action)}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about circular economy..."
            className="flex-1 bg-muted/30 border-border/50"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-eco hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Chat Toggle Button
export function ChatToggleButton({ onClick, hasUnread }: { onClick: () => void; hasUnread?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-eco flex items-center justify-center eco-glow z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground" />
      {hasUnread && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
          1
        </span>
      )}
    </motion.button>
  );
}
