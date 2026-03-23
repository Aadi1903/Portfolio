import React, { useState, useEffect } from 'react';

const Preloader = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wqf-dark font-heading">
      <div className="w-64">
        <div className="flex justify-between items-end mb-2">
          <div className="text-wqf-light/60 text-xs font-bold uppercase tracking-widest">System Boot Sequence</div>
          <div className="text-wqf-teal font-bold tracking-widest text-sm">{progress}%</div>
        </div>
        <div className="h-0.5 w-full bg-wqf-gray overflow-hidden">
          <div 
            className="h-full bg-wqf-teal transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 animate-glitch text-wqf-orange text-[10px] tracking-widest uppercase">
          [Initializing Layout Protocols...]
        </div>
      </div>
    </div>
  );
};

export default Preloader;