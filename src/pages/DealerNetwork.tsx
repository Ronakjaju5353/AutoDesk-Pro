import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MapPin, Phone, Star, ShoppingBag, Truck } from 'lucide-react';
import { dealers } from '../data/dummyData.ts';
import { cn, formatCurrency, formatNumber } from '../lib/utils.ts';

const zoneColors: Record<string, string> = {
  North: 'bg-blue-100 text-blue-700',
  South: 'bg-green-100 text-green-700',
  East: 'bg-purple-100 text-purple-700',
  West: 'bg-orange-100 text-orange-700',
};

// Zone-wise dispatch data
const zoneData = ['North', 'South', 'East', 'West'].map((zone) => {
  const zoneDealers = dealers.filter((d) => d.zone === zone);
  return {
    zone,
    dispatched: zoneDealers.reduce((s, d) => s + d.dispatchedThisMonth, 0),
    pending: zoneDealers.reduce((s, d) => s + d.pendingOrders, 0),
  };
});

const totalPending = dealers.reduce((s, d) => s + d.pendingOrders, 0);
const totalDispatched = dealers.reduce((s, d) => s + d.dispatchedThisMonth, 0);
const totalRevenue = dealers.reduce((s, d) => s + d.revenue, 0);

export default function DealerNetwork() {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: 'Total Pending Orders', value: formatNumber(totalPending), icon: <ShoppingBag size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Dispatched This Month', value: formatNumber(totalDispatched), icon: <Truck size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: <Star size={18} />, color: 'from-green-500 to-green-600' },
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
            <p className="text-xl md:text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Dealers Grid + Zone Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Dealer Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Dealer Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dealers.map((dealer, i) => (
              <motion.div
                key={dealer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{dealer.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <MapPin size={12} />
                      {dealer.city}
                    </div>
                  </div>
                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', zoneColors[dealer.zone])}>
                    {dealer.zone}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="bg-gray-50 rounded-xl p-2">
                    <p className="text-sm font-bold text-gray-900">{dealer.pendingOrders}</p>
                    <p className="text-[10px] text-gray-500">Pending</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2">
                    <p className="text-sm font-bold text-gray-900">{dealer.dispatchedThisMonth}</p>
                    <p className="text-[10px] text-gray-500">Dispatched</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2">
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(dealer.revenue)}</p>
                    <p className="text-[10px] text-gray-500">Revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone size={12} />
                    {dealer.contact}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700">{dealer.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Zone Dispatch Chart */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Zone-wise Summary</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneData} layout="vertical" barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="zone" tick={{ fontSize: 12 }} width={50} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="dispatched" fill="#3b82f6" radius={[0, 6, 6, 0]} name="Dispatched" />
                  <Bar dataKey="pending" fill="#f59e0b" radius={[0, 6, 6, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
