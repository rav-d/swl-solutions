import React from 'react';
import { TEAM_MEMBERS } from '../../lib/constants';
import { TeamMember } from '../../types';
import { LinkedInIcon, GithubIcon } from '../../components/icons';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-brand-secondary rounded-2xl overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/20">
      <div className="relative">
        <img src={member.imageUrl} alt={member.name} loading="lazy" className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-brand-accent font-semibold mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm mb-4 h-20">{member.bio}</p>
        <div className="flex items-center space-x-4">
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
            <LinkedInIcon />
          </a>
          <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
            <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-brand-primary/95" style={{backgroundImage: 'radial-gradient(circle at top, #1a1a3a, #030213)'}}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Meet Our Experts</h2>
          <p className="text-lg text-gray-400 mt-2">The talented individuals powering your projects forward.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
