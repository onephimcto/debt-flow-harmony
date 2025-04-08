
import React from 'react';
import { DebtList } from '@/components/debts/debt-list';

const Debts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Debts</h1>
        <p className="text-muted-foreground">Manage all your debts in one place</p>
      </div>
      
      <DebtList />
    </div>
  );
};

export default Debts;
