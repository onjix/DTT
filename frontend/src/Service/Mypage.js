import React, { useState } from "react";
import { useCookies } from "react-cookie";
import App from "../App";
import MyPageList from "./MyPageList";
import "./Mypage.css";

const Mypage = () => {
  const [reservations, setReservations] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  return (
    <>
      <App />
      <div className="MContent-container">
        <div className="MInner-container">
          <div style={{ textAlign: "center" }} className="M-container">
            <h2>{users}님의 예약현황입니다.</h2>
            <MyPageList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
