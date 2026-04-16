import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { ErrorBoundary } from "./components/error-boundary";
import { ErrorPage } from "./components/error-page";
import { queryClient } from "./core/query-client";
import { Router } from "./router";

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>

        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
