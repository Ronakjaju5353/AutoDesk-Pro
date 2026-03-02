import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: ReactNode;
  className?: string;
  delay?: number;
}

export default function StatCard({ label, value, unit, change, icon, className, delay = 0 }: StatCardProps) {
  const getTrend = () => {
    if (!change || change === 0) return { icon: <Minus size={14} />, color: 'text-gray-400', bg: 'bg-gray-50' };
    if (change > 0) return { icon: <TrendingUp size={14} />, color: 'text-green-600', bg: 'bg-green-50' };
    return { icon: <TrendingDown size={14} />, color: 'text-red-600', bg: 'bg-red-50' };
  };

  const trend = getTrend();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100',
        'hover:shadow-md transition-shadow duration-300',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-200">
          {icon}
        </div>
        {change !== undefined && (
          <div className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', trend.bg, trend.color)}>
            {trend.icon}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">
        {label} {unit && <span className="text-gray-400">({unit})</span>}
      </p>
    </motion.div>
  );
}
