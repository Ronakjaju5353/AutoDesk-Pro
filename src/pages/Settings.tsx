import { motion } from 'framer-motion';
import { Building2, Users, Bell, Shield, Palette, Database } from 'lucide-react';
import { cn } from '../lib/utils.ts';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Company Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white">
            <Building2 size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Company Profile</h2>
            <p className="text-xs text-gray-500">Manufacturer information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company Name</label>
            <input
              type="text"
              defaultValue="AutoDesk Motors Pvt. Ltd."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">CIN Number</label>
            <input
              type="text"
              defaultValue="U34100MH2020PTC123456"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Plant Location</label>
            <input
              type="text"
              defaultValue="Chakan, Pune, Maharashtra 410501"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">GSTIN</label>
            <input
              type="text"
              defaultValue="27AABCU9603R1ZM"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contact Email</label>
            <input
              type="email"
              defaultValue="admin@autodeskmotors.in"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contact Phone</label>
            <input
              type="text"
              defaultValue="+91 20 6789 0123"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
            Save Changes
          </button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <Users size={20} />, title: 'User Management', desc: 'Manage user roles, access levels, and permissions', color: 'from-purple-500 to-purple-600' },
          { icon: <Bell size={20} />, title: 'Notifications', desc: 'Configure email, SMS, and in-app alert preferences', color: 'from-yellow-500 to-yellow-600' },
          { icon: <Shield size={20} />, title: 'Security', desc: 'Password policies, 2FA settings, and audit logs', color: 'from-red-500 to-red-600' },
          { icon: <Palette size={20} />, title: 'Appearance', desc: 'Theme preferences, language, and display settings', color: 'from-cyan-500 to-cyan-600' },
          { icon: <Database size={20} />, title: 'Data & Backup', desc: 'Automated backups, data retention, and export', color: 'from-green-500 to-green-600' },
          { icon: <Building2 size={20} />, title: 'Plant Configuration', desc: 'Assembly lines, shifts, and capacity settings', color: 'from-indigo-500 to-indigo-600' },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              'bg-white rounded-2xl p-5 shadow-sm border border-gray-100',
              'hover:shadow-md transition-shadow cursor-pointer group'
            )}
          >
            <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3', section.color)}>
              {section.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{section.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{section.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 rounded-2xl p-5 border border-gray-200"
      >
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">System Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-gray-400">Version</p>
            <p className="font-semibold text-gray-700">AutoDesk Pro v2.1.0</p>
          </div>
          <div>
            <p className="text-gray-400">Environment</p>
            <p className="font-semibold text-gray-700">Production</p>
          </div>
          <div>
            <p className="text-gray-400">Last Updated</p>
            <p className="font-semibold text-gray-700">02 Mar 2026</p>
          </div>
          <div>
            <p className="text-gray-400">License</p>
            <p className="font-semibold text-gray-700">Enterprise</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
