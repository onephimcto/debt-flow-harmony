
import React from 'react';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { useAppContext } from '@/lib/app-context';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useAppContext();
  
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div 
        className={cn(
          'flex flex-col flex-1 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'ml-64' : 'ml-16'
        )}
      >
        <AppHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
