import React from 'react';
import { Service, TeamMember } from '../types';
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
