import { Cloud, Boxes, Cpu, Zap, Code, Briefcase, FileCode, Wrench, Database, Star, Terminal, GraduationCap, Book, Notebook, Container, BookOpen } from 'lucide-react';

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
    title: 'End-to-End CI/CD Pipeline with Jenkins & Kubernetes',
    description: "Automated full-stack CI/CD pipeline with security scanning, containerization, and K8's deployment",
    detailedDescription: "Designed and implemented a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes. Built a scalable infrastructure with dedicated virtual machines for Jenkins, SonarQube, and Nexus. Automated code integration, testing, security scanning, artifact management, and deployment workflows. Integrated tools like Trivy for vulnerability scanning and SonarQube for code quality analysis. Deployed containerized applications to a Kubernetes cluster with RBAC and secure authentication mechanisms.",
    tech: [
      "Jenkins", "Docker", "Kubernetes", "SonarQube", "Nexus", "Trivy", "Linux", "Git"
    ],
    github: 'https://github.com/Aadi1903/GameReview',
    demo: '#',
    features: [
      "Automated CI/CD pipeline (build, test, deploy)",
      "Kubernetes cluster setup and deployment",
      "Docker-based containerization",
      "Code quality analysis using SonarQube",
      "Vulnerability scanning using Trivy",
      "Artifact management with Nexus",
      "Role-Based Access Control (RBAC) implementation",
      "Secure authentication between Jenkins and Kubernetes",
      "Email notifications for pipeline status",
      "Infrastructure setup using virtual machines"
    ],
  },
  {
    title: "CloudCostLens – AWS Services Recommendation Tool",
    description: "Rule-based AWS services recommendation and cost-planning platform",
    detailedDescription: "Developed a full-stack web application that simplifies AWS architecture selection using a deterministic, rule-based approach. The system analyzes user requirements such as scalability, availability, workload type, and budget to recommend optimized cloud architectures. Includes a clear architecture flow representation to explain service dependencies and cost–performance trade-offs. The application is containerized using Docker, with infrastructure planning defined through Terraform for consistent and reproducible deployments.",
    tech: [
      "Spring Boot",
      "React",
      "Docker",
      "Terraform",
      "Rule-Based Logic",
      "REST APIs",
      "Git/GitHub"
    ],
    github: "https://github.com/Aadi1903/CloudCostLens",
    demo: "https://cloudcostlens.onrender.com",
    features: [
      "Requirement-driven AWS Services recommendations",
      "Rule-based decision engine for service selection",
      "Architecture flow visualization with cost trade-offs",
      "Containerized deployment using Docker",
      "Infrastructure planning using Terraform",
      "Clean and scalable full-stack design"
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
];

export const journey = [
  { year: '2026 - Present', title: 'Pre-Final Year', desc: 'Focused on strengthening core and Cloud/DevOps concepts while building real-world projects and preparing for placements.', icon: Cloud },
  { year: 'Jan 2026', title: 'Infosys Springboard Virtual Intern', desc: 'Completed internship focusing on Java, Spring Boot, and Web Development, gaining hands-on experience in backend development and industry practices.', icon: BookOpen },
  { year: 'Aug 2023', title: 'Started B.Tech in CSE', desc: 'Began my engineering journey with growing interest in cloud technologies.', icon: GraduationCap },
  { year: 'Apr 2023', title: 'Completed Intermediate', desc: 'Started exploring coding, technology basics, and computer fundamentals.', icon: Notebook },
  { year: 'Mar 2020', title: 'Completed High School', desc: 'Developed curiosity for computers and technology.', icon: Book }
];

export const certifications = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    organization: "Amazon Web Services (AWS)",
    issueDate: "Aug 2025",
    description: "Validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
    credentialUrl: "#",
    icon: Cloud,
    highlight: true
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    issueDate: "Jan 2025",
    description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    credentialUrl: "#",
    icon: Zap,
    highlight: false
  },
  {
    title: "Docker Certified Associate (DCA)",
    organization: "Docker",
    issueDate: "Nov 2024",
    description: "Demonstrates proficiency in Docker containerization, orchestration, and security.",
    credentialUrl: "#",
    icon: Boxes,
    highlight: false
  }

];