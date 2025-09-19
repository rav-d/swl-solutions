import React from 'react';
import { LinkedInIcon, GithubIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary border-t border-brand-secondary/50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold text-white">
              SWL <span className="text-brand-accent">Solutions</span>
            </a>
            <p className="text-gray-500 mt-2">© {new Date().getFullYear()} SWL Solutions. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#services" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">Services</a>
            <a href="#team" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">Team</a>
            <a href="#contact" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
              <LinkedInIcon className="w-7 h-7" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
              <GithubIcon className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
