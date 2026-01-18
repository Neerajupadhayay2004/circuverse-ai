import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, Volume2, VolumeX, Loader2, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        onError("Rate limit exceeded. Please wait a moment.");
        return;
      }
      if (resp.status === 402) {
        onError("AI credits exhausted.");
        return;
      }
      onError(errorData.error || "Failed to connect to AI");
      return;
    }

    if (!resp.body) {
      onError("No response stream");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    onError("Connection failed. Please try again.");
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
      content: `🌍 **Welcome to CIRCUVERSE AI!**

I'm your intelligent circular economy assistant powered by Gemini AI.

I can help you understand:
• ♻️ How waste transforms into valuable products
• 🏙️ Smart city innovations using recycled materials
• 📊 Environmental impact metrics and SDG alignment
• 💡 Circular economy principles and best practices

**What would you like to explore?**`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const playSound = useCallback((type: 'send' | 'receive') => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'send') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      } else {
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      }
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch {
      // Audio not available
    }
  }, [soundEnabled]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    playSound('send');
    setIsTyping(true);

    let assistantSoFar = "";
    
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id.startsWith("streaming-")) {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { 
          id: `streaming-${Date.now()}`, 
          role: "assistant", 
          content: assistantSoFar,
          timestamp: new Date()
        }];
      });
    };

    const conversationHistory = [...messages, userMessage].map(m => ({
      role: m.role,
      content: m.content
    }));

    await streamChat({
      messages: conversationHistory,
      onDelta: upsertAssistant,
      onDone: () => {
        setIsTyping(false);
        playSound('receive');
        setIsConnected(true);
      },
      onError: (error) => {
        setIsTyping(false);
        setIsConnected(false);
        toast.error(error);
        
        setMessages(prev => [...prev, {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ ${error}\n\nPlease try again or ask me about circular economy topics!`,
          timestamp: new Date()
        }]);
      }
    });
  };

  const quickActions = [
    'How does plastic recycling work?',
    'Explain circular economy',
    'Smart city innovations',
    'Environmental impact of e-waste'
  ];

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] sm:h-[600px] max-h-[calc(100vh-6rem)] glass-panel flex flex-col z-50 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-eco flex items-center justify-center"
            animate={{ boxShadow: isConnected ? ['0 0 10px rgba(0,212,170,0.3)', '0 0 20px rgba(0,212,170,0.5)', '0 0 10px rgba(0,212,170,0.3)'] : 'none' }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm sm:text-base">Gemini AI Assistant</h3>
            <div className="flex items-center gap-1">
              {isConnected ? (
                <>
                  <Wifi className="w-3 h-3 text-primary" />
                  <span className="text-[10px] sm:text-xs text-primary">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-destructive" />
                  <span className="text-[10px] sm:text-xs text-destructive">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleSound} className="h-7 w-7 sm:h-8 sm:w-8">
            {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 sm:h-8 sm:w-8">
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.role === 'user' ? 'bg-secondary/20' : 'bg-primary/20'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                ) : (
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                )}
              </div>
              <div className={`max-w-[85%] p-2.5 sm:p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-secondary/20 rounded-tr-sm'
                  : 'bg-muted/30 rounded-tl-sm'
              }`}>
                <p className="text-xs sm:text-sm text-foreground whitespace-pre-wrap"
                   dangerouslySetInnerHTML={{ 
                     __html: message.content
                       .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
                       .replace(/\n/g, '<br/>')
                   }}
                />
                <span className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="bg-muted/30 p-2.5 sm:p-3 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-primary" />
                <span className="text-xs sm:text-sm text-muted-foreground">Gemini is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-3 sm:px-4 pb-2">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => setInput(action)}
                className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about circular economy..."
            className="flex-1 bg-muted/30 border-border/50 text-sm"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-eco hover:opacity-90"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ChatToggleButton({ onClick, hasUnread }: { onClick: () => void; hasUnread?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-eco flex items-center justify-center eco-glow z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
      {hasUnread && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
          1
        </span>
      )}
    </motion.button>
  );
}
