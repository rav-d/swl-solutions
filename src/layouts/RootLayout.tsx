import React, { Suspense, lazy } from 'react';
import Header from '../components/Header';
import HeroSection from '../features/landing/HeroSection';
import Footer from '../components/Footer';

const ServicesSection = lazy(() => import('../features/landing/ServicesSection'));
const ProjectsSection = lazy(() => import('../features/landing/ProjectsSection'));
const PricingSection = lazy(() => import('../features/landing/PricingSection'));
const BookingSection = lazy(() => import('../features/landing/BookingSection'));
const TestimonialsSection = lazy(() => import('../features/landing/TestimonialsSection'));
const BlogSection = lazy(() => import('../features/landing/BlogSection'));
const FAQSection = lazy(() => import('../features/landing/FAQSection'));
const TeamSection = lazy(() => import('../features/landing/TeamSection'));
const ContactSection = lazy(() => import('../features/landing/ContactSection'));

const RootLayout: React.FC = () => {
  return (
    <div className="text-brand-light font-sans overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading…</div>}>
          <ServicesSection />
          <ProjectsSection />
          <PricingSection />
          <BookingSection />
          <TestimonialsSection />
          <BlogSection />
          <FAQSection />
          <TeamSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
