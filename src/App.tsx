import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Research from "./pages/Research";
import ResearchDetails from "./pages/ResearchDetails";
import CategoryDetails from "./pages/CategoryDetails";
import IndustryPage from "./pages/IndustryPage";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AddResearch from "./pages/AddResearch";
import EditResearch from "./pages/EditResearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/research" element={<Research />} /> 
              <Route path="/research/:id" element={<ResearchDetails />} />
              <Route path="/research/:id/edit" element={<EditResearch />} />
              <Route path="/category/:category" element={<CategoryDetails />} />
              <Route path="/industries/:industry" element={<IndustryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-research" element={<AddResearch />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
