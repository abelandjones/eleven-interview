import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { Toaster } from "@/components/ui/toaster";

const rootElement = document.querySelector("#app-root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
