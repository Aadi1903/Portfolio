import React from 'react';
import { Home, User, Briefcase, Award, Phone } from 'lucide-react';

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`flex items-center gap-2 p-1.5 rounded-2xl shadow-2xl backdrop-blur-lg ${
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
          className={`p-2.5 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 group`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;