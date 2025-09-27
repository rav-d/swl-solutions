import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedInIcon, GithubIcon } from './icons';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand-primary border-t border-brand-secondary/50">
      <div className="container mx-auto px-6 py-12">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-secondary rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest insights, project updates, and industry trends delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 font-semibold"
              >
                ✅ Thank you for subscribing! Check your email for confirmation.
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-brand-accent text-white hover:bg-blue-500'
                  }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-bold text-white mb-4 block">
              SWL <span className="text-brand-accent">Solutions</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Building the digital future, together. We create bespoke software solutions that drive growth, efficiency, and innovation.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
                <GithubIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <a href="#services" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Services</a>
              <a href="#projects" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Projects</a>
              <a href="#pricing" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Pricing</a>
              <a href="#team" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Our Team</a>
              <a href="#contact" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Contact</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <div className="space-y-3">
              <a href="#blog" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Blog</a>
              <a href="#faq" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">FAQ</a>
              <a href="#testimonials" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Testimonials</a>
              <a href="#booking" className="block text-gray-400 hover:text-brand-accent transition-colors duration-300">Book Consultation</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SWL Solutions. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-brand-accent transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
