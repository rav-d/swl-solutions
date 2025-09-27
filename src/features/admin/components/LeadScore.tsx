import React from 'react';
import { motion } from 'framer-motion';

interface LeadScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const LeadScore: React.FC<LeadScoreProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  animated = true
}) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    if (score >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Hot Lead';
    if (score >= 60) return 'Warm Lead';
    if (score >= 40) return 'Cold Lead';
    return 'Very Cold';
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const strokeWidth = size === 'sm' ? 3 : size === 'md' ? 4 : 6;
  const radius = size === 'sm' ? 26 : size === 'md' ? 32 : 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} transform -rotate-90`}
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: 0, strokeDashoffset: circumference }}
            animate={animated ? {
              strokeDasharray: circumference,
              strokeDashoffset: circumference - (percentage / 100) * circumference
            } : {
              strokeDasharray: circumference,
              strokeDashoffset: circumference - (percentage / 100) * circumference
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`font-bold text-white ${textSizeClasses[size]}`}>
              {score}
            </div>
            {showLabel && (
              <div className={`text-gray-400 ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>
                /{maxScore}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-center"
        >
          <div className={`font-medium ${textSizeClasses[size]}`} style={{ color: getScoreColor(score) }}>
            {getScoreLabel(score)}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LeadScore;
