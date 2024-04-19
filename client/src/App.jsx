import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CardPage from "./pages/CardPage";
import AuthPage from "./pages/AuthPage";
import BoughtPage from "./pages/BoughtPage";
import Layout from "./ui/Layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Provider = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={Provider}>
      <div className="bg-gradient-to-br from-slate-400 to-slate-600 min-h-screen">
        <div className="container mx-auto bg-white h-full">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="card" element={<CardPage />} />
              <Route path="bought" element={<BoughtPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}
