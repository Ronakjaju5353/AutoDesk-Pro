import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, Package } from 'lucide-react';
import { partsInventory } from '../data/dummyData.ts';
import { cn, formatNumber, formatDate } from '../lib/utils.ts';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Adequate': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'Reorder Soon': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Critical Low': { icon: <AlertTriangle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
  'On Order': { icon: <Package size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
};

const criticalParts = partsInventory.filter(
  (p) => p.status === 'Critical Low' || p.status === 'On Order'
);

export default function PartsInventory() {
  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalParts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 rounded-2xl p-4 border border-red-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="text-sm font-bold text-red-800">Critical Parts Alerts</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {criticalParts.map((part) => (
              <span
                key={part.id}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                  part.status === 'Critical Low' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                )}
              >
                {part.name} - {part.daysOfStock}d remaining
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Parts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Parts Inventory Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Part ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Part Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Supplier</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Current Stock</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Daily Use</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Days of Stock</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Stock Level</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Last Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partsInventory.map((part) => {
                const statusCfg = statusConfig[part.status];
                const stockPercent = Math.min((part.currentStock / (part.reorderLevel * 2)) * 100, 100);
                return (
                  <tr key={part.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{part.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{part.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{part.supplier}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-gray-900">{formatNumber(part.currentStock)}</span>
                      <span className="text-xs text-gray-400 ml-1">{part.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700">{part.dailyConsumption}/day</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn(
                        'text-sm font-bold',
                        part.daysOfStock <= 2 ? 'text-red-600' :
                        part.daysOfStock <= 4 ? 'text-yellow-600' :
                        'text-green-600'
                      )}>
                        {part.daysOfStock}d
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-24 mx-auto">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              stockPercent > 60 ? 'bg-green-500' :
                              stockPercent > 30 ? 'bg-yellow-500' :
                              'bg-red-500'
                            )}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.icon}
                        {part.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(part.lastDelivery)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
