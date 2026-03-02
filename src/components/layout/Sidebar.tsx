import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Factory,
  ShieldCheck,
  Link as LinkIcon,
  Users,
  Package,
  TrendingUp,
  BarChart3,
  FileCheck,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils.ts';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/production', label: 'Production', icon: Factory },
  { to: '/quality', label: 'Quality', icon: ShieldCheck },
  { to: '/supply-chain', label: 'Supply Chain', icon: LinkIcon },
  { to: '/dealers', label: 'Dealers', icon: Users },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/sales', label: 'Sales & Dispatch', icon: TrendingUp },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/compliance', label: 'Compliance', icon: FileCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Desktop Icon-Only Sidebar
  const desktopSidebar = (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-16 bg-[#0f1d44] z-40">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">AD</span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.to)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink
                to={item.to}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200',
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon size={20} />
              </NavLink>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredItem === item.to && (
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg"
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom indicator */}
      <div className="flex items-center justify-center py-4 border-t border-white/10">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>
    </aside>
  );

  // Mobile Drawer
  const mobileSidebar = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed left-0 top-0 h-screen w-64 bg-[#0f1d44] z-50 md:hidden overflow-y-auto"
          >
            {/* Logo + Close */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AD</span>
                </div>
                <span className="text-white font-bold text-sm">AutoDesk Pro</span>
              </div>
              <button onClick={onMobileClose} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onMobileClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium',
                      active
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
}
