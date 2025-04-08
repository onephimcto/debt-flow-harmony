
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useAppContext } from '@/lib/app-context';
import { toast } from 'sonner';

const CalendarPage = () => {
  const { debts } = useAppContext();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Extract dates that have debts due
  const dueDates = debts
    .filter(debt => debt.dueDate)
    .map(debt => new Date(debt.dueDate as string));
  
  // Function to check if a date has debt due
  const isDueDateHighlighted = (date: Date) => {
    return dueDates.some(dueDate => 
      dueDate.getDate() === date.getDate() && 
      dueDate.getMonth() === date.getMonth() && 
      dueDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    // Find debts due on this date
    if (selectedDate) {
      const debtsOnSelectedDate = debts.filter(debt => {
        if (!debt.dueDate) return false;
        const dueDate = new Date(debt.dueDate);
        return (
          dueDate.getDate() === selectedDate.getDate() &&
          dueDate.getMonth() === selectedDate.getMonth() &&
          dueDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      
      if (debtsOnSelectedDate.length > 0) {
        toast.info(`${debtsOnSelectedDate.length} debt(s) due on this date`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">View and manage your debt schedule</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Debt Calendar</CardTitle>
            <CardDescription>Dates with debt due are highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              modifiers={{
                highlighted: isDueDateHighlighted,
              }}
              modifiersStyles={{
                highlighted: { 
                  backgroundColor: 'rgb(254, 243, 199)',
                  fontWeight: 'bold'
                }
              }}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Due Dates</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {debts
                .filter(debt => {
                  if (!debt.dueDate) return false;
                  const dueDate = new Date(debt.dueDate);
                  const today = new Date();
                  const thirtyDaysFromNow = new Date();
                  thirtyDaysFromNow.setDate(today.getDate() + 30);
                  return dueDate >= today && dueDate <= thirtyDaysFromNow;
                })
                .sort((a, b) => {
                  return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
                })
                .map(debt => (
                  <div key={debt.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{debt.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Due: {new Date(debt.dueDate || '').toLocaleDateString()}</span>
                        <span className="mx-1">•</span>
                        <span>{debt.partyName}</span>
                      </div>
                    </div>
                    <div className={`font-medium ${debt.status === 'owes_me' ? 'text-debtnote-green' : 'text-debtnote-red'}`}>
                      {debt.status === 'owes_me' ? '+' : '-'}
                      {debt.currency} {debt.amount}
                    </div>
                  </div>
                ))}
              {!debts.some(debt => debt.dueDate) && (
                <div className="text-center py-4 text-muted-foreground">
                  No upcoming due dates
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
