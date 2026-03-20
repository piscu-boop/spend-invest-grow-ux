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
import Simulator from "./pages/Simulator";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Component to handle 404 redirects from GitHub Pages
const RedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a stored redirect path from 404.html
    const storedPath = sessionStorage.getItem('ghp_redirect_path');
    const storedSearch = sessionStorage.getItem('ghp_redirect_search') || '';
    const storedHash = sessionStorage.getItem('ghp_redirect_hash') || '';

    if (storedPath && (location.pathname === '/index.html' || location.pathname === '/')) {
      // Clear the stored values
      sessionStorage.removeItem('ghp_redirect_path');
      sessionStorage.removeItem('ghp_redirect_search');
      sessionStorage.removeItem('ghp_redirect_hash');

      // Navigate to the correct path with hash and search preserved
      navigate(`${storedPath}${storedSearch}${storedHash}`, { replace: true });
      return;
    }

    // Fallback: if we're on index.html with #partners hash, redirect to /consumer#partners
    if ((location.pathname === '/index.html' || location.pathname === '/') && location.hash === '#partners') {
      navigate('/consumer#partners', { replace: true });
    }
  }, [location, navigate]);

  return null;
};

// Helper: auto-open BetaModal when visiting /registro
const AutoOpenBeta: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  useEffect(() => {
    onOpen();
  }, [onOpen]);
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
            <Route path="/simulador"
            element={
              <Simulator onOpenBeta={() => setBetaOpen(true)} />
            }
          />
            <Route path="/registro"
            element={
              <>
                <AutoOpenBeta onOpen={() => setBetaOpen(true)} />
                <Index onOpenBeta={() => setBetaOpen(true)} />
              </>
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
