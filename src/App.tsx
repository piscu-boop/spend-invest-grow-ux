import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BetaModal from '@/components/ui/betaModal';
import Index from "./pages/Index";
import { useState, useEffect, useCallback, Suspense, lazy } from "react";

// Code-split secondary routes so the initial bundle only contains the
// landing page. Each of these is loaded on demand when the user
// navigates to that route, reducing initial load time on slow devices.
const FAQ = lazy(() => import("./pages/FAQ"));
const Team = lazy(() => import("./pages/Team"));
const Consumer = lazy(() => import("./pages/Consumer"));
const Merchant = lazy(() => import("./pages/Merchant"));
const Manufacturer = lazy(() => import("./pages/Manufacturer"));
const Press = lazy(() => import("./pages/Press"));
const Simulator = lazy(() => import("./pages/Simulator"));
const MerchantSimulator = lazy(() => import("./pages/MerchantSimulator"));
const SimulatorHub = lazy(() => import("./pages/SimulatorHub"));
const CampusPage = lazy(() => import("./pages/Campus"));
const Campus2Page = lazy(() => import("./pages/Campus2"));
const CampusHub = lazy(() => import("./pages/CampusHub"));

const queryClient = new QueryClient();

// Minimal full-screen fallback shown while a lazy route chunk loads
const RouteFallback: React.FC = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-navy-deep, #0a1628)",
    }}
  />
);

/**
 * Catch-all fallback that checks for GitHub Pages SPA redirect FIRST.
 *
 * Flow: user visits /simulador → GitHub Pages 404.html stores path in
 * sessionStorage and redirects to /index.html → React Router loads,
 * /index.html hits catch-all → THIS component reads sessionStorage
 * and navigates to the stored path (synchronously via Navigate).
 */
const CatchAllRedirect: React.FC = () => {
  // Check sessionStorage DURING RENDER (not in useEffect) so Navigate
  // fires before the fallback "/" redirect.
  const storedPath = sessionStorage.getItem('ghp_redirect_path');
  const storedSearch = sessionStorage.getItem('ghp_redirect_search') || '';
  const storedHash = sessionStorage.getItem('ghp_redirect_hash') || '';

  if (storedPath) {
    // Clear immediately
    sessionStorage.removeItem('ghp_redirect_path');
    sessionStorage.removeItem('ghp_redirect_search');
    sessionStorage.removeItem('ghp_redirect_hash');

    // Sanitize: collapse leading double-slashes to prevent //evil.com open redirect
    // (a crafted URL like //<host> would otherwise bypass same-origin via history.pushState)
    const safePath = storedPath.replace(/^\/{2,}/, '/');
    if (/^https?:/i.test(safePath)) return <Navigate to="/" replace />;

    return <Navigate to={`${safePath}${storedSearch}${storedHash}`} replace />;
  }

  // No stored redirect — go to home
  return <Navigate to="/" replace />;
};

// Helper: auto-open BetaModal when visiting /registro
const AutoOpenBeta: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return null;
};

// Scroll to top on every route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Inner component — lives inside BrowserRouter so it can use useLocation/useNavigate
const AppInner: React.FC = () => {
  const [betaOpen, setBetaOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseBeta = useCallback(() => {
    setBetaOpen(false);
    // Si estamos en /registro, al cerrar el modal volver al inicio
    if (location.pathname === "/registro") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/"
            element={<Index onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/faq"
            element={<FAQ onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/team"
            element={<Team onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/consumer"
            element={<Consumer onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/merchant"
            element={<Merchant onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/manufacturer"
            element={<Manufacturer onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/press"
            element={<Press />}
          />
          <Route path="/simuladores"
            element={<SimulatorHub onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/simulador"
            element={<Simulator onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/comercios"
            element={<MerchantSimulator onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/campus"
            element={<CampusHub onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/campus/modulo-01"
            element={<CampusPage onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/campus/modulo-02"
            element={<Campus2Page onOpenBeta={() => setBetaOpen(true)} />}
          />
          <Route path="/registro"
            element={
              <>
                <AutoOpenBeta onOpen={() => setBetaOpen(true)} />
                <Index onOpenBeta={() => setBetaOpen(true)} />
              </>
            }
          />
          <Route path="*" element={<CatchAllRedirect />} />
        </Routes>
      </Suspense>
      <BetaModal
        open={betaOpen}
        onClose={handleCloseBeta}
        scriptURL="https://script.google.com/macros/s/AKfycbyFReSgYv7uWtrgRK-T9RqLuSrLKW78GqIKeUXO9Efk6LBWIXDHD5l0DAs44KIDt5orFg/exec"
      />
    </>
  );
};

const App: React.FC = () => {
  return(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  )
};

export default App;
