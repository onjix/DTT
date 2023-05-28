import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ShowInterior1 from "./ShowInterior1";
import ShowInterior2 from "./ShowInterior2";
import Reservation from "./Reservation";
import Mypage from "./Mypage";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";
import SimpleInfo from "./SimpleInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="ShowInterior1" element={<ShowInterior1 />}></Route>
      <Route path="ShowInterior2" element={<ShowInterior2 />}></Route>
      <Route path="Reservation" element={<Reservation />}></Route>
      <Route path="Mypage" element={<Mypage />}></Route>
      <Route path="Main" element={<Main />}></Route>
      <Route path="Login" element={<Login />}></Route>
      <Route path="Signup" element={<Signup />}></Route>
      <Route path="SimpleInfo" element={<SimpleInfo />}></Route>
    </Routes>
  </BrowserRouter>
);
