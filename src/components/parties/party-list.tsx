
import React, { useState } from 'react';
import { useAppContext } from '@/lib/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';

export function PartyList() {
  const { parties, selectedCurrency } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParties = parties.filter(party => 
    party.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    party.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddParty = () => {
    toast.info("This feature is available in the full version", {
      description: "Upgrade to create more than 3 profiles"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Parties</CardTitle>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search parties..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddParty} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Party
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParties.map((party) => (
            <div
              key={party.id}
              className="flex items-start space-x-4 rounded-lg border p-4"
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(party.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{party.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground">{party.email}</p>
                {party.phone && <p className="text-sm text-muted-foreground">{party.phone}</p>}
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-debtnote-green">
                      +{selectedCurrency} {party.totalOwed}
                    </span>
                    <span className="text-muted-foreground"> owed to you</span>
                  </div>
                </div>
                {party.totalOwes > 0 && (
                  <div className="text-sm">
                    <span className="font-medium text-debtnote-red">
                      -{selectedCurrency} {party.totalOwes}
                    </span>
                    <span className="text-muted-foreground"> you owe</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
