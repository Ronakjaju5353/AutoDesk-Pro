import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { monthlySales, testDrivePopularity } from '../data/dummyData.ts';
import { cn } from '../lib/utils.ts';

// Model-wise sales for pie chart
const modelSales = testDrivePopularity.map((m) => ({
  name: m.model,
  value: m.conversions,
  color: m.color,
}));

const totalSold = modelSales.reduce((s, m) => s + m.value, 0);

// Revenue trend for line chart
const revenueTrend = monthlySales.map((m) => ({
  month: m.month,
  revenue: +(m.revenue / 10000000).toFixed(2),
}));

const reportTypes = [
  { name: 'Stock Aging Report', desc: 'Vehicles in stock by age bracket with model breakdown', icon: <FileText size={18} /> },
  { name: 'Service Revenue Report', desc: 'Service center revenue and job card analysis', icon: <FileText size={18} /> },
  { name: 'Sales Funnel Report', desc: 'Enquiry to delivery conversion analysis', icon: <TrendingUp size={18} /> },
  { name: 'Customer Retention Report', desc: 'Customer loyalty and repeat service tracking', icon: <FileText size={18} /> },
  { name: 'Finance Disbursement Report', desc: 'Bank-wise loan and insurance summary', icon: <FileText size={18} /> },
  { name: 'Salesperson Performance', desc: 'Individual sales performance and targets', icon: <TrendingUp size={18} /> },
  { name: 'Test Drive Analytics', desc: 'Test drive requests, completions, and conversions', icon: <FileText size={18} /> },
  { name: 'Monthly Dealership P&L', desc: 'Overall profit and loss statement', icon: <TrendingUp size={18} /> },
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
            Model-wise Sales Distribution
          </h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={modelSales}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {modelSales.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  formatter={(value) => [`${value} units`, 'Sold']}
                />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Total: <span className="font-bold text-gray-900">{totalSold}</span> units this quarter
          </p>
        </motion.div>

        {/* Revenue Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Monthly Revenue Trend (in Cr)
          </h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  formatter={(value) => [`Rs.${value} Cr`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#3b82f6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reportTypes.map((report, i) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{report.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
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
