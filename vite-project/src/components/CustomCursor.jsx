import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);
  const rafRef = useRef();
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Throttled mouse move handler
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          
          // Check if hovering over clickable elements
          const target = e.target;
          const isClickable = 
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a') ||
            target.classList.contains('hoverable');
          
          setIsHovering(isClickable);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Hide default cursor and add hoverable class to interactive elements
    document.body.style.cursor = 'none';
    const hoverables = document.querySelectorAll('button, a, [role="button"]');
    hoverables.forEach(el => {
      el.classList.add('hoverable');
    });

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Highly optimized cursor animation with frame rate limiting
  useEffect(() => {
    const animateCursor = (currentTime) => {
      if (!bigBallRef.current || !smallBallRef.current) {
        rafRef.current = requestAnimationFrame(animateCursor);
        return;
      }

      // Limit frame rate for better performance
      if (currentTime - lastTimeRef.current < 16) { // ~60fps
        rafRef.current = requestAnimationFrame(animateCursor);
        return;
      }
      lastTimeRef.current = currentTime;

      const bigBall = bigBallRef.current;
      const smallBall = smallBallRef.current;
      
      // Get current positions with fallbacks
      const currentBigX = parseFloat(bigBall.style.left) || position.x - 15;
      const currentBigY = parseFloat(bigBall.style.top) || position.y - 15;
      
      // Smooth interpolation for big ball with easing
      const bigX = currentBigX + (position.x - 15 - currentBigX) * 0.2;
      const bigY = currentBigY + (position.y - 15 - currentBigY) * 0.2;
      
      bigBall.style.left = `${bigX}px`;
      bigBall.style.top = `${bigY}px`;
      
      // Small ball follows with less delay for snappy feel
      const currentSmallX = parseFloat(smallBall.style.left) || position.x - 5;
      const currentSmallY = parseFloat(smallBall.style.top) || position.y - 5;
      
      const smallX = currentSmallX + (position.x - 5 - currentSmallX) * 0.5;
      const smallY = currentSmallY + (position.y - 5 - currentSmallY) * 0.5;
      
      smallBall.style.left = `${smallX}px`;
      smallBall.style.top = `${smallY}px`;
      
      // Transform effects with smooth transitions
      if (isHovering) {
        bigBall.style.transform = 'scale(1.8)';
        bigBall.style.opacity = '0.6';
        smallBall.style.transform = 'scale(1.3)';
      } else {
        bigBall.style.transform = 'scale(1)';
        bigBall.style.opacity = '0.4';
        smallBall.style.transform = 'scale(1)';
      }
      
      rafRef.current = requestAnimationFrame(animateCursor);
    };
    
    rafRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position, isHovering]);

  return (
    <>
      <div ref={bigBallRef} className="fixed w-8 h-8 pointer-events-none z-[1000] mix-blend-difference transition-all duration-150 ease-out opacity-40">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="7" strokeWidth="0" className="fill-white"></circle>
        </svg>
      </div>
      
      <div ref={smallBallRef} className="fixed w-3 h-3 pointer-events-none z-[1001] mix-blend-difference transition-all duration-100 ease-out">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="2" strokeWidth="0" className="fill-white"></circle>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;