import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../lib/constants';

const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    PROJECTS.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return PROJECTS;
    return PROJECTS.filter(project => 
      project.technologies.includes(selectedFilter)
    );
  }, [selectedFilter]);

  return (
    <section id="projects" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white">Selected Projects</h2>
          <p className="text-lg text-gray-400 mt-2">Case studies that highlight outcomes, not just outputs.</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedFilter === 'all'
                ? 'bg-brand-accent text-white'
                : 'bg-brand-secondary text-gray-400 hover:text-white hover:bg-brand-secondary/80'
            }`}
          >
            All Projects
          </motion.button>
          {allTechnologies.map(tech => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(tech)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedFilter === tech
                  ? 'bg-brand-accent text-white'
                  : 'bg-brand-secondary text-gray-400 hover:text-white hover:bg-brand-secondary/80'
              }`}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-brand-secondary rounded-2xl overflow-hidden border border-transparent hover:border-brand-accent transition-all duration-300 group"
            >
              <div className="relative">
                <motion.img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 mt-2 text-sm">{project.description}</p>
                {project.impactKpis && (
                  <ul className="mt-4 text-gray-300 text-sm space-y-1">
                    {project.impactKpis.map((kpi, idx) => (
                      <li key={idx}>• {kpi}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <motion.span 
                      key={tech} 
                      whileHover={{ scale: 1.05 }}
                      className="text-xs bg-brand-primary/60 text-gray-300 px-2 py-1 rounded-full border border-brand-primary/40"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                {(project.links?.live || project.links?.repo) && (
                  <div className="mt-5 flex gap-4">
                    {project.links?.live && (
                      <motion.a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.05 }}
                        className="text-brand-accent hover:underline"
                      >
                        Live
                      </motion.a>
                    )}
                    {project.links?.repo && (
                      <motion.a 
                        href={project.links.repo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.05 }}
                        className="text-gray-400 hover:underline"
                      >
                        Code
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;


