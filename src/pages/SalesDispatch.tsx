import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Truck, Package, CheckCircle, Clock } from 'lucide-react';
import { dispatchRecords, monthlyProduction } from '../data/dummyData.ts';
import { cn, formatDate, formatNumber } from '../lib/utils.ts';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Dispatched': { icon: <Truck size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
  'In Transit': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Delivered': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
};

const totalDispatched = dispatchRecords.reduce((s, r) => s + r.quantity, 0);
const inTransit = dispatchRecords.filter((r) => r.status === 'In Transit').reduce((s, r) => s + r.quantity, 0);
const delivered = dispatchRecords.filter((r) => r.status === 'Delivered').reduce((s, r) => s + r.quantity, 0);

export default function SalesDispatch() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total Dispatched', value: totalDispatched, icon: <Package size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'In Transit', value: inTransit, icon: <Truck size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Delivered', value: delivered, icon: <CheckCircle size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'Dispatch Records', value: dispatchRecords.length, icon: <Clock size={18} />, color: 'from-purple-500 to-purple-600' },
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
            <p className="text-2xl font-bold text-gray-900">{formatNumber(item.value)}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Production vs Dispatch Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Monthly Production vs Dispatch
        </h2>
        <div className="h-64 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
              <Legend iconType="circle" iconSize={8} />
              <Line type="monotone" dataKey="produced" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Produced" />
              <Line type="monotone" dataKey="dispatched" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Dispatched" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Dispatches Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Dispatches</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Dispatch ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Model</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Qty</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Dealer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">City</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Transporter</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dispatchRecords.map((rec) => {
                const statusCfg = statusConfig[rec.status];
                return (
                  <tr key={rec.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{rec.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{rec.model}</td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">{rec.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{rec.dealer}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{rec.city}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{rec.transporter}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.icon}
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(rec.date)}</td>
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
