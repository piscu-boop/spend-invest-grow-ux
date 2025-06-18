import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BetaModal from '@/components/ui/betaModal';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();


const App: React.FC = () => {
  const [betaOpen, setBetaOpen] = useState(false);

  return(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" 
            element={
              <Index onOpenBeta={() => setBetaOpen(true)} />
            } 
            
          />  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BetaModal
            open={betaOpen}
            onClose={() => setBetaOpen(false)}
            scriptURL="https://script.google.com/macros/s/AKfycbyFReSgYv7uWtrgRK-T9RqLuSrLKW78GqIKeUXO9Efk6LBWIXDHD5l0DAs44KIDt5orFg/exec"
            />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  )
};

export default App;
