import { motion } from 'framer-motion';
import { Package, AlertTriangle, CheckCircle, Clock, ShoppingCart } from 'lucide-react';
import { partsInventory } from '../data/dummyData.ts';
import { cn, formatNumber, formatDate } from '../lib/utils.ts';

type StatusKey = 'Adequate' | 'Reorder Soon' | 'Critical Low' | 'On Order';

const columns: { key: StatusKey; label: string; color: string; bg: string; icon: React.ReactNode }[] = [
  { key: 'Adequate', label: 'Adequate Stock', color: 'border-green-300 bg-green-50/50', bg: 'bg-green-500', icon: <CheckCircle size={16} /> },
  { key: 'Reorder Soon', label: 'Reorder Soon', color: 'border-yellow-300 bg-yellow-50/50', bg: 'bg-yellow-500', icon: <Clock size={16} /> },
  { key: 'Critical Low', label: 'Critical Low', color: 'border-red-300 bg-red-50/50', bg: 'bg-red-500', icon: <AlertTriangle size={16} /> },
  { key: 'On Order', label: 'On Order', color: 'border-blue-300 bg-blue-50/50', bg: 'bg-blue-500', icon: <ShoppingCart size={16} /> },
];

const getPartsByStatus = (status: StatusKey) =>
  partsInventory.filter((p) => p.status === status);

// Summary stats
const totalParts = partsInventory.length;
const criticalParts = partsInventory.filter((p) => p.status === 'Critical Low').length;
const onOrderParts = partsInventory.filter((p) => p.status === 'On Order').length;
const avgDaysOfStock = (partsInventory.reduce((s, p) => s + p.daysOfStock, 0) / partsInventory.length).toFixed(1);

export default function SupplyChain() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total Parts Tracked', value: totalParts, icon: <Package size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Critical Low', value: criticalParts, icon: <AlertTriangle size={18} />, color: 'from-red-500 to-red-600' },
          { label: 'On Order', value: onOrderParts, icon: <ShoppingCart size={18} />, color: 'from-purple-500 to-purple-600' },
          { label: 'Avg Days of Stock', value: avgDaysOfStock, icon: <Clock size={18} />, color: 'from-green-500 to-green-600' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3', item.color)}>
              {item.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Kanban Board */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Parts Status Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col, ci) => {
            const parts = getPartsByStatus(col.key);
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                className={cn('rounded-2xl border-2 p-3', col.color)}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-white', col.bg)}>
                    {col.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800">{col.label}</h3>
                  <span className="ml-auto bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                    {parts.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {parts.map((part, pi) => (
                    <motion.div
                      key={part.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ci * 0.1 + pi * 0.05 }}
                      className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-default"
                    >
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">{part.name}</h4>
                      <p className="text-[11px] text-gray-500 mb-2">{part.supplier}</p>

                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Stock</span>
                        <span className="font-bold text-gray-800">{formatNumber(part.currentStock)} {part.unit}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-500">Daily Use</span>
                        <span className="font-medium text-gray-700">{part.dailyConsumption}/day</span>
                      </div>

                      {/* Days remaining bar */}
                      <div className="mb-1">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="text-gray-500">Days Remaining</span>
                          <span className={cn(
                            'font-bold',
                            part.daysOfStock <= 2 ? 'text-red-600' :
                            part.daysOfStock <= 4 ? 'text-yellow-600' :
                            'text-green-600'
                          )}>
                            {part.daysOfStock}d
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              part.daysOfStock <= 2 ? 'bg-red-500' :
                              part.daysOfStock <= 4 ? 'bg-yellow-500' :
                              'bg-green-500'
                            )}
                            style={{ width: `${Math.min((part.daysOfStock / 10) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 mt-1">
                        Last delivery: {formatDate(part.lastDelivery)}
                      </p>
                    </motion.div>
                  ))}

                  {parts.length === 0 && (
                    <div className="text-center py-6 text-xs text-gray-400">No items</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
