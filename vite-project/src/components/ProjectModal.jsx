import React, { useEffect } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    if (!project) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    /* Backdrop — pointer-events MUST be auto here, NOT wqf-vignette */
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl my-8 bg-[#111111] border border-[#1E1E1E] animate-slide-up">
        {/* Teal corner accent */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#5C939F] pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-[#1E1E1E]">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white pr-8 leading-tight">
            {project.title}
          </h3>
          {/* Close button — explicit z, padding for easy tap */}
          <button
            onClick={onClose}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-[#1E1E1E] text-white/50 hover:text-[#ED6D40] hover:border-[#ED6D40] transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          <p className="text-[#DADADA]/80 leading-relaxed border-l-4 border-[#5C939F] pl-6">
            {project.detailedDescription}
          </p>

          {/* Tech Stack */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-white mb-4">Tech Stack //</h5>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-[#1E1E1E] text-[#5C939F] font-bold tracking-widest uppercase text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h5 className="font-black text-xs uppercase tracking-widest text-white mb-4">Key Features //</h5>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 mt-2 flex-shrink-0 bg-[#ED6D40]" />
                  <span className="text-[#DADADA]/70 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-[#1E1E1E] hover:border-[#5C939F] hover:text-[#5C939F] text-white/60 text-xs font-black uppercase tracking-widest transition-colors"
            >
              <Github size={16} /> View Source
            </a>
            {project.title.toLowerCase().includes('cloudcostlens') ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-[#1E1E1E] hover:border-[#ED6D40] hover:text-[#ED6D40] text-white/60 text-xs font-black uppercase tracking-widest transition-colors"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 px-6 py-3 bg-[#1E1E1E] text-white/20 cursor-not-allowed text-xs font-black uppercase tracking-widest"
              >
                <ExternalLink size={16} /> Offline
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;