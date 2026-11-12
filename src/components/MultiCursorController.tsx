import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { cursorAnimationConfig } from '../animations/cursorAnimationConfig';
import AnimatedCursor from './AnimatedCursor';
import { appendCursorMovement, appendRectangleCursorMovement, type CursorPoint } from './CursorTimeline';
import DrawRectangle from './DrawRectangle';
import { appendTextPrintReveal } from './TextPrintReveal';

gsap.registerPlugin(MotionPathPlugin);

type TargetSection = (typeof cursorAnimationConfig.sections)[number];
type CursorLayerRefs = {
  cursors: Array<HTMLDivElement | null>;
  outlines: Array<SVGSVGElement | null>;
  rectangles: Array<SVGRectElement | null>;
  layer: HTMLDivElement | null;
};
type TargetAnimationPlan = {
  target: HTMLElement;
  cursor: HTMLDivElement;
  outline: SVGSVGElement;
  rectangle: SVGRectElement;
  lane: number;
  start: CursorPoint;
  textPoint: CursorPoint;
  moveAway: CursorPoint;
  perimeter: number;
  width: number;
  height: number;
};

const getSectionTargets = (section: HTMLElement, config: TargetSection) => {
  const selector = config.selectors.join(',');

  return [...section.querySelectorAll<HTMLElement>(selector)].filter((target) => {
    const bounds = target.getBoundingClientRect();
    return (
      Boolean(target.textContent?.trim()) &&
      bounds.width > 0 &&
      bounds.height > 0 &&
      !target.closest('[aria-hidden="true"], .multi-cursor-layer, .skip-link') &&
      !target.parentElement?.closest(selector)
    );
  });
};

