import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-brand-secondary">
      <div className="container mx-auto px-6">
        <div className="bg-brand-primary rounded-2xl p-8 md:p-12 text-center shadow-2xl border border-brand-accent/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Let's build something amazing together. Reach out to us to discuss your idea, and we'll provide you with a free, no-obligation quote.
          </p>
          <a 
            href="mailto:hello@swlsolutions.dev" 
            className="inline-block bg-brand-accent text-white px-10 py-4 rounded-full hover:bg-blue-500 transition-transform duration-300 transform hover:scale-105 font-semibold text-lg"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
