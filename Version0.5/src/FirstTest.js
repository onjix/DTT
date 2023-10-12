import React from 'react';
import './FirstTest.css'; // CSS 파일을 import
import App from "./App"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

// Import your image files
import image1 from './images/BackgroungImages/bImage1.jpg';
import image2 from './images/BackgroungImages/bImage3.jpg';
import image3 from './images/BackgroungImages/bImage2.jpg';

const FirstTest = () => {

    const [cookies, setCookie] = useCookies(["user"]);
    const users = cookies.user;
    const movePage = useNavigate();

    const moveUsage = () => {
        setTimeout(() => {
            movePage("/SimpleInfo");
        }, 0);
    };
    const moveStoreSelection = () => {
        setTimeout(() => {
            movePage("/SelectStore");
        }, 0);
    };

    const moveReservationHistory = () => {
        setTimeout(() => {
            movePage("/MypageReservation");
        }, 0);
    };

    const moveUsageMethod = () => {
        setTimeout(() => {
            movePage("/SelectStore");
        }, 0);
    };

    return (
        <>
            <App/>
            <div className="photos">
                {/*<div className="photoBox">*/}
                {/*    <img src={image1} alt="Image 1"/>*/}
                {/*</div>*/}
                {/*<div className="photoBox">*/}
                {/*    <img src={image2} alt="Image 2"/>*/}
                {/*</div>*/}
                {/*<div className="photoBox">*/}
                {/*    <img src={image3} alt="Image 3"/>*/}
                {/*</div>*/}
                <div className="photoBox"></div>
            </div>\
            <div className="SelectIcon">
                <div className="usage" onClick={moveUsage}><SearchOutlinedIcon/>이용 상황</div>
                <div className="store-selection" onClick={moveStoreSelection}><StoreOutlinedIcon/>매장 선택</div>
                <div className="reservation-history" onClick={moveReservationHistory}><SummarizeOutlinedIcon/>예약 내역
                </div>
                <div className="usage-method"><HelpCenterOutlinedIcon/>이용 방법</div>
            </div>
        </>
    );
};

export default FirstTest;
