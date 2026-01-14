import { motion } from 'framer-motion';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-eco flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">CIRCUVERSE AI</h3>
              <p className="text-xs text-muted-foreground">Visualizing Circular Economy with AI</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Twitter className="w-5 h-5 text-muted-foreground" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin className="w-5 h-5 text-muted-foreground" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
            </motion.a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 CIRCUVERSE AI. Built for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
