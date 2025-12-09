import React from 'react';
import { Divide as LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  colorClass: string;
  subtext?: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, icon: Icon, colorClass, subtext }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-full ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>
      {subtext && (
        <p className="mt-2 text-xs text-slate-400 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default SensorCard;
