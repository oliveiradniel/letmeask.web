import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { LoadingPage } from "./components/loading-page";

const CreateRoom = lazy(() => import("./pages/create-room"));
const RoomDetails = lazy(() => import("./pages/room-details"));
const RecordRoomAudio = lazy(() => import("./pages/record-room-audio"));

export function Router() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<CreateRoom />} index />
        <Route element={<RoomDetails />} path="/room/:id" />
        <Route element={<RecordRoomAudio />} path="/room/:id/audio" />
      </Routes>
    </Suspense>
  );
}
