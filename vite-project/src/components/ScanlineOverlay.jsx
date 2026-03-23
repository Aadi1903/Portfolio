import React from 'react';

/**
 * Subtle CRT-style scanlines and moving horizontal scan beam overlay.
 */
const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[49] overflow-hidden">
    {/* Scanlines */}
    <div
      className="absolute inset-0"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
      }}
    />
    {/* Moving scan beam */}
    <div
      className="absolute left-0 w-full h-12 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(92,147,159,0.04), transparent)',
        animation: 'scanbeam 8s linear infinite',
        top: '-48px',
      }}
    />
    <style>{`
      @keyframes scanbeam {
        0%   { top: -48px; }
        100% { top: 100vh; }
      }
    `}</style>
  </div>
);

export default ScanlineOverlay;
