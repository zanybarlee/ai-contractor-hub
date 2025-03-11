
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/contracts/generate" element={<ContractGenerate />} />
          <Route path="/contracts/:id" element={<ContractDetails />} />
          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
