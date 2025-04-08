
import React from 'react';
import { PartyList } from '@/components/parties/party-list';

const Parties = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parties</h1>
        <p className="text-muted-foreground">Manage people you owe or who owe you</p>
      </div>
      
      <PartyList />
    </div>
  );
};

export default Parties;
