import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code, Cloud, Server, Database, Award, Briefcase, GraduationCap, User, Home, Phone, Star, Zap, Cpu } from 'lucide-react';

// IMPORT THREE.JS
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
          <div className="absolute inset-0 m-auto w-12 h-12 text-blue-500 animate-pulse text-4xl">🚀</div>
        </div>
        <div className="text-2xl font-bold text-white mb-2">{progress}%</div>
        <div className="text-gray-400">Loading Portfolio...</div>
      </div>
    </div>
  );
};

// --- NEW 3D Background Component with blurred orbs ---
const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // === SCENE ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712); // darker background

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 18);

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // === LIGHTS ===
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const point = new THREE.PointLight(0x4fa6ff, 2, 50);
    point.position.set(5, 5, 5);
    scene.add(ambient, point);

    // === MUCH MORE VISIBLE PARTICLES ===
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 60;
    }

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

    // === Floating Glowing Orbs (BLURRED EFFECT) ===
    const orbGeo = new THREE.SphereGeometry(1.2, 32, 32);

    const createOrb = (x, y, z) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x4fa6ff,
        emissive: 0x235dff,
        emissiveIntensity: 0.3, // Reduced intensity for blur effect
        transparent: true,
        opacity: 0.4, // More transparent for blur effect
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

    // === INTERACTION: Mouse Parallax ===
    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    // === ANIMATION LOOP ===
    const animate = () => {
      stars.rotation.y += 0.0008;

      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
        orb.position.x += Math.cos(Date.now() * 0.001 + i) * 0.005;
      });

      camera.position.x += (mouse.x - camera.position.x) * 0.02;
      camera.position.y += (mouse.y - camera.position.y) * 0.02;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === RESIZE ===
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
    };
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

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
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

