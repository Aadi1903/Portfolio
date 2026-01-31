import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">✕</button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.detailedDescription}</p>
        <div className="mb-4">
          <h5 className="font-semibold mb-2 dark:text-gray-200">Key Features:</h5>
          <div className="grid md:grid-cols-2 gap-2">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:opacity-90 transition-colors dark:text-white">
            <Github size={18} /> View Code
          </a>
          <button disabled className="flex items-center gap-2 px-4 py-2 bg-blue-500/50 cursor-not-allowed rounded-lg text-white/50 opacity-70">
            <ExternalLink size={18} /> Live (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;