import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#booking', label: 'Book Call' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#blog', label: 'Blog' },
    { href: '#faq', label: 'FAQ' },
    { href: '#team', label: 'Our Team' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="bg-brand-primary/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white">
            SWL <span className="text-brand-accent">Solutions</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-gray-300 hover:text-brand-accent transition-colors duration-300">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <a href="/portal" className="text-gray-300 hover:text-brand-accent transition-colors duration-300">
                Client Portal
              </a>
              <a href="/crm" className="text-gray-300 hover:text-brand-accent transition-colors duration-300">
                CRM
              </a>
              <a href="/analytics" className="text-gray-300 hover:text-brand-accent transition-colors duration-300">
                Analytics
              </a>
            </div>
            <a href="#contact" className="bg-brand-accent text-white px-5 py-2 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold">
              Get a Quote
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-gray-300 hover:text-brand-accent transition-colors duration-300 text-center py-2" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="/portal" className="text-gray-300 hover:text-brand-accent transition-colors duration-300 text-center py-2" onClick={() => setIsMenuOpen(false)}>
                Client Portal
              </a>
              <a href="/crm" className="text-gray-300 hover:text-brand-accent transition-colors duration-300 text-center py-2" onClick={() => setIsMenuOpen(false)}>
                CRM
              </a>
              <a href="/analytics" className="text-gray-300 hover:text-brand-accent transition-colors duration-300 text-center py-2" onClick={() => setIsMenuOpen(false)}>
                Analytics
              </a>
              <a href="#contact" className="bg-brand-accent text-white px-5 py-2 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                Get a Quote
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
