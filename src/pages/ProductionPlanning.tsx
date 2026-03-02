import { motion } from 'framer-motion';
import { productionPlan, vehicleModels } from '../data/dummyData.ts';
import { cn, formatNumber } from '../lib/utils.ts';

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
const dayLabels: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
};

export default function ProductionPlanning() {
  return (
    <div className="space-y-6">
      {/* Monthly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Monthly Target vs Achieved
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productionPlan.map((row, i) => {
            const pct = (row.monthlyAchieved / row.monthlyTarget) * 100;
            const model = vehicleModels.find((m) => m.id === row.modelId);
            return (
              <motion.div
                key={row.modelId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{row.model}</h3>
                  <span className={cn(
                    'text-xs font-bold px-2 py-0.5 rounded-full',
                    pct >= 90 ? 'bg-green-100 text-green-700' :
                    pct >= 75 ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  )}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{formatNumber(row.monthlyAchieved)} / {formatNumber(row.monthlyTarget)}</span>
                </div>
                <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: model?.color ?? '#3b82f6' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Production Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Weekly Production Schedule
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Model</th>
                {days.map((d) => (
                  <th key={d} className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase">{dayLabels[d]}</th>
                ))}
                <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Week Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productionPlan.map((row) => {
                let weekTarget = 0;
                let weekActual = 0;
                return (
                  <tr key={row.modelId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900 text-sm">{row.model}</p>
                    </td>
                    {days.map((d) => {
                      const cell = row[d];
                      weekTarget += cell.target;
                      weekActual += cell.actual;
                      const met = cell.actual >= cell.target;
                      const above = cell.actual > cell.target;
                      return (
                        <td key={d} className="text-center px-3 py-3">
                          <div className={cn(
                            'inline-flex flex-col items-center px-2 py-1 rounded-xl text-xs font-medium',
                            above ? 'bg-blue-50 text-blue-700' :
                            met ? 'bg-green-50 text-green-700' :
                            'bg-red-50 text-red-700'
                          )}>
                            <span className="font-bold">{cell.actual}</span>
                            <span className="text-[10px] opacity-70">/ {cell.target}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="text-center px-3 py-3">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-bold text-sm text-gray-900">{weekActual}</span>
                        <span className="text-[10px] text-gray-400">/ {weekTarget}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
          <span>Met target</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
          <span>Above target</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-300" />
          <span>Below target</span>
        </div>
      </div>
    </div>
  );
}
