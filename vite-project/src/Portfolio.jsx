import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code, Cloud, Server, Database, Award, Briefcase, GraduationCap } from 'lucide-react';

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
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
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

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 100)})`;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Main Portfolio Component
const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const theme = darkMode ? 'dark' : 'light';
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';

  const skills = [
    { name: 'Cloud Platforms', items: ['AWS', 'Azure', 'Google Cloud'], icon: Cloud },
    { name: 'DevOps', items: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'], icon: Server },
    { name: 'Programming', items: ['Java', 'Python', 'JavaScript', 'SQL'], icon: Code },
    { name: 'Databases', items: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL'], icon: Database }
  ];

  const projects = [
    {
      title: 'Cloud Infrastructure Automation',
      description: 'Automated deployment pipeline using Terraform and Jenkins for multi-cloud environments',
      tech: ['AWS', 'Terraform', 'Jenkins', 'Docker'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Microservices Architecture',
      description: 'Scalable microservices application deployed on Kubernetes with CI/CD integration',
      tech: ['Java', 'Spring Boot', 'Kubernetes', 'Docker'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Serverless Data Pipeline',
      description: 'Real-time data processing pipeline using AWS Lambda and DynamoDB',
      tech: ['AWS Lambda', 'Python', 'DynamoDB', 'S3'],
      github: '#',
      demo: '#'
    }
  ];

  const journey = [
    { year: '2022', title: 'Started B.Tech in CSE', desc: 'Began journey in Computer Science Engineering' },
    { year: '2023', title: 'Cloud Fundamentals', desc: 'Completed AWS Cloud Practitioner certification' },
    { year: '2024', title: 'Advanced Cloud & DevOps', desc: 'Mastered Kubernetes, Docker, and CI/CD pipelines' },
    { year: '2025', title: 'Final Year & Specialization', desc: 'Focusing on cloud architecture and system design' }
  ];

  return (
    <>
      <Preloader loading={loading} />
      
      <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
        {/* Navigation */}
        <nav className={`fixed w-full z-40 ${cardBg} shadow-lg transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                YourName
              </div>
              
              <div className="hidden md:flex space-x-8">
                {['home', 'skills', 'projects', 'journey', 'contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize hover:text-blue-500 transition ${activeSection === item ? 'text-blue-500' : ''}`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>

              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'skills', 'projects', 'journey', 'contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 capitalize hover:bg-gray-700 rounded"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          <CloudScene />
          <div className="relative z-10 text-center px-4">
            <div className="mb-8 inline-block">
              <div className="text-8xl animate-bounce">☁️</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
              Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Name</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-400">Cloud Engineer & Software Developer</p>
            <p className="text-lg mb-8 text-gray-500 max-w-2xl mx-auto">
              3rd Year B.Tech CSE Student specializing in Cloud Computing, DevOps, and Java Development
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition"
              >
                Hire Me
              </button>
              <a
                href="#"
                className="px-8 py-3 border-2 border-blue-500 rounded-lg font-semibold hover:bg-blue-500 transition flex items-center gap-2"
              >
                <Download size={20} /> Resume
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-blue-500 transition transform hover:scale-110">
                <Github size={28} />
              </a>
              <a href="#" className="hover:text-blue-500 transition transform hover:scale-110">
                <Linkedin size={28} />
              </a>
              <a href="#" className="hover:text-blue-500 transition transform hover:scale-110">
                <Code size={28} />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Technical <span className="text-blue-500">Skills</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`${cardBg} p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300`}
                >
                  <skill.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                  <div className="space-y-2">
                    {skill.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-400">{item}</span>
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
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className={`${cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300`}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Cloud className="w-20 h-20 text-white opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-500 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} className="flex items-center gap-2 text-blue-500 hover:underline">
                        <Github size={18} /> Code
                      </a>
                      <a href={project.demo} className="flex items-center gap-2 text-blue-500 hover:underline">
                        <ExternalLink size={18} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section id="journey" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              My <span className="text-blue-500">Journey</span>
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
              {journey.map((item, idx) => (
                <div key={idx} className={`mb-8 flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <GraduationCap size={16} />
                  </div>
                  <div className={`w-1/2 ${cardBg} p-6 rounded-xl shadow-lg ${idx % 2 === 0 ? 'ml-4' : 'mr-4'}`}>
                    <div className="text-blue-500 font-bold mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gray-800 bg-opacity-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Get In <span className="text-blue-500">Touch</span>
            </h2>
            <div className={`${cardBg} p-8 rounded-xl shadow-lg`}>
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold">Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Message</label>
                  <textarea
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Contact form submitted! (Connect your email service here)');
                  }}
                  className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${cardBg} py-8 text-center`}>
          <p className="text-gray-400">© 2025 Your Name. Built with React & Three.js</p>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;