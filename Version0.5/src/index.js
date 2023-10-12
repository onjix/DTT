import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ShowInterior1 from "./Store/ShowInterior1";
import ShowInterior2 from "./Store/ShowInterior2";
import S1Reservation1 from "./Service/S1Reservation1";
import S1Reservation2 from "./Service/S1Reservation2";
import S2Reservation1 from "./Service/S2Reservation1";
import S2Reservation2 from "./Service/S2Reservation2";
import MypageReservation from "../../front/src/components/MypageReservation";
import Login from "./Signup_Login/Login";
import Signup from "./Signup_Login/Signup";
import SimpleInfo from "../../front/src/components/SimpleInfo";
import Predict from "./Service/Predict";
import FutureStore from "./Service/FutureStore";
import MypageInfo from "../../front/src/components/MypageInfo";
import MainTest from "./MainTest"
import MainImage from "./MainImage";
import FirstTest from "./FirstTest";
import SelectStore from "./SelectStore"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<FirstTest />}></Route>
        <Route path="App" element={<App />}></Route>
        {/*<Route path="/" element={<App />}></Route>*/}
        <Route path="ShowInterior1" element={<ShowInterior1 />}></Route>
        <Route path="ShowInterior2" element={<ShowInterior2 />}></Route>
        <Route path="S1Reservation1" element={<S1Reservation1 />}></Route>
        <Route path="S1Reservation2" element={<S1Reservation2 />}></Route>
        <Route path="S2Reservation1" element={<S2Reservation1 />}></Route>
        <Route path="S2Reservation2" element={<S2Reservation2 />}></Route>
        <Route path="MypageReservation" element={<MypageReservation />}></Route>
        <Route path="MypageInfo" element={<MypageInfo />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Signup" element={<Signup />}></Route>
        <Route path="SimpleInfo" element={<SimpleInfo />}></Route>
        <Route path="Predict" element={<Predict />}></Route>
        <Route path="FutureStore" element={<FutureStore />}></Route>
        <Route path="MainTest" element={<MainTest />}></Route>
        <Route path="MainImage" element={<MainImage />}></Route>
        {/*<Route path="FirstTest" element={<FirstTest />}></Route>*/}
        <Route path="SelectStore" element={<SelectStore />}></Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
