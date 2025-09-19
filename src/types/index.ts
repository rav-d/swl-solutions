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
