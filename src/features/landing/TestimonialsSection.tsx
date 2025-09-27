import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechStartup Inc',
    role: 'CEO',
    image: 'https://picsum.photos/seed/sarah/100/100',
    content: 'SWL Solutions transformed our vision into a stunning mobile app that exceeded all expectations. Their attention to detail and technical expertise is unmatched.',
    rating: 5,
    project: 'Mobile App Development'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Enterprise Corp',
    role: 'CTO',
    image: 'https://picsum.photos/seed/michael/100/100',
    content: 'The team delivered a robust cloud infrastructure that scaled perfectly with our growth. Their AWS expertise saved us months of development time.',
    rating: 5,
    project: 'Cloud Infrastructure'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'SmallBiz Solutions',
    role: 'Founder',
    image: 'https://picsum.photos/seed/emily/100/100',
    content: 'Professional, responsive, and incredibly talented. They built our website in record time and it has been a game-changer for our business.',
    rating: 5,
    project: 'Web Development'
  },
  {
    id: '4',
    name: 'David Kim',
    company: 'InnovateLab',
    role: 'Product Manager',
    image: 'https://picsum.photos/seed/david/100/100',
    content: 'The AI automation system they built has streamlined our operations and reduced manual work by 70%. Outstanding results!',
    rating: 5,
    project: 'AI Automation'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    company: 'GrowthCo',
    role: 'Marketing Director',
    image: 'https://picsum.photos/seed/lisa/100/100',
    content: 'From concept to launch, SWL Solutions guided us through every step. Their project management and communication were exceptional.',
    rating: 5,
    project: 'Full-Stack Development'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.svg
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </motion.svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-brand-primary/95" style={{backgroundImage: 'radial-gradient(circle at top, #2B2B4F, #030213)'}}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-secondary rounded-2xl p-8 md:p-12 text-center relative"
          >
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="text-left">
                <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-brand-accent font-semibold">{testimonials[currentIndex].role}</p>
                <p className="text-gray-400 text-sm">{testimonials[currentIndex].company}</p>
                <p className="text-gray-500 text-xs mt-1">Project: {testimonials[currentIndex].project}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-brand-secondary hover:bg-brand-accent transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-brand-accent' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-brand-secondary hover:bg-brand-accent transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-center text-white font-semibold mb-8">Trusted by Leading Companies</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {[
              { name: 'TechStartup Inc', logo: 'https://picsum.photos/seed/logo1/200/100' },
              { name: 'Enterprise Corp', logo: 'https://picsum.photos/seed/logo2/200/100' },
              { name: 'SmallBiz Solutions', logo: 'https://picsum.photos/seed/logo3/200/100' },
              { name: 'InnovateLab', logo: 'https://picsum.photos/seed/logo4/200/100' },
              { name: 'GrowthCo', logo: 'https://picsum.photos/seed/logo5/200/100' },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                className="flex items-center justify-center p-4 rounded-lg bg-brand-secondary/30 hover:bg-brand-secondary/50 transition-all duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
