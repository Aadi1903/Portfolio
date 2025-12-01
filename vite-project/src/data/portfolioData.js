import { Cloud, Boxes, Cpu, Zap, Code, Briefcase, FileCode, Wrench, Database, Star, Terminal, GraduationCap, Book, Notebook, Container } from 'lucide-react';

export const skills = [
  { 
    category: 'Cloud & DevOps', 
    items: [
      { name: 'AWS', icon: Cloud },
      { name: 'Azure', icon: Cloud },
      { name: 'Docker', icon: Cpu },
      { name: 'Kubernetes', icon: Boxes },
      { name: 'Terraform', icon: Code },
      { name: 'GitHub Actions', icon: Code }
    ] 
  },
  { 
    category: 'Programming', 
    items: [
      { name: 'Java', icon: Star },
      { name: 'C++', icon: Star },
      { name: 'Microservices', icon: Code },
      { name: 'SQL', icon: Database },
      { name: 'Spring Boot', icon: Code },
      { name: 'React', icon: Code }
    ] 
  },
  { 
    category: 'Tools & Frameworks', 
    items: [
      { name: 'CI/CD', icon: Zap },
      { name: 'Maven', icon: Wrench },
      { name: 'Git', icon: Code },
      { name: 'Linux', icon: Cpu },
      { name: 'Bash', icon: Terminal },
      { name: 'YAML', icon: FileCode }
    ] 
  }
];

export const projects = [
  {
  title: 'Dice Game – Java Swing',
description: 'Interactive multiplayer dice game with animations and custom rules',
detailedDescription: 'Built a desktop Dice Game using Java and Swing with support for multiple players, customizable rounds and target scores, animated dice rolls, synchronized sound effects, and a live scoreboard with leaderboard. The project applies object-oriented design, event-driven programming, and clean modular architecture to deliver a smooth and engaging gameplay experience.',
tech: ['Java', 'Java Swing', 'OOP', 'DSA (Java)', 'Git/GitHub'],
github: 'https://github.com/Aadi1903/Dice-Game',
demo: '#',
features: [
'Multiplayer gameplay with custom settings',
'Animated dice roll and sound effects',
'Real-time score tracking and leaderboard',
'Multiple winning conditions (highest score, lucky six, exact target)',
'Modular, maintainable Java Swing architecture'
]
},
{
  title: "SpeakPeak AI Mock Interview",
  description: "AI-powered mock interview platform with real-time voice interaction and personalized feedback",
  detailedDescription: "Developed a full-stack AI mock interview platform using Next.js 14, TypeScript, and VAPI voice AI. The system conducts realistic technical interviews with voice interaction, provides real-time feedback, and generates comprehensive performance analysis. Features include multi-language support, role-based interviews, and detailed analytics dashboard.",
  tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "VAPI AI", "WebRTC", "Node.js", "MongoDB", "Shadcn/ui"],
  github: "https://github.com/Aadi1903/SpeakPeak",
  demo: "#",
  features: [
    "Real-time voice AI interviews",
    "Personalized feedback generation",
    "Multi-language support",
    "Technical & behavioral questions",
    "Performance analytics dashboard",
    "Role-based interview scenarios"
  ],
},
 {
  title: "EcoThread Advisor – Dockerized Chatbot",
  description: "AI-powered sustainable fashion advisor with real-time chat interface",
  detailedDescription: "Developed a full-stack web application using Streamlit that provides personalized sustainable fashion recommendations through AI integration. Features secure user authentication, real-time chat interface, and data export capabilities. Containerized with Docker for consistent deployment across environments.",
  tech: ["Python", "Docker", "Streamlit", "SQLite", "OpenRouter API", "bcrypt", "Pandas"],
  github: "https://github.com/Aadi1903/EcoThread-Advisor",
  demo: "#", 
  features: ["Real-time AI Chat", "User Authentication", "Data Export", "Responsive UI", "Session Management"]
}
];

export const journey = [
  { year: 'Nov 2025', title: 'Pre-Final Year & Infosys Intern', desc: 'Simultaneously pursuing academic growth while interning at Infosys Springboard, focusing on Java, Spring Boot, and Web development.', icon: Cloud },
  { year: 'Aug 2023', title: 'Started B.Tech in CSE', desc: 'Began my engineering journey with growing interest in cloud technologies.', icon: GraduationCap },
  { year: 'Apr 2023', title: 'Completed Intermediate', desc: 'Started exploring coding, technology basics, and computer fundamentals.', icon: Notebook  },
  { year: 'Mar 2020', title: 'Completed High School', desc: 'Developed curiosity for computers and technology.', icon: Book }
];