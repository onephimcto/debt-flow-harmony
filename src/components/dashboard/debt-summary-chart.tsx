
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAppContext } from '@/lib/app-context';

export function DebtSummaryChart() {
  const { userStats, selectedCurrency } = useAppContext();
  
  const data = [
    { name: 'Owed To You', value: userStats.totalOwed },
    { name: 'You Owe', value: userStats.totalOwes },
  ];
  
  const COLORS = ['#059669', '#dc2626'];

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Debt Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip 
                formatter={(value) => [`${selectedCurrency} ${value}`, 'Amount']} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
