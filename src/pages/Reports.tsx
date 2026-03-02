import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { vehicleModels, monthlyProduction } from '../data/dummyData.ts';
import { cn, formatNumber } from '../lib/utils.ts';

// Model-wise production share for pie chart
const modelProduction = vehicleModels.map((m) => ({
  name: m.name,
  value: m.achieved,
  color: m.color,
}));

const totalToday = vehicleModels.reduce((s, m) => s + m.achieved, 0);

const reportTypes = [
  { name: 'Daily Production Report', desc: 'Summary of daily production by model and line', icon: <FileText size={18} /> },
  { name: 'Quality Analysis Report', desc: 'Defect trends and quality metrics', icon: <FileText size={18} /> },
  { name: 'Supply Chain Report', desc: 'Inventory levels and supplier performance', icon: <FileText size={18} /> },
  { name: 'Dispatch Summary', desc: 'Monthly dispatch details by dealer and zone', icon: <FileText size={18} /> },
  { name: 'Shift Performance Report', desc: 'Shift-wise efficiency and output comparison', icon: <FileText size={18} /> },
  { name: 'Financial Summary', desc: 'Revenue, costs, and margin analysis', icon: <TrendingUp size={18} /> },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Today&apos;s Production Share by Model
          </h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelProduction}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {modelProduction.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  formatter={(value) => [`${value} units`, 'Produced']}
                />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Total: <span className="font-bold text-gray-900">{formatNumber(totalToday)}</span> units today
          </p>
        </motion.div>

        {/* Monthly bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Monthly Production Trends
          </h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProduction} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="produced" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Produced" />
                <Bar dataKey="dispatched" fill="#10b981" radius={[6, 6, 0, 0]} name="Dispatched" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Available Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reportTypes.map((report, i) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{report.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium',
                  'bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors'
                )}>
                  <Download size={12} />
                  PDF
                </button>
                <button className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium',
                  'bg-green-50 text-green-700 hover:bg-green-100 transition-colors'
                )}>
                  <Download size={12} />
                  Excel
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
