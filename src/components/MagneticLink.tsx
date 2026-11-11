import { useRef, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: '_blank' | '_self';
  rel?: string;
  ariaLabel?: string;
};

function MagneticLink({
  href,
  children,
  className = '',
  target,
  rel,
  ariaLabel,
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const moveWithPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    event.currentTarget.style.setProperty('--magnetic-x', `${offsetX}px`);
    event.currentTarget.style.setProperty('--magnetic-y', `${offsetY}px`);
  };

  const resetPosition = () => {
    linkRef.current?.style.setProperty('--magnetic-x', '0px');
    linkRef.current?.style.setProperty('--magnetic-y', '0px');
  };

  return (
    <a
      ref={linkRef}
      className={`magnetic-link ${className}`.trim()}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onPointerMove={moveWithPointer}
      onPointerLeave={resetPosition}
      onBlur={resetPosition}
    >
      {children}
    </a>
  );
}

export default MagneticLink;
