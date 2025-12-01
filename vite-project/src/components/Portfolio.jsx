import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Download, Code } from 'lucide-react';

// Import components
import Preloader from './Preloader';
import AnimatedCloud from './AnimatedCloud';
import ThreeDBackground from './ThreeDBackground';
import FloatingIcons from './FloatingIcons';
import ScrollProgress from './ScrollProgress';
import NavigationBar from './NavigationBar';
import CustomCursor from './CustomCursor';
import ProjectCarousel from './ProjectCarousel';
import ProjectModal from './ProjectModal';

// Import data
import { skills, projects, journey } from '../data/portfolioData';

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
              Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Aadi Jain</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 text-white font-light bg-black/30 backdrop-blur-sm p-4 rounded-2xl inline-block">
              Cloud Engineer & Full Stack Developer
            </p>
            
            <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed bg-black/30 backdrop-blur-sm p-6 rounded-2xl">
              Building reliable cloud architectures and intuitive full-stack solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg border-2 border-white/20 hoverable"
              >
                Get In Touch
              </button>
              <a
                href="public/CA.pdf" download
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
          {/* <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-blue-500/10 to-purple-600/10 backdrop-blur-xl rounded-3xl"></div>
          </div> */}
          
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
                  <img
                src="logo.png"
                alt="Aadi Jain"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-2 border-white shadow-md"
/>

                  <h3 className="text-2xl font-bold text-center mb-4">Aadi Jain</h3>
                  <p className="text-gray-400 text-center mb-6">
                    Cloud Engineer & Software Developer
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    I’m a 3rd-year Computer Science student who loves turning ideas into scalable, 
                    cloud-powered systems. From AWS and Kubernetes to Java backend development, 
                    I enjoy crafting solutions that are efficient, reliable, and meaningful. 
                    Always learning. Always building.
                  </p>
                  <div className="flex justify-center gap-6">
                    <a href="https://github.com/Aadi1903" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Github size={24} className="text-white" />
                    </a>
                    <a href="https://www.linkedin.com/in/aadi-jain01/" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Linkedin size={24} className="text-white" />
                    </a>
                    <a href="mailto:aadiijain03@gmail.com" className="group p-4 rounded-full bg-gray-700 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
                      <Mail size={24} className="text-white" />
                    </a>
                    <a href="https://leetcode.com/u/Aadi0324/" target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-gray-700 hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hoverable">
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

    <div
      className={`${cardBg} p-8 rounded-2xl shadow-xl border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      {/* Web3Forms FORM START */}
      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="space-y-6"
      >
        {/* REQUIRED HIDDEN ACCESS KEY */}
        <input
          type="hidden"
          name="access_key"
          value="950c6c6e-ae89-419a-adaf-9a0629049476"
        />

        <div>
          <label className="block mb-3 font-semibold text-lg">Name</label>
          <input
            type="text"
            name="name"
            required
            className={`w-full px-4 py-4 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-lg">Email</label>
          <input
            type="email"
            name="email"
            required
            className={`w-full px-4 py-4 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-lg">Message</label>
          <textarea
            rows="6"
            name="message"
            required
            className={`w-full px-4 py-4 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none`}
            placeholder="Your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg hoverable"
        >
          Send Message
        </button>
      </form>
      {/* Web3Forms FORM END */}

    </div>
  </div>
  
</section>



        <footer className={`${cardBg} py-8 text-center border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className="text-gray-400">
            © 2025 Aadi Jain. Built with React & Tailwind CSS
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