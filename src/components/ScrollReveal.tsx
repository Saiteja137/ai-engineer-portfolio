import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className={`scroll-reveal ${revealed ? 'is-visible' : ''} ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => setRevealed(true)}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
