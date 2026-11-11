import { useEffect, useRef } from 'react';

type CursorPoint = {
  x: number;
  y: number;
  angle: number;
};

const interactiveSelector =
  'a, button, .project-card, .capability, [role="button"], summary, input, select, textarea, [data-cursor="interactive"]';

const wrapAngle = (angle: number) => ((angle + 540) % 360) - 180;

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = document.documentElement;
    const mouseCapability = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const compactViewport = window.matchMedia('(max-width: 600px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cursor = cursorRef.current;
    const trails = trailRefs.current.filter((trail): trail is HTMLDivElement => trail !== null);
    if (!cursor || trails.length === 0) return;

    let enabled = false;
    let frame = 0;
    let visible = false;
    let hovered = false;
    let pressed = false;
    let lastPointerTarget: Element | null = null;
    let lastPointerTime = 0;
    const target: CursorPoint = { x: 0, y: 0, angle: -135 };
    const points: CursorPoint[] = trails.map(() => ({ ...target }));

    const renderPoint = (element: HTMLDivElement, point: CursorPoint) => {
      element.style.transform = `translate3d(${point.x - 2}px, ${point.y - 1}px, 0)`;
      const arrow = element.firstElementChild;
      if (arrow instanceof HTMLElement) {
        arrow.style.transform = `rotate(${point.angle}deg)`;
      }
    };

    const setVisibility = (nextVisible: boolean) => {
      visible = nextVisible;
      cursor.classList.toggle('is-visible', nextVisible);
      trails.forEach((trail) => trail.classList.toggle('is-visible', nextVisible));
    };

    const setHovered = (nextHovered: boolean) => {
      if (hovered === nextHovered) return;
      hovered = nextHovered;
      cursor.classList.toggle('is-interactive', nextHovered);
      trails.forEach((trail) => trail.classList.toggle('is-interactive', nextHovered));
    };

    const stopAnimation = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = (time: number) => {
      frame = 0;
      if (!enabled || !visible) return;

      const deltaTime = Math.min(time - lastPointerTime || 16, 48);
      const positionEase = 1 - Math.pow(0.78, deltaTime / 16.67);
      const angleEase = 1 - Math.pow(0.68, deltaTime / 16.67);
      let unsettled = false;

      points.forEach((point, index) => {
        const destination = index === 0 ? target : points[index - 1]!;
        const easedPosition = index === 0 ? positionEase : 1 - Math.pow(0.64 - index * 0.06, deltaTime / 16.67);
        const xDistance = destination.x - point.x;
        const yDistance = destination.y - point.y;
        const angleDistance = wrapAngle(destination.angle - point.angle);

        point.x += xDistance * easedPosition;
        point.y += yDistance * easedPosition;
        point.angle += angleDistance * angleEase;

        if (Math.abs(xDistance) > 0.08 || Math.abs(yDistance) > 0.08 || Math.abs(angleDistance) > 0.2) {
          unsettled = true;
        } else {
          point.x = destination.x;
          point.y = destination.y;
          point.angle = destination.angle;
        }

        renderPoint(index === 0 ? cursor : trails[index - 1]!, point);
      });

      lastPointerTime = time;
      if (unsettled) frame = window.requestAnimationFrame(animate);
    };

    const scheduleAnimation = () => {
      if (reducedMotion.matches || frame) return;
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled) return;
      if (event.pointerType === 'touch') {
        setVisibility(false);
        setHovered(false);
        stopAnimation();
        return;
      }

      const deltaX = event.clientX - target.x;
      const deltaY = event.clientY - target.y;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 0.5) {
        target.angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 135;
      }
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        points.forEach((point) => {
          point.x = target.x;
          point.y = target.y;
          point.angle = target.angle;
        });
        setVisibility(true);
      }

      const eventTarget = event.target;
      lastPointerTarget = eventTarget instanceof Element ? eventTarget.closest(interactiveSelector) : null;
      setHovered(lastPointerTarget !== null);

      if (reducedMotion.matches) {
        points.forEach((point, index) => {
          point.x = target.x;
          point.y = target.y;
          point.angle = index === 0 ? target.angle : point.angle;
          renderPoint(index === 0 ? cursor : trails[index - 1]!, point);
        });
      } else {
        scheduleAnimation();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!enabled || event.pointerType === 'touch') return;
      pressed = true;
      cursor.classList.add('is-pressed');
    };

    const handlePointerUp = () => {
      if (!pressed) return;
      pressed = false;
      cursor.classList.remove('is-pressed');
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget instanceof Node) return;
      setVisibility(false);
      setHovered(false);
      lastPointerTarget = null;
      handlePointerUp();
      stopAnimation();
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (!enabled || event.pointerType === 'touch') return;
      if (event.clientX === target.x && event.clientY === target.y) {
        setVisibility(true);
        if (lastPointerTarget) setHovered(true);
      }
    };

    const updateCapability = () => {
      enabled = mouseCapability.matches && !compactViewport.matches;
      root.classList.toggle('animated-cursor-active', enabled);
      cursor.classList.toggle('motion-reduced', reducedMotion.matches);

      if (!enabled) {
        setVisibility(false);
        setHovered(false);
        handlePointerUp();
        stopAnimation();
      } else if (reducedMotion.matches) {
        trails.forEach((trail) => trail.classList.add('motion-reduced'));
      } else {
        trails.forEach((trail) => trail.classList.remove('motion-reduced'));
      }
    };

    const handleMotionPreference = () => {
      updateCapability();
      if (reducedMotion.matches) {
        stopAnimation();
        trails.forEach((trail) => trail.classList.add('motion-reduced'));
      } else {
        trails.forEach((trail) => trail.classList.remove('motion-reduced'));
        if (visible) scheduleAnimation();
      }
    };

    updateCapability();
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('pointercancel', handlePointerUp, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);
    mouseCapability.addEventListener('change', updateCapability);
    compactViewport.addEventListener('change', updateCapability);
    reducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      stopAnimation();
      root.classList.remove('animated-cursor-active');
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      mouseCapability.removeEventListener('change', updateCapability);
      compactViewport.removeEventListener('change', updateCapability);
      reducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div
        className="custom-cursor-trail custom-cursor-trail-one"
        ref={(node) => {
          trailRefs.current[0] = node;
        }}
      >
        <svg viewBox="0 0 26 32" focusable="false">
          <path d="M2 1.5 22.5 18.7l-9.2.1L9 29.5 2 1.5Z" />
        </svg>
      </div>
      <div
        className="custom-cursor-trail custom-cursor-trail-two"
        ref={(node) => {
          trailRefs.current[1] = node;
        }}
      >
        <svg viewBox="0 0 26 32" focusable="false">
          <path d="M2 1.5 22.5 18.7l-9.2.1L9 29.5 2 1.5Z" />
        </svg>
      </div>
      <div className="custom-cursor" ref={cursorRef}>
        <span className="custom-cursor-glow" />
        <svg className="custom-cursor-arrow" viewBox="0 0 26 32" focusable="false">
          <path className="cursor-arrow-shadow" d="M2 1.5 22.5 18.7l-9.2.1L9 29.5 2 1.5Z" />
          <path className="cursor-arrow-fill" d="M3.3 4.5 19.1 17.8l-7 .1-3.1 8.3L3.3 4.5Z" />
          <path className="cursor-arrow-accent" d="m3.3 4.5 5.2 21.7 2.4-6.5" />
        </svg>
        <span className="custom-cursor-interaction" />
      </div>
    </div>
  );
}

export default CustomCursor;
