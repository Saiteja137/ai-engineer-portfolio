import { useEffect, useRef } from 'react';

type WritingTarget = HTMLElement;

const writingSelector = [
  'h1',
  'h2',
  'h3',
  'p',
  '.eyebrow',
  '.hero-topline > span',
  '.name-chip',
  '.hero-role',
  '.button',
  '.scroll-cue',
  '.frame-top',
  '.frame-bottom',
  '.art-caption',
  '.system-node',
  '.hero-coordinate > span',
  '.section-index',
  '.quote-mark',
  '.detail-row > span',
  '.about-stats > div > *',
  '.project-number',
  '.project-type',
  '.tags > span',
  '.project-outcome',
  '.architecture-axis > span',
  '.architecture-node > *',
  '.architecture-detail > *',
  '.architecture-foot > span',
  '.capability h3',
  '.capability p',
  '.cap-index',
  '.matrix-cell > div > *',
  '.contact-kicker',
  '.socials > a',
  '.brand',
  '.footer-note',
  '.copyright',
].join(',');

const cursorSvg = (
  <svg viewBox="0 0 26 32" focusable="false">
    <path d="M2 1.5 22.5 18.7l-9.2.1L9 29.5 2 1.5Z" className="writer-cursor-shadow" />
    <path d="M3.3 4.5 19.1 17.8l-7 .1-3.1 8.3L3.3 4.5Z" className="writer-cursor-fill" />
    <path d="m3.3 4.5 5.2 21.7 2.4-6.5" className="writer-cursor-accent" />
  </svg>
);

const cursorCount = 3;

type GridCell = { column: number; row: number };

const createGridCells = (columns: number, rows: number): GridCell[] =>
  Array.from({ length: rows * columns }, (_, index) => ({
    column: index % columns,
    row: Math.floor(index / columns),
  })).sort((a, b) => {
    const centerColumn = (columns - 1) / 2;
    const centerRow = (rows - 1) / 2;
    const distanceA = Math.abs(a.column - centerColumn) + Math.abs(a.row - centerRow);
    const distanceB = Math.abs(b.column - centerColumn) + Math.abs(b.row - centerRow);
    return distanceA - distanceB || a.row - b.row || a.column - b.column;
  });

const revealGridCell = (
  target: WritingTarget,
  progress: number,
  bounds: DOMRect,
  cells: GridCell[],
  columns: number,
  rows: number,
) => {
  if (progress >= 1) {
    target.style.clipPath = 'none';
    return { x: bounds.right, y: bounds.bottom };
  }

  if (progress <= 0) {
    target.style.clipPath = 'inset(100%)';
    return { x: bounds.left, y: bounds.top };
  }

  const visibleCellCount = Math.max(1, Math.ceil(progress * cells.length));
  const visibleCells = cells.slice(0, visibleCellCount);
  const path = visibleCells
    .map(({ column, row }) => {
      const left = (column * bounds.width) / columns;
      const right = ((column + 1) * bounds.width) / columns;
      const top = (row * bounds.height) / rows;
      const bottom = ((row + 1) * bounds.height) / rows;
      return `M${left} ${top}H${right}V${bottom}H${left}Z`;
    })
    .join('');
  target.style.clipPath = `path("${path}")`;

  const currentCell = visibleCells[visibleCells.length - 1]!;

  return {
    x: bounds.left + ((currentCell.column + 0.5) * bounds.width) / columns,
    y: bounds.top + ((currentCell.row + 0.5) * bounds.height) / rows,
  };
};

