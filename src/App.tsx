
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/lib/app-context";
import { AppLayout } from "@/components/layout/app-layout";

// Import Pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Debts from "@/pages/Debts";
import Parties from "@/pages/Parties";
import Calendar from "@/pages/Calendar";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/dashboard" 
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              } 
            />
            <Route 
              path="/debts" 
              element={
                <AppLayout>
                  <Debts />
                </AppLayout>
              } 
            />
            <Route 
              path="/parties" 
              element={
                <AppLayout>
                  <Parties />
                </AppLayout>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <AppLayout>
                  <Calendar />
                </AppLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AppLayout>
                  <Settings />
                </AppLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
