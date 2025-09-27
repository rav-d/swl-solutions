import React from 'react';
import { Service, TeamMember, Project, BlogPost, PricingPackage, BookingSlot } from '../types';
import { WebDevIcon, MobileDevIcon, BackendIcon, CloudIcon, QATestingIcon, PMIcon, AiAutomationIcon, AiMlIcon, FigmaDesignerIcon } from '../components/icons';

export const SERVICES: Service[] = [
  {
    icon: WebDevIcon,
    title: 'Web Development',
    description: 'Crafting beautiful, responsive, and high-performance websites and web applications tailored to your business needs.',
  },
  {
    icon: MobileDevIcon,
    title: 'Mobile Development',
    description: 'Building intuitive and powerful native and cross-platform mobile apps for iOS and Android that users love.',
  },
  {
    icon: BackendIcon,
    title: 'Backend & APIs',
    description: 'Developing robust, scalable, and secure server-side logic and APIs to power your applications.',
  },
  {
    icon: CloudIcon,
    title: 'Cloud & AWS Solutions',
    description: 'Leveraging cloud infrastructure to provide scalable, reliable, and cost-effective solutions for your business.',
  },
  {
    icon: QATestingIcon,
    title: 'QA & Testing',
    description: 'Ensuring your software is bug-free, reliable, and meets the highest quality standards through rigorous testing.',
  },
  {
    icon: PMIcon,
    title: 'Project Management',
    description: 'Guiding your project from conception to launch, ensuring it\'s delivered on time, on budget, and to your specifications.',
  },
  {
    icon: AiAutomationIcon,
    title: 'AI & Automation',
    description: 'Streamline your business processes with custom AI-powered automation and web scraping solutions.',
  },
  {
    icon: AiMlIcon,
    title: 'AI & Machine Learning',
    description: 'Unlock data-driven insights and build intelligent systems with our expertise in machine learning models.',
  },
  {
    icon: FigmaDesignerIcon,
    title: 'UI/UX & Figma Design',
    description: 'Creating stunning, user-centric designs in Figma that bridge the gap between your vision and the final product.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Eleanor Vance',
    role: 'Lead Frontend Developer',
    imageUrl: 'https://picsum.photos/seed/eleanor/400/400',
    bio: 'Eleanor is a UI/UX enthusiast with a passion for creating pixel-perfect, user-friendly interfaces in React and Vue.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Marcus Holloway',
    role: 'Senior Backend Engineer',
    imageUrl: 'https://picsum.photos/seed/marcus/400/400',
    bio: 'Marcus architects scalable and resilient systems. Expert in Node.js, Go, and database optimization.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Anya Petrova',
    role: 'Cloud Solutions Architect (AWS)',
    imageUrl: 'https://picsum.photos/seed/anya/400/400',
    bio: 'Anya specializes in designing and managing cloud infrastructure, ensuring high availability and performance.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Kenji Tanaka',
    role: 'Mobile Development Lead',
    imageUrl: 'https://picsum.photos/seed/kenji/400/400',
    bio: 'Kenji brings ideas to life on mobile, with extensive experience in both native iOS (Swift) and Android (Kotlin).',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Sofia Rossi',
    role: 'QA Automation Engineer',
    imageUrl: 'https://picsum.photos/seed/sofia/400/400',
    bio: 'Sofia ensures top-notch quality with her expertise in building automated testing pipelines and frameworks.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'David Chen',
    role: 'Project Manager',
    imageUrl: 'https://picsum.photos/seed/david/400/400',
    bio: 'David is the bridge between our clients and developers, ensuring seamless communication and timely delivery.',
    socials: {
      linkedin: '#',
      github: '#',
    },
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'smart-retail-analytics',
    title: 'Smart Retail Analytics Platform',
    description: 'End-to-end analytics platform delivering real-time dashboards and demand forecasting for 150+ stores.',
    imageUrl: 'https://picsum.photos/seed/retail/800/600',
    technologies: ['React', 'Node.js', 'Postgres', 'AWS', 'Airflow'],
    links: { live: '#', repo: '#' },
    impactKpis: ['+18% forecast accuracy', '-22% stockouts', '+15% revenue QoQ']
  },
  {
    id: 'fintech-mobile-app',
    title: 'Fintech Mobile Super App',
    description: 'Cross-platform app for payments, P2P, and budgeting with bank-grade security.',
    imageUrl: 'https://picsum.photos/seed/fintech/800/600',
    technologies: ['React Native', 'Go', 'gRPC', 'KMS'],
    links: { live: '#'},
    impactKpis: ['500k MAU in 6 months', '99.95% uptime']
  },
  {
    id: 'ai-doc-automation',
    title: 'AI Document Automation',
    description: 'LLM-powered pipeline to extract and validate data from invoices at scale.',
    imageUrl: 'https://picsum.photos/seed/ai/800/600',
    technologies: ['Python', 'FastAPI', 'Postgres', 'OpenAI'],
    impactKpis: ['-70% processing time', '-50% manual errors']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'building-scalable-react-apps',
    title: 'Building Scalable React Applications: Best Practices for 2024',
    excerpt: 'Learn the essential patterns and practices for building maintainable, performant React applications that scale with your team and user base.',
    content: 'Full article content would go here...',
    author: 'Eleanor Vance',
    publishedAt: '2024-01-15',
    category: 'Engineering',
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/react/800/400',
    tags: ['React', 'JavaScript', 'Performance', 'Architecture']
  },
  {
    id: 'aws-cost-optimization',
    title: 'AWS Cost Optimization: 10 Strategies That Saved Our Clients $50K+',
    excerpt: 'Real-world strategies for reducing AWS costs without sacrificing performance or reliability.',
    content: 'Full article content would go here...',
    author: 'Anya Petrova',
    publishedAt: '2024-01-10',
    category: 'Cloud',
    readTime: 6,
    imageUrl: 'https://picsum.photos/seed/aws/800/400',
    tags: ['AWS', 'Cloud', 'Cost Optimization', 'DevOps']
  },
  {
    id: 'mobile-app-performance',
    title: 'Mobile App Performance: From 2s to 200ms Load Times',
    excerpt: 'How we optimized a React Native app to achieve sub-200ms load times and 60fps animations.',
    content: 'Full article content would go here...',
    author: 'Kenji Tanaka',
    publishedAt: '2024-01-05',
    category: 'Mobile',
    readTime: 7,
    imageUrl: 'https://picsum.photos/seed/mobile/800/400',
    tags: ['React Native', 'Performance', 'Mobile', 'Optimization']
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small projects and MVPs',
    price: 5000,
    currency: 'USD',
    billing: 'one-time',
    popular: false,
    features: [
      'Up to 5 pages/screens',
      'Basic responsive design',
      '1 revision round',
      '2 weeks delivery',
      'Email support',
      'Basic SEO optimization'
    ],
    services: ['Web Development', 'UI/UX Design'],
    timeline: '2-3 weeks',
    revisions: 1,
    support: 'Email support for 30 days'
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Ideal for growing businesses and startups',
    price: 15000,
    currency: 'USD',
    billing: 'one-time',
    popular: true,
    features: [
      'Up to 15 pages/screens',
      'Advanced responsive design',
      '3 revision rounds',
      '4 weeks delivery',
      'Priority support',
      'Advanced SEO & analytics',
      'Mobile optimization',
      'Performance optimization'
    ],
    services: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Backend & APIs'],
    timeline: '4-6 weeks',
    revisions: 3,
    support: 'Priority support for 90 days'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large-scale projects',
    price: 50000,
    currency: 'USD',
    billing: 'one-time',
    popular: false,
    features: [
      'Unlimited pages/screens',
      'Custom design system',
      'Unlimited revisions',
      '8 weeks delivery',
      'Dedicated project manager',
      'Full-stack development',
      'Cloud infrastructure setup',
      'Advanced security features',
      'Performance monitoring',
      'Training & documentation'
    ],
    services: ['Web Development', 'Mobile Development', 'Backend & APIs', 'Cloud & AWS', 'AI & Automation', 'QA & Testing'],
    timeline: '8-12 weeks',
    revisions: -1, // unlimited
    support: 'Dedicated support for 1 year'
  }
];

export const BOOKING_SLOTS: BookingSlot[] = [
  {
    id: '1',
    date: '2024-02-01',
    time: '10:00',
    duration: 60,
    type: 'consultation',
    available: true,
    price: 200
  },
  {
    id: '2',
    date: '2024-02-01',
    time: '14:00',
    duration: 90,
    type: 'discovery',
    available: true,
    price: 300
  },
  {
    id: '3',
    date: '2024-02-02',
    time: '09:00',
    duration: 60,
    type: 'consultation',
    available: true,
    price: 200
  },
  {
    id: '4',
    date: '2024-02-02',
    time: '15:00',
    duration: 60,
    type: 'review',
    available: false,
    price: 150
  }
];
