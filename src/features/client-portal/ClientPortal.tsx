import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'development' | 'testing' | 'completed';
  progress: number;
  nextMilestone: string;
  dueDate: string;
}

interface Message {
  id: string;
  from: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'files'>('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data - in real app, this would come from API
  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform',
      status: 'development',
      progress: 65,
      nextMilestone: 'Payment Integration',
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      name: 'Mobile App Redesign',
      status: 'testing',
      progress: 90,
      nextMilestone: 'App Store Submission',
      dueDate: '2024-01-30'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      from: 'David Chen',
      message: 'The payment integration is ready for your review. Please test the checkout flow.',
      timestamp: '2024-01-20T10:30:00Z',
      isRead: false
    },
    {
      id: '2',
      from: 'Eleanor Vance',
      message: 'UI mockups for the mobile app are uploaded. Please provide feedback.',
      timestamp: '2024-01-19T14:15:00Z',
      isRead: true
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-secondary p-8 rounded-2xl max-w-md w-full mx-4"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Client Portal</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-brand-accent text-white py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 font-semibold"
            >
              Sign In
            </motion.button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have access? <a href="#contact" className="text-brand-accent hover:underline">Contact us</a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-gray-400">Here's an overview of your projects and updates.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-brand-secondary p-1 rounded-lg w-fit">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'messages', label: 'Messages' },
            { id: 'files', label: 'Files' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-accent text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map(project => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -4 }}
                  className="bg-brand-secondary p-6 rounded-2xl border border-transparent hover:border-brand-accent transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'testing' ? 'bg-yellow-500/20 text-yellow-400' :
                      project.status === 'development' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-brand-primary rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-brand-accent h-2 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-white font-semibold">Next:</span> {project.nextMilestone}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-white font-semibold">Due:</span> {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  whileHover={{ x: 4 }}
                  className={`bg-brand-secondary p-4 rounded-lg border-l-4 ${
                    message.isRead ? 'border-gray-500' : 'border-brand-accent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{message.from}</h4>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-400">{message.message}</p>
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-brand-accent rounded-full mt-2" />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="bg-brand-secondary p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-4">File Sharing</h3>
              <p className="text-gray-400 mb-6">Upload and share files with your project team.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-accent text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 font-semibold"
              >
                Upload Files
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPortal;
