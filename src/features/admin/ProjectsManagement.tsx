import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TaskManager from './components/TaskManager';
import ProjectTemplates from './components/ProjectTemplates';
import TeamCollaboration from './components/TeamCollaboration';

const projectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  clientName: z.string().min(2, 'Client name is required'),
  clientEmail: z.string().email('Please enter a valid email'),
  status: z.string().min(1, 'Please select a status'),
  priority: z.string().min(1, 'Please select a priority'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.number().min(0, 'Budget must be positive'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  clientEmail: string;
  status: 'planning' | 'development' | 'testing' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  budget: number;
  services: string[];
  progress: number;
  teamMembers: string[];
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  currentTask?: string;
  workload: number;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'task' | 'system';
  projectId?: string;
  taskId?: string;
}

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Building a modern e-commerce platform with React, Node.js, and PostgreSQL',
      clientName: 'TechStartup Inc',
      clientEmail: 'sarah@techstartup.com',
      status: 'development',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 25000,
      services: ['Web Development', 'Backend & APIs', 'Cloud & AWS'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      progress: 65,
      teamMembers: ['Eleanor Vance', 'Marcus Holloway', 'Anya Petrova'],
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      name: 'Mobile App Redesign',
      description: 'Redesigning the mobile app with modern UI/UX and new features',
      clientName: 'Enterprise Corp',
      clientEmail: 'michael@enterprise.com',
      status: 'testing',
      priority: 'medium',
      startDate: '2024-01-01',
      endDate: '2024-02-15',
      budget: 18000,
      services: ['Mobile Development', 'UI/UX Design'],
      technologies: ['React Native', 'Figma', 'Firebase'],
      progress: 90,
      teamMembers: ['Kenji Tanaka', 'Sofia Rossi'],
      createdAt: '2023-12-20T09:00:00Z',
      updatedAt: '2024-01-19T11:45:00Z'
    },
    {
      id: '3',
      name: 'AI Document Automation',
      description: 'Implementing AI-powered document processing and automation system',
      clientName: 'InnovateLab',
      clientEmail: 'david@innovatelab.com',
      status: 'planning',
      priority: 'urgent',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 35000,
      services: ['AI & Automation', 'Backend & APIs', 'Cloud & AWS'],
      technologies: ['Python', 'TensorFlow', 'AWS', 'Docker'],
      progress: 15,
      teamMembers: ['Marcus Holloway', 'Anya Petrova'],
      createdAt: '2024-01-18T14:20:00Z',
      updatedAt: '2024-01-20T16:00:00Z'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Setup project repository',
      description: 'Initialize Git repository and setup development environment',
      status: 'completed',
      priority: 'high',
      assignee: 'David Kim',
      dueDate: '2024-01-25',
      estimatedHours: 4,
      actualHours: 4,
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T14:00:00Z'
    },
    {
      id: '2',
      title: 'Design user interface',
      description: 'Create wireframes and mockups for the main application',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sofia Rossi',
      dueDate: '2024-01-28',
      estimatedHours: 16,
      actualHours: 8,
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T15:30:00Z'
    },
    {
      id: '3',
      title: 'Implement authentication',
      description: 'Setup user authentication and authorization system',
      status: 'todo',
      priority: 'medium',
      assignee: 'Marcus Holloway',
      dueDate: '2024-02-02',
      estimatedHours: 12,
      actualHours: 0,
      createdAt: '2024-01-20T11:00:00Z',
      updatedAt: '2024-01-20T11:00:00Z'
    }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'David Kim',
      role: 'Full Stack Developer',
      avatar: 'DK',
      status: 'online',
      currentTask: 'Database Setup',
      workload: 75
    },
    {
      id: '2',
      name: 'Sofia Rossi',
      role: 'UI/UX Designer',
      avatar: 'SR',
      status: 'online',
      currentTask: 'Interface Design',
      workload: 60
    },
    {
      id: '3',
      name: 'Marcus Holloway',
      role: 'Backend Developer',
      avatar: 'MH',
      status: 'away',
      currentTask: 'API Development',
      workload: 90
    },
    {
      id: '4',
      name: 'Kenji Tanaka',
      role: 'DevOps Engineer',
      avatar: 'KT',
      status: 'offline',
      currentTask: 'Infrastructure Setup',
      workload: 45
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'David Kim',
      message: 'Database schema is ready for review',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      message: 'Great work! Please share the ERD when ready',
      timestamp: new Date(Date.now() - 240000).toISOString(),
      type: 'text'
    },
    {
      id: '3',
      sender: 'Sofia Rossi',
      message: 'UI mockups are complete. Feedback welcome!',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      type: 'text'
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'projects' | 'templates' | 'tasks' | 'collaboration'>('projects');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const statusColors = {
    'planning': 'bg-blue-100 text-blue-800',
    'development': 'bg-yellow-100 text-yellow-800',
    'testing': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const priorityColors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800',
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsEditing(false);
    reset();
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('clientName', project.clientName);
    setValue('clientEmail', project.clientEmail);
    setValue('status', project.status);
    setValue('priority', project.priority);
    setValue('startDate', project.startDate);
    setValue('endDate', project.endDate);
    setValue('budget', project.budget);
    setValue('services', project.services);
    setIsModalOpen(true);
  };

  const onSubmit = (data: ProjectFormData) => {
    if (isEditing && selectedProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === selectedProject.id 
          ? { ...project, ...data, updatedAt: new Date().toISOString() }
          : project
      ));
    } else {
      // Add new project
      const newProject: Project = {
        id: Date.now().toString(),
        ...data,
        progress: 0,
        teamMembers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects([newProject, ...projects]);
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleTaskCreate = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
  };

  const handleSendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    // In a real app, this would send to backend
    console.log('Sending message:', message);
  };

  const handleUpdateMemberStatus = (memberId: string, status: TeamMember['status']) => {
    // In a real app, this would update backend
    console.log('Updating member status:', memberId, status);
  };

  const handleSelectTemplate = (template: any) => {
    // In a real app, this would create a new project from template
    console.log('Creating project from template:', template);
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects Management</h1>
          <p className="text-gray-300">Manage your projects, track progress, and collaborate with your team.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-brand-primary/30 rounded-lg p-1">
            {[
              { id: 'projects', label: 'Projects' },
              { id: 'templates', label: 'Templates' },
              { id: 'tasks', label: 'Tasks' },
              { id: 'collaboration', label: 'Team' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeView === tab.id 
                    ? 'bg-brand-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddProject}
            className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
          >
            New Project
          </motion.button>
        </div>
      </div>

      {/* Projects View */}
      {activeView === 'projects' && (
        <>
          {/* Filters */}
          <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'planning', 'development', 'testing', 'completed', 'on-hold', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      filterStatus === status
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-primary/50 text-gray-300 hover:text-white hover:bg-brand-primary/70'
                    }`}
                  >
                    {status === 'all' ? 'All' : getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 overflow-hidden hover:border-brand-accent/40 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                        {getPriorityLabel(project.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Client:</span>
                      <span className="text-white">{project.clientName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white font-semibold">{formatCurrency(project.budget)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-white">{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-brand-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.services.slice(0, 3).map(service => (
                      <span
                        key={service}
                        className="text-xs bg-brand-primary/50 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="text-xs text-gray-500">+{project.services.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      Updated: {formatDate(project.updatedAt)}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                        className="text-brand-accent hover:text-blue-400 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
                        }}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Templates View */}
      {activeView === 'templates' && (
        <ProjectTemplates onSelectTemplate={handleSelectTemplate} />
      )}

      {/* Tasks View */}
      {activeView === 'tasks' && selectedProject && (
        <TaskManager
          projectId={selectedProject.id}
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskCreate={handleTaskCreate}
          teamMembers={teamMembers.map(m => m.name)}
        />
      )}

      {/* Collaboration View */}
      {activeView === 'collaboration' && selectedProject && (
        <TeamCollaboration
          projectId={selectedProject.id}
          teamMembers={teamMembers}
          messages={messages}
          onSendMessage={handleSendMessage}
          onUpdateMemberStatus={handleUpdateMemberStatus}
        />
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsModalOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-brand-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-brand-accent/20"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="bg-brand-secondary px-6 pt-6 pb-4">
                    <h3 className="text-lg font-medium text-white mb-4">
                      {isEditing ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Project Name *</label>
                        <input
                          {...register('name')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                        <textarea
                          {...register('description')}
                          rows={3}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Client Name *</label>
                        <input
                          {...register('clientName')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Client Email *</label>
                        <input
                          {...register('clientEmail')}
                          type="email"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status *</label>
                        <select
                          {...register('status')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        >
                          <option value="">Select status</option>
                          <option value="planning">Planning</option>
                          <option value="development">Development</option>
                          <option value="testing">Testing</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Priority *</label>
                        <select
                          {...register('priority')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        >
                          <option value="">Select priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Start Date *</label>
                        <input
                          {...register('startDate')}
                          type="date"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">End Date *</label>
                        <input
                          {...register('endDate')}
                          type="date"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Budget *</label>
                        <input
                          {...register('budget', { valueAsNumber: true })}
                          type="number"
                          min="0"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-brand-primary/30 px-6 py-3 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-brand-primary border border-brand-accent/30 rounded-md hover:bg-brand-primary/70"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-blue-600"
                    >
                      {isEditing ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsManagement;
