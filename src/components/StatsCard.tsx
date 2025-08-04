import React from 'react';
import { getSegmentColor } from '../utils/colors';

interface StatsCardProps {
  segment: string;
  count: number;
  percentage: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ segment, count, percentage }) => {
  const colors = getSegmentColor(segment);

  return (
    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${colors.accent} rounded-full`}></div>
          <span className={`${colors.text} font-semibold text-sm`}>{segment}</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{count}</span>
      </div>
      <div className="w-full bg-white rounded-full h-2">
        <div 
          className={`${colors.accent} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(1)}% do total</p>
    </div>
  );
};