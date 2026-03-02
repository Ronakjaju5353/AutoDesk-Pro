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
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import {
  defectRecords,
  defectHeatmap,
  defectTrends,
} from '../data/dummyData.ts';
import { cn, formatDate } from '../lib/utils.ts';

const severityConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Critical: { icon: <AlertTriangle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
  Major: { icon: <AlertCircle size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  Minor: { icon: <Info size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
};

// Build heatmap grid
const defectTypes = ['Paint', 'Fitment', 'Electrical', 'Engine', 'Body'];
const stations = [...new Set(defectHeatmap.map((d) => d.station))];

function getHeatmapValue(defectType: string, station: string): number {
  const cell = defectHeatmap.find((d) => d.defectType === defectType && d.station === station);
  return cell?.count ?? 0;
}

function getHeatmapColor(value: number): string {
  if (value === 0) return 'bg-gray-50 text-gray-400';
  if (value <= 3) return 'bg-blue-100 text-blue-700';
  if (value <= 6) return 'bg-yellow-100 text-yellow-700';
  if (value <= 9) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}

// Count by severity
const criticalCount = defectRecords.filter((d) => d.severity === 'Critical').length;
const majorCount = defectRecords.filter((d) => d.severity === 'Major').length;
const minorCount = defectRecords.filter((d) => d.severity === 'Minor').length;

export default function QualityControl() {
  return (
    <div className="space-y-6">
      {/* Severity Summary */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: 'Critical', count: criticalCount, color: 'from-red-500 to-red-600', ring: 'ring-red-200' },
          { label: 'Major', count: majorCount, color: 'from-yellow-500 to-yellow-600', ring: 'ring-yellow-200' },
          { label: 'Minor', count: minorCount, color: 'from-blue-500 to-blue-600', ring: 'ring-blue-200' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 text-center',
              'hover:shadow-md transition-shadow'
            )}
          >
            <div className={cn('w-12 h-12 rounded-2xl bg-gradient-to-br mx-auto mb-3 flex items-center justify-center text-white', item.color)}>
              <span className="text-xl font-bold">{item.count}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700">{item.label} Defects</p>
          </motion.div>
        ))}
      </div>

      {/* Defect Heatmap + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Defect Heatmap</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left px-2 py-2 text-xs font-semibold text-gray-500">Type / Station</th>
                  {stations.map((s) => (
                    <th key={s} className="text-center px-2 py-2 text-[10px] font-semibold text-gray-500 whitespace-nowrap">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {defectTypes.map((type) => (
                  <tr key={type}>
                    <td className="px-2 py-2 text-xs font-semibold text-gray-700">{type}</td>
                    {stations.map((station) => {
                      const val = getHeatmapValue(type, station);
                      return (
                        <td key={station} className="text-center px-2 py-2">
                          <div className={cn(
                            'inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold',
                            getHeatmapColor(val)
                          )}>
                            {val || '-'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3 mt-4 text-[10px] text-gray-500">
            <span>Intensity:</span>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-100" /> Low</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-100" /> Med</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-orange-100" /> High</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-100" /> Critical</div>
          </div>
        </motion.div>

        {/* Defect Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Defect Trend (Weekly)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defectTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="paint" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="fitment" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="electrical" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="engine" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="body" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Defects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Defect Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Model</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Severity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Station</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Action</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {defectRecords.map((d) => {
                const sev = severityConfig[d.severity];
                return (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{d.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{d.model}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{d.defectType}</td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', sev.bg, sev.color)}>
                        {sev.icon}
                        {d.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{d.station}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{d.actionTaken}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(d.date)}</td>
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
