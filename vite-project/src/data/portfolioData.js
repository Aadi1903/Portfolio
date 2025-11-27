import { Cloud, Server, Cpu, Zap, Code, Database, Star, Award, GraduationCap } from 'lucide-react';

export const skills = [
  { 
    category: 'Cloud & DevOps', 
    items: [
      { name: 'AWS', icon: Cloud },
      { name: 'Azure', icon: Server },
      { name: 'Docker', icon: Cpu },
      { name: 'Kubernetes', icon: Zap },
      { name: 'Terraform', icon: Code },
      { name: 'Jenkins', icon: Database }
    ] 
  },
  { 
    category: 'Programming', 
    items: [
      { name: 'Java', icon: Star },
      { name: 'Python', icon: Star },
      { name: 'JavaScript', icon: Star },
      { name: 'SQL', icon: Database },
      { name: 'Spring Boot', icon: Code },
      { name: 'React', icon: Code }
    ] 
  },
  { 
    category: 'Databases & Tools', 
    items: [
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Redis', icon: Database },
      { name: 'Git', icon: Code },
      { name: 'Linux', icon: Cpu },
      { name: 'CI/CD', icon: Zap }
    ] 
  }
];

export const projects = [
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

export const journey = [
  { year: '2025', title: 'Final Year & Specialization', desc: 'Focusing on cloud architecture and system design patterns', icon: Award },
  { year: '2024', title: 'Advanced Cloud & DevOps', desc: 'Mastered Kubernetes, Docker, and CI/CD pipelines with real-world projects', icon: Server },
  { year: '2023', title: 'Cloud Fundamentals', desc: 'Completed AWS Cloud Practitioner certification and built first cloud project', icon: Cloud },
  { year: '2022', title: 'Started B.Tech in CSE', desc: 'Began journey in Computer Science Engineering with focus on cloud technologies', icon: GraduationCap }
];