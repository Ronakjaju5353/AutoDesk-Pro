import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { complianceRecords } from '../data/dummyData.ts';
import { cn, formatDate } from '../lib/utils.ts';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Active': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'Expiring Soon': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Expired': { icon: <XCircle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
  'Pending Renewal': { icon: <AlertTriangle size={14} />, color: 'text-orange-700', bg: 'bg-orange-100' },
};

const categoryColors: Record<string, string> = {
  'License': 'bg-blue-50 text-blue-700',
  'Certification': 'bg-purple-50 text-purple-700',
  'Emission': 'bg-green-50 text-green-700',
  'Subsidy': 'bg-cyan-50 text-cyan-700',
  'Quality': 'bg-indigo-50 text-indigo-700',
  'Environment': 'bg-emerald-50 text-emerald-700',
  'Safety': 'bg-red-50 text-red-700',
};

const activeCount = complianceRecords.filter((r) => r.status === 'Active').length;
const expiringCount = complianceRecords.filter((r) => r.status === 'Expiring Soon').length;
const pendingCount = complianceRecords.filter((r) => r.status === 'Pending Renewal' || r.status === 'Expired').length;

export default function Compliance() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: 'Active Certifications', value: activeCount, icon: <ShieldCheck size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'Expiring Soon', value: expiringCount, icon: <Clock size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Action Required', value: pendingCount, icon: <AlertTriangle size={18} />, color: 'from-red-500 to-red-600' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100"
          >
            <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3', item.color)}>
              {item.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Expiring Soon Alert */}
      {expiringCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-yellow-600" />
            <h2 className="text-sm font-bold text-yellow-800">Upcoming Expirations</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {complianceRecords
              .filter((r) => r.status === 'Expiring Soon' || r.status === 'Pending Renewal')
              .map((r) => (
                <span
                  key={r.id}
                  className={cn(
                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                    r.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                  )}
                >
                  {r.name} - expires {formatDate(r.validUntil)}
                </span>
              ))}
          </div>
        </motion.div>
      )}

      {/* Compliance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Compliance & Certification Tracker</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Authority</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Valid Until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complianceRecords.map((rec) => {
                const statusCfg = statusConfig[rec.status];
                const catColor = categoryColors[rec.category] || 'bg-gray-50 text-gray-700';
                return (
                  <tr key={rec.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{rec.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{rec.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{rec.authority}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold', catColor)}>
                        {rec.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.icon}
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(rec.validUntil)}</td>
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
