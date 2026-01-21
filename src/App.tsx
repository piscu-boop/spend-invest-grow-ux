import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BetaModal from '@/components/ui/betaModal';
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Team from "./pages/Team";
import Consumer from "./pages/Consumer";
import Merchant from "./pages/Merchant";
import Manufacturer from "./pages/Manufacturer";
import NotFound from "./pages/NotFound";
import Press from "./pages/Press";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Component to handle 404 redirects from GitHub Pages
const RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're on index.html but should be on another route
    // This happens when GitHub Pages 404 redirects to index.html
    if (location.pathname === '/index.html' || location.pathname === '/') {
      // Check if there's a hash that indicates we should be on /consumer
      const hash = location.hash;
      if (hash === '#partners' || hash.startsWith('#partners')) {
        // Navigate to /consumer with the hash preserved
        navigate(`/consumer${hash}`, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
};

const App: React.FC = () => {
  const [betaOpen, setBetaOpen] = useState(false);

  return(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RedirectHandler />
          <Routes>
            <Route path="/" 
            element={
              <Index onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/faq" 
            element={
              <FAQ onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/team" 
            element={
              <Team onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/consumer" 
            element={
              <Consumer onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/merchant" 
            element={
              <Merchant onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/manufacturer" 
            element={
              <Manufacturer onOpenBeta={() => setBetaOpen(true)} />
            } 
          />
            <Route path="/press" 
            element={
              <Press />
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
