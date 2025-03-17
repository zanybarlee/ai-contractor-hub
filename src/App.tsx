
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contracts from "./pages/Contracts";
import ContractGenerate from "./pages/ContractGenerate";
import ContractDetails from "./pages/ContractDetails";
import RiskManagement from "./pages/RiskManagement";
import ChangeOrders from "./pages/ChangeOrders";
import ContractIntelligence from "./pages/ContractIntelligence";
import DisputeResolution from "./pages/DisputeResolution";
import Collaboration from "./pages/Collaboration";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import ContractorAdministrator from "./pages/ContractorAdministrator";
import ContractsPMO from "./pages/ContractsPMO";
import Forensics from "./pages/Forensics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/generate" element={<ContractGenerate />} />
          <Route path="/contracts/:id" element={<ContractDetails />} />
          <Route path="/contract-intelligence" element={<ContractIntelligence />} />
          <Route path="/dispute-resolution" element={<DisputeResolution />} />
          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="/change-orders" element={<ChangeOrders />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/contractor-administrator" element={<ContractorAdministrator />} />
          <Route path="/contracts-pmo" element={<ContractsPMO />} />
          <Route path="/forensics" element={<Forensics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
