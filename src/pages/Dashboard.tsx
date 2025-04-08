
import React from 'react';
import { useAppContext } from '@/lib/app-context';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DebtSummaryChart } from '@/components/dashboard/debt-summary-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Users, DollarSign, Clock, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { userStats, selectedCurrency } = useAppContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your debt tracking overview</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Owed to You" 
          value={`${selectedCurrency} ${userStats.totalOwed}`} 
          description="Outstanding debts from others"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
          trendValue="12% from last month"
        />
        <StatsCard 
          title="Total You Owe" 
          value={`${selectedCurrency} ${userStats.totalOwes}`} 
          description="Your outstanding debts"
          icon={<DollarSign className="h-4 w-4" />}
          trend="down"
          trendValue="5% from last month"
        />
        <StatsCard 
          title="Pending Debts" 
          value={userStats.pendingCount} 
          description="Awaiting confirmation"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard 
          title="Active Debtors" 
          value={userStats.activeDebtors} 
          description="People with active debts"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DebtSummaryChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
