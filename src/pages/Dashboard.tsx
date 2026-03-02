import { motion } from 'framer-motion';
import {
  Factory,
  Gauge,
  ShieldAlert,
  Truck,
  Car,
  Users,
  Clock,
  Activity,
  Circle,
} from 'lucide-react';
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
import StatCard from '../components/ui/StatCard.tsx';
import GaugeChart from '../components/ui/GaugeChart.tsx';
import {
  dashboardKPIs,
  vehicleModels,
  assemblyLines,
  shifts,
  liveEvents,
} from '../data/dummyData.ts';
import { cn } from '../lib/utils.ts';

const iconMap: Record<string, React.ReactNode> = {
  factory: <Factory size={20} />,
  gauge: <Gauge size={20} />,
  shield: <ShieldAlert size={20} />,
  truck: <Truck size={20} />,
  car: <Car size={20} />,
  users: <Users size={20} />,
};

const statusColors: Record<string, { bg: string; dot: string; label: string }> = {
  running: { bg: 'bg-green-50 border-green-200', dot: 'bg-green-500', label: 'Running' },
  slow: { bg: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-500', label: 'Slow' },
  stopped: { bg: 'bg-red-50 border-red-200', dot: 'bg-red-500', label: 'Stopped' },
};

const eventTypeColors: Record<string, string> = {
  production: 'bg-blue-500',
  quality: 'bg-green-500',
  dispatch: 'bg-purple-500',
  alert: 'bg-red-500',
  maintenance: 'bg-yellow-500',
};

const productionChartData = vehicleModels.map((m) => ({
  name: m.name.split(' ').pop(),
  Target: m.dailyTarget,
  Actual: m.achieved,
}));

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

      {/* Shift Panels */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Shifts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shifts.map((shift, i) => (
            <motion.div
              key={shift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'bg-white rounded-2xl p-5 shadow-sm border border-gray-100',
                'hover:shadow-md transition-shadow duration-300'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: shift.color }}
                  />
                  <h3 className="font-bold text-gray-900">{shift.name} Shift</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {shift.time}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{shift.workers}</p>
                  <p className="text-xs text-gray-500">Workers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{shift.output}</p>
                  <p className="text-xs text-gray-500">Units</p>
                </div>
                <GaugeChart
                  value={shift.efficiency}
                  label="Efficiency"
                  color={shift.color}
                  size={100}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Assembly Line Status + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Assembly Lines */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Assembly Line Status</h2>
          <div className="space-y-3">
            {assemblyLines.map((line, i) => {
              const status = statusColors[line.status];
              const progress = (line.currentOutput / line.capacity) * 100;
              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'bg-white rounded-2xl p-4 md:p-5 shadow-sm border',
                    status.bg
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">{line.name}</h3>
                        <span className={cn(
                          'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                          line.status === 'running' && 'bg-green-100 text-green-700',
                          line.status === 'slow' && 'bg-yellow-100 text-yellow-700',
                          line.status === 'stopped' && 'bg-red-100 text-red-700',
                        )}>
                          <Circle size={6} className="fill-current" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{line.models}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{line.currentOutput}/{line.capacity}</p>
                        <p className="text-xs text-gray-500">Output/Capacity</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{line.efficiency}%</p>
                        <p className="text-xs text-gray-500">Efficiency</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{line.supervisor}</p>
                        <p className="text-xs text-gray-500">Supervisor</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full',
                        line.status === 'running' && 'bg-gradient-to-r from-green-400 to-green-500',
                        line.status === 'slow' && 'bg-gradient-to-r from-yellow-400 to-yellow-500',
                        line.status === 'stopped' && 'bg-gradient-to-r from-red-400 to-red-500',
                      )}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">{progress.toFixed(0)}% of daily target</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Feed */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Feed</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <Activity size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-600">Factory Activity</span>
              <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
              {liveEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
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
          </div>
        </div>
      </div>

      {/* Today's Production by Model Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Today&apos;s Production by Model
        </h2>
        <div className="h-64 md:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productionChartData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Bar dataKey="Target" fill="#93c5fd" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Actual" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
