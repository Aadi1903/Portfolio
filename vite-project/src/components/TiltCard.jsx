import React, { useRef } from 'react';

/**
 * 3D tilt card wrapper using CSS perspective transforms on mouse move.
 * Wraps any children with a realistic 3D hover effect.
 */
const TiltCard = ({ children, className = '', intensity = 12 }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -intensity;
    const rotateY = ((x - cx) / cx) * intensity;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

    if (glowRef.current) {
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(92,147,159,0.15) 0%, transparent 70%)`;
      glowRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99)', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
};

export default TiltCard;
