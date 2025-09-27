import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'ai' | 'custom';
  estimatedDuration: number; // in weeks
  estimatedCost: number;
  services: string[];
  phases: {
    name: string;
    duration: number;
    description: string;
    deliverables: string[];
  }[];
  technologies: string[];
  teamSize: number;
  isPopular: boolean;
}

interface ProjectTemplatesProps {
  onSelectTemplate: (template: ProjectTemplate) => void;
}

const ProjectTemplates: React.FC<ProjectTemplatesProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);

  const templates: ProjectTemplate[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Complete online store with payment integration, inventory management, and admin dashboard',
      category: 'ecommerce',
      estimatedDuration: 12,
      estimatedCost: 25000,
      services: ['Web Development', 'Backend & APIs', 'UI/UX Design', 'Cloud & AWS'],
      phases: [
        {
          name: 'Planning & Design',
          duration: 2,
          description: 'Requirements gathering, wireframing, and UI/UX design',
          deliverables: ['Wireframes', 'UI Design', 'Technical Specification']
        },
        {
          name: 'Development',
          duration: 8,
          description: 'Frontend and backend development with API integration',
          deliverables: ['Frontend Application', 'Backend APIs', 'Database Setup']
        },
        {
          name: 'Testing & Deployment',
          duration: 2,
          description: 'Quality assurance, testing, and production deployment',
          deliverables: ['Tested Application', 'Production Deployment', 'Documentation']
        }
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      teamSize: 4,
      isPopular: true
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application with backend services',
      category: 'mobile',
      estimatedDuration: 16,
      estimatedCost: 35000,
      services: ['Mobile Development', 'Backend & APIs', 'UI/UX Design'],
      phases: [
        {
          name: 'Design & Prototyping',
          duration: 3,
          description: 'User research, app design, and prototyping',
          deliverables: ['User Research', 'App Design', 'Interactive Prototype']
        },
        {
          name: 'Development',
          duration: 10,
          description: 'Native and cross-platform development',
          deliverables: ['iOS App', 'Android App', 'Backend Services']
        },
        {
          name: 'Testing & Launch',
          duration: 3,
          description: 'Testing, app store submission, and launch',
          deliverables: ['Tested Apps', 'App Store Submissions', 'Launch Strategy']
        }
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      teamSize: 3,
      isPopular: true
    },
    {
      id: '3',
      name: 'AI-Powered Automation',
      description: 'Intelligent automation system with machine learning capabilities',
      category: 'ai',
      estimatedDuration: 20,
      estimatedCost: 50000,
      services: ['AI & Automation', 'Backend & APIs', 'Cloud & AWS'],
      phases: [
        {
          name: 'AI Research & Planning',
          duration: 4,
          description: 'AI model research, data analysis, and system design',
          deliverables: ['AI Strategy', 'Data Analysis', 'System Architecture']
        },
        {
          name: 'Model Development',
          duration: 12,
          description: 'Machine learning model development and training',
          deliverables: ['AI Models', 'Training Pipeline', 'Model APIs']
        },
        {
          name: 'Integration & Deployment',
          duration: 4,
          description: 'System integration, testing, and deployment',
          deliverables: ['Integrated System', 'Performance Testing', 'Production Deployment']
        }
      ],
      technologies: ['Python', 'TensorFlow', 'AWS', 'Docker', 'Kubernetes'],
      teamSize: 5,
      isPopular: false
    },
    {
      id: '4',
      name: 'Corporate Website',
      description: 'Professional corporate website with CMS and SEO optimization',
      category: 'web',
      estimatedDuration: 6,
      estimatedCost: 15000,
      services: ['Web Development', 'UI/UX Design', 'SEO Optimization'],
      phases: [
        {
          name: 'Design & Content',
          duration: 2,
          description: 'Website design and content creation',
          deliverables: ['Website Design', 'Content Strategy', 'SEO Plan']
        },
        {
          name: 'Development',
          duration: 3,
          description: 'Website development with CMS integration',
          deliverables: ['Responsive Website', 'CMS Setup', 'SEO Implementation']
        },
        {
          name: 'Launch & Optimization',
          duration: 1,
          description: 'Launch, testing, and performance optimization',
          deliverables: ['Live Website', 'Performance Optimization', 'Analytics Setup']
        }
      ],
      technologies: ['Next.js', 'Contentful', 'Tailwind CSS', 'Vercel'],
      teamSize: 2,
      isPopular: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'web', name: 'Web Development', count: templates.filter(t => t.category === 'web').length },
    { id: 'mobile', name: 'Mobile Apps', count: templates.filter(t => t.category === 'mobile').length },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length },
    { id: 'ai', name: 'AI & Automation', count: templates.filter(t => t.category === 'ai').length }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
          </svg>
        );
      case 'mobile':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'ecommerce':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-brand-accent text-white'
                : 'bg-brand-primary/50 text-gray-300 hover:text-white hover:bg-brand-primary/70'
            }`}
          >
            {getCategoryIcon(category.id)}
            <span>{category.name}</span>
            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6 hover:border-brand-accent/40 transition-all duration-200 group cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(template.category)}
                <h3 className="text-lg font-semibold text-white">{template.name}</h3>
              </div>
              {template.isPopular && (
                <span className="bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                  Popular
                </span>
              )}
            </div>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{template.estimatedDuration} weeks</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cost:</span>
                <span className="text-white font-semibold">${template.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Team Size:</span>
                <span className="text-white">{template.teamSize} members</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {template.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="text-xs bg-brand-primary/50 text-gray-300 px-2 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
              {template.services.length > 3 && (
                <span className="text-xs text-gray-500">+{template.services.length - 3} more</span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(template);
              }}
              className="w-full bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
            >
              Use Template
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Template Detail Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setSelectedTemplate(null)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-brand-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-brand-accent/20"
              >
                <div className="bg-brand-secondary px-6 pt-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedTemplate.name}</h3>
                      <p className="text-gray-400 mt-1">{selectedTemplate.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Project Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration:</span>
                          <span className="text-white">{selectedTemplate.estimatedDuration} weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Estimated Cost:</span>
                          <span className="text-white font-semibold">${selectedTemplate.estimatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team Size:</span>
                          <span className="text-white">{selectedTemplate.teamSize} members</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white capitalize">{selectedTemplate.category}</span>
                        </div>
                      </div>
                      
                      <h5 className="text-md font-semibold text-white mt-4 mb-2">Services Included</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.services.map((service) => (
                          <span
                            key={service}
                            className="text-xs bg-brand-primary/50 text-gray-300 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <h5 className="text-md font-semibold text-white mt-4 mb-2">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-brand-accent/20 text-brand-accent px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Phases */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Project Phases</h4>
                      <div className="space-y-4">
                        {selectedTemplate.phases.map((phase, index) => (
                          <div key={index} className="border border-brand-accent/20 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-white">{phase.name}</h5>
                              <span className="text-xs text-gray-400">{phase.duration} weeks</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{phase.description}</p>
                            <div className="space-y-1">
                              {phase.deliverables.map((deliverable, idx) => (
                                <div key={idx} className="text-xs text-gray-300 flex items-center">
                                  <span className="w-1 h-1 bg-brand-accent rounded-full mr-2"></span>
                                  {deliverable}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brand-primary/30 px-6 py-3 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-brand-primary border border-brand-accent/30 rounded-md hover:bg-brand-primary/70"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onSelectTemplate(selectedTemplate);
                      setSelectedTemplate(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-blue-600"
                  >
                    Use This Template
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectTemplates;
