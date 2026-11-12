export type CursorPoint = { x: number; y: number };
type Timeline = gsap.core.Timeline;

export function appendCursorMovement(
  timeline: Timeline,
  cursor: HTMLDivElement,
  from: CursorPoint,
  to: CursorPoint,
  duration: number,
  lane: number,
  autoAlpha?: number,
) {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const distance = Math.max(Math.hypot(deltaX, deltaY), 1);
  const bend = Math.min(42, Math.max(14, distance * 0.12)) * (lane % 2 === 0 ? 1 : -1);
  const middle = {
    x: (from.x + to.x) / 2 - (deltaY / distance) * bend,
    y: (from.y + to.y) / 2 + (deltaX / distance) * bend,
  };

  timeline.to(cursor, {
    duration,
    ease: 'power2.inOut',
    ...(autoAlpha === undefined ? {} : { autoAlpha }),
    motionPath: {
      path: [from, middle, to],
      curviness: 1.1,
      autoRotate: 135,
    },
  });
}

export function appendRectangleCursorMovement(
  timeline: Timeline,
  cursor: HTMLDivElement,
  left: number,
  top: number,
  width: number,
  height: number,
  duration: number,
) {
  const points: CursorPoint[] = [
    { x: left, y: top },
    { x: left + width, y: top },
    { x: left + width, y: top + height },
    { x: left, y: top + height },
    { x: left, y: top },
  ];

  timeline.to(cursor, {
    duration,
    ease: 'none',
    motionPath: {
      path: points,
      curviness: 0,
      autoRotate: 135,
    },
  });
}
