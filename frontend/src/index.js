import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ShowInterior from "./ShowInterior";
import Reservation from "./Reservation";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="ShowInterior" element={<ShowInterior />}></Route>
      <Route path="Reservation" element={<Reservation />}></Route>
    </Routes>
  </BrowserRouter>
);
