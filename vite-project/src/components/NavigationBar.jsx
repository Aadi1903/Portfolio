import React from 'react';
import { Home, User, Briefcase, Award, Phone, GraduationCap } from 'lucide-react';

const NavigationBar = ({ activeSection, scrollToSection, darkMode, setDarkMode }) => {
  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'journey', label: 'Journey', icon: GraduationCap },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 p-1 bg-wqf-dark/90 backdrop-blur-lg border border-wqf-gray wqf-bracket">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`flex flex-col items-center p-3 transition-colors duration-300 min-w-[70px] group ${
              activeSection === id 
                ? 'text-wqf-orange bg-wqf-gray' 
                : 'text-wqf-light/60 hover:text-wqf-teal hover:bg-wqf-gray'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{label}</span>
          </button>
        ))}
        
        <div className="h-6 w-px bg-wqf-gray mx-1" />
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 transition-colors duration-300 hover:bg-wqf-gray text-wqf-light/60 hover:text-wqf-teal group flex flex-col items-center min-w-[70px]"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
          <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{darkMode ? 'LIGHT' : 'DARK'}</span>
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;