import React from 'react';

const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-[0.03]">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-wqf-teal shadow-[0_0_15px_rgba(92,147,159,1)] animate-scan" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default ScanlineOverlay;