function MultiCursorController() {
  const refs = useRef<CursorLayerRefs>({
    cursors: [],
    outlines: [],
    rectangles: [],
    layer: null,
  });

  useEffect(() => {
    const root = document.documentElement;
    const desktopPointer = window.matchMedia(
      '(min-width: 601px) and (hover: hover) and (pointer: fine)',
    );
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cursors = refs.current.cursors.filter(
      (cursor): cursor is HTMLDivElement => cursor !== null,
    );
    const outlineTemplates = refs.current.outlines.filter(
      (outline): outline is SVGSVGElement => outline !== null,
    );
    const rectangles = refs.current.rectangles.filter(
      (rectangle): rectangle is SVGRectElement => rectangle !== null,
    );
    const layer = refs.current.layer;

    if (!layer || !desktopPointer.matches || reducedMotion.matches) return;

    let stopped = false;
    let timer: number | undefined;
    let resolveWait: (() => void) | null = null;
    let activeTimeline: gsap.core.Timeline | null = null;
    let resolveActiveTimeline: (() => void) | null = null;
    const cursorPositions: Array<CursorPoint | null> = cursorAnimationConfig.cursors.map(
      () => null,
    );
    const allTargets = '.cursor-print-target, .cursor-print-complete';

    const revealTarget = (target: HTMLElement) => {
      target.style.removeProperty('clip-path');
      target.classList.remove('cursor-print-target');
      target.classList.add('cursor-print-complete');
    };

    const removeGeneratedOutlines = () => {
      layer.querySelectorAll('.print-outline.is-generated').forEach((outline) => outline.remove());
    };

    const revealEverything = () => {
      document.querySelectorAll<HTMLElement>(allTargets).forEach(revealTarget);
      removeGeneratedOutlines();
      root.classList.remove('portfolio-writing');
      gsap.set(cursors, { autoAlpha: 0 });
      gsap.set(outlineTemplates, { autoAlpha: 0 });
    };

    const stopAnimation = () => {
      if (stopped) return;
      stopped = true;
      if (timer !== undefined) window.clearTimeout(timer);
      resolveWait?.();
      resolveWait = null;
      activeTimeline?.kill();
      activeTimeline = null;
      resolveActiveTimeline?.();
      resolveActiveTimeline = null;
      removeListeners();
      revealEverything();
    };

    const handlePreferenceChange = () => {
      if (!desktopPointer.matches || reducedMotion.matches) stopAnimation();
    };

    const wait = (milliseconds: number) =>
      new Promise<boolean>((resolve) => {
        timer = window.setTimeout(() => {
          timer = undefined;
          resolveWait = null;
          resolve(!stopped);
        }, milliseconds);
        resolveWait = () => {
          resolveWait = null;
          resolve(false);
        };
      });

    const awaitTimeline = (timeline: gsap.core.Timeline) =>
      new Promise<boolean>((resolve) => {
        activeTimeline = timeline;
        resolveActiveTimeline = () => resolve(false);
        timeline.eventCallback('onComplete', () => {
          activeTimeline = null;
          resolveActiveTimeline = null;
          resolve(!stopped);
        });
        timeline.play(0);
      });

    const getEntryPoint = (lane: number): CursorPoint => ({
      x: lane % 2 === 0 ? -24 : window.innerWidth + 24,
      y: window.innerHeight * (0.12 + (lane % 3) * 0.34),
    });

    const prepareTarget = (target: HTMLElement, lane: number): TargetAnimationPlan => {
      const cursor = cursors[lane]!;
      const template = outlineTemplates[lane]!;
      const templateRect = rectangles[lane]!;
      const outline = template.cloneNode(true) as SVGSVGElement;
      const rectangle = outline.querySelector('rect')!;
      const bounds = target.getBoundingClientRect();
      const padding = cursorAnimationConfig.boxPadding;
      const box = {
        left: bounds.left - padding,
        top: bounds.top - padding,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2,
      };
      const border = {
        left: padding + 1,
        top: padding + 1,
        width: box.width - 2,
        height: box.height - 2,
      };
      const start = { x: bounds.left + border.left, y: bounds.top + border.top };
      const textPoint = {
        x: bounds.left + Math.min(bounds.width * 0.12, 16),
        y: bounds.top + bounds.height / 2,
      };
      const moveAway = {
        x: Math.max(12, Math.min(bounds.right + padding + 14, window.innerWidth - 22)),
        y: Math.max(12, Math.min(bounds.bottom + padding + 14, window.innerHeight - 24)),
      };
      const perimeter = 2 * (border.width + border.height);

      outline.classList.add('is-generated');
      outline.setAttribute('width', String(box.width));
      outline.setAttribute('height', String(box.height));
      outline.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      outline.style.color = template.style.color;
      rectangle.setAttribute('x', String(border.left));
      rectangle.setAttribute('y', String(border.top));
      rectangle.setAttribute('width', String(border.width));
      rectangle.setAttribute('height', String(border.height));
      rectangle.setAttribute('stroke-dasharray', String(perimeter));
      rectangle.setAttribute('stroke-dashoffset', String(perimeter));
      layer.append(outline);
      gsap.set(outline, {
        x: bounds.left + window.scrollX - padding,
        y: bounds.top + window.scrollY - padding,
        autoAlpha: 0,
      });
      gsap.set(template, { autoAlpha: 0 });
      gsap.set(templateRect, { attr: { 'stroke-dashoffset': perimeter } });

      return {
        target,
        cursor,
        outline,
        rectangle,
        lane,
        start,
        textPoint,
        moveAway,
        perimeter,
        width: border.width,
        height: border.height,
      };
    };

    const getSectionElement = (sectionConfig: TargetSection) =>
      sectionConfig.id === 'topbar'
        ? document.querySelector<HTMLElement>('.topbar')
        : sectionConfig.id === 'footer'
          ? document.querySelector<HTMLElement>('.footer')
          : document.getElementById(sectionConfig.id);

    const scrollToVisibleTargets = async (
      section: HTMLElement,
      sectionConfig: TargetSection,
      pending: Set<HTMLElement>,
    ) => {
      const visible = [...pending].filter((target) => {
        const bounds = target.getBoundingClientRect();
        const topInset = sectionConfig.id === 'topbar' ? 0 : 72;
        return bounds.top < window.innerHeight - 56 && bounds.bottom > topInset;
      });

      if (visible.length > 0) return visible.slice(0, cursorAnimationConfig.cursors.length);

      const nextTarget = pending.values().next().value as HTMLElement | undefined;
      if (!nextTarget) return [];
      if (sectionConfig.id === 'topbar') {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        nextTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      await wait(cursorAnimationConfig.timings.targetScroll * 1000);
      return [];
    };

    const animateTargetBatch = async (targets: HTMLElement[]) => {
      const plans = targets.map((target, lane) => prepareTarget(target, lane));
      const timeline = gsap.timeline({ paused: true });

      plans.forEach((plan) => {
        const {
          cursor,
          outline,
          rectangle,
          target,
          start,
          textPoint,
          moveAway,
          lane,
          width,
          height,
          perimeter,
        } = plan;
        const laneTimeline = gsap.timeline();
        const previousPosition = cursorPositions[lane];

        if (previousPosition === null) {
          const entry = getEntryPoint(lane);
          const staging = {
            x: Math.max(12, Math.min(start.x - 26, window.innerWidth - 28)),
            y: Math.max(12, Math.min(start.y - 20, window.innerHeight - 28)),
          };
          gsap.set(cursor, { x: entry.x, y: entry.y, rotation: 0, autoAlpha: 0 });
          appendCursorMovement(
            laneTimeline,
            cursor,
            entry,
            staging,
            cursorAnimationConfig.timings.enter,
            lane,
            1,
          );
          appendCursorMovement(
            laneTimeline,
            cursor,
            staging,
            start,
            cursorAnimationConfig.timings.move,
            lane,
          );
        } else {
          appendCursorMovement(
            laneTimeline,
            cursor,
            previousPosition,
            plan.start,
            cursorAnimationConfig.timings.nextTarget,
            lane,
            1,
          );
        }

        const drawStart = laneTimeline.duration();
        laneTimeline.to(outline, { autoAlpha: 1, duration: 0.04 }, drawStart);
        appendRectangleCursorMovement(
          laneTimeline,
          cursor,
          start.x,
          start.y,
          width,
          height,
          cursorAnimationConfig.timings.rectangle,
        );
        laneTimeline.to(
          rectangle,
          {
            attr: { 'stroke-dashoffset': 0 },
            duration: cursorAnimationConfig.timings.rectangle,
            ease: 'none',
          },
          drawStart,
        );
        appendCursorMovement(
          laneTimeline,
          cursor,
          start,
          textPoint,
          cursorAnimationConfig.timings.nextTarget,
          lane,
        );
        laneTimeline.to({}, { duration: cursorAnimationConfig.timings.textDelay });
        appendTextPrintReveal(laneTimeline, target);
        laneTimeline.call(revealTarget, [target]);
        const leaveStart = laneTimeline.duration();
        appendCursorMovement(
          laneTimeline,
          cursor,
          textPoint,
          moveAway,
          cursorAnimationConfig.timings.nextTarget,
          lane,
        );
        laneTimeline.to(
          rectangle,
          {
            attr: { 'stroke-dashoffset': perimeter },
            duration: cursorAnimationConfig.timings.retract,
            ease: 'power1.in',
          },
          leaveStart,
        );
        laneTimeline.to(
          outline,
          { autoAlpha: 0, duration: cursorAnimationConfig.timings.retract, ease: 'power1.out' },
          leaveStart,
        );
        laneTimeline.call(() => outline.remove());
        timeline.add(laneTimeline, lane * cursorAnimationConfig.timings.stagger);
        cursorPositions[lane] = moveAway;
      });

      for (let lane = plans.length; lane < cursors.length; lane += 1) {
        gsap.set(cursors[lane], { autoAlpha: 0 });
        cursorPositions[lane] = null;
      }

      return awaitTimeline(timeline);
    };

    const processTargets = async (
      sectionConfig: TargetSection,
      section: HTMLElement,
      targets: HTMLElement[],
    ) => {
      const pending = new Set(targets);
      while (pending.size > 0 && !stopped) {
        const batch = await scrollToVisibleTargets(section, sectionConfig, pending);
        if (stopped) return false;
        if (batch.length === 0) continue;

        if (!(await animateTargetBatch(batch)) || stopped) return false;
        batch.forEach((target) => pending.delete(target));
      }

      return !stopped;
    };

    const runSequence = async () => {
      root.classList.add('portfolio-writing');
      document.querySelectorAll<HTMLElement>('.cursor-print-complete').forEach((target) => {
        target.classList.remove('cursor-print-complete');
        target.style.removeProperty('clip-path');
      });

      const sections = cursorAnimationConfig.sections
        .map((config) => ({ config, element: getSectionElement(config) }))
        .filter(
          (entry): entry is { config: TargetSection; element: HTMLElement } =>
            entry.element !== null,
        )
        .map(({ config, element }) => ({
          config,
          element,
          targets: getSectionTargets(element, config),
        }));

      sections.forEach(({ targets }) =>
        targets.forEach((target) => {
          target.classList.add('cursor-print-target');
          target.style.clipPath = 'inset(0 100% 0 0)';
        }),
      );

      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (!(await wait(100))) return;
      }

      for (const { config, element, targets } of sections) {
        if (stopped) return;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!(await wait(cursorAnimationConfig.timings.sectionScroll * 1000))) return;
        if (!(await processTargets(config, element, targets))) return;
      }

      if (stopped) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (await wait(720)) {
        revealEverything();
        stopped = true;
        removeListeners();
      }
    };

    function removeListeners() {
      window.removeEventListener('pointerdown', stopAnimation);
      window.removeEventListener('wheel', stopAnimation);
      window.removeEventListener('touchstart', stopAnimation);
      document.removeEventListener('keydown', stopAnimation);
      desktopPointer.removeEventListener('change', handlePreferenceChange);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
    }

    window.addEventListener('pointerdown', stopAnimation, { passive: true });
    window.addEventListener('wheel', stopAnimation, { passive: true });
    window.addEventListener('touchstart', stopAnimation, { passive: true });
    document.addEventListener('keydown', stopAnimation);
    desktopPointer.addEventListener('change', handlePreferenceChange);
    reducedMotion.addEventListener('change', handlePreferenceChange);

    const start = () => {
      if (!stopped) void runSequence();
    };

    if (document.fonts.status === 'loaded') start();
    else void document.fonts.ready.then(start);

    return () => {
      stopAnimation();
      removeListeners();
    };
  }, []);

  return (
    <div
      className="multi-cursor-layer"
      ref={(node) => {
        refs.current.layer = node;
      }}
      aria-hidden="true"
    >
      {cursorAnimationConfig.cursors.map((cursor, index) => (
        <div className="multi-cursor-lane" key={cursor.id}>
          <AnimatedCursor
            color={cursor.color}
            size={cursorAnimationConfig.cursorSize}
            cursorRef={(node) => {
              refs.current.cursors[index] = node;
            }}
          />
          <DrawRectangle
            color={cursor.color}
            svgRef={(node) => {
              refs.current.outlines[index] = node;
            }}
            rectangleRef={(node) => {
              refs.current.rectangles[index] = node;
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default MultiCursorController;
