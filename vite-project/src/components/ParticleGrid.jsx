import React, { useEffect, useRef } from 'react';

/**
 * Optimized particle grid — max 50 dots, no O(n²) loops.
 * Uses a static grid with wave animation and mouse proximity highlight only.
 */
const ParticleGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Fixed 48 particles in a 8×6 grid — no O(n²)
    const COLS = 8, ROWS = 6;
    const dots = [];
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        dots.push({
          bx: (i / (COLS - 1)) * canvas.width,
          by: (j / (ROWS - 1)) * canvas.height,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.006,
        });
      }
    }

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Static grid lines drawn once to offscreen canvas for performance
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const octx = offscreen.getContext('2d');
    octx.strokeStyle = 'rgba(92, 147, 159, 0.04)';
    octx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 80) {
      octx.beginPath(); octx.moveTo(x, 0); octx.lineTo(x, canvas.height); octx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 80) {
      octx.beginPath(); octx.moveTo(0, y); octx.lineTo(canvas.width, y); octx.stroke();
    }

    let t = 0;
    const draw = () => {
      t += 0.6;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cached grid
      ctx.drawImage(offscreen, 0, 0);

      // Draw dots
      for (const d of dots) {
        const x = d.bx + Math.sin(t * d.speed + d.phase) * 12;
        const y = d.by + Math.cos(t * d.speed + d.phase * 1.3) * 8;

        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist2 = dx * dx + dy * dy;
        const near = dist2 < 14400; // 120px radius

        ctx.beginPath();
        ctx.arc(x, y, near ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = near ? 'rgba(237,109,64,0.8)' : 'rgba(92,147,159,0.25)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      resize();
      // Rebuild offscreen on resize
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      octx.strokeStyle = 'rgba(92, 147, 159, 0.04)';
      octx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 80) {
        octx.beginPath(); octx.moveTo(x, 0); octx.lineTo(x, canvas.height); octx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 80) {
        octx.beginPath(); octx.moveTo(0, y); octx.lineTo(canvas.width, y); octx.stroke();
      }
      // Reposition base dots
      dots.forEach((d, i) => {
        d.bx = ((i % COLS) / (COLS - 1)) * canvas.width;
        d.by = (Math.floor(i / COLS) / (ROWS - 1)) * canvas.height;
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ willChange: 'auto' }}
    />
  );
};

export default ParticleGrid;
