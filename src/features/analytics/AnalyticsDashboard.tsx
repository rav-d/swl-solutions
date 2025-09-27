import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface ChartData {
  month: string;
  leads: number;
  revenue: number;
  projects: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data - in real app, this would come from API
  const metrics: Metric[] = [
    { label: 'Total Leads', value: 127, change: 12.5, trend: 'up' },
    { label: 'Conversion Rate', value: '23.4%', change: 2.1, trend: 'up' },
    { label: 'Revenue', value: '$45,230', change: -5.2, trend: 'down' },
    { label: 'Active Projects', value: 8, change: 0, trend: 'neutral' },
    { label: 'Client Satisfaction', value: '4.8/5', change: 0.3, trend: 'up' },
    { label: 'Avg. Project Value', value: '$18,500', change: 8.7, trend: 'up' },
  ];

  const chartData: ChartData[] = [
    { month: 'Jan', leads: 45, revenue: 32000, projects: 3 },
    { month: 'Feb', leads: 52, revenue: 38000, projects: 4 },
    { month: 'Mar', leads: 48, revenue: 35000, projects: 3 },
    { month: 'Apr', leads: 61, revenue: 42000, projects: 5 },
    { month: 'May', leads: 55, revenue: 39000, projects: 4 },
    { month: 'Jun', leads: 67, revenue: 48000, projects: 6 },
  ];

  const topServices = [
    { name: 'Web Development', count: 45, revenue: 180000 },
    { name: 'Mobile Development', count: 32, revenue: 150000 },
    { name: 'Backend & APIs', count: 28, revenue: 120000 },
    { name: 'Cloud & AWS', count: 22, revenue: 95000 },
    { name: 'AI & Automation', count: 18, revenue: 75000 },
  ];

  const recentActivity = [
    { type: 'lead', message: 'New lead from Sarah Johnson', time: '2 hours ago', value: '$15,000' },
    { type: 'project', message: 'Project "E-commerce Platform" completed', time: '4 hours ago', value: '$25,000' },
    { type: 'payment', message: 'Payment received from TechStartup Inc', time: '6 hours ago', value: '$12,500' },
    { type: 'meeting', message: 'Consultation scheduled with Michael Chen', time: '1 day ago', value: '$300' },
    { type: 'lead', message: 'New lead from Emily Rodriguez', time: '2 days ago', value: '$8,000' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getActivityIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'lead':
        return <svg className={`${iconClass} text-blue-400`} fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'project':
        return <svg className={`${iconClass} text-green-400`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
      case 'payment':
        return <svg className={`${iconClass} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>;
      case 'meeting':
        return <svg className={`${iconClass} text-purple-400`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
      default:
        return <svg className={`${iconClass} text-gray-400`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400">Track your business performance and growth metrics</p>
            </div>
            <div className="flex gap-2">
              {(['7d', '30d', '90d', '1y'] as const).map(period => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-brand-accent text-white'
                      : 'bg-brand-secondary text-gray-400 hover:text-white'
                  }`}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-secondary rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-400">{metric.label}</h3>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs font-semibold ${
                    metric.trend === 'up' ? 'text-green-400' :
                    metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-secondary rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Revenue & Leads Trend</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {chartData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center gap-1 mb-2">
                      <div
                        className="w-full bg-brand-accent rounded-t"
                        style={{ height: `${(data.revenue / 50000) * 200}px` }}
                      />
                      <div
                        className="w-full bg-green-400 rounded-t"
                        style={{ height: `${(data.leads / 70) * 100}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-accent rounded"></div>
                  <span className="text-sm text-gray-400">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <span className="text-sm text-gray-400">Leads</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Top Services */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-secondary rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Top Services</h3>
              <div className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.name} className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{service.name}</p>
                      <p className="text-gray-400 text-sm">{service.count} projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-brand-accent font-bold">${service.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-brand-secondary rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-brand-primary/50 transition-colors duration-300"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-white">{activity.message}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-accent font-semibold">{activity.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
