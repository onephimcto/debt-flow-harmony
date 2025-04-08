
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/lib/app-context';
import { navItems } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn('flex items-center', isSidebarOpen ? 'justify-between w-full' : 'justify-center')}>
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-white">DebtNote</h1>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground">
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 transition-colors',
                    isSidebarOpen ? 'justify-start' : 'justify-center',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/70 flex items-center justify-center">
          {isSidebarOpen ? 'Free Tier • 3/3 Profiles' : '3/3'}
        </div>
      </div>
    </div>
  );
}
