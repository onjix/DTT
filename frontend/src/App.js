import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import "./App.css"
import {useCookies} from "react-cookie";
import React, {startTransition} from "react";
import {useNavigate} from "react-router-dom";


const App = () => {
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

    const moveFirstTest = () => {
        setTimeout(() => {
            movePage("/FirstTest");
        }, 0);
    };
    const moveSelectStore = () => {
        setTimeout(() => {
            movePage("/SelectStore");
        }, 0);
    };


    return (
        <>
            <div className="mainNav">
                <p className="Title" onClick={moveApp}>
                    <span>D</span>
                    <span>T</span>
                    <span>T</span>
                </p>
                {/*<p className="Title" onClick={moveApp}>DTT</p>*/}
                <div className="leftBox">
                    <div className="AboutUS" onClick={moveAboutUS}>
                        <InfoOutlinedIcon/>
                        <p>About Us</p>
                    </div>
                    {!users ? (
                        <>
                            <div className="Mypage" onClick={moveLogin}>
                                <PersonOutlineOutlinedIcon/>
                                <p>MyPage</p>
                            </div>
                            <div className="LoginBox">
                                <div className="Login" onClick={moveLogin}>
                                    <LoginOutlinedIcon/>
                                    <p>Login</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="Mypage" onClick={moveMypageInfo}>
                                <PersonOutlineOutlinedIcon/>
                                <p>MyPage</p>
                            </div>
                            <div className="LoginBox">
                                <div className="Logout" onClick={moveLogout}>
                                    <LogoutOutlinedIcon/>
                                    <p>Logout</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div onClick={moveFirstTest}>FirstTest</div>
            <div onClick={moveSelectStore}>SelectStore</div>
        </>
    );
}
export default App;

//memo1


