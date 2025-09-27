import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lead } from '../../types';

// Mock data - in real app, this would come from API
const mockLeads: Lead[] = [
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
    notes: 'Very interested, has funding secured'
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
    notes: 'Decision maker, budget approved, technical requirements clear'
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
    notes: 'Price sensitive, needs quick turnaround'
  }
];

const statusColors = {
  'new': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'contacted': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'qualified': 'bg-green-500/20 text-green-400 border-green-500/30',
  'proposal': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'closed-won': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'closed-lost': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const CRMDashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    if (selectedStatus === 'all') return mockLeads;
    return mockLeads.filter(lead => lead.status === selectedStatus);
  }, [selectedStatus]);

  const leadStats = useMemo(() => {
    const stats = {
      total: mockLeads.length,
      new: mockLeads.filter(l => l.status === 'new').length,
      contacted: mockLeads.filter(l => l.status === 'contacted').length,
      qualified: mockLeads.filter(l => l.status === 'qualified').length,
      proposal: mockLeads.filter(l => l.status === 'proposal').length,
      closedWon: mockLeads.filter(l => l.status === 'closed-won').length,
    };
    return stats;
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
    <div className="min-h-screen bg-brand-primary">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">CRM Dashboard</h1>
          <p className="text-gray-400">Manage your leads and track sales pipeline</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(leadStats).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-secondary rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leads List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Leads</h2>
              <div className="flex gap-2">
                {['all', 'new', 'contacted', 'qualified', 'proposal'].map(status => (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                      selectedStatus === status
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-secondary text-gray-400 hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'All' : getStatusLabel(status)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-brand-secondary rounded-lg p-4 cursor-pointer border-2 transition-all duration-300 ${
                    selectedLead?.id === lead.id
                      ? 'border-brand-accent'
                      : 'border-transparent hover:border-brand-accent/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{lead.name}</h3>
                      <p className="text-gray-400 text-sm">{lead.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[lead.status as keyof typeof statusColors]}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white ml-2">{lead.budget}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-white ml-2">{lead.timeline}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {lead.services.slice(0, 3).map(service => (
                        <span
                          key={service}
                          className="text-xs bg-brand-primary/60 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {lead.services.length > 3 && (
                        <span className="text-xs text-gray-500">+{lead.services.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Created: {formatDate(lead.createdAt)} • Source: {lead.source}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lead Details */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-brand-secondary rounded-lg p-6 sticky top-8"
              >
                <h3 className="text-xl font-bold text-white mb-4">Lead Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Name:</span> <span className="text-white">{selectedLead.name}</span></p>
                      <p><span className="text-gray-400">Email:</span> <span className="text-white">{selectedLead.email}</span></p>
                      {selectedLead.company && (
                        <p><span className="text-gray-400">Company:</span> <span className="text-white">{selectedLead.company}</span></p>
                      )}
                      {selectedLead.phone && (
                        <p><span className="text-gray-400">Phone:</span> <span className="text-white">{selectedLead.phone}</span></p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Budget:</span> <span className="text-white">{selectedLead.budget}</span></p>
                      <p><span className="text-gray-400">Timeline:</span> <span className="text-white">{selectedLead.timeline}</span></p>
                      <p><span className="text-gray-400">Source:</span> <span className="text-white">{selectedLead.source}</span></p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Services Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.services.map(service => (
                        <span
                          key={service}
                          className="text-xs bg-brand-primary/60 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Message</h4>
                    <p className="text-gray-300 text-sm">{selectedLead.message}</p>
                  </div>

                  {selectedLead.notes && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Notes</h4>
                      <p className="text-gray-300 text-sm">{selectedLead.notes}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-brand-accent text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-300 font-semibold text-sm"
                      >
                        Contact Lead
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-brand-primary text-white py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 font-semibold text-sm"
                      >
                        Add Note
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-brand-secondary rounded-lg p-6 text-center">
                <p className="text-gray-400">Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard;
