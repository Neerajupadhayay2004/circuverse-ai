import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';
import { UserProfileButton } from './UserProfileButton';

export default function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-eco flex items-center justify-center eco-glow">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-secondary" />
              </motion.div>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-eco">
                CIRCUVERSE AI
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest">
                VISUALIZING CIRCULAR ECONOMY
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Demo
            </a>
            <a href="#flow" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Circular Flow
            </a>
            <a href="#impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Impact
            </a>
            <a href="#tech" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Technology
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">AI Active</span>
            </div>
            <UserProfileButton />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
