import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code, Cloud, Server, Database, Award, Briefcase, GraduationCap, User, Home, Phone, Star, Zap, Cpu } from 'lucide-react';

// Preloader Component
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="animate-spin" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8"/>
            <circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke="url(#gradient)" strokeWidth="8"
              strokeDasharray={`${progress * 2.83} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <Cloud className="absolute inset-0 m-auto w-12 h-12 text-blue-500 animate-pulse" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">{progress}%</div>
        <div className="text-gray-400">Loading Portfolio...</div>
      </div>
    </div>
  );
};

// Animated Cloud Component
const AnimatedCloud = () => {
  return (
    <div className="relative mb-8">
      <div className="relative w-24 h-24 mx-auto">
        {/* Main Cloud Body */}
        <div className="absolute inset-0 animate-float">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full filter drop-shadow-lg"
          >
            {/* Cloud shape with hand-drawn style */}
            <path
              d="M25,40 
                 Q15,30 25,20 
                 Q35,10 45,15 
                 Q55,5 65,10 
                 Q75,5 85,15 
                 Q95,25 85,35 
                 Q95,45 85,55 
                 Q75,65 65,60 
                 Q55,75 45,70 
                 Q35,75 25,65 
                 Q15,55 25,40"
              fill="url(#cloudGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Animated outline to simulate drawing */}
            <path
              d="M25,40 
                 Q15,30 25,20 
                 Q35,10 45,15 
                 Q55,5 65,10 
                 Q75,5 85,15 
                 Q95,25 85,35 
                 Q95,45 85,55 
                 Q75,65 65,60 
                 Q55,75 45,70 
                 Q35,75 25,65 
                 Q15,55 25,40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              className="animate-draw"
            />
            
            {/* Soft glow effect */}
            <defs>
              <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
        
        {/* Floating particles around cloud */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-4 -right-3 w-2 h-2 bg-blue-200 rounded-full animate-bounce opacity-80"></div>
      </div>
    </div>
  );
};

// Optimized 3D Background Component
const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const frameRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Import Three.js dynamically to reduce initial bundle
    Promise.all([
      import('three'),
      import('three/examples/jsm/controls/OrbitControls.js')
    ]).then(([THREE, { OrbitControls }]) => {
      
      // === SCENE ===
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x030712);

      // === CAMERA ===
      const camera = new THREE.PerspectiveCamera(
        65,
        window.innerWidth / window.innerHeight,
        0.1,
        200
      );
      camera.position.set(0, 0, 18);

      // === RENDERER ===
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // === LIGHTS ===
      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      const point = new THREE.PointLight(0x4fa6ff, 2, 50);
      point.position.set(5, 5, 5);
      scene.add(ambient, point);

      // === OPTIMIZED PARTICLES ===
      const starCount = 800;
      const starPositions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 60;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

      const starMat = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x8ab6ff,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // === Floating Glowing Orbs ===
      const orbGeo = new THREE.SphereGeometry(1.2, 16, 16);

      const createOrb = (x, y, z) => {
        const mat = new THREE.MeshStandardMaterial({
          color: 0x4fa6ff,
          emissive: 0x235dff,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.4,
        });
        const orb = new THREE.Mesh(orbGeo, mat);
        orb.position.set(x, y, z);
        scene.add(orb);
        return orb;
      };

      const orbs = [
        createOrb(-5, 3, -5),
        createOrb(4, -2, -7),
        createOrb(0, 5, -4),
      ];

      // === OPTIMIZED MOUSE PARALLAX ===
      const mouse = { x: 0, y: 0 };
      let targetX = 0, targetY = 0;
      
      const handleMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // === OPTIMIZED ANIMATION LOOP ===
      const clock = new THREE.Clock();
      
      const animate = () => {
        const delta = clock.getDelta();
        
        // Smooth camera movement with lerp
        targetX += (mouse.x - targetX) * 0.02;
        targetY += (mouse.y - targetY) * 0.02;
        
        camera.position.x = targetX;
        camera.position.y = targetY;

        // Optimized rotations and animations
        stars.rotation.y += 0.0008 * delta * 60;

        const time = Date.now() * 0.001;
        orbs.forEach((orb, i) => {
          orb.position.y += Math.sin(time + i) * 0.01;
          orb.position.x += Math.cos(time + i) * 0.005;
        });

        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        frameRef.current = requestAnimationFrame(animate);
      };
      
      animate();

      // === OPTIMIZED RESIZE HANDLER ===
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("mousemove", handleMouseMove);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      };
    });

  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-20"></div>;
};

// Floating Icons Component
const FloatingIcons = () => {
  const icons = [
    { icon: Cloud, name: 'aws' },
    { icon: Code, name: 'code' },
    { icon: Server, name: 'server' },
    { icon: Database, name: 'database' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {icons.map((IconComponent, index) => (
        <div
          key={index}
          className="absolute text-blue-500 opacity-20 animate-float"
          style={{
            left: `${12 + index * 22}%`,
            top: `${20 + Math.sin(index) * 30}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + index * 0.6}s`
          }}
        >
          <IconComponent.icon size={40 + index * 8} />
        </div>
      ))}
    </div>
  );
};

// Progress Bar Component
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
      setProgress(progress);
    };

    // Throttle scroll events
    let ticking = false;
    const throttledUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-700">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Navigation Bar Component
const NavigationBar = ({ activeSection, scrollToSection, darkMode, setDarkMode }) => {
  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'journey', label: 'Journey', icon: Award },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`flex items-center gap-2 p-2 rounded-2xl shadow-2xl backdrop-blur-lg ${
        darkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-[70px] group ${
              activeSection === id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
        
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 group`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

// HIGHLY OPTIMIZED Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);
  const rafRef = useRef();
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Throttled mouse move handler
    let ticking = false;
    
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          
          // Check if hovering over clickable elements
          const target = e.target;
          const isClickable = 
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a') ||
            target.classList.contains('hoverable');
          
          setIsHovering(isClickable);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Hide default cursor and add hoverable class to interactive elements
    document.body.style.cursor = 'none';
    const hoverables = document.querySelectorAll('button, a, [role="button"]');
    hoverables.forEach(el => {
      el.classList.add('hoverable');
    });

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Highly optimized cursor animation with frame rate limiting
  useEffect(() => {
    const animateCursor = (currentTime) => {
      if (!bigBallRef.current || !smallBallRef.current) {
        rafRef.current = requestAnimationFrame(animateCursor);
        return;
      }

      // Limit frame rate for better performance
      if (currentTime - lastTimeRef.current < 16) { // ~60fps
        rafRef.current = requestAnimationFrame(animateCursor);
        return;
      }
      lastTimeRef.current = currentTime;

      const bigBall = bigBallRef.current;
      const smallBall = smallBallRef.current;
      
      // Get current positions with fallbacks
      const currentBigX = parseFloat(bigBall.style.left) || position.x - 15;
      const currentBigY = parseFloat(bigBall.style.top) || position.y - 15;
      
      // Smooth interpolation for big ball with easing
      const bigX = currentBigX + (position.x - 15 - currentBigX) * 0.2;
      const bigY = currentBigY + (position.y - 15 - currentBigY) * 0.2;
      
      bigBall.style.left = `${bigX}px`;
      bigBall.style.top = `${bigY}px`;
      
      // Small ball follows with less delay for snappy feel
      const currentSmallX = parseFloat(smallBall.style.left) || position.x - 5;
      const currentSmallY = parseFloat(smallBall.style.top) || position.y - 5;
      
      const smallX = currentSmallX + (position.x - 5 - currentSmallX) * 0.5;
      const smallY = currentSmallY + (position.y - 5 - currentSmallY) * 0.5;
      
      smallBall.style.left = `${smallX}px`;
      smallBall.style.top = `${smallY}px`;
      
      // Transform effects with smooth transitions
      if (isHovering) {
        bigBall.style.transform = 'scale(1.8)';
        bigBall.style.opacity = '0.6';
        smallBall.style.transform = 'scale(1.3)';
      } else {
        bigBall.style.transform = 'scale(1)';
        bigBall.style.opacity = '0.4';
        smallBall.style.transform = 'scale(1)';
      }
      
      rafRef.current = requestAnimationFrame(animateCursor);
    };
    
    rafRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position, isHovering]);

  return (
    <>
      <div ref={bigBallRef} className="fixed w-8 h-8 pointer-events-none z-[1000] mix-blend-difference transition-all duration-150 ease-out opacity-40">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="7" strokeWidth="0" className="fill-white"></circle>
        </svg>
      </div>
      
      <div ref={smallBallRef} className="fixed w-3 h-3 pointer-events-none z-[1001] mix-blend-difference transition-all duration-100 ease-out">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="2" strokeWidth="0" className="fill-white"></circle>
        </svg>
      </div>
    </>
  );
};

// Project Carousel Component
const ProjectCarousel = ({ projects, openProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const totalProjects = projects.length;

  const nextProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalProjects]);

  const prevProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalProjects]);

  const goToProject = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
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
      className="relative h-96 flex items-center justify-center cursor-pointer"
      onClick={handleCarouselClick}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          prevProject();
        }}
        className="absolute left-4 z-10 p-3 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-all duration-300"
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
        className="absolute right-4 z-10 p-3 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-sm text-gray-400 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
        ← Click sides to navigate • Click center to view details →
      </div>

      {projects.map((project, index) => {
        const position = getProjectPosition(index);
        if (position === 'hidden') return null;

        return (
          <div
            key={index}
            className={`absolute transition-all duration-500 ease-in-out ${
              position === 'center' 
                ? 'z-20 scale-100 opacity-100 cursor-pointer' 
                : 'z-10 scale-75 opacity-40 blur-sm'
            } ${
              position === 'side' && index < currentIndex ? '-translate-x-32' : ''
            } ${
              position === 'side' && index > currentIndex ? 'translate-x-32' : ''
            }`}
            onClick={(e) => {
              if (position === 'center') {
                e.stopPropagation();
                openProject(index);
              }
            }}
          >
            <div className={`bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 w-80 border border-gray-700 shadow-2xl transition-all duration-300 ${
              position === 'center' ? 'hover:shadow-2xl hover:border-blue-500/50' : ''
            }`}>
              <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
              {position === 'center' && (
                <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-center text-white">
                  Click to View Details
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-4 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToProject(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-500 scale-125' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Component
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">✕</button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.detailedDescription}</p>
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Key Features:</h5>
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
          <a href={project.github} className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:opacity-90 transition-colors">
            <Github size={18} /> View Code
          </a>
          <a href={project.demo} className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-white">
            <ExternalLink size={18} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [modalProject, setModalProject] = useState(null);
  const lineRef = useRef(null);
  const journeyRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'journey', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Timeline animation effect
  useEffect(() => {
    const onScroll = () => {
      const journeyEl = journeyRef.current;
      const lineEl = lineRef.current;
      if (!journeyEl || !lineEl) return;

      const rect = journeyEl.getBoundingClientRect();
      const start = Math.max(0, -rect.top + window.innerHeight * 0.15);
      const total = rect.height - window.innerHeight * 0.3;
      const percent = Math.min(1, Math.max(0, start / (total || 1)));

      lineEl.style.transform = `scaleY(${percent})`;
      lineEl.style.transformOrigin = 'top';
    };

    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  }, []);

  const openProject = useCallback((index) => {
    setModalProject(projects[index]);
  }, []);

  const closeProject = useCallback(() => setModalProject(null), []);

  const theme = darkMode ? 'dark' : 'light';
  const bgClass = 'bg-transparent';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = 'bg-transparent backdrop-blur-sm';

  const skills = [
    { 
      category: 'Cloud & DevOps', 
      items: [
        { name: 'AWS', icon: Cloud },
        { name: 'Azure', icon: Server },
        { name: 'Docker', icon: Cpu },
        { name: 'Kubernetes', icon: Zap },
        { name: 'Terraform', icon: Code },
        { name: 'Jenkins', icon: Database }
      ] 
    },
    { 
      category: 'Programming', 
      items: [
        { name: 'Java', icon: Star },
        { name: 'Python', icon: Star },
        { name: 'JavaScript', icon: Star },
        { name: 'SQL', icon: Database },
        { name: 'Spring Boot', icon: Code },
        { name: 'React', icon: Code }
      ] 
    },
    { 
      category: 'Databases & Tools', 
      items: [
        { name: 'MongoDB', icon: Database },
        { name: 'PostgreSQL', icon: Database },
        { name: 'Redis', icon: Database },
        { name: 'Git', icon: Code },
        { name: 'Linux', icon: Cpu },
        { name: 'CI/CD', icon: Zap }
      ] 
    }
  ];

  const projects = [
    {
      title: 'Cloud Infrastructure Automation',
      description: 'Automated deployment pipeline using Terraform and Jenkins for multi-cloud environments',
      detailedDescription: 'Developed a comprehensive infrastructure-as-code solution that automates the deployment of cloud resources across AWS and Azure. The pipeline includes automated testing, security scanning, and rollback capabilities.',
      tech: ['AWS', 'Terraform', 'Jenkins', 'Docker', 'Python'],
      github: '#',
      demo: '#',
      features: ['Multi-cloud deployment', 'Auto-scaling', 'Cost optimization', 'Security compliance']
    },
    {
      title: 'Microservices Architecture',
      description: 'Scalable microservices application deployed on Kubernetes with CI/CD integration',
      detailedDescription: 'Built a distributed system using Spring Boot microservices with service discovery, API gateway, and centralized logging. Implemented Kubernetes orchestration with horizontal pod autoscaling.',
      tech: ['Java', 'Spring Boot', 'Kubernetes', 'Docker', 'Redis'],
      github: '#',
      demo: '#',
      features: ['Service mesh', 'Circuit breaker', 'Distributed tracing', 'Health monitoring']
    },
    {
      title: 'Serverless Data Pipeline',
      description: 'Real-time data processing pipeline using AWS Lambda and DynamoDB',
      detailedDescription: 'Designed and implemented a serverless architecture for real-time data processing with AWS Lambda, API Gateway, and DynamoDB. The system handles millions of events daily with sub-second latency.',
      tech: ['AWS Lambda', 'Python', 'DynamoDB', 'S3', 'CloudWatch'],
      github: '#',
      demo: '#',
      features: ['Real-time processing', 'Auto-scaling', 'Cost-effective', 'High availability']
    }
  ];

  const journey = [
    { year: '2025', title: 'Final Year & Specialization', desc: 'Focusing on cloud architecture and system design patterns', icon: Award },
    { year: '2024', title: 'Advanced Cloud & DevOps', desc: 'Mastered Kubernetes, Docker, and CI/CD pipelines with real-world projects', icon: Server },
    { year: '2023', title: 'Cloud Fundamentals', desc: 'Completed AWS Cloud Practitioner certification and built first cloud project', icon: Cloud },
    { year: '2022', title: 'Started B.Tech in CSE', desc: 'Began journey in Computer Science Engineering with focus on cloud technologies', icon: GraduationCap }
  ];

  return (
    <>
      <Preloader loading={loading} />
      <ScrollProgress />
      <CustomCursor />
      
      <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300 relative overflow-hidden cursor-none`}>
        <ThreeDBackground />
        <FloatingIcons />

        <NavigationBar 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Home Section with Animated Cloud */}
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <AnimatedCloud />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Name</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 text-white font-light bg-black/30 backdrop-blur-sm p-4 rounded-2xl inline-block">
              Cloud Engineer & Full Stack Developer
            </p>
            
            <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed bg-black/30 backdrop-blur-sm p-6 rounded-2xl">
              Passionate about building scalable cloud solutions and creating exceptional digital experiences
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg border-2 border-white/20 hoverable"
              >
                Get In Touch
              </button>
              <a
                href="#"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:shadow-lg text-white hoverable"
              >
                <Download size={20} /> Download CV
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Technical <span className="text-blue-500">Expertise</span>
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {skills.map((skillCategory, categoryIdx) => (
                <div
                  key={categoryIdx}
                  className={`${cardBg} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-6 text-blue-500 text-center">
                    {skillCategory.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skillCategory.items.map((skill, skillIdx) => (
                      <div key={skillIdx} className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-center">
                        <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300 mb-3">
                          <skill.icon size={24} className="text-blue-400" />
                        </div>
                        <span className="font-medium text-white text-sm">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4 bg-gray-800 bg-opacity-30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <ProjectCarousel projects={projects} openProject={openProject} />
          </div>
        </section>

        {/* Journey Timeline with restored animation and blur effect */}
        <section id="journey" className="py-20 px-4 relative">
          {/* Background blur container - only behind the timeline */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-blue-500/10 to-purple-600/10 backdrop-blur-xl rounded-3xl"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10" ref={journeyRef}>
            <h2 className="text-4xl font-bold text-center mb-16">
              My <span className="text-blue-500">Journey</span>
            </h2>
            <div className="relative">
              {/* Central line with animation */}
              <div 
                ref={lineRef}
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 transition-transform duration-300"
                style={{ transformOrigin: 'top', transform: 'scaleY(0)' }}
              ></div>
              
              {journey.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`mb-12 flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center animate-slide-in-up`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 flex items-center justify-center z-10 shadow-lg">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div className={`w-1/2 ${cardBg} p-6 rounded-2xl shadow-lg border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  } ${idx % 2 === 0 ? 'ml-8' : 'mr-8'} transform hover:scale-105 transition-transform duration-300 backdrop-blur-md`}>
                    <div className="text-blue-500 font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-gray-800 bg-opacity-30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              About <span className="text-blue-500">Me</span>
            </h2>
            <div className={`${cardBg} rounded-2xl shadow-xl p-8 border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                    YN
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Your Name</h3>
                  <p className="text-gray-400 text-center mb-6">
                    Cloud Engineer & Software Developer
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    I'm a passionate 3rd year B.Tech CSE student specializing in Cloud Computing and DevOps. 
                    I love building scalable, efficient solutions that solve real-world problems. With expertise 
                    in AWS, Kubernetes, and modern development practices, I'm always eager to take on new challenges 
                    and learn cutting-edge technologies.
                  </p>
                  <div className="flex justify-center gap-6">
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Github size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Linkedin size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Mail size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Code size={24} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Get In <span className="text-blue-500">Touch</span>
            </h2>
            <div className={`${cardBg} p-8 rounded-2xl shadow-xl border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 font-semibold text-lg">Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-3 font-semibold text-lg">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-3 font-semibold text-lg">Message</label>
                  <textarea
                    rows="6"
                    className={`w-full px-4 py-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none`}
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Contact form submitted! (Connect your email service here)');
                  }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg hoverable"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className={`${cardBg} py-8 text-center border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className="text-gray-400">
            © 2025 Your Name. Built with React & Tailwind CSS
          </p>
        </footer>
      </div>

      <ProjectModal project={modalProject} onClose={closeProject} />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(-1deg); }
          66% { transform: translateY(-5px) rotate(1deg); }
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-draw {
          animation: draw 2s ease-in-out forwards;
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Portfolio;