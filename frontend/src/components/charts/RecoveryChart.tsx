import React from 'react';
import { UserLog } from '../../types';
import { calculateRecoveryPercentage } from '../../utils/recoveryCalculation';

interface RecoveryChartProps {
  logs: UserLog[];
}

export const RecoveryChart: React.FC<RecoveryChartProps> = ({ logs }) => {
  // Sort logs by date and calculate cumulative recovery percentage
  const sortedLogs = [...logs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const recoveryData = sortedLogs.map((_, index) => {
    const logsUpToDate = sortedLogs.slice(0, index + 1);
    return {
      date: sortedLogs[index].date,
      recovery: calculateRecoveryPercentage(logsUpToDate)
    };
  });

  const chartHeight = 200;
  const maxRecovery = 100;

  if (recoveryData.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        No recovery data available
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width="100%" height={chartHeight} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <g key={value}>
            <line
              x1="0"
              y1={chartHeight - (value / maxRecovery) * chartHeight}
              x2="100%"
              y2={chartHeight - (value / maxRecovery) * chartHeight}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x="-10"
              y={chartHeight - (value / maxRecovery) * chartHeight + 5}
              className="text-xs text-gray-500"
              textAnchor="end"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Recovery area */}
        <defs>
          <linearGradient id="recoveryAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path
          d={`M 0,${chartHeight} ${recoveryData.map((data, index) => {
            const x = (index / (recoveryData.length - 1)) * 100;
            const y = chartHeight - (data.recovery / maxRecovery) * chartHeight;
            return `L ${x}%,${y}`;
          }).join(' ')} L 100%,${chartHeight} Z`}
          fill="url(#recoveryAreaGradient)"
        />

        {/* Recovery line */}
        <polyline
          points={recoveryData.map((data, index) => {
            const x = (index / (recoveryData.length - 1)) * 100;
            const y = chartHeight - (data.recovery / maxRecovery) * chartHeight;
            return `${x}%,${y}`;
          }).join(' ')}
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {recoveryData.map((data, index) => {
          const x = (index / (recoveryData.length - 1)) * 100;
          const y = chartHeight - (data.recovery / maxRecovery) * chartHeight;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={y}
              r="4"
              fill="white"
              stroke="#22c55e"
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>{`${data.date}: ${Math.round(data.recovery)}% recovered`}</title>
            </circle>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {recoveryData.map((data, index) => (
          <span key={index}>
            {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        ))}
      </div>
    </div>
  );
};