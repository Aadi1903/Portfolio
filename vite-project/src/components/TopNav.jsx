import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Award, GraduationCap, Phone, Menu, X } from 'lucide-react';

const TopNav = ({ activeSection, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const sections = [
    { id: 'home',           label: 'Home' },
    { id: 'about',          label: 'About' },
    { id: 'skills',         label: 'Skills' },
    { id: 'projects',       label: 'Work' },
    // { id: 'certifications', label: 'Certs' },
    { id: 'journey',        label: 'Journey' },
    { id: 'contact',        label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-wqf-dark/90 backdrop-blur-md border-b border-wqf-gray' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo / monogram */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 border-2 border-wqf-teal flex items-center justify-center font-black text-wqf-teal text-sm group-hover:bg-wqf-teal group-hover:text-wqf-dark transition-all duration-300">
              AJ
            </div>
            <span className="font-black uppercase tracking-widest text-xs text-wqf-light/60 hidden sm:block">
              Aadi Jain
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-wqf-teal'
                    : 'text-wqf-light/40 hover:text-wqf-light'
                }`}
              >
                {activeSection === id && (
                  <span className="text-wqf-orange mr-1">/</span>
                )}
                {label}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="/Aadi Jain-CV.pdf"
            download
            className="hidden md:flex wqf-bracket px-4 py-2 text-xs font-black uppercase tracking-widest border border-wqf-gray hover:border-wqf-teal hover:text-wqf-teal text-wqf-light/60 transition-all"
          >
            Resume ↓
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-wqf-light/60 hover:text-wqf-teal transition-colors"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-wqf-dark/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { scrollToSection(id); setMenuOpen(false); }}
              className={`text-2xl font-black uppercase tracking-widest transition-colors ${
                activeSection === id ? 'text-wqf-teal' : 'text-wqf-light/60 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default TopNav;
