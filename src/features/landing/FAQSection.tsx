import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'technical';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. Our Starter packages typically take 2-3 weeks, Growth packages 4-6 weeks, and Enterprise projects 8-12 weeks. We provide detailed timelines during the consultation phase.',
    category: 'general'
  },
  {
    id: '2',
    question: 'What is included in your pricing packages?',
    answer: 'Each package includes different levels of features, revisions, and support. Starter includes basic development and 1 revision, Growth includes advanced features and 3 revisions, while Enterprise includes unlimited revisions and dedicated support.',
    category: 'pricing'
  },
  {
    id: '3',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! All packages include post-launch support. Starter includes 30 days of email support, Growth includes 90 days of priority support, and Enterprise includes 1 year of dedicated support with a project manager.',
    category: 'general'
  },
  {
    id: '4',
    question: 'Can you work with our existing team?',
    answer: 'Absolutely! We excel at collaborating with in-house teams. We can integrate with your existing workflows, use your preferred tools, and work alongside your developers, designers, and project managers.',
    category: 'process'
  },
  {
    id: '5',
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in modern web technologies including React, Vue.js, Node.js, Python, and cloud platforms like AWS. We also work with mobile technologies like React Native, and AI/ML frameworks.',
    category: 'technical'
  },
  {
    id: '6',
    question: 'How do you handle project communication?',
    answer: 'We maintain transparent communication through regular check-ins, project management tools, and direct access to your dedicated team. You\'ll have a single point of contact for seamless coordination.',
    category: 'process'
  },
  {
    id: '7',
    question: 'What if we need changes after the project starts?',
    answer: 'We understand that requirements can evolve. We include revision rounds in all packages, and for significant changes, we\'ll provide updated timelines and costs before proceeding.',
    category: 'process'
  },
  {
    id: '8',
    question: 'Do you offer maintenance and updates?',
    answer: 'Yes, we offer ongoing maintenance packages including security updates, performance optimization, feature additions, and technical support. These can be customized based on your needs.',
    category: 'general'
  },
  {
    id: '9',
    question: 'How do you ensure code quality?',
    answer: 'We follow industry best practices including code reviews, automated testing, documentation, and version control. Our team includes QA specialists who ensure your project meets the highest standards.',
    category: 'technical'
  },
  {
    id: '10',
    question: 'Can you help with SEO and marketing?',
    answer: 'Yes! We include basic SEO optimization in all packages, and our Growth and Enterprise packages include advanced SEO, analytics setup, and performance monitoring to help your project succeed.',
    category: 'technical'
  }
];

const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Questions', count: faqData.length },
    { id: 'general', name: 'General', count: faqData.filter(item => item.category === 'general').length },
    { id: 'pricing', name: 'Pricing', count: faqData.filter(item => item.category === 'pricing').length },
    { id: 'process', name: 'Process', count: faqData.filter(item => item.category === 'process').length },
    { id: 'technical', name: 'Technical', count: faqData.filter(item => item.category === 'technical').length },
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="py-20 bg-brand-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are the most common questions we receive from our clients.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-brand-accent text-white'
                  : 'bg-brand-primary text-gray-400 hover:text-white hover:bg-brand-primary/80'
              }`}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-brand-primary rounded-lg overflow-hidden border border-transparent hover:border-brand-accent/50 transition-all duration-300"
                >
                  <motion.button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-brand-primary/80 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                    <motion.div
                      animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openItems.has(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-brand-primary rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our team is here to help. Schedule a free consultation to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-brand-accent text-brand-accent px-8 py-3 rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300 font-semibold"
              >
                Schedule Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
