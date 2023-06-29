import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  CreateParkingSpace,
  ParkingSpaceDetails,
  Home,
  Events,
  Profile,
} from "./pages";
import { Navbar, Sidebar, Footer } from "./componets";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="relative sm:p-8 p-4 bg-[#f6f6f9] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/add-parking" element={<CreateParkingSpace />} />
          <Route
            path="/parking-details/:id"
            element={<ParkingSpaceDetails />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
