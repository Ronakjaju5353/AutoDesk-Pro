import { motion } from 'framer-motion';
import {
  Users,
  ShoppingCart,
  Wallet,
  Car,
  Truck,
  Wrench,
  Activity,
  ChevronRight,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard.tsx';
import GaugeChart from '../components/ui/GaugeChart.tsx';
import {
  dashboardKPIs,
  showroomVehicles,
  liveEvents,
  bookingPipeline,
} from '../data/dummyData.ts';
import { cn } from '../lib/utils.ts';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={20} />,
  cart: <ShoppingCart size={20} />,
  wallet: <Wallet size={20} />,
  car: <Car size={20} />,
  truck: <Truck size={20} />,
  wrench: <Wrench size={20} />,
};

const eventTypeColors: Record<string, string> = {
  sale: 'bg-green-500',
  service: 'bg-blue-500',
  delivery: 'bg-purple-500',
  walkin: 'bg-yellow-500',
  testdrive: 'bg-cyan-500',
};

const statusBadge: Record<string, { bg: string; text: string }> = {
  Available: { bg: 'bg-green-100', text: 'text-green-700' },
  Booked: { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Test Drive': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {dashboardKPIs.map((kpi, i) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            unit={kpi.unit}
            change={kpi.change}
            icon={iconMap[kpi.icon]}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Showroom Floor */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Showroom Floor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {showroomVehicles.map((vehicle, i) => {
            const badge = statusBadge[vehicle.status];
            return (
              <motion.div
                key={`${vehicle.model}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Image placeholder */}
                <div className="h-24 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-3 relative overflow-hidden">
                  <Car size={36} className="text-gray-400" />
                  <div
                    className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: vehicle.colorHex }}
                  />
                </div>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{vehicle.model}</h3>
                  <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-1', badge.bg, badge.text)}>
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mb-2">{vehicle.variant}</p>
                <p className="text-lg font-bold text-blue-600">Rs.{vehicle.price}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gauges + Booking Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Gauge Meters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Performance Gauges</h2>
          <div className="grid grid-cols-3 gap-2">
            <GaugeChart value={76.5} label="Monthly Target" color="#3b82f6" size={120} />
            <GaugeChart value={92.3} label="Customer Satisfaction" color="#10b981" size={120} />
            <GaugeChart value={68.0} label="Service Bay Utilization" color="#f59e0b" size={120} />
          </div>
        </motion.div>

        {/* Booking Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Booking Pipeline</h2>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {bookingPipeline.map((stage, i) => (
              <div key={stage.stage} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: stage.color }}
                  >
                    <span className="text-lg md:text-xl font-bold">{stage.count}</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-600 font-medium mt-1.5 text-center leading-tight whitespace-nowrap">
                    {stage.stage}
                  </span>
                </div>
                {i < bookingPipeline.length - 1 && (
                  <ChevronRight size={16} className="text-gray-300 mx-0.5 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Total in pipeline</span>
              <span className="font-bold text-gray-900">{bookingPipeline.reduce((s, p) => s + p.count, 0)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>Conversion rate</span>
              <span className="font-bold text-green-600">8.3%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Feed */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Today&apos;s Activity Feed</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <Activity size={14} className="text-blue-600" />
            <span className="text-xs font-semibold text-gray-600">Dealership Activity</span>
            <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
            {liveEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-4 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', eventTypeColors[event.type])} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-700 leading-relaxed">{event.message}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{event.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
