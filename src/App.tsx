import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PayBill from "./pages/PayBill";
import RegisterComplaint from "./pages/RegisterComplaint";
import TrackStatus from "./pages/TrackStatus";
import ApplyForService from "./pages/ApplyForService";
import Help from "./pages/Help";
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
          <Route path="/pay-bill" element={<PayBill />} />
          <Route path="/register-complaint" element={<RegisterComplaint />} />
          <Route path="/track-status" element={<TrackStatus />} />
          <Route path="/apply-for-service" element={<ApplyForService />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
