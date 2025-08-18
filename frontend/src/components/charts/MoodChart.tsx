import React from 'react';
import { UserLog } from '../../types';

interface MoodChartProps {
  logs: UserLog[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ logs }) => {
  // Sort logs by date for proper chart display
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const maxMood = 10;
  const chartHeight = 200;

  if (sortedLogs.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        No mood data available
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width="100%" height={chartHeight} className="overflow-visible">
        {/* Grid lines */}
        {[0, 2, 4, 6, 8, 10].map((value) => (
          <g key={value}>
            <line
              x1="0"
              y1={chartHeight - (value / maxMood) * chartHeight}
              x2="100%"
              y2={chartHeight - (value / maxMood) * chartHeight}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x="-10"
              y={chartHeight - (value / maxMood) * chartHeight + 5}
              className="text-xs text-gray-500"
              textAnchor="end"
            >
              {value}
            </text>
          </g>
        ))}

        {/* Mood line */}
        <polyline
          points={sortedLogs.map((log, index) => {
            const x = (index / (sortedLogs.length - 1)) * 100;
            const y = chartHeight - (log.mood / maxMood) * chartHeight;
            return `${x}%,${y}`;
          }).join(' ')}
          fill="none"
          stroke="url(#moodGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {sortedLogs.map((log, index) => {
          const x = (index / (sortedLogs.length - 1)) * 100;
          const y = chartHeight - (log.mood / maxMood) * chartHeight;
          return (
            <circle
              key={log.id}
              cx={`${x}%`}
              cy={y}
              r="4"
              fill="white"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>{`${log.date}: Mood ${log.mood}/10`}</title>
            </circle>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {sortedLogs.map((log) => (
          <span key={log.id}>
            {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
    </div>
  );
};