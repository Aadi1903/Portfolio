import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code, Cloud, Server, Database, Award, Briefcase, GraduationCap, User, Home, Phone } from 'lucide-react';

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

// 3D Cloud Animation Component
const CloudScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((IconComponent, index) => (
        <div
          key={index}
          className="absolute text-blue-500 opacity-20 animate-float"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + Math.sin(index) * 40}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${3 + index * 0.5}s`
          }}
        >
          <IconComponent.icon size={40 + index * 10} />
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
      const progress = (window.pageYOffset / totalHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
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

// Main Portfolio Component
const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'journey', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const theme = darkMode ? 'dark' : 'light';
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';

  const skills = [
    { 
      category: 'Cloud & DevOps', 
      items: [
        { name: 'AWS', level: 90 },
        { name: 'Azure', level: 85 },
        { name: 'Docker', level: 88 },
        { name: 'Kubernetes', level: 85 },
        { name: 'Terraform', level: 82 },
        { name: 'Jenkins', level: 80 }
      ] 
    },
    { 
      category: 'Programming', 
      items: [
        { name: 'Java', level: 92 },
        { name: 'Python', level: 88 },
        { name: 'JavaScript', level: 85 },
        { name: 'SQL', level: 90 },
        { name: 'Spring Boot', level: 87 },
        { name: 'React', level: 83 }
      ] 
    },
    { 
      category: 'Databases & Tools', 
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'Redis', level: 80 },
        { name: 'Git', level: 90 },
        { name: 'Linux', level: 85 },
        { name: 'CI/CD', level: 82 }
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
    { year: '2022', title: 'Started B.Tech in CSE', desc: 'Began journey in Computer Science Engineering with focus on cloud technologies', icon: GraduationCap },
    { year: '2023', title: 'Cloud Fundamentals', desc: 'Completed AWS Cloud Practitioner certification and built first cloud project', icon: Cloud },
    { year: '2024', title: 'Advanced Cloud & DevOps', desc: 'Mastered Kubernetes, Docker, and CI/CD pipelines with real-world projects', icon: Server },
    { year: '2025', title: 'Final Year & Specialization', desc: 'Focusing on cloud architecture and system design patterns', icon: Award }
  ];

  return (
    <>
      <Preloader loading={loading} />
      <ScrollProgress />
      
      <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
        {/* Navigation Bar */}
        <NavigationBar 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <CloudScene />
          <FloatingIcons />
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <div className="mb-8 inline-block animate-bounce">
              <div className="text-6xl">🚀</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Name</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-400 font-light">
              Cloud Engineer & Full Stack Developer
            </p>
            <p className="text-lg mb-8 text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Passionate about building scalable cloud solutions and creating exceptional digital experiences
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Get In Touch
              </button>
              <a
                href="#"
                className="px-8 py-4 border-2 border-blue-500 rounded-xl font-semibold hover:bg-blue-500 transition-all duration-300 flex items-center gap-2 hover:shadow-lg"
              >
                <Download size={20} /> Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-8">
              <a href="#" className="group p-4 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <Github size={24} className="group-hover:text-white" />
              </a>
              <a href="#" className="group p-4 rounded-full bg-gray-800 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <Linkedin size={24} className="group-hover:text-white" />
              </a>
              <a href="#" className="group p-4 rounded-full bg-gray-800 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <Mail size={24} className="group-hover:text-white" />
              </a>
              <a href="#" className="group p-4 rounded-full bg-gray-800 hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <Code size={24} className="group-hover:text-white" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
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
                      <div key={skillIdx} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-300">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-gray-800 bg-opacity-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`${cardBg} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  } ${expandedProject === idx ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleProject(idx)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-500 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`transform transition-transform duration-300 ${
                        expandedProject === idx ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedProject === idx && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="border-t border-gray-700 pt-6">
                        <h4 className="text-lg font-semibold mb-3">Project Details</h4>
                        <p className="text-gray-400 mb-4 leading-relaxed">{project.detailedDescription}</p>
                        
                        <div className="mb-4">
                          <h5 className="font-semibold mb-2">Key Features:</h5>
                          <div className="grid md:grid-cols-2 gap-2">
                            {project.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-400">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <a href={project.github} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                            <Github size={18} /> View Code
                          </a>
                          <a href={project.demo} className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                            <ExternalLink size={18} /> Live Demo
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section id="journey" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              My <span className="text-blue-500">Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              {journey.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`mb-12 flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center animate-fade-in-up`}
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

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-gray-800 bg-opacity-50">
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
                    <a href="#" className="group p-3 rounded-full bg-gray-700 hover:bg-blue-500 transition-all duration-300">
                      <Github size={20} className="group-hover:text-white" />
                    </a>
                    <a href="#" className="group p-3 rounded-full bg-gray-700 hover:bg-blue-600 transition-all duration-300">
                      <Linkedin size={20} className="group-hover:text-white" />
                    </a>
                    <a href="#" className="group p-3 rounded-full bg-gray-700 hover:bg-red-500 transition-all duration-300">
                      <Mail size={20} className="group-hover:text-white" />
                    </a>
                    <a href="#" className="group p-3 rounded-full bg-gray-700 hover:bg-orange-500 transition-all duration-300">
                      <Code size={20} className="group-hover:text-white" />
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Portfolio;