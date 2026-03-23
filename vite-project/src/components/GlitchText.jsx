import React, { useEffect, useRef } from 'react';

const GlitchText = ({ text, className = '' }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Randomly trigger glitch on the data-text copy
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        el.classList.add('glitch-active');
        setTimeout(() => el.classList.remove('glitch-active'), 200 + Math.random() * 200);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={elRef}
      className={`glitch-wrapper ${className}`}
      data-text={text}
    >
      {text}
      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0s;
        }
        .glitch-active::before {
          opacity: 0.7;
          color: #5C939F;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          transform: translateX(-4px);
          animation: glitch-before 0.15s steps(2) forwards;
        }
        .glitch-active::after {
          opacity: 0.7;
          color: #ED6D40;
          clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%);
          transform: translateX(4px);
          animation: glitch-after 0.15s steps(2) forwards;
        }
        @keyframes glitch-before {
          0% { transform: translateX(-4px) skewX(-5deg); }
          50% { transform: translateX(3px) skewX(3deg); }
          100% { transform: translateX(-2px); }
        }
        @keyframes glitch-after {
          0% { transform: translateX(4px) skewX(5deg); }
          50% { transform: translateX(-3px) skewX(-3deg); }
          100% { transform: translateX(2px); }
        }
      `}</style>
    </span>
  );
};

export default GlitchText;
