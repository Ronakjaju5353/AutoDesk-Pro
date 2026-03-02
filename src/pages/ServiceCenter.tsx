import { motion } from 'framer-motion';
import { Wrench, Clock, CheckCircle, AlertTriangle, Calendar, CircleDot } from 'lucide-react';
import { serviceAppointments, serviceBays } from '../data/dummyData.ts';
import { cn, formatCurrency, formatDate } from '../lib/utils.ts';

type StatusKey = 'Scheduled' | 'In Progress' | 'Waiting for Parts' | 'Completed';

const columns: { key: StatusKey; label: string; color: string; bg: string; icon: React.ReactNode }[] = [
  { key: 'Scheduled', label: 'Scheduled', color: 'border-blue-300 bg-blue-50/50', bg: 'bg-blue-500', icon: <Calendar size={16} /> },
  { key: 'In Progress', label: 'In Progress', color: 'border-yellow-300 bg-yellow-50/50', bg: 'bg-yellow-500', icon: <Wrench size={16} /> },
  { key: 'Waiting for Parts', label: 'Waiting for Parts', color: 'border-orange-300 bg-orange-50/50', bg: 'bg-orange-500', icon: <AlertTriangle size={16} /> },
  { key: 'Completed', label: 'Completed', color: 'border-green-300 bg-green-50/50', bg: 'bg-green-500', icon: <CheckCircle size={16} /> },
];

const getAppointmentsByStatus = (status: StatusKey) =>
  serviceAppointments.filter((a) => a.status === status);

const serviceTypeColors: Record<string, string> = {
  'Free Service': 'bg-green-100 text-green-700',
  'Paid Service': 'bg-blue-100 text-blue-700',
  'Accidental Repair': 'bg-red-100 text-red-700',
  'Body Work': 'bg-orange-100 text-orange-700',
  'Insurance Claim': 'bg-purple-100 text-purple-700',
};

const totalAppointments = serviceAppointments.length;
const inProgressCount = serviceAppointments.filter((a) => a.status === 'In Progress').length;
const completedCount = serviceAppointments.filter((a) => a.status === 'Completed').length;
const scheduledCount = serviceAppointments.filter((a) => a.status === 'Scheduled').length;
const activeBays = serviceBays.filter((b) => b.currentVehicle !== null).length;

export default function ServiceCenter() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {[
          { label: 'Total Appointments', value: totalAppointments, icon: <Calendar size={18} />, color: 'from-blue-500 to-blue-600' },
          { label: 'In Progress', value: inProgressCount, icon: <Wrench size={18} />, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Scheduled', value: scheduledCount, icon: <Clock size={18} />, color: 'from-cyan-500 to-cyan-600' },
          { label: 'Completed', value: completedCount, icon: <CheckCircle size={18} />, color: 'from-green-500 to-green-600' },
          { label: 'Active Bays', value: `${activeBays}/${serviceBays.length}`, icon: <CircleDot size={18} />, color: 'from-purple-500 to-purple-600' },
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

      {/* Kanban Board */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Service Bay Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col, ci) => {
            const appointments = getAppointmentsByStatus(col.key);
            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                className={cn('rounded-2xl border-2 p-3', col.color)}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-white', col.bg)}>
                    {col.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800">{col.label}</h3>
                  <span className="ml-auto bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                    {appointments.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {appointments.map((appt, pi) => (
                    <motion.div
                      key={appt.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ci * 0.1 + pi * 0.05 }}
                      className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-gray-800">{appt.regNumber}</span>
                        {appt.bayNumber > 0 && (
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-medium px-1.5 py-0.5 rounded-lg">
                            Bay {appt.bayNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{appt.customerName}</p>
                      <p className="text-[11px] text-gray-500 mb-2">{appt.model}</p>

                      <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2', serviceTypeColors[appt.serviceType])}>
                        {appt.serviceType}
                      </span>

                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Mechanic</span>
                        <span className="font-medium text-gray-700">{appt.mechanic}</span>
                      </div>

                      {appt.estimatedCost > 0 && (
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">Est. Cost</span>
                          <span className="font-bold text-gray-800">{formatCurrency(appt.estimatedCost)}</span>
                        </div>
                      )}

                      {/* Progress bar */}
                      {appt.progress > 0 && appt.progress < 100 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px] mb-1">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-bold text-blue-600">{appt.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${appt.progress}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      <p className="text-[10px] text-gray-400 mt-1.5">
                        {formatDate(appt.scheduledDate)}
                      </p>
                    </motion.div>
                  ))}

                  {appointments.length === 0 && (
                    <div className="text-center py-6 text-xs text-gray-400">No appointments</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bay Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bay Status Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceBays.map((bay, i) => (
            <motion.div
              key={bay.bayNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={cn(
                'bg-white rounded-2xl p-4 shadow-sm border',
                bay.currentVehicle ? 'border-blue-200' : 'border-gray-100'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold',
                    bay.currentVehicle ? 'bg-blue-600' : 'bg-gray-300'
                  )}>
                    {bay.bayNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">Bay {bay.bayNumber}</h3>
                    <p className="text-[10px] text-gray-500">{bay.mechanic}</p>
                  </div>
                </div>
                <div className={cn(
                  'w-3 h-3 rounded-full',
                  bay.currentVehicle ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                )} />
              </div>

              {bay.currentVehicle ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-3 mb-2">
                    <p className="text-sm font-semibold text-gray-900">{bay.currentVehicle}</p>
                    <p className="text-xs text-gray-500 font-mono">{bay.regNumber}</p>
                    <p className="text-xs text-gray-500 mt-1">{bay.serviceType}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-bold text-blue-600">{bay.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bay.progress}%` }}
                      transition={{ duration: 1 }}
                      className={cn(
                        'h-full rounded-full',
                        bay.progress >= 80 ? 'bg-green-500' : bay.progress >= 40 ? 'bg-blue-500' : 'bg-yellow-500'
                      )}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">Est. completion: {bay.estimatedCompletion}</p>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-xs text-gray-400 font-medium">Bay Available</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
