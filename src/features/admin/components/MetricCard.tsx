import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  trend,
  icon,
  color = 'blue',
  delay = 0
}) => {
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          iconBg: 'bg-blue-500/20',
          iconColor: 'text-blue-400',
          accent: 'text-blue-400'
        };
      case 'green':
        return {
          iconBg: 'bg-green-500/20',
          iconColor: 'text-green-400',
          accent: 'text-green-400'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-500/20',
          iconColor: 'text-purple-400',
          accent: 'text-purple-400'
        };
      case 'orange':
        return {
          iconBg: 'bg-orange-500/20',
          iconColor: 'text-orange-400',
          accent: 'text-orange-400'
        };
      case 'red':
        return {
          iconBg: 'bg-red-500/20',
          iconColor: 'text-red-400',
          accent: 'text-red-400'
        };
      default:
        return {
          iconBg: 'bg-brand-accent/20',
          iconColor: 'text-brand-accent',
          accent: 'text-brand-accent'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6 hover:border-brand-accent/40 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 ${colors.iconBg} rounded-lg`}>
          <div className={colors.iconColor}>
            {icon}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        {getTrendIcon(trend)}
        <span className={`text-sm font-medium ml-2 ${
          trend === 'up' ? 'text-green-400' :
          trend === 'down' ? 'text-red-400' : 'text-gray-400'
        }`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-400 ml-1">vs last month</span>
      </div>
    </motion.div>
  );
};

export default MetricCard;
