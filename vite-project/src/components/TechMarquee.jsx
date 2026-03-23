import React from 'react';

const techs = [
  'AWS', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Jenkins',
  'Spring Boot', 'React', 'Next.js', 'Java', 'Linux', 'CI/CD',
  'SonarQube', 'Trivy', 'Nexus', 'TypeScript', 'MongoDB', 'SQL',
];

const TechMarquee = () => (
  <div className="overflow-hidden border-y border-wqf-gray py-4 bg-[#0a0a0a] select-none">
    <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
      {[...techs, ...techs].map((t, i) => (
        <span key={i} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-wqf-light/30 hover:text-wqf-teal transition-colors cursor-default">
          <span className="text-wqf-orange">✦</span>
          {t}
        </span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 28s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `}</style>
  </div>
);

export default TechMarquee;
