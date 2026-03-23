import React, { useEffect, useState } from 'react';

const TypewriterText = ({ phrases, className = '' }) => {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev + current[charIdx]);
        setCharIdx(i => i + 1);
      }, 55 + Math.random() * 30);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2500);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => {
        setDisplayed(prev => prev.slice(0, -1));
      }, 30);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCharIdx(0);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
  }, [displayed, charIdx, deleting, phraseIdx, phrases]);

  return (
    <span className={`${className} inline-flex items-center gap-1`}>
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] bg-wqf-orange align-middle"
        style={{ animation: 'blink 1s step-end infinite' }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
};

export default TypewriterText;
