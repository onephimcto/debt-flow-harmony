
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/lib/app-context';
import { cn } from '@/lib/utils';

export function RecentActivity() {
  const { debts, transactions, selectedCurrency } = useAppContext();

  // Combine debts and transactions for activity feed
  const activities = [
    ...debts.map(debt => ({
      id: debt.id,
      type: 'debt',
      title: debt.status === 'owes_me' ? `${debt.partyName} owes you` : `You owe ${debt.partyName}`,
      amount: debt.amount,
      currency: debt.currency,
      description: debt.description,
      date: new Date(debt.createdAt),
      status: debt.status
    })),
    ...transactions.map(transaction => ({
      id: transaction.id,
      type: 'payment',
      title: `Payment received`,
      amount: transaction.amount,
      currency: transaction.currency,
      description: transaction.notes || 'Payment transaction',
      date: new Date(transaction.date),
      method: transaction.method
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="flex items-start space-x-4 rounded-md border p-4"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center pt-2">
                  <p className="text-xs text-muted-foreground">
                    {activity.date.toLocaleDateString()}
                  </p>
                  {activity.type === 'debt' && (
                    <span
                      className={cn(
                        'ml-2 rounded-full px-2 py-0.5 text-xs font-medium',
                        activity.status === 'owes_me' && 'bg-debtnote-green/10 text-debtnote-green',
                        activity.status === 'i_owe' && 'bg-debtnote-red/10 text-debtnote-red',
                        activity.status === 'pending' && 'bg-yellow-100 text-yellow-800',
                        activity.status === 'recurring' && 'bg-purple-100 text-purple-800'
                      )}
                    >
                      {activity.status === 'owes_me' && 'Owes Me'}
                      {activity.status === 'i_owe' && 'I Owe'}
                      {activity.status === 'pending' && 'Pending'}
                      {activity.status === 'recurring' && 'Recurring'}
                    </span>
                  )}
                  {activity.type === 'payment' && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      {activity.method}
                    </span>
                  )}
                </div>
              </div>
              <div className={cn(
                'text-sm font-medium',
                activity.type === 'debt' && activity.status === 'owes_me' && 'text-debtnote-green',
                activity.type === 'debt' && activity.status === 'i_owe' && 'text-debtnote-red',
                activity.type === 'payment' && 'text-debtnote-green'
              )}>
                {activity.type === 'debt' && activity.status === 'owes_me' && '+'}
                {activity.type === 'debt' && activity.status === 'i_owe' && '-'}
                {activity.type === 'payment' && '+'}
                {selectedCurrency} {activity.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
