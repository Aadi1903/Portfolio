import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Props:
 *  - animation: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade-down'
 *  - delay: number (ms)
 *  - duration: number (ms, default 700)
 */
const ScrollReveal = ({ children, animation = 'fade-up', delay = 0, duration = 700, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();

  const variants = {
    'fade-up':    { hidden: 'opacity-0 translate-y-16',    visible: 'opacity-100 translate-y-0' },
    'fade-down':  { hidden: 'opacity-0 -translate-y-16',   visible: 'opacity-100 translate-y-0' },
    'fade-left':  { hidden: 'opacity-0 translate-x-16',    visible: 'opacity-100 translate-x-0' },
    'fade-right': { hidden: 'opacity-0 -translate-x-16',   visible: 'opacity-100 translate-x-0' },
    'zoom-in':    { hidden: 'opacity-0 scale-90',          visible: 'opacity-100 scale-100' },
  };

  const v = variants[animation] || variants['fade-up'];

  return (
    <div
      ref={ref}
      className={`transition-all ${v[isVisible ? 'visible' : 'hidden']} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
