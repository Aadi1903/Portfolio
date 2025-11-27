import React from 'react';
import { Cloud, Code, Server, Database } from 'lucide-react';

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

export default FloatingIcons;