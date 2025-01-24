const techTopics = [
    // Original Topics
    "Core Web Development", "Frontend Development", "Backend Development", "Full-Stack Development",
    "Responsive Web Design", "Web Performance Optimization", "Web Security", "APIs (REST, GraphQL)",
    "Progressive Web Apps (PWA)", "Single Page Applications (SPA)", "Server-Side Rendering (SSR)",
    "Static Site Generation (SSG)", "Web Accessibility (a11y)", "Cross-Browser Compatibility", "SEO",
    "HTML", "CSS", "JavaScript", "TypeScript", "Python", "Ruby", "PHP", "Java", "Go", "C#", "SQL",
    "Shell Scripting", "React.js", "Vue.js", "Angular", "Svelte", "Preact", "Ember.js", "Alpine.js",
    "CSS3", "SASS/SCSS", "LESS", "Tailwind CSS", "Bootstrap", "Material-UI", "Styled Components",
    "Chakra UI", "Bulma", "Redux", "Recoil", "MobX", "Context API", "Zustand", "Webpack", "Vite",
    "Parcel", "Rollup", "Snowpack", "Jest", "Cypress", "React Testing Library", "Enzyme", "Mocha",
    "Chai", "Node.js", "Express.js", "NestJS", "Django", "Flask", "Ruby on Rails", "Spring Boot",
    "Laravel", "ASP.NET Core", "FastAPI", "Koa.js", "MySQL", "PostgreSQL", "SQLite", "MariaDB",
    "MongoDB", "Firebase Firestore", "Cassandra", "CouchDB", "Redis", "Mongoose", "Sequelize",
    "TypeORM", "Prisma", "RESTful APIs", "GraphQL", "Apollo Server", "Hasura", "WebSockets",
    "Socket.IO", "ws", "MERN Stack", "Git", "GitHub", "GitLab", "Bitbucket", "Jenkins",
    "GitHub Actions", "GitLab CI/CD", "CircleCI", "Travis CI", "Azure DevOps", "Docker", "Kubernetes",
    "AWS", "GCP", "Microsoft Azure", "Heroku", "Vercel", "Netlify", "DigitalOcean", "Firebase",
    "Prometheus", "Grafana", "ELK Stack", "Sentry", "New Relic", "Terraform", "Ansible", "Puppet",
    "Chef", "Unit Testing", "Integration Testing", "End-to-End Testing", "Load Testing", "Security Testing",
    "HTTPS/SSL/TLS", "CORS", "OWASP Top 10", "JWT", "OAuth 2.0", "OpenID Connect", "Passport.js",
    "bcrypt", "AES", "RSA", "WebAssembly", "Microservices", "Serverless Architecture", "GraphQL Subscriptions",
    "Real-Time Applications", "Blockchain Integration", "AI/ML Integration", "npm", "yarn", "pnpm",
    "VS Code", "WebStorm", "Sublime Text", "Atom", "Postman", "Swagger", "Figma", "Storybook", "Agile",
    "Scrum", "Kanban", "Code Reviews", "Documentation", "Versioning", "Clean Code", "SOLID Principles",
  
    // New AI/Tech Topics (20+)
    "Quantum Computing", "Edge Computing", "IoT Development", "AI Ethics", "Neural Networks",
    "Natural Language Processing (NLP)", "Computer Vision", "Reinforcement Learning", "Big Data Analytics",
    "Data Engineering", "MLOps (Machine Learning Operations)", "Cloud-Native Development", "Ethical AI",
    "5G Technology Integration", "AI in Healthcare", "Robotics Process Automation (RPA)",
    "Low-Code Development Platforms", "No-Code Development Platforms", "Explainable AI (XAI)",
    "Generative Adversarial Networks (GANs)", "AI-Driven Cybersecurity", "Autonomous Systems",
    "Deep Learning Architectures", "AI-Powered DevOps", "Smart Contract Development",
    "Augmented Reality (AR) Development", "Virtual Reality (VR) Development", "Digital Twins Technology",
    "AI-Optimized Hardware", "Federated Learning Systems"
  ];
  
  // Random topic generator function
  const getRandomTopic = () => {
    return techTopics[Math.floor(Math.random() * techTopics.length)];
  };
  
export default getRandomTopic 
