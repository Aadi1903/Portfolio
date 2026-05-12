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
    title: 'CloudCostLens – Cloud Architecture Recommendation & Cost Optimization Platform',
    description: "Production-grade cloud recommendation platform with Terraform automation, Kubernetes deployment, DevSecOps pipeline, and scalability testing",
    detailedDescription: "Engineered a full-stack cloud architecture recommendation platform using Spring Boot and React that suggests AWS services based on cost, scalability, and operational requirements. Automated infrastructure provisioning through Terraform workflows with auto-destroy protection to prevent unnecessary cloud spending. Implemented an enterprise-grade DevSecOps CI/CD pipeline integrating multiple security scanning tools across SAST, SCA, IaC, container, and DAST stages. Deployed containerized microservices on Kubernetes with Prometheus and Grafana observability, Ansible automation, and Docker multi-stage builds. Conducted k6 load and stress testing achieving ~1,200 requests/sec with 1,000 concurrent users while identifying infrastructure bottlenecks through ramp-up testing at 3,000 VUs.",

    tech: [
      "Java", "Spring Boot", "React.js", "MySQL", "Terraform", "Docker", "Kubernetes", "Jenkins", "Ansible",
      "Prometheus", "Grafana", "k6", "Trivy", "Checkov", "OWASP ZAP", "Semgrep", "AWS", "Render"
    ],

    github: 'https://github.com/Aadi1903/CloudCostLens',
    demo: 'https://cloudcostlens.onrender.com',

    features: [
      "AWS cloud architecture recommendation engine",
      "One-click Terraform provisioning workflow",
      "Automated resource cleanup and auto-destroy protection",
      "Enterprise DevSecOps CI/CD pipeline",
      "Integrated SAST, SCA, IaC, DAST, and container security scanning",
      "Docker multi-stage containerization",
      "Kubernetes-based orchestration and deployment",
      "Prometheus and Grafana observability dashboards",
      "Ansible-based infrastructure automation",
      "k6 load and stress testing up to 3,000 virtual users",
      "Scalability analysis with throughput and latency monitoring",
      "Real-time backend and infrastructure monitoring"
    ]

  },
  {
    title: 'Guidr – Serverless Event-Driven AWS Platform',
    description: "Serverless microservices platform built on AWS with event-driven architecture, distributed tracing, observability, and automated CI/CD workflows",
    detailedDescription: "Architected and deployed a production-grade serverless platform on AWS integrating 15+ managed services including Lambda, API Gateway, DynamoDB, Cognito, SQS, SNS, SES, EventBridge, CloudFront, S3, X-Ray, CloudWatch RUM, Systems Manager, Rekognition, and AWS CDK. Designed an event-driven microservices architecture enabling asynchronous communication and scalable notification workflows across multiple AWS services. Implemented full-stack observability using AWS X-Ray distributed tracing and CloudWatch RUM for real-user monitoring, enabling end-to-end request visibility from frontend interactions to backend services and DynamoDB. Automated infrastructure provisioning and deployment pipelines using AWS CDK, Docker, CodePipeline, and CodeBuild, enabling scalable cloud-native deployments with near-zero operational overhead within AWS Free Tier limits.",

    tech: [
      "AWS Lambda", "API Gateway", "DynamoDB", "Cognito", "SQS", "SNS", "SES", "EventBridge", "CloudFront",
      "S3", "AWS X-Ray", "CloudWatch RUM", "AWS CDK", "Docker", "CodePipeline", "CodeBuild", "React.js", "Java"
    ],

    github: 'https://github.com/Aadi1903/Guidr',
    demo: 'https://d3k03ku5qbyly4.cloudfront.net',

    features: [
      "Serverless event-driven microservices architecture",
      "Integration of 15+ AWS managed services",
      "Distributed tracing using AWS X-Ray",
      "Real-user frontend monitoring with CloudWatch RUM",
      "Asynchronous communication using SQS, SNS, and EventBridge",
      "Automated email notification workflows using SES",
      "Secure authentication and authorization with Cognito",
      "Scalable object storage and CDN delivery using S3 and CloudFront",
      "Infrastructure as Code using AWS CDK (Java)",
      "Automated CI/CD pipeline using CodePipeline and CodeBuild",
      "Docker-based containerized Lambda packaging",
      "Cloud-native deployment optimized for AWS Free Tier"
    ]

  },
  {
    title: 'Enterprise DevSecOps CI/CD Pipeline with Kubernetes',
    description: "Enterprise-grade DevSecOps pipeline integrating CI/CD automation, Kubernetes deployment, security scanning, and container orchestration",
    detailedDescription: "Designed and implemented an enterprise-grade DevSecOps CI/CD pipeline using Jenkins, Docker, Kubernetes, SonarQube, Nexus, and Trivy to automate code integration, testing, security validation, artifact management, and deployment workflows. Configured Kubernetes clusters with RBAC-based access control and secure authentication mechanisms for container orchestration and scalable deployments. Integrated multiple security and quality analysis stages including vulnerability scanning, code quality inspection, and artifact lifecycle management to improve deployment reliability and reduce manual intervention across the software delivery pipeline.",

    tech: [
      "Jenkins", "Docker", "Kubernetes", "SonarQube", "Nexus", "Trivy",
      "Linux", "Git", "CI/CD", "RBAC"
    ],

    github: 'https://github.com/Aadi1903/GameReview',
    demo: '#',

    features: [
      "End-to-end DevSecOps CI/CD automation",
      "Jenkins-based build, test, and deployment workflows",
      "Docker-based application containerization",
      "Kubernetes cluster deployment and orchestration",
      "Role-Based Access Control (RBAC) implementation",
      "Code quality analysis using SonarQube",
      "Artifact lifecycle management using Nexus",
      "Container vulnerability scanning using Trivy",
      "Secure authentication between Jenkins and Kubernetes",
      "Automated deployment from Git commits to Kubernetes",
      "Scalable and reliable cloud-native deployment workflow",
      "Reduced manual deployment and validation efforts"
    ]

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
    issueDate: "Feb 2026",
    description: "Validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.",
    credentialUrl: "#",
    icon: Cloud,
    highlight: true
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    issueDate: "Nov 2025",
    description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    credentialUrl: "#",
    icon: Zap,
    highlight: false
  },
  {
    title: "Docker Certified Associate (DCA)",
    organization: "Docker",
    issueDate: "Sep 2025",
    description: "Demonstrates proficiency in Docker containerization, orchestration, and security.",
    credentialUrl: "#",
    icon: Boxes,
    highlight: false
  }

];