import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LeadScore from './components/LeadScore';
import PipelineView from './components/PipelineView';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  status: z.string().min(1, 'Please select a status'),
  source: z.string().min(1, 'Please select a source'),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget: string;
  timeline: string;
  services: string[];
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed-won' | 'closed-lost';
  source: string;
  createdAt: string;
  lastContacted?: string;
  notes?: string;
  score: number;
  value: string;
  assignedTo?: string;
}

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techstartup.com',
      company: 'TechStartup Inc',
      phone: '+1 (555) 123-4567',
      budget: '10k-25k',
      timeline: '1-3 months',
      services: ['Web Development', 'Mobile Development'],
      message: 'Looking to build a mobile app for our startup. Need both iOS and Android versions.',
      status: 'new',
      source: 'Website Contact Form',
      createdAt: '2024-01-20T10:30:00Z',
      notes: 'Very interested, has funding secured',
      score: 85,
      value: '$15,000',
      assignedTo: 'Sofia Rossi'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@enterprise.com',
      company: 'Enterprise Corp',
      phone: '+1 (555) 987-6543',
      budget: '>25k',
      timeline: '3+ months',
      services: ['Backend & APIs', 'Cloud & AWS', 'AI & Automation'],
      message: 'Need to modernize our legacy systems and implement AI-powered automation.',
      status: 'qualified',
      source: 'Referral',
      createdAt: '2024-01-18T14:15:00Z',
      lastContacted: '2024-01-19T09:00:00Z',
      notes: 'Decision maker, budget approved, technical requirements clear',
      score: 92,
      value: '$45,000',
      assignedTo: 'David Kim'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@smallbiz.com',
      company: 'SmallBiz Solutions',
      budget: '<10k',
      timeline: 'ASAP',
      services: ['Web Development', 'UI/UX Design'],
      message: 'Need a simple website for our small business. Looking for something professional and affordable.',
      status: 'contacted',
      source: 'Google Ads',
      createdAt: '2024-01-19T16:45:00Z',
      lastContacted: '2024-01-20T11:30:00Z',
      notes: 'Price sensitive, needs quick turnaround',
      score: 65,
      value: '$8,000',
      assignedTo: 'Sofia Rossi'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      email: 'alex@innovate.com',
      company: 'InnovateCorp',
      budget: '>25k',
      timeline: '1-3 months',
      services: ['AI & Automation', 'Cloud & AWS'],
      message: 'Looking for AI-powered solutions to streamline our operations.',
      status: 'proposal',
      source: 'LinkedIn',
      createdAt: '2024-01-15T09:20:00Z',
      lastContacted: '2024-01-18T14:00:00Z',
      notes: 'High priority client, technical demo scheduled',
      score: 78,
      value: '$35,000',
      assignedTo: 'Marcus Holloway'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa@techcorp.com',
      company: 'TechCorp',
      budget: '10k-25k',
      timeline: '3+ months',
      services: ['Web Development', 'Backend & APIs'],
      message: 'Need to rebuild our customer portal with modern technologies.',
      status: 'closed-won',
      source: 'Referral',
      createdAt: '2024-01-10T11:15:00Z',
      lastContacted: '2024-01-17T16:30:00Z',
      notes: 'Contract signed, project starting next week',
      score: 95,
      value: '$22,000',
      assignedTo: 'Kenji Tanaka'
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'pipeline'>('pipeline');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'contacted': 'bg-yellow-100 text-yellow-800',
    'qualified': 'bg-green-100 text-green-800',
    'proposal': 'bg-purple-100 text-purple-800',
    'closed-won': 'bg-emerald-100 text-emerald-800',
    'closed-lost': 'bg-red-100 text-red-800',
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const pipelineStages = [
    {
      id: 'new',
      name: 'New Leads',
      color: '#3B82F6',
      leads: leads.filter(lead => lead.status === 'new')
    },
    {
      id: 'contacted',
      name: 'Contacted',
      color: '#F59E0B',
      leads: leads.filter(lead => lead.status === 'contacted')
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: '#10B981',
      leads: leads.filter(lead => lead.status === 'qualified')
    },
    {
      id: 'proposal',
      name: 'Proposal',
      color: '#8B5CF6',
      leads: leads.filter(lead => lead.status === 'proposal')
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      color: '#059669',
      leads: leads.filter(lead => lead.status === 'closed-won')
    }
  ];

  const handleLeadMove = (leadId: string, fromStage: string, toStage: string) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: toStage as any, lastContacted: new Date().toISOString() }
        : lead
    ));
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditing(true);
    setValue('name', lead.name);
    setValue('email', lead.email);
    setValue('company', lead.company || '');
    setValue('phone', lead.phone || '');
    setValue('budget', lead.budget);
    setValue('timeline', lead.timeline);
    setValue('services', lead.services);
    setValue('message', lead.message);
    setValue('status', lead.status);
    setValue('source', lead.source);
    setIsModalOpen(true);
  };

  const handleAddLead = () => {
    setSelectedLead(null);
    setIsEditing(false);
    reset();
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditing(true);
    setValue('name', lead.name);
    setValue('email', lead.email);
    setValue('company', lead.company || '');
    setValue('phone', lead.phone || '');
    setValue('budget', lead.budget);
    setValue('timeline', lead.timeline);
    setValue('services', lead.services);
    setValue('message', lead.message);
    setValue('status', lead.status);
    setValue('source', lead.source);
    setIsModalOpen(true);
  };

  const onSubmit = (data: LeadFormData) => {
    if (isEditing && selectedLead) {
      // Update existing lead
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, ...data, lastContacted: new Date().toISOString() }
          : lead
      ));
    } else {
      // Add new lead
      const newLead: Lead = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setLeads([newLead, ...leads]);
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads Management</h1>
          <p className="text-gray-300">Manage your leads and track their progress through the sales pipeline.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-brand-primary/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'pipeline' 
                  ? 'bg-brand-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-brand-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Table
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddLead}
            className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
          >
            Add New Lead
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total Leads</p>
              <p className="text-2xl font-bold text-white">{leads.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Pipeline Value</p>
              <p className="text-2xl font-bold text-white">
                ${leads.reduce((sum, lead) => sum + parseInt(lead.value.replace(/[$,]/g, '')), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Avg Lead Score</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Conversion Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.round((leads.filter(l => l.status === 'closed-won').length / leads.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <PipelineView
          stages={pipelineStages}
          onLeadMove={handleLeadMove}
          onLeadClick={handleLeadClick}
        />
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <>
          {/* Filters */}
          <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'new', 'contacted', 'qualified', 'proposal', 'closed-won', 'closed-lost'].map(status => (
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

      {/* Leads Table */}
      <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-accent/20">
            <thead className="bg-brand-primary/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-brand-secondary divide-y divide-brand-accent/20">
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-brand-primary/20"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{lead.name}</div>
                      <div className="text-sm text-gray-400">{lead.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{lead.company || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{lead.budget}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LeadScore score={lead.score} size="sm" showLabel={false} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.status as keyof typeof statusColors]}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{formatDate(lead.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="text-brand-accent hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* Lead Modal */}
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
                      {isEditing ? 'Edit Lead' : 'Add New Lead'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                        <input
                          {...register('name')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                        <input
                          {...register('company')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                        <input
                          {...register('phone')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Budget *</label>
                        <select
                          {...register('budget')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        >
                          <option value="">Select budget range</option>
                          <option value="<10k">Below $10k</option>
                          <option value="10k-25k">$10k–$25k</option>
                          <option value=">25k">$25k+</option>
                        </select>
                        {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Timeline *</label>
                        <select
                          {...register('timeline')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        >
                          <option value="">Select timeline</option>
                          <option value="ASAP">ASAP</option>
                          <option value="1-3 months">1–3 months</option>
                          <option value="3+ months">3+ months</option>
                        </select>
                        {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Status *</label>
                        <select
                          {...register('status')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        >
                          <option value="">Select status</option>
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="proposal">Proposal</option>
                          <option value="closed-won">Closed Won</option>
                          <option value="closed-lost">Closed Lost</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Source *</label>
                        <select
                          {...register('source')}
                          className="w-full px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                        >
                          <option value="">Select source</option>
                          <option value="Website Contact Form">Website Contact Form</option>
                          <option value="Google Ads">Google Ads</option>
                          <option value="Referral">Referral</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Direct Contact">Direct Contact</option>
                        </select>
                        {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
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
                      {isEditing ? 'Update Lead' : 'Add Lead'}
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

export default LeadsManagement;
