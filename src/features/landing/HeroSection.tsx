import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-primary pt-20 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        style={{ objectFit: 'cover', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-man-using-a-laptop-in-a-modern-office-7484/1080p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-brand-primary/70"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
          Building the Digital Future, <br />
          <span className="text-brand-accent">Together.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          SWL Solutions is your dedicated partner in crafting bespoke software solutions that drive growth, efficiency, and innovation. From concept to code, we bring your vision to life.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#services" className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-transform duration-300 transform hover:scale-105 font-semibold text-lg">
            Our Services
          </a>
          <a href="#contact" className="bg-brand-secondary text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105 font-semibold text-lg">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
