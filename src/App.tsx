import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Leadership from "@/pages/leadership";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";
import HumanRightsPolicy from "@/pages/human-rights-policy";
import PoshPolicy from "@/pages/posh-policy";
import Career from "@/pages/career";
import BusinessPolicy from "@/pages/business-policy";
import Login from "@/pages/login";
import AdminDashboard from "@/pages/admin-dashboard";
import Edit from "@/pages/edit";
import { ContentProvider } from "@/contexts/ContentContext";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Chatbot } from "@/components/ui/chatbot";
import { FraudAlert } from "@/components/ui/fraud-alert";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/login") || location.startsWith("/admin-dashboard") || location.startsWith("/edit");

  if (isAdminRoute) {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/edit" component={Edit} />
      </Switch>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/leadership" component={Leadership} />
            <Route path="/contact" component={Contact} />
            <Route path="/career" component={Career} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms" component={Terms} />
            <Route path="/human-rights-policy" component={HumanRightsPolicy} />
            <Route path="/prevention-of-sexual-harassment-policy" component={PoshPolicy} />
            <Route path="/business-policy" component={BusinessPolicy} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
      <FraudAlert />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContentProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </ContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
