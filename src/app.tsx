import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router";

import { CreateRoom } from "./pages/create-room";
import { RoomDetails } from "./pages/room-details";

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<RoomDetails />} path="/room" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
