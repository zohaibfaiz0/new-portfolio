'use client';

import { type ReactElement } from 'react';

// Pre-defined values for deterministic positioning (avoids Math.random())
const PARTICLE_POSITIONS = [
  { left: 15, top: 82, delay: 8.6, duration: 23 },
  { left: 43, top: 67, delay: 5.8, duration: 22 },
  { left: 29, top: 91, delay: 17.2, duration: 21 },
  { left: 38, top: 74, delay: 11.2, duration: 20 },
  { left: 56, top: 21, delay: 6.4, duration: 24 },
  { left: 88, top: 33, delay: 13.2, duration: 25 },
  { left: 62, top: 47, delay: 15.8, duration: 19 },
  { left: 79, top: 14, delay: 7.6, duration: 23 },
  { left: 95, top: 23, delay: 19.0, duration: 21 },
  { left: 68, top: 41, delay: 9.4, duration: 24 },
  { left: 77, top: 19, delay: 3.8, duration: 22 },
  { left: 53, top: 86, delay: 16.6, duration: 20 },
  { left: 32, top: 71, delay: 14.4, duration: 23 },
  { left: 12, top: 89, delay: 17.8, duration: 21 },
  { left: 45, top: 64, delay: 12.0, duration: 19 },
  { left: 27, top: 93, delay: 18.6, duration: 25 },
  { left: 10, top: 75, delay: 5.0, duration: 20 },
  { left: 40, top: 60, delay: 10.0, duration: 22 },
  { left: 80, top: 30, delay: 16.0, duration: 18 },
  { left: 50, top: 90, delay: 15.0, duration: 24 }
];

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps): ReactElement {
  return (
    <div className={`particles ${className || ''}`}>
      {PARTICLE_POSITIONS.map((position, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
            animationDelay: `${position.delay}s`,
            animationDuration: `${position.duration}s`,
          }}
        />
      ))}
    </div>
  );
}