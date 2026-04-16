import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { queryClient } from "./core/query-client";
import { CreateRoom } from "./pages/create-room";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { RoomDetails } from "./pages/room-details";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<RoomDetails />} path="/room/:id" />
          <Route element={<RecordRoomAudio />} path="/room/:id/audio" />
        </Routes>
      </BrowserRouter>

      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
