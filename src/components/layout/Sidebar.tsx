import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  ShoppingCart,
  Wrench,
  Users,
  Wallet,
  CalendarCheck,
  BarChart3,
  FileCheck,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils.ts';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { to: '/', label: 'Dealer Dashboard', icon: LayoutDashboard },
  { to: '/vehicle-stock', label: 'Vehicle Stock', icon: Car },
  { to: '/sales', label: 'Sales & Bookings', icon: ShoppingCart },
  { to: '/service', label: 'Service Center', icon: Wrench },
  { to: '/customers', label: 'Customer Management', icon: Users },
  { to: '/finance', label: 'Finance & Insurance', icon: Wallet },
  { to: '/test-drives', label: 'Test Drives', icon: CalendarCheck },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/compliance', label: 'Compliance', icon: FileCheck },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, onMobileClose, collapsed, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Desktop Sliding Sidebar
  const desktopSidebar = (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-[#0f1d44] z-40 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-16 border-b border-white/10 px-3 gap-3">
        <div className="w-9 h-9 min-w-[36px] rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">AD</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white font-bold text-sm whitespace-nowrap"
          >
            AutoDesk Pro
          </motion.span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 py-4 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => collapsed ? setHoveredItem(item.to) : null}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink
                to={item.to}
                className={cn(
                  'flex items-center gap-3 rounded-xl transition-all duration-200',
                  collapsed ? 'w-10 h-10 justify-center mx-auto' : 'px-3 py-2.5',
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon size={20} className="min-w-[20px]" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </NavLink>

              {/* Tooltip only when collapsed */}
              <AnimatePresence>
                {collapsed && hoveredItem === item.to && (
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

      {/* Collapse Toggle Button */}
      <div className="border-t border-white/10 p-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );

  // Mobile Drawer (full labels always shown)
  const mobileSidebar = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed left-0 top-0 h-screen w-72 bg-[#0f1d44] z-50 md:hidden overflow-y-auto rounded-r-2xl"
          >
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
