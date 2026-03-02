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
import { ShoppingCart, CheckCircle, Clock, Truck, Trophy } from 'lucide-react';
import { bookings, monthlySales, salespersonLeaderboard } from '../data/dummyData.ts';
import { cn, formatCurrency, formatDate } from '../lib/utils.ts';

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Confirmed': { icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-100' },
  'Pending Finance': { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100' },
  'Ready for Delivery': { icon: <Truck size={14} />, color: 'text-blue-700', bg: 'bg-blue-100' },
  'Delivered': { icon: <CheckCircle size={14} />, color: 'text-purple-700', bg: 'bg-purple-100' },
};

const totalBookings = bookings.length;
const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
const pendingCount = bookings.filter((b) => b.status === 'Pending Finance').length;
const deliveredCount = bookings.filter((b) => b.status === 'Delivered').length;

const salesChartData = monthlySales.map((m) => ({
  month: m.month,
  Target: m.target,
  Actual: m.vehiclesSold,
}));

const medalColors = ['text-yellow-500', 'text-gray-400', 'text-amber-700'];

export default function SalesBookings() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Total Bookings', value: totalBookings, icon: <ShoppingCart size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Confirmed', value: confirmedCount, icon: <CheckCircle size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'Pending Finance', value: pendingCount, icon: <Clock size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Delivered', value: deliveredCount, icon: <Truck size={18} />, color: 'from-purple-500 to-purple-600' },
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

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Model</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Color</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Booking Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Delivery</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Booking Amt</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Total Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Salesperson</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => {
                const statusCfg = statusConfig[b.status];
                return (
                  <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">{b.customerName}</p>
                      <p className="text-[10px] text-gray-400">{b.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-800">{b.model}</p>
                      <p className="text-[10px] text-gray-400">{b.variant}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{b.color}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(b.bookingDate)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(b.expectedDelivery)}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{formatCurrency(b.bookingAmount)}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">{formatCurrency(b.totalPrice)}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{b.salesperson}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusCfg.bg, statusCfg.color)}>
                        {statusCfg.icon}
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Monthly Sales Chart + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Monthly Sales - Target vs Actual</h2>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="Target" fill="#93c5fd" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Actual" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Salesperson Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sales Leaderboard</h2>
          <div className="space-y-4">
            {salespersonLeaderboard.map((sp, i) => (
              <div key={sp.name} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                    {sp.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-sm text-gray-900">{sp.name}</h3>
                      <Trophy size={14} className={medalColors[i]} />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{sp.salesCount}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs font-bold text-gray-900">{formatCurrency(sp.revenue)}</p>
                    <p className="text-[10px] text-gray-400">Revenue</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{sp.testDrives}</p>
                    <p className="text-[10px] text-gray-400">Test Drives</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-600">{sp.conversionRate}%</p>
                    <p className="text-[10px] text-gray-400">Conversion</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
