import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ShowInterior1 from "./Store/ShowInterior1";
import ShowInterior2 from "./Store/ShowInterior2";
import Reservation1 from "./Service/Reservation1";
import Reservation2 from "./Service/Reservation2";
import Mypage from "./Service/Mypage";
import Login from "./Signup_Login/Login";
import Signup from "./Signup_Login/Signup";
import SimpleInfo from "./Service/SimpleInfo";
import Predict from "./Service/Predict";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="ShowInterior1" element={<ShowInterior1 />}></Route>
      <Route path="ShowInterior2" element={<ShowInterior2 />}></Route>
      <Route path="Reservation1" element={<Reservation1 />}></Route>
      <Route path="Reservation2" element={<Reservation2 />}></Route>
      <Route path="Mypage" element={<Mypage />}></Route>
      <Route path="Login" element={<Login />}></Route>
      <Route path="Signup" element={<Signup />}></Route>
      <Route path="SimpleInfo" element={<SimpleInfo />}></Route>
      <Route path="Predict" element={<Predict />}></Route>
    </Routes>
  </BrowserRouter>
);
