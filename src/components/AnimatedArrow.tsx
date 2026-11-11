import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type AnimatedArrowProps = {
  path: string;
  viewBox: string;
  className?: string;
  duration?: number;
  delay?: number;
  label?: string;
};

function AnimatedArrow({
  path,
  viewBox,
  className = '',
  duration = 4.8,
  delay = 0,
  label,
}: AnimatedArrowProps) {
  const generatedId = useId();
  const pathId = `flow-path-${generatedId.replaceAll(':', '')}`;
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className={`animated-arrow ${className}`}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <motion.path
        id={pathId}
        d={path}
        pathLength={reduceMotion ? 1 : undefined}
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className="flow-path"
      />
      <path d={path} className="flow-trail" />
      {!reduceMotion && (
        <path d="M -7 -4 L 3 0 L -7 4 Z" className="flow-arrow-head">
          <animateMotion
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </path>
      )}
    </svg>
  );
}

export default AnimatedArrow;
