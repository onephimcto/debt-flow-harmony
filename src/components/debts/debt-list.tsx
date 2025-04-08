
import React, { useState } from 'react';
import { useAppContext } from '@/lib/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PlusCircle, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DebtList() {
  const { debts, selectedCurrency } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredDebts = debts.filter(debt => {
    const matchesSearch = 
      debt.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      debt.partyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || debt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'owes_me':
        return 'Owes Me';
      case 'i_owe':
        return 'I Owe';
      case 'pending':
        return 'Pending';
      case 'recurring':
        return 'Recurring';
      default:
        return 'All';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'owes_me':
        return 'status-badge-owed';
      case 'i_owe':
        return 'status-badge-owes';
      case 'pending':
        return 'status-badge-pending';
      case 'recurring':
        return 'status-badge-recurring';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Debts</CardTitle>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search debts..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {statusFilter ? getStatusLabel(statusFilter) : 'All Statuses'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusFilterChange(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('owes_me')}>
                Owes Me
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('i_owe')}>
                I Owe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('pending')}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilterChange('recurring')}>
                Recurring
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Debt
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDebts.length > 0 ? (
                filteredDebts.map((debt) => (
                  <TableRow key={debt.id}>
                    <TableCell className="font-medium">{debt.description}</TableCell>
                    <TableCell>{debt.partyName}</TableCell>
                    <TableCell
                      className={cn(
                        'font-medium',
                        debt.status === 'owes_me' && 'text-debtnote-green',
                        debt.status === 'i_owe' && 'text-debtnote-red'
                      )}
                    >
                      {debt.status === 'owes_me' ? '+' : debt.status === 'i_owe' ? '-' : ''}
                      {selectedCurrency} {debt.amount}
                    </TableCell>
                    <TableCell>
                      <span className={getStatusClass(debt.status)}>
                        {getStatusLabel(debt.status)}
                      </span>
                    </TableCell>
                    <TableCell>{debt.dueDate || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No debts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
