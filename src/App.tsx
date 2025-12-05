import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StockPage from "./pages/stock/StockPage";
import AchatsPage from "./pages/achats/AchatsPage";
import DemandesPage from "./pages/achats/DemandesPage";
import DevisPage from "./pages/achats/DevisPage";
import CommandesPage from "./pages/achats/CommandesPage";
import FournisseursPage from "./pages/fournisseurs/FournisseursPage";
import ComptaPage from "./pages/compta/ComptaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/achats" element={<AchatsPage />} />
          <Route path="/achats/demandes" element={<DemandesPage />} />
          <Route path="/achats/devis" element={<DevisPage />} />
          <Route path="/achats/commandes" element={<CommandesPage />} />
          <Route path="/fournisseurs" element={<FournisseursPage />} />
          <Route path="/compta" element={<ComptaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
