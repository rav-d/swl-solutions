import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const emailSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  recipientGroup: z.string().min(1, 'Please select a recipient group'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  scheduledDate: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailSchema>;

const EmailMarketing: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const templates = [
    {
      id: 'welcome',
      name: 'Welcome Series',
      subject: 'Welcome to SWL Solutions!',
      content: 'Thank you for choosing SWL Solutions. We\'re excited to work with you on your project...'
    },
    {
      id: 'newsletter',
      name: 'Monthly Newsletter',
      subject: 'SWL Solutions Monthly Update',
      content: 'Here\'s what\'s new this month at SWL Solutions. We\'ve been busy working on exciting projects...'
    },
    {
      id: 'promotion',
      name: 'Service Promotion',
      subject: 'Special Offer: 20% Off Web Development',
      content: 'Limited time offer! Get 20% off your next web development project. This offer expires soon...'
    }
  ];

  const recipientGroups = [
    { id: 'all', name: 'All Subscribers', count: 1247 },
    { id: 'leads', name: 'New Leads', count: 89 },
    { id: 'clients', name: 'Active Clients', count: 156 },
    { id: 'newsletter', name: 'Newsletter Subscribers', count: 892 },
  ];

  const onSubmit = async (data: EmailFormData) => {
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Email campaign data:', data);
    
    setIsSending(false);
    setIsSent(true);
    reset();
    setSelectedTemplate('');
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setValue('subject', template.subject);
    setValue('content', template.content);
    setSelectedTemplate(template.id);
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-secondary p-8 rounded-2xl max-w-md w-full mx-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Campaign Sent!</h2>
          <p className="text-gray-400 mb-6">
            Your email campaign has been successfully sent to your selected recipients.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSent(false)}
            className="bg-brand-accent text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300 font-semibold"
          >
            Create Another Campaign
          </motion.button>
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
          <h1 className="text-3xl font-bold text-white mb-2">Email Marketing</h1>
          <p className="text-gray-400">Create and send email campaigns to your subscribers</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Templates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-brand-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Email Templates</h3>
              <div className="space-y-3">
                {templates.map(template => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => applyTemplate(template)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-brand-primary hover:border-brand-accent/50 bg-brand-primary/50'
                    }`}
                  >
                    <h4 className="text-white font-semibold mb-2">{template.name}</h4>
                    <p className="text-gray-400 text-sm">{template.subject}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Campaign Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-brand-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Create Campaign</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="subject">
                    Subject Line *
                  </label>
                  <input
                    {...register('subject')}
                    className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                    placeholder="Enter email subject..."
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="recipientGroup">
                    Recipient Group *
                  </label>
                  <select
                    {...register('recipientGroup')}
                    className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                  >
                    <option value="">Select recipient group</option>
                    {recipientGroups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.name} ({group.count} subscribers)
                      </option>
                    ))}
                  </select>
                  {errors.recipientGroup && (
                    <p className="text-red-400 text-sm mt-1">{errors.recipientGroup.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="content">
                    Email Content *
                  </label>
                  <textarea
                    {...register('content')}
                    rows={8}
                    className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                    placeholder="Write your email content here..."
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="scheduledDate">
                    Schedule Send (Optional)
                  </label>
                  <input
                    {...register('scheduledDate')}
                    type="datetime-local"
                    className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ scale: isSending ? 1 : 1.02 }}
                    whileTap={{ scale: isSending ? 1 : 0.98 }}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSending
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-brand-accent text-white hover:bg-blue-500'
                    }`}
                  >
                    {isSending ? 'Sending...' : 'Send Campaign'}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-lg font-semibold bg-brand-primary text-white hover:bg-brand-secondary transition-colors duration-300 border border-brand-accent/50"
                  >
                    Save Draft
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Campaign Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-brand-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Campaign Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Subscribers', value: '1,247', change: '+12%' },
                { label: 'Open Rate', value: '24.3%', change: '+2.1%' },
                { label: 'Click Rate', value: '8.7%', change: '+0.5%' },
                { label: 'Unsubscribe Rate', value: '0.3%', change: '-0.1%' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailMarketing;
