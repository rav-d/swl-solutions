import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  currentTask?: string;
  workload: number; // percentage
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

interface TeamCollaborationProps {
  projectId: string;
  teamMembers: TeamMember[];
  messages: Message[];
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  onUpdateMemberStatus: (memberId: string, status: TeamMember['status']) => void;
}

const TeamCollaboration: React.FC<TeamCollaborationProps> = ({
  projectId,
  teamMembers,
  messages,
  onSendMessage,
  onUpdateMemberStatus
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'team' | 'activity'>('chat');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return 'text-red-400';
    if (workload >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage({
        sender: 'You',
        message: newMessage,
        type: 'text'
      });
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 overflow-hidden">
      <div className="border-b border-brand-accent/20">
        <div className="flex">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-brand-accent text-white border-b-2 border-brand-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'team'
                ? 'bg-brand-accent text-white border-b-2 border-brand-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-brand-accent text-white border-b-2 border-brand-accent'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      <div className="h-96 flex">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'You'
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-primary/50 text-gray-300'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-semibold">{message.sender}</span>
                        <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      {message.type === 'task' && (
                        <div className="mt-2 p-2 bg-white/10 rounded text-xs">
                          <span className="font-semibold">Task Update:</span> {message.taskId}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="border-t border-brand-accent/20 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="flex-1 p-4">
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-brand-primary/30 rounded-lg hover:bg-brand-primary/50 transition-colors duration-200"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-brand-secondary ${getStatusColor(member.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.status === 'online' ? 'bg-green-500/20 text-green-400' :
                        member.status === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getStatusText(member.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{member.role}</p>
                    {member.currentTask && (
                      <p className="text-xs text-gray-500 mt-1">Working on: {member.currentTask}</p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getWorkloadColor(member.workload)}`}>
                      {member.workload}%
                    </div>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          member.workload >= 90 ? 'bg-red-400' :
                          member.workload >= 70 ? 'bg-yellow-400' :
                          'bg-green-400'
                        }`}
                        style={{ width: `${member.workload}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-brand-primary/30 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">Task "Setup database schema" completed</p>
                  <p className="text-xs text-gray-400">David Kim • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-brand-primary/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">New task "Implement user authentication" created</p>
                  <p className="text-xs text-gray-400">Sofia Rossi • 4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-brand-primary/30 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 4v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">File "api-design.md" uploaded</p>
                  <p className="text-xs text-gray-400">Marcus Holloway • 6 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-brand-primary/30 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white">Deadline updated for "Frontend Development"</p>
                  <p className="text-xs text-gray-400">Kenji Tanaka • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCollaboration;
