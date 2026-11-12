import type { Ref } from 'react';

type DrawRectangleProps = {
  color: string;
  svgRef: Ref<SVGSVGElement>;
  rectangleRef: Ref<SVGRectElement>;
};

function DrawRectangle({ color, svgRef, rectangleRef }: DrawRectangleProps) {
  return (
    <svg
      className="print-outline"
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      style={{ color }}
      viewBox="0 0 1 1"
    >
      <rect
        ref={rectangleRef}
        x="1"
        y="1"
        width="0"
        height="0"
        rx="1"
        fill="none"
        stroke={color}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default DrawRectangle;