// NEW: Circular Project Carousel Component
const ProjectCarousel = ({ projects, openProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProjects = projects.length;

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProjects);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProjects) % totalProjects);
  };

  const getProjectPosition = (index) => {
    const diff = (index - currentIndex + totalProjects) % totalProjects;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === totalProjects - 1) return 'side';
    return 'hidden';
  };

  return (
    <div className="relative h-96 flex items-center justify-center">
      {/* Navigation Arrows */}
      <button 
        onClick={prevProject}
        className="absolute left-4 z-10 p-3 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextProject}
        className="absolute right-4 z-10 p-3 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Projects */}
      {projects.map((project, index) => {
        const position = getProjectPosition(index);
        
        if (position === 'hidden') return null;

        return (
          <div
            key={index}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${
              position === 'center' 
                ? 'z-20 scale-100 opacity-100' 
                : 'z-10 scale-75 opacity-40 blur-sm'
            } ${
              position === 'side' && index < currentIndex ? '-translate-x-32' : ''
            } ${
              position === 'side' && index > currentIndex ? 'translate-x-32' : ''
            }`}
            onClick={() => position === 'center' && openProject(index)}
          >
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 w-80 border border-gray-700 shadow-2xl">
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
                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  View Details
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
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

// Modal to show project details
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const openProject = (index) => {
    setModalProject(projects[index]);
  };

  const closeProject = () => setModalProject(null);

  const theme = darkMode ? 'dark' : 'light';
  const bgClass = 'bg-transparent';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = 'bg-transparent backdrop-blur-sm';

  // NEW: Skills without progress bars
  const skills = [
    { 
      category: 'Cloud & DevOps', 
      items: [
        { name: 'AWS', level: 'Expert', icon: Cloud },
        { name: 'Azure', level: 'Proficient', icon: Server },
        { name: 'Docker', level: 'Expert', icon: Cpu },
        { name: 'Kubernetes', level: 'Proficient', icon: Zap },
        { name: 'Terraform', level: 'Proficient', icon: Code },
        { name: 'Jenkins', level: 'Familiar', icon: Database }
      ] 
    },
    { 
      category: 'Programming', 
      items: [
        { name: 'Java', level: 'Expert', icon: Star },
        { name: 'Python', level: 'Proficient', icon: Star },
        { name: 'JavaScript', level: 'Proficient', icon: Star },
        { name: 'SQL', level: 'Expert', icon: Database },
        { name: 'Spring Boot', level: 'Proficient', icon: Code },
        { name: 'React', level: 'Proficient', icon: Code }
      ] 
    },
    { 
      category: 'Databases & Tools', 
      items: [
        { name: 'MongoDB', level: 'Proficient', icon: Database },
        { name: 'PostgreSQL', level: 'Expert', icon: Database },
        { name: 'Redis', level: 'Familiar', icon: Database },
        { name: 'Git', level: 'Expert', icon: Code },
        { name: 'Linux', level: 'Proficient', icon: Cpu },
        { name: 'CI/CD', level: 'Proficient', icon: Zap }
      ] 
    }
  ];

  // Updated projects with more entries for carousel
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
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      detailedDescription: 'Built a complete e-commerce platform with user authentication, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
      features: ['Payment processing', 'User accounts', 'Admin dashboard', 'Product catalog']
    },
    {
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application',
      detailedDescription: 'Developed a mobile app for workout tracking with social features and progress analytics.',
      tech: ['React Native', 'Firebase', 'Redux'],
      github: '#',
      demo: '#',
      features: ['Workout plans', 'Progress tracking', 'Social features', 'Analytics']
    }
  ];

  // Journey reversed (newest to oldest)
  const journey = [
    { year: '2025', title: 'Final Year & Specialization', desc: 'Focusing on cloud architecture and system design patterns', icon: Award },
    { year: '2024', title: 'Advanced Cloud & DevOps', desc: 'Mastered Kubernetes, Docker, and CI/CD pipelines with real-world projects', icon: Server },
    { year: '2023', title: 'Cloud Fundamentals', desc: 'Completed AWS Cloud Practitioner certification and built first cloud project', icon: Cloud },
    { year: '2022', title: 'Started B.Tech in CSE', desc: 'Began journey in Computer Science Engineering with focus on cloud technologies', icon: GraduationCap }
  ];

  // For the timeline animation and syncing line growth with scroll
  const lineRef = useRef(null);
  const journeyRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const journeyEl = journeyRef.current;
      const lineEl = lineRef.current;
      if (!journeyEl || !lineEl) return;

      const rect = journeyEl.getBoundingClientRect();
      const start = Math.max(0, -rect.top + window.innerHeight * 0.15);
      const total = rect.height - window.innerHeight * 0.3;
      const percent = Math.min(1, Math.max(0, start / (total || 1)));

      // set transform scale for the line for smooth sync
      lineEl.style.transform = `scaleY(${percent})`;
      lineEl.style.transformOrigin = 'top';
    };

    // use rAF for smooth updates
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

  return (
    <>
      <Preloader loading={loading} />
      <ScrollProgress />
      {/* Persistent background for ALL sections */}
      <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300 relative overflow-hidden`}>
        <ThreeDBackground />
        <FloatingIcons />

        {/* Navigation Bar */}
        <NavigationBar 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <div className="mb-8 inline-block animate-bounce">
              <div className="text-6xl">🚀</div>
            </div>
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
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg border-2 border-white/20"
              >
                Get In Touch
              </button>
              <a
                href="#"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:shadow-lg text-white"
              >
                <Download size={20} /> Download CV
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section - WITHOUT PROGRESS BARS */}
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
                  <div className="space-y-4">
                    {skillCategory.items.map((skill, skillIdx) => (
                      <div key={skillIdx} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
                        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <skill.icon size={20} className="text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">{skill.name}</span>
                            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                              skill.level === 'Expert' ? 'bg-green-500/20 text-green-400' :
                              skill.level === 'Proficient' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section: NEW CIRCULAR CAROUSEL */}
        <section id="projects" className="py-20 px-4 bg-gray-800 bg-opacity-30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <ProjectCarousel projects={projects} openProject={openProject} />
            <p className="text-sm text-gray-400 mt-8 text-center">
              Use arrows to navigate • {projects.length} projects available
            </p>
          </div>
        </section>

        {/* Journey Timeline - REVERSED ORDER with animation */}
        <section id="journey" className="py-20 px-4">
          <div className="max-w-4xl mx-auto" ref={journeyRef}>
            <h2 className="text-4xl font-bold text-center mb-16">
              My <span className="text-blue-500">Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600" style={{ transformOrigin: 'top', transform: 'scaleY(0)' }} ref={lineRef}></div>
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
                  } ${idx % 2 === 0 ? 'ml-8' : 'mr-8'} transform hover:scale-105 transition-transform duration-300`}> 
                    <div className="text-blue-500 font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section with HOVER EFFECTS */}
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
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                      <Github size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                      <Linkedin size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                      <Mail size={24} className="text-white" />
                    </a>
                    <a href="#" className="group p-4 rounded-full bg-gray-700 hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                      <Code size={24} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${cardBg} py-8 text-center border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className="text-gray-400">
            © 2025 Your Name. Built with React & Tailwind CSS
          </p>
        </footer>
      </div>

      {/* project modal */}
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Portfolio;