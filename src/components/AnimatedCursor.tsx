import type { Ref } from 'react';

type AnimatedCursorProps = {
  color: string;
  cursorRef: Ref<HTMLDivElement>;
  size: { width: number; height: number };
};

function AnimatedCursor({ color, cursorRef, size }: AnimatedCursorProps) {
  return (
    <div
      className="print-cursor"
      ref={cursorRef}
      style={{ ...size, color }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 20" focusable="false">
        <path
          d="M1 1 14.4 12.2 8.1 12.8 5.3 18.7 1 1Z"
          fill={color}
          stroke="#09090b"
          strokeLinejoin="round"
          strokeWidth="1.2"
        />
        <path
          d="m2.5 3.4 9.1 7.6-4.1.4-1.9 4.1-3.1-12.1Z"
          fill={color}
          stroke="#ffffff99"
          strokeLinejoin="round"
          strokeWidth=".45"
        />
      </svg>
    </div>
  );
}

export default AnimatedCursor;
