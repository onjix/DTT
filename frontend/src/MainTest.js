import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import "./MainTest.css"
import {useCookies} from "react-cookie";
import React, {startTransition} from "react";
import {useNavigate} from "react-router-dom";


const MainTest = () => {
    const [cookies, setCookie] = useCookies(["user"]);
    const users = cookies.user;
    const movePage = useNavigate();
    const moveApp = () => {
        startTransition(() => {
            movePage("/");
        });
    };

    const moveAboutUS = () => {
        setTimeout(() => {
            movePage("/MainImage");
        }, 0);
    }

    const moveMypageInfo = () => {
        setTimeout(() => {
            movePage("/MypageInfo");
        }, 0);
    };

    const moveLogin = () => {
        setTimeout(() => {
            movePage("/Login");
        }, 0);
    };

    const moveLogout = () => {
        setCookie("user", "", "/");
        moveApp();
    };



    return (
        <>
            <div className="mainNav">
                <p className="Title" onClick={moveApp}>DTT</p>
                <div className="leftBox">
                    <div className="AboutUS" onClick={moveAboutUS}>
                        <InfoOutlinedIcon />
                        <p>About Us</p>
                    </div>
                    <div className="Mypage" onClick={moveMypageInfo}>
                        <PersonOutlineOutlinedIcon />
                        <p>MyPage</p>
                    </div>
                    <div className="LoginBox">
                        {!users ? (
                            <div className="Login" onClick={moveLogin}>
                                <LoginOutlinedIcon />
                                <p>Login</p>
                            </div>
                        ) : (
                            <div className="Logout" onClick={moveLogout}>
                                <LogoutOutlinedIcon />
                                <p>Logout</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
export default MainTest


