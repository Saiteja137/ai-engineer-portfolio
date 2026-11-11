import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.18,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}

export default ScrollProgress;
