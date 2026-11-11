import { useReducedMotion } from 'motion/react';

const particles = [
  [120, 24, 2.2],
  [181, 43, 1.5],
  [211, 100, 2],
  [193, 172, 1.3],
  [144, 212, 2],
  [75, 203, 1.4],
  [31, 151, 2.1],
  [28, 83, 1.4],
  [88, 52, 1.1],
  [168, 128, 1.2],
  [80, 161, 1.6],
  [142, 79, 1.3],
];

function ParticleOrbit() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`footer-orbit ${reduceMotion ? 'reduced-motion' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 240 240" fill="none">
        <circle className="orbit-guide orbit-guide-one" cx="120" cy="120" r="76" />
        <ellipse className="orbit-guide orbit-guide-two" cx="120" cy="120" rx="96" ry="43" />
        <g className="orbit-particles">
          {particles.map(([cx, cy, radius], index) => (
            <circle
              className={index % 4 === 0 ? 'orbit-particle orbit-particle-hot' : 'orbit-particle'}
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={radius}
            />
          ))}
        </g>
        <circle className="orbit-center-halo" cx="120" cy="120" r="28" />
        <circle className="orbit-center" cx="120" cy="120" r="19" />
        {!reduceMotion && (
          <>
            <path d="M -6 -3 L 3 0 L -6 3 Z" className="orbit-arrow">
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 28 120 C 28 46 184 37 208 104 C 232 171 88 215 36 151 C 19 131 20 93 45 70"
              />
            </path>
            <path d="M -5 -2.5 L 2.5 0 L -5 2.5 Z" className="orbit-arrow orbit-arrow-white">
              <animateMotion
                dur="13s"
                begin="-4s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 71 50 C 165 27 195 163 123 188 C 51 214 36 86 122 73 C 161 67 179 100 170 128"
              />
            </path>
          </>
        )}
      </svg>
      <span className="orbit-coordinate">SYSTEM / ONLINE</span>
    </div>
  );
}

export default ParticleOrbit;
