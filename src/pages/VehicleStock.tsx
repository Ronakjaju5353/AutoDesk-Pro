import { useState } from 'react';
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
import { Car, Warehouse, Truck, Tag, Search } from 'lucide-react';
import { vehicleStock } from '../data/dummyData.ts';
import { cn, formatCurrency } from '../lib/utils.ts';

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'In Showroom': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'In Yard': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'In Transit': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Booked': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
};

// Summary counts
const totalStock = vehicleStock.length;
const showroomCount = vehicleStock.filter((v) => v.status === 'In Showroom').length;
const yardCount = vehicleStock.filter((v) => v.status === 'In Yard').length;
const transitCount = vehicleStock.filter((v) => v.status === 'In Transit').length;
const bookedCount = vehicleStock.filter((v) => v.status === 'Booked').length;

// Stock aging data
const stockAging = [
  { range: '0-30 days', count: vehicleStock.filter((v) => v.stockAgeDays >= 0 && v.stockAgeDays <= 30).length, fill: '#10b981' },
  { range: '30-60 days', count: vehicleStock.filter((v) => v.stockAgeDays > 30 && v.stockAgeDays <= 60).length, fill: '#f59e0b' },
  { range: '60-90 days', count: vehicleStock.filter((v) => v.stockAgeDays > 60 && v.stockAgeDays <= 90).length, fill: '#ef4444' },
  { range: '90+ days', count: vehicleStock.filter((v) => v.stockAgeDays > 90).length, fill: '#dc2626' },
];

// Unique models for filter
const models = ['All', ...new Set(vehicleStock.map((v) => v.model))];
const statuses = ['All', 'In Showroom', 'In Yard', 'In Transit', 'Booked'];

export default function VehicleStock() {
  const [filterModel, setFilterModel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = vehicleStock.filter((v) => {
    if (filterModel !== 'All' && v.model !== filterModel) return false;
    if (filterStatus !== 'All' && v.status !== filterStatus) return false;
    if (searchTerm && !v.model.toLowerCase().includes(searchTerm.toLowerCase()) && !v.vin.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {[
          { label: 'Total Stock', value: totalStock, icon: <Car size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'In Showroom', value: showroomCount, icon: <Car size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'In Yard', value: yardCount, icon: <Warehouse size={18} />, color: 'from-cyan-500 to-cyan-600' },
          { label: 'In Transit', value: transitCount, icon: <Truck size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Booked', value: bookedCount, icon: <Tag size={18} />, color: 'from-purple-500 to-purple-600' },
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by model or VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
            />
          </div>
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {models.map((m) => (
              <option key={m} value={m}>{m === 'All' ? 'All Models' : m}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Vehicle Grid + Aging Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vehicle Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Vehicle Inventory ({filtered.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((vehicle, i) => {
              const status = statusConfig[vehicle.status];
              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm shrink-0"
                        style={{ backgroundColor: vehicle.colorHex }}
                      />
                      <h3 className="font-bold text-gray-900 text-sm">{vehicle.model}</h3>
                    </div>
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', status.bg, status.text)}>
                      {vehicle.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{vehicle.variant} | {vehicle.color}</p>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-gray-50 rounded-xl px-3 py-1.5 text-center">
                      <p className="text-sm font-bold text-blue-600">{formatCurrency(vehicle.exShowroomPrice)}</p>
                      <p className="text-[10px] text-gray-400">Ex-showroom</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl px-3 py-1.5 text-center">
                      <p className={cn(
                        'text-sm font-bold',
                        vehicle.stockAgeDays > 60 ? 'text-red-600' :
                        vehicle.stockAgeDays > 30 ? 'text-yellow-600' :
                        'text-green-600'
                      )}>
                        {vehicle.stockAgeDays}d
                      </p>
                      <p className="text-[10px] text-gray-400">Stock Age</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>{vehicle.fuelType} | {vehicle.year}</span>
                    <span className="font-mono">{vehicle.vin.slice(-8)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stock Aging Chart */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Stock Aging</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockAging} layout="vertical" barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="range" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`${value} vehicles`, 'Count']}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {stockAging.map((entry, index) => (
                      <motion.rect key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              {stockAging.map((item) => (
                <div key={item.range} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.fill }} />
                    <span className="text-gray-600">{item.range}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
