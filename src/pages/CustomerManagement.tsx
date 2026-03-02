import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Users, Search, Phone, Mail, Car, Shield, Calendar } from 'lucide-react';
import { customers, upcomingFollowUps } from '../data/dummyData.ts';
import { cn, formatDate } from '../lib/utils.ts';

const tierConfig: Record<string, { bg: string; text: string; gradient: string }> = {
  Platinum: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-purple-600' },
  Gold: { bg: 'bg-yellow-100', text: 'text-yellow-700', gradient: 'from-yellow-500 to-yellow-600' },
  Silver: { bg: 'bg-gray-200', text: 'text-gray-700', gradient: 'from-gray-400 to-gray-500' },
};

const followUpTypeConfig: Record<string, { bg: string; text: string }> = {
  'Insurance Renewal': { bg: 'bg-red-100', text: 'text-red-700' },
  'Service Due': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Birthday': { bg: 'bg-pink-100', text: 'text-pink-700' },
  'Loan Closure': { bg: 'bg-green-100', text: 'text-green-700' },
};

// Loyalty distribution
const loyaltyData = [
  { name: 'Platinum', value: customers.filter((c) => c.loyaltyTier === 'Platinum').length, color: '#8b5cf6' },
  { name: 'Gold', value: customers.filter((c) => c.loyaltyTier === 'Gold').length, color: '#f59e0b' },
  { name: 'Silver', value: customers.filter((c) => c.loyaltyTier === 'Silver').length, color: '#9ca3af' },
];

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter((c) => {
    if (!searchTerm) return true;
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vehicleOwned.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      {/* Summary + Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {[
          { label: 'Total Customers', value: customers.length, icon: <Users size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'Platinum Members', value: customers.filter((c) => c.loyaltyTier === 'Platinum').length, icon: <Shield size={18} />, color: 'from-purple-500 to-purple-600' },
          { label: 'Upcoming Follow-ups', value: upcomingFollowUps.length, icon: <Calendar size={18} />, color: 'from-yellow-500 to-yellow-600' },
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

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
          />
        </div>
      </motion.div>

      {/* Customer Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Customer Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Customers ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((cust, i) => {
              const tier = tierConfig[cust.loyaltyTier];
              return (
                <motion.div
                  key={cust.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold', tier.gradient)}>
                        {cust.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{cust.name}</h3>
                        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', tier.bg, tier.text)}>
                          {cust.loyaltyTier}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Car size={12} className="text-gray-400" />
                      <span className="text-xs font-semibold text-gray-800">{cust.vehicleOwned}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">Purchased: {formatDate(cust.purchaseDate)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                    <div className="bg-blue-50 rounded-xl py-1.5">
                      <p className="text-xs font-bold text-blue-700">{cust.serviceHistoryCount}</p>
                      <p className="text-[10px] text-blue-500">Services</p>
                    </div>
                    <div className="bg-green-50 rounded-xl py-1.5">
                      <p className="text-xs font-bold text-green-700">{formatDate(cust.nextServiceDue)}</p>
                      <p className="text-[10px] text-green-500">Next Service</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Phone size={11} />
                      <span>{cust.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail size={11} />
                      <span className="truncate">{cust.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield size={11} />
                      <span>Insurance expires: {formatDate(cust.insuranceExpiry)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Loyalty Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Loyalty Distribution</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loyaltyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {loyaltyData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`${value} customers`, '']}
                  />
                  <Legend iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Upcoming Follow-ups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Upcoming Follow-ups</h2>
            <div className="space-y-3">
              {upcomingFollowUps.map((fu) => {
                const ftConfig = followUpTypeConfig[fu.type];
                return (
                  <div key={fu.id} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm text-gray-900">{fu.customerName}</h4>
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2', ftConfig.bg, ftConfig.text)}>
                        {fu.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{fu.details}</p>
                    <p className="text-[10px] text-gray-400">Due: {formatDate(fu.dueDate)}</p>
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
