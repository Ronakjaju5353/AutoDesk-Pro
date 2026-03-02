import { useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Clock } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

interface TopbarProps {
  onMobileToggle: () => void;
}

const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
  '/': { title: 'Factory Dashboard', breadcrumb: 'Home' },
  '/production': { title: 'Production Planning', breadcrumb: 'Production' },
  '/quality': { title: 'Quality Control', breadcrumb: 'Quality' },
  '/supply-chain': { title: 'Supply Chain', breadcrumb: 'Supply Chain' },
  '/dealers': { title: 'Dealer Network', breadcrumb: 'Dealers' },
  '/inventory': { title: 'Parts Inventory', breadcrumb: 'Inventory' },
  '/sales': { title: 'Sales & Dispatch', breadcrumb: 'Sales' },
  '/reports': { title: 'Reports & Analytics', breadcrumb: 'Reports' },
  '/compliance': { title: 'Compliance & Certifications', breadcrumb: 'Compliance' },
  '/settings': { title: 'Settings', breadcrumb: 'Settings' },
};

export default function Topbar({ onMobileToggle }: TopbarProps) {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: 'Dashboard', breadcrumb: 'Home' };

  return (
    <header className={cn(
      'sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50',
      'px-4 md:px-6 h-16 flex items-center justify-between'
    )}>
      {/* Left - hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileToggle}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{page.title}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            AutoDesk Pro &rsaquo; {page.breadcrumb}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-48 lg:w-64">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Shift indicator */}
        <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
          <Clock size={14} />
          <span>Shift A - Morning</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          SD
        </div>
      </div>
    </header>
  );
}
