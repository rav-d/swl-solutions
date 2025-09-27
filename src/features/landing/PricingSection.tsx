import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRICING_PACKAGES } from '../../lib/constants';
import { PricingPackage } from '../../types';

const PricingCard: React.FC<{ package: PricingPackage; index: number }> = ({ package: pkg, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSelectPackage = () => {
    // In a real app, this would redirect to Stripe checkout
    console.log('Selected package:', pkg.id);
    // For demo purposes, we'll show an alert
    alert(`Selected ${pkg.name} package for ${formatPrice(pkg.price)}. This would redirect to Stripe checkout.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-brand-secondary rounded-2xl p-8 border-2 transition-all duration-300 ${
        pkg.popular 
          ? 'border-brand-accent shadow-2xl shadow-brand-accent/20' 
          : 'border-transparent hover:border-brand-accent/50'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
        <p className="text-gray-400 mb-4">{pkg.description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">{formatPrice(pkg.price)}</span>
          <span className="text-gray-400 ml-2">one-time</span>
        </div>
        <div className="text-sm text-gray-400">
          <p>Timeline: {pkg.timeline}</p>
          <p>Revisions: {pkg.revisions === -1 ? 'Unlimited' : pkg.revisions}</p>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-white font-semibold mb-4">Services Included:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.services.map(service => (
            <span
              key={service}
              className="text-xs bg-brand-primary/60 text-gray-300 px-2 py-1 rounded-full border border-brand-primary/40"
            >
              {service}
            </span>
          ))}
        </div>
        
        <h4 className="text-white font-semibold mb-4">Features:</h4>
        <ul className="space-y-3">
          {pkg.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="flex items-start text-gray-300 text-sm"
            >
              <motion.svg
                className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 + 0.1 }}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSelectPackage}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            pkg.popular
              ? 'bg-brand-accent text-white hover:bg-blue-500'
              : 'bg-brand-primary text-white hover:bg-brand-accent border border-brand-accent/50 hover:border-brand-accent'
          }`}
        >
          Get Started
        </motion.button>
        <p className="text-xs text-gray-500 mt-3">{pkg.support}</p>
      </div>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-brand-primary/95" style={{backgroundImage: 'radial-gradient(circle at top, #2B2B4F, #030213)'}}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Package</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. All packages include our commitment to quality and your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_PACKAGES.map((pkg, index) => (
            <PricingCard key={pkg.id} package={pkg} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-brand-secondary/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-400 mb-6">
              Every project is unique. Let's discuss your specific requirements and create a tailored package that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold"
              >
                Get Custom Quote
              </motion.a>
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-brand-accent text-brand-accent px-8 py-3 rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300 font-semibold"
              >
                Schedule Consultation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
