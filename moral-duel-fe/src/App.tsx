import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import CaseDetail from "./pages/CaseDetail";
import Profile from "./pages/Profile";
import CreateCase from "./pages/CreateCase";
import Community from "./pages/Community";
import Earning from "./pages/Earning";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import AIVerdict from "./pages/AIVerdict";
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
          <Route path="/discover" element={<Discover />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateCase />} />
          <Route path="/community" element={<Community />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ai-verdict" element={<AIVerdict />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
