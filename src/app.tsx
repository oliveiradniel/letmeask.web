import { BrowserRouter, Route, Routes } from "react-router";

import { CreateRoom } from "./pages/create-room";
import { RoomDetails } from "./pages/room-details";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CreateRoom />} index />
        <Route element={<RoomDetails />} path="/room" />
      </Routes>
    </BrowserRouter>
  );
}
