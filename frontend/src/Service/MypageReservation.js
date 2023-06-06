import React, { useState } from "react";
import { useCookies } from "react-cookie";
import App from "../App";
import MyPageList1 from "./MyPageList1";
import MyPageList2 from "./MyPageList2";
import "./MypageReservation.css";
import {useNavigate} from "react-router-dom";


const MypageReservation = () => {
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
                        <div className="Mypage-container1">
                        <MyPageList1 />

                        </div>
                        <div className="Mypage-container2">
                        <MyPageList2 />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MypageReservation;
