import { cursorAnimationConfig } from '../animations/cursorAnimationConfig';

export function appendTextPrintReveal(timeline: gsap.core.Timeline, target: HTMLElement) {
  const characters = Array.from(target.textContent ?? '');
  if (characters.length === 0) return;

  const progress = { value: 0 };

  characters.forEach((character, index) => {
    const nextProgress = (index + 1) / characters.length;
    const isSpace = /\s/.test(character);

    timeline.to(progress, {
      value: nextProgress,
      duration: cursorAnimationConfig.timings.character,
      ease: 'none',
      onUpdate: () => {
        target.style.clipPath = `inset(0 ${(1 - progress.value) * 100}% 0 0)`;
      },
    });

    const nextCharacter = characters[index + 1];
    if (isSpace && nextCharacter && !/\s/.test(nextCharacter)) {
      timeline.to({}, { duration: cursorAnimationConfig.timings.wordPause });
    }
  });

  timeline.call(() => target.style.removeProperty('clip-path'));
}
