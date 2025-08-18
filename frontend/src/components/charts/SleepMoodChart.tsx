import React from 'react';
import { UserLog } from '../../types';

interface SleepMoodChartProps {
  logs: UserLog[];
}

export const SleepMoodChart: React.FC<SleepMoodChartProps> = ({ logs }) => {
  const chartHeight = 200;
  const chartWidth = 400;
  const maxSleep = Math.max(...logs.map(log => log.sleepHours), 12);
  const maxMood = 10;

  if (logs.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        No sleep and mood data available
      </div>
    );
  }

  return (
    <div className="relative">
      <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="overflow-visible">
        {/* Grid lines */}
        {/* Y-axis (mood) */}
        {[0, 2, 4, 6, 8, 10].map((value) => (
          <g key={`mood-${value}`}>
            <line
              x1="0"
              y1={chartHeight - (value / maxMood) * chartHeight}
              x2={chartWidth}
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

        {/* X-axis (sleep) */}
        {Array.from({length: Math.ceil(maxSleep) + 1}, (_, i) => i * 2).map((value) => (
          <g key={`sleep-${value}`}>
            <line
              x1={(value / maxSleep) * chartWidth}
              y1="0"
              x2={(value / maxSleep) * chartWidth}
              y2={chartHeight}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <text
              x={(value / maxSleep) * chartWidth}
              y={chartHeight + 15}
              className="text-xs text-gray-500"
              textAnchor="middle"
            >
              {value}h
            </text>
          </g>
        ))}

        {/* Data points */}
        {logs.map((log, index) => {
          const x = (log.sleepHours / maxSleep) * chartWidth;
          const y = chartHeight - (log.mood / maxMood) * chartHeight;
          return (
            <circle
              key={log.id}
              cx={x}
              cy={y}
              r="6"
              fill="#8b5cf6"
              fillOpacity="0.7"
              stroke="#8b5cf6"
              strokeWidth="2"
              className="hover:r-8 hover:fill-opacity-100 transition-all cursor-pointer"
            >
              <title>{`${log.date}: ${log.sleepHours}h sleep, ${log.mood}/10 mood`}</title>
            </circle>
          );
        })}

        {/* Trend line (if enough data points) */}
        {logs.length > 2 && (() => {
          // Simple linear regression
          const n = logs.length;
          const sumX = logs.reduce((sum, log) => sum + log.sleepHours, 0);
          const sumY = logs.reduce((sum, log) => sum + log.mood, 0);
          const sumXY = logs.reduce((sum, log) => sum + log.sleepHours * log.mood, 0);
          const sumXX = logs.reduce((sum, log) => sum + log.sleepHours * log.sleepHours, 0);
          
          const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
          const intercept = (sumY - slope * sumX) / n;
          
          const minSleep = Math.min(...logs.map(log => log.sleepHours));
          const maxSleepValue = Math.max(...logs.map(log => log.sleepHours));
          
          const x1 = (minSleep / maxSleep) * chartWidth;
          const y1 = chartHeight - ((slope * minSleep + intercept) / maxMood) * chartHeight;
          const x2 = (maxSleepValue / maxSleep) * chartWidth;
          const y2 = chartHeight - ((slope * maxSleepValue + intercept) / maxMood) * chartHeight;
          
          return (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.7"
            />
          );
        })()}
      </svg>

      {/* Labels */}
      <div className="mt-6">
        <div className="text-center">
          <span className="text-sm text-gray-600">Sleep Hours (x-axis) vs Mood Score (y-axis)</span>
        </div>
        <div className="flex items-center justify-center mt-2 space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full opacity-70"></div>
            <span className="text-xs text-gray-600">Daily Logs</span>
          </div>
          {logs.length > 2 && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-0.5 bg-green-600 opacity-70" style={{borderTop: '2px dashed'}}></div>
              <span className="text-xs text-gray-600">Trend Line</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};