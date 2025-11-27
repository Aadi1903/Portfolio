import React, { useState, useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
      setProgress(currentProgress);
    };

    const handleScroll = () => {
      // Cancel any existing animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Use requestAnimationFrame for smooth updates during scroll
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    // Use both scroll and wheel events for better responsiveness
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    // Initial update
    updateProgress();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-700">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;