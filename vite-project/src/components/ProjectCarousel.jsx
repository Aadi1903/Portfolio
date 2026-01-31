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
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 text-sm text-gray-300 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-full border border-gray-600/50 mb-4">
        ← Click sides to navigate • Click center to view details →
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevProject();
        }}
        className="absolute left-4 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-lg hover:bg-gray-700/90 transition-all duration-300 hover:scale-110 shadow-lg"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextProject();
        }}
        className="absolute right-4 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-lg hover:bg-gray-700/90 transition-all duration-300 hover:scale-110 shadow-lg"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Background blur for side areas */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-gray-900/50 to-transparent backdrop-blur-sm"></div>
        <div className="absolute right-0 w-1/3 h-full bg-gradient-to-l from-gray-900/50 to-transparent backdrop-blur-sm"></div>
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
            <div className={`bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 w-80 min-h-[300px] max-h-[300px] border border-gray-600/50 shadow-2xl transition-all duration-300 flex flex-col ${position === 'center'
                ? 'hover:shadow-2xl hover:border-blue-500/50 hover:scale-105'
                : 'hover:opacity-70'
              }`}>
              {/* Fixed height title */}
              <h3 className="text-2xl font-bold mb-3 text-white line-clamp-2 min-h-[64px] flex items-start">
                {project.title}
              </h3>

              {/* Fixed height description */}
              <div className="flex-grow mb-4 min-h-[96px]">
                <p className="text-gray-300 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech tags with consistent spacing */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-[32px] items-center">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>

              {/* CTA button - only on center card */}
              {position === 'center' && (
                <div className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Project Details
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Dots indicator with proper spacing */}
      <div className="absolute bottom-2 flex gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToProject(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125 shadow-lg'
                : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;