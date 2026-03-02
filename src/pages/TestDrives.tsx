import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalendarCheck, CheckCircle, Clock, Play, XCircle, TrendingUp } from 'lucide-react';
import { testDrives, testDrivePopularity } from '../data/dummyData.ts';
import { cn } from '../lib/utils.ts';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Completed': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'In Progress': { icon: <Play size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
  'Scheduled': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Cancelled': { icon: <XCircle size={14} />, color: 'text-red-700', bg: 'bg-red-100' },
};

const completedCount = testDrives.filter((t) => t.status === 'Completed').length;
const inProgressCount = testDrives.filter((t) => t.status === 'In Progress').length;
const scheduledCount = testDrives.filter((t) => t.status === 'Scheduled').length;


const totalTestDrives = testDrivePopularity.reduce((s, m) => s + m.testDrives, 0);
const totalConversions = testDrivePopularity.reduce((s, m) => s + m.conversions, 0);
const overallConversion = ((totalConversions / totalTestDrives) * 100).toFixed(1);

const popularityChart = testDrivePopularity.map((m) => ({
  model: m.model.split(' ').pop(),
  'Test Drives': m.testDrives,
  'Conversions': m.conversions,
}));

export default function TestDrives() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Completed', value: completedCount, icon: <CheckCircle size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'In Progress', value: inProgressCount, icon: <Play size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Scheduled', value: scheduledCount, icon: <Clock size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Conversion Rate', value: `${overallConversion}%`, icon: <TrendingUp size={18} />, color: 'from-purple-500 to-purple-600' },
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

      {/* Schedule Cards + Model Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Today&apos;s Test Drive Schedule</h2>
          <div className="space-y-3">
            {testDrives.map((td, i) => {
              const status = statusConfig[td.status];
              return (
                <motion.div
                  key={td.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    'bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow',
                    td.status === 'Cancelled' && 'opacity-60'
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Time */}
                    <div className="flex items-center gap-3 sm:w-24 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md">
                        <CalendarCheck size={20} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 sm:hidden">{td.timeSlot}</span>
                    </div>

                    <div className="hidden sm:block w-20 shrink-0">
                      <p className="text-sm font-bold text-gray-900">{td.timeSlot}</p>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-sm">{td.customerName}</h3>
                        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', status.bg, status.color)}>
                          {status.icon}
                          {td.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{td.model} - {td.variant}</p>
                    </div>

                    {/* Salesperson + Phone */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
                      <div className="text-right">
                        <p className="font-medium text-gray-700">{td.salesperson}</p>
                        <p className="text-[10px]">{td.phone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Model Popularity */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Model Popularity</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularityChart} layout="vertical" barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="model" tick={{ fontSize: 11 }} width={60} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Legend iconType="circle" iconSize={8} />
                  <Bar dataKey="Test Drives" fill="#93c5fd" radius={[0, 6, 6, 0]} />
                  <Bar dataKey="Conversions" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Conversion Stats */}
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              {testDrivePopularity.map((m) => {
                const rate = ((m.conversions / m.testDrives) * 100).toFixed(0);
                return (
                  <div key={m.model} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: m.color }} />
                      <span className="text-gray-600">{m.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{m.conversions}/{m.testDrives}</span>
                      <span className="font-bold text-green-600">{rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
