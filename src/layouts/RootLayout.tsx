import React from 'react';
import Header from '../components/Header';
import HeroSection from '../features/landing/HeroSection';
import ServicesSection from '../features/landing/ServicesSection';
import TeamSection from '../features/landing/TeamSection';
import ContactSection from '../features/landing/ContactSection';
import Footer from '../components/Footer';

const RootLayout: React.FC = () => {
  return (
    <div className="text-brand-light font-sans overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
