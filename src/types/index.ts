import React from 'react';

export interface Service {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  socials: {
    linkedin: string;
    github: string;
    twitter?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  links?: {
    live?: string;
    repo?: string;
  };
  impactKpis?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
  imageUrl: string;
  tags: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
  services: string[];
  timeline: string;
  revisions: number;
  support: string;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'discovery' | 'review';
  available: boolean;
  price?: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget: string;
  timeline: string;
  services: string[];
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed-won' | 'closed-lost';
  source: string;
  createdAt: string;
  lastContacted?: string;
  notes?: string;
}