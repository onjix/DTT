import React, { useState } from "react";
import { useCookies } from "react-cookie";
import App from "../App";
import MyPageList from "./MyPageList";
import MyPageList2 from "./MyPageList2";
import "./Mypage.css";
import {useNavigate} from "react-router-dom";


const Mypage = () => {
  const [reservations, setReservations] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  const movePage = useNavigate();
  const moveMyPageInfo = () => {
    movePage("/MypageInfo");
  };
  return (
    <>
      <App />
      <div className="MContent-container">
        <div className="MInner-container">
          <div style={{ textAlign: "center" }} className="M-container">
            <h2>{users}님의 예약현황입니다.</h2>
            <div onClick={moveMyPageInfo}>마이페이지</div>
            <MyPageList />
              <MyPageList2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
