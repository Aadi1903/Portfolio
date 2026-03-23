import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';
import ScrollReveal from './ScrollReveal';

/**
 * Full-width project list — Linear / Stripe style.
 * Each project is a full-bleed horizontal row that expands on hover.
 */
const ProjectList = ({ projects, openProject }) => (
  <div className="border border-wqf-gray">
    {projects.map((project, idx) => (
      <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
        <div
          className="group relative border-b border-wqf-gray last:border-b-0 overflow-hidden cursor-pointer"
          onClick={() => openProject(idx)}
        >
          {/* Hover bg sweep */}
          <div className="absolute inset-0 bg-wqf-gray opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 p-8 md:p-10">
            {/* Index */}
            <div className="text-4xl md:text-6xl font-black text-wqf-gray group-hover:text-wqf-teal/30 transition-colors duration-300 w-12 md:w-16 flex-shrink-0 font-mono leading-none select-none">
              {String(idx + 1).padStart(2, '0')}
            </div>

            {/* Left: title + description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide group-hover:text-wqf-teal transition-colors duration-300 mb-2">
                {project.title}
              </h3>
              <p className="text-wqf-light/50 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Middle: tech tags */}
            <div className="hidden lg:flex flex-wrap gap-2 w-64 justify-end flex-shrink-0">
              {project.tech.slice(0, 4).map((t, i) => (
                <span key={i} className="px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-wqf-dark text-wqf-teal border border-wqf-gray group-hover:border-wqf-teal/40 transition-colors">
                  {t}
                </span>
              ))}
            </div>

            {/* Right: arrow + links */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="p-2 border border-wqf-gray hover:border-wqf-teal text-wqf-light/40 hover:text-wqf-teal transition-all"
                  title="Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="p-2 border border-wqf-gray hover:border-wqf-teal text-wqf-light/40 hover:text-wqf-teal transition-all"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <div className="text-wqf-light/40 group-hover:text-wqf-orange group-hover:translate-x-1 transition-all duration-300">
                →
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>
);

export default ProjectList;
