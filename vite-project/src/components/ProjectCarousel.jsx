import React, { useState, useRef, useCallback } from 'react';

const ProjectCarousel = ({ projects, openProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const totalProjects = projects.length;

  const nextProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, totalProjects]);

  const prevProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, totalProjects]);

  const goToProject = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, currentIndex]);

  const handleCarouselClick = useCallback((e) => {
    if (isAnimating) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    const rect = carousel.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const carouselWidth = rect.width;

    if (clickX < carouselWidth * 0.33) {
      prevProject();
    } else if (clickX > carouselWidth * 0.66) {
      nextProject();
    } else {
      openProject(currentIndex);
    }
  }, [isAnimating, prevProject, nextProject, openProject, currentIndex]);

  const getProjectPosition = useCallback((index) => {
    const diff = (index - currentIndex + totalProjects) % totalProjects;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === totalProjects - 1) return 'side';
    return 'hidden';
  }, [currentIndex, totalProjects]);

  return (
    <div
      ref={carouselRef}
      className="relative h-[420px] flex items-center justify-center cursor-pointer touch-pan-y"
      onClick={handleCarouselClick}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        carouselRef.current.touchStartX = touch.clientX;
        carouselRef.current.touchStartY = touch.clientY;
      }}
      onTouchMove={(e) => {
        // Optional: Block vertical scroll if horizontal swipe is detected
        const touch = e.touches[0];
        const diffX = carouselRef.current.touchStartX - touch.clientX;
        const diffY = carouselRef.current.touchStartY - touch.clientY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          // e.preventDefault(); // careful with this in React passive events
        }
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        const diffX = carouselRef.current.touchStartX - touch.clientX;
        const diffY = carouselRef.current.touchStartY - touch.clientY;

        // Horizontal swipe threshold (50px)
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            nextProject(); // Swipe Left -> Next
          } else {
            prevProject(); // Swipe Right -> Prev
          }
        }
      }}
    >
      {/* Top instruction with proper spacing */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 text-[10px] font-bold tracking-widest uppercase text-wqf-light/60 bg-wqf-dark px-4 py-2 border border-wqf-gray mb-4">
        ← Click sides to navigate • Click center to view details →
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevProject();
        }}
        className="absolute left-4 z-10 p-4 bg-wqf-dark border border-wqf-gray text-wqf-light/80 hover:text-wqf-orange hover:bg-wqf-gray transition-all duration-300 wqf-bracket hover:scale-105"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextProject();
        }}
        className="absolute right-4 z-10 p-4 bg-wqf-dark border border-wqf-gray text-wqf-light/80 hover:text-wqf-teal hover:bg-wqf-gray transition-all duration-300 wqf-bracket hover:scale-105"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Background blur for side areas replaced by solid overlays if needed, but none is cleaner */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-wqf-dark to-transparent"></div>
        <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-wqf-dark to-transparent"></div>
      </div>

      {projects.map((project, index) => {
        const position = getProjectPosition(index);
        if (position === 'hidden') return null;

        return (
          <div
            key={index}
            className={`absolute transition-all duration-500 ease-out ${position === 'center'
                ? 'z-20 scale-100 opacity-100 cursor-pointer'
                : 'z-10 scale-90 opacity-50 blur-[2px]'
              } ${position === 'side' && index < currentIndex ? '-translate-x-48' : ''
              } ${position === 'side' && index > currentIndex ? 'translate-x-48' : ''
              }`}
            onClick={(e) => {
              if (position === 'center') {
                e.stopPropagation();
                openProject(index);
              }
            }}
          >
            <div className={`bg-wqf-dark p-8 w-80 min-h-[340px] max-h-[340px] border border-wqf-gray transition-all flex flex-col relative group/card ${
                position === 'center'
                ? 'hover:border-wqf-teal hover:-translate-y-2'
                : 'hover:opacity-70 opacity-30 grayscale'
              }`}>
              <div className="absolute top-0 right-0 w-2 h-2 bg-wqf-teal opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              {/* Fixed height title */}
              <h3 className="text-2xl font-bold font-heading uppercase tracking-wide mb-3 text-white line-clamp-2 min-h-[64px] flex items-start border-b border-wqf-gray pb-2">
                {project.title}
              </h3>

              {/* Fixed height description */}
              <div className="flex-grow mb-4 min-h-[96px] mt-2">
                <p className="text-wqf-light/80 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech tags with consistent spacing */}
              <div className="flex flex-wrap gap-2 mb-6 min-h-[32px] items-center">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-wqf-gray text-wqf-teal font-bold uppercase tracking-widest text-[10px] border border-wqf-gray"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 bg-wqf-gray text-wqf-orange font-bold uppercase tracking-widest text-[10px] border border-wqf-gray">
                    +{project.tech.length - 3} MORE
                  </span>
                )}
              </div>

              {/* CTA button - only on center card */}
              {position === 'center' && (
                <div className="w-full text-center px-4 py-3 bg-transparent text-white font-bold uppercase tracking-widest hover:text-wqf-teal hover:bg-wqf-gray transition-all shadow-none wqf-bracket border border-transparent hover:border-wqf-teal text-xs">
                  Inspect System
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Dots indicator with proper spacing */}
      <div className="absolute bottom-2 flex gap-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToProject(index);
            }}
            className={`h-1 transition-all duration-300 rounded-none ${index === currentIndex
                ? 'w-8 bg-wqf-teal'
                : 'w-4 bg-wqf-gray hover:bg-wqf-light/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;