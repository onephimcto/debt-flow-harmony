
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/lib/app-context';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Settings = () => {
  const { language, setLanguage, selectedCurrency, setSelectedCurrency, currencies } = useAppContext();

  const handleUpgrade = () => {
    toast.info("Upgrade feature coming soon", {
      description: "This feature will be available in the next update."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button 
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
              >
                English
              </Button>
              <Button 
                variant={language === 'vn' ? 'default' : 'outline'}
                onClick={() => setLanguage('vn')}
              >
                Vietnamese
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>Set your default currency</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {currencies.map(currency => (
                <Button 
                  key={currency.code}
                  variant={selectedCurrency === currency.code ? 'default' : 'outline'}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className="min-w-[100px]"
                >
                  {currency.code} ({currency.symbol})
                </Button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Advanced notification settings are available on the Premium plan.</p>
              <Button onClick={handleUpgrade}>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan: Free</CardTitle>
              <CardDescription>You are currently on the free plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <div className="font-medium">Free Plan Limitations:</div>
                <ul className="list-disc pl-5 mt-2 text-sm">
                  <li>Maximum 3 debtor/lender profiles</li>
                  <li>Limited reminder notifications</li>
                  <li>Basic debt tracking features only</li>
                  <li>No AI suggestions or advanced analytics</li>
                </ul>
              </div>
              
              <Button onClick={handleUpgrade}>
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
