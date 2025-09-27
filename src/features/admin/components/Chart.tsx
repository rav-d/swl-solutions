import React from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'doughnut';
  title: string;
  height?: number;
  showLegend?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  data,
  type,
  title,
  height = 200,
  showLegend = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  const renderBarChart = () => (
    <div className="space-y-2">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ width: 0 }}
          animate={{ width: `${(item.value / maxValue) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="flex items-center space-x-3"
        >
          <div className="w-20 text-xs text-gray-400 truncate">{item.label}</div>
          <div className="flex-1 relative">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-brand-accent to-blue-500"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <span className="text-xs text-white font-medium">{item.value}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative" style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent, index) => (
          <line
            key={index}
            x1="0"
            y1={`${percent}%`}
            x2="100%"
            y2={`${percent}%`}
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="1"
          />
        ))}
        
        {/* Line path */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M 0,${height} ${data.map((item, index) => 
            `L ${(index / (data.length - 1)) * 100}%,${height - (item.value / maxValue) * height}`
          ).join(' ')}`}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        
        {/* Area under line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M 0,${height} ${data.map((item, index) => 
            `L ${(index / (data.length - 1)) * 100}%,${height - (item.value / maxValue) * height}`
          ).join(' ')} L 100%,${height} Z`}
          fill="url(#lineGradient)"
        />
        
        {/* Data points */}
        {data.map((item, index) => (
          <motion.circle
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 1, duration: 0.3 }}
            cx={`${(index / (data.length - 1)) * 100}%`}
            cy={height - (item.value / maxValue) * height}
            r="4"
            fill="#3B82F6"
            className="hover:r-6 transition-all duration-200"
          />
        ))}
      </svg>
    </div>
  );

  const renderDoughnutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex items-center justify-center space-x-8">
        <div className="relative" style={{ width: height, height: height }}>
          <svg width={height} height={height} className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const radius = height / 2 - 20;
              const x = height / 2 + radius * Math.cos((currentAngle * Math.PI) / 180);
              const y = height / 2 + radius * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = height / 2 + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = height / 2 + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${height / 2} ${height / 2}`,
                `L ${x} ${y}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <motion.path
                  key={index}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                  d={pathData}
                  fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{total}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </div>
        </div>
        
        {showLegend && (
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
                />
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'doughnut':
        return renderDoughnutChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default Chart;