function PortfolioWriter() {
  const cursorRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia('(any-pointer: fine)');
    const compactViewport = window.matchMedia('(max-width: 600px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stopped = false;
    let frame = 0;
    let cancelTimer = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    const cursors = cursorRefs.current.filter((cursor): cursor is HTMLDivElement => cursor !== null);
    const completedTargets: WritingTarget[] = [];

    const clearTarget = (target: WritingTarget) => {
      target.classList.remove('portfolio-write-target');
      target.style.removeProperty('clip-path');
    };

    const showAll = (targets: WritingTarget[]) => {
      targets.forEach((target) => {
        target.style.clipPath = 'none';
        target.classList.remove('portfolio-write-target');
        target.classList.add('portfolio-write-complete');
      });
      cursors.forEach((cursor) => cursor.classList.remove('is-visible'));
      root.classList.remove('portfolio-writing');
    };

    const stopWriting = () => {
      if (stopped) return;
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(cancelTimer);
      window.removeEventListener('pointermove', cancelOnPointerMove);
      window.removeEventListener('pointerdown', stopWriting);
      window.removeEventListener('wheel', stopWriting);
      window.removeEventListener('touchstart', stopWriting);
      document.removeEventListener('keydown', stopWriting);
      const targets = [...completedTargets];
      document.querySelectorAll<HTMLElement>('.portfolio-write-target').forEach((target) => {
        targets.push(target as WritingTarget);
      });
      showAll(targets);
    };

    function cancelOnPointerMove(event: PointerEvent) {
      if (Math.hypot(event.clientX - lastPointerX, event.clientY - lastPointerY) < 70) return;
      stopWriting();
    }

    const finishWriting = (targets: WritingTarget[]) => {
      targets.forEach((target) => {
        target.style.clipPath = 'none';
        target.classList.remove('portfolio-write-target');
        target.classList.add('portfolio-write-complete');
        clearTarget(target);
      });
      cursors.forEach((cursor) => cursor.classList.remove('is-visible'));
      root.classList.remove('portfolio-writing');
      stopped = true;
      window.removeEventListener('pointermove', cancelOnPointerMove);
      window.removeEventListener('pointerdown', stopWriting);
      window.removeEventListener('wheel', stopWriting);
      window.removeEventListener('touchstart', stopWriting);
      document.removeEventListener('keydown', stopWriting);
    };

    const collectSections = () => {
      const header = document.querySelector<HTMLElement>('.topbar');
      const mainSections = [...document.querySelectorAll<HTMLElement>('#main-content > section')];
      const footer = document.querySelector<HTMLElement>('.footer');
      return [header, ...mainSections, footer].filter(
        (section): section is HTMLElement => section !== null,
      );
    };

    const collectTargets = (section: HTMLElement) =>
      [...section.querySelectorAll<HTMLElement>(writingSelector)].filter(
        (target) =>
          target.textContent?.trim() &&
          target.getBoundingClientRect().width > 0 &&
          target.getBoundingClientRect().height > 0 &&
          !target.closest('.custom-cursor-layer, .skip-link'),
      ) as WritingTarget[];

    const moveCursor = (cursor: HTMLDivElement, x: number, y: number, angle: number) => {
      cursor.style.transform = `translate3d(${x - 1.5}px, ${y - 0.75}px, 0)`;
      const arrow = cursor.firstElementChild;
      if (arrow instanceof HTMLElement) {
        arrow.style.transform = `rotate(${angle + 135}deg)`;
      }
    };

    const scanTargets = async (targets: WritingTarget[], isPinnedHeader = false) => {
      const startDelay = await new Promise<boolean>((resolve) => {
        cancelTimer = window.setTimeout(() => resolve(!stopped), 450);
      });
      if (!startDelay || stopped) return false;

      for (let offset = 0; offset < targets.length; offset += cursors.length) {
        if (stopped) return false;

        const batch = targets.slice(offset, offset + cursors.length);
        const firstBounds = batch[0]!.getBoundingClientRect();
        if (
          !isPinnedHeader &&
          (firstBounds.top < 105 || firstBounds.bottom > window.innerHeight - 55)
        ) {
          batch[0]!.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const visible = await new Promise<boolean>((resolve) => {
            cancelTimer = window.setTimeout(() => resolve(!stopped), 300);
          });
          if (!visible || stopped) return false;
        }

        const measurements = batch.map((target) => {
          const bounds = target.getBoundingClientRect();
          target.style.clipPath = 'inset(100%)';
          target.classList.add('portfolio-write-target');
          const columns = Math.max(4, Math.min(20, Math.ceil(bounds.width / 30)));
          const rows = Math.max(2, Math.min(8, Math.ceil(bounds.height / 18)));
          return {
            width: Math.max(bounds.width, 1),
            bounds,
            columns,
            rows,
            cells: createGridCells(columns, rows),
          };
        });

        await new Promise<void>((resolve) => {
          const startedAt = performance.now();
          const longestDuration = Math.max(
            ...measurements.map(({ width }) => Math.min(1140, Math.max(460, width * 1.06))),
          );
          const step = (now: number) => {
            if (stopped) {
              resolve();
              return;
            }

            const elapsed = now - startedAt;
            batch.forEach((target, index) => {
              const { width, bounds, cells, columns, rows } = measurements[index]!;
              const duration = Math.min(1140, Math.max(460, width * 1.06));
              const linearProgress = Math.min(elapsed / duration, 1);
              const progress = 1 - (1 - linearProgress) ** 2.2;
              const cursorPosition = revealGridCell(target, progress, bounds, cells, columns, rows);

              const cursor = cursors[index]!;
              moveCursor(cursor, cursorPosition.x, cursorPosition.y, 0);
              cursor.classList.add('is-visible');
              if (linearProgress >= 1 && !target.classList.contains('portfolio-write-complete')) {
                cursor.classList.remove('is-visible');
                target.classList.remove('portfolio-write-target');
                target.classList.add('portfolio-write-complete');
                completedTargets.push(target);
              }
            });

            if (elapsed < longestDuration) {
              frame = window.requestAnimationFrame(step);
            } else {
              frame = 0;
              resolve();
            }
          };

          frame = window.requestAnimationFrame(step);
        });
      }

      return !stopped;
    };

    const buildPortfolio = async () => {
      const sections = collectSections();
      const stages = sections.map((section) => ({
        section,
        targets: collectTargets(section),
      }));
      const allTargets = stages.flatMap(({ targets }) => targets);

      if (allTargets.length === 0 || stopped) return;
      root.classList.add('portfolio-writing');
      allTargets.forEach((target) => {
        target.classList.add('portfolio-write-target');
        target.style.clipPath = 'inset(100%)';
      });

      for (const { section, targets } of stages) {
        if (stopped) return;
        if (section !== document.querySelector('.topbar')) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          await new Promise<boolean>((resolve) => {
            cancelTimer = window.setTimeout(() => resolve(!stopped), 540);
          });
        }
        if (stopped) return;

        const completed = await scanTargets(targets, section.classList.contains('topbar'));
        if (!completed) return;
        await new Promise<boolean>((resolve) => {
          cancelTimer = window.setTimeout(() => resolve(!stopped), 65);
        });
      }

      if (stopped) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const returnedToStart = await new Promise<boolean>((resolve) => {
        cancelTimer = window.setTimeout(() => resolve(!stopped), 620);
      });
      if (returnedToStart && !stopped) finishWriting(allTargets);
    };

    if (!finePointer.matches || compactViewport.matches || reducedMotion.matches) return;

    const handlePreferenceChange = () => {
      if (!finePointer.matches || compactViewport.matches || reducedMotion.matches) {
        stopWriting();
      }
    };

    window.addEventListener('pointermove', cancelOnPointerMove, { passive: true });
    window.addEventListener('pointerdown', stopWriting, { passive: true });
    window.addEventListener('wheel', stopWriting, { passive: true });
    window.addEventListener('touchstart', stopWriting, { passive: true });
    document.addEventListener('keydown', stopWriting);
    finePointer.addEventListener('change', handlePreferenceChange);
    compactViewport.addEventListener('change', handlePreferenceChange);
    reducedMotion.addEventListener('change', handlePreferenceChange);

    const start = () => {
      const scrollPosition = window.scrollY;
      lastPointerX = window.innerWidth / 2;
      lastPointerY = window.innerHeight / 2;
      if (scrollPosition > 0) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      void buildPortfolio();
    };

    if (document.fonts.status === 'loaded') {
      start();
    } else {
      void document.fonts.ready.then(start);
    }

    return () => {
      stopWriting();
      finePointer.removeEventListener('change', handlePreferenceChange);
      compactViewport.removeEventListener('change', handlePreferenceChange);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
    };
  }, []);

  return (
    <div className="portfolio-writer" aria-hidden="true">
      {Array.from({ length: cursorCount }, (_, index) => (
        <div
          className={`portfolio-writer-cursor portfolio-writer-cursor-${index + 1}`}
          key={index}
          ref={(node) => {
            cursorRefs.current[index] = node;
          }}
        >
          {cursorSvg}
        </div>
      ))}
    </div>
  );
}

export default PortfolioWriter;
