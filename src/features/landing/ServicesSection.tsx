import React from 'react';
import { SERVICES } from '../../lib/constants';
import { Service } from '../../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div className="bg-brand-secondary p-8 rounded-2xl shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-brand-accent">
      <div className="text-brand-accent mb-4">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Our Expertise</h2>
          <p className="text-lg text-gray-400 mt-2">We offer a comprehensive suite of services to build your next big idea.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
