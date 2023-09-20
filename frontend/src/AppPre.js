import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "./UseDetectClose";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import MainImage from "./MainImage";
import { startTransition } from 'react';
// import mart from "./icons/mart.png";
// import user from "./icons/user.png";
import "./App.css";
import {MainTest} from "./MainTest";

const App = () => {
    const [myPageIsOpen1, myPageRef1, myPageHandler1] = useDetectClose(false);
    const [myPageIsOpen2, myPageRef2, myPageHandler2] = useDetectClose(false);
    const [name, setName] = useState("");
    const [cookies, setCookie] = useCookies(["user"]);
    const users = cookies.user;
    const movePage = useNavigate();
    const location = useLocation();

    const isShowInterior1 = location.pathname === "/ShowInterior1";
    const isShowInterior2 = location.pathname === "/ShowInterior2";
    const isShowMypageReservation = location.pathname === "/MypageReservation";
    const isShowS1Reservation1 = location.pathname === "/S1Reservation1";
    const isShowS1Reservation2 = location.pathname === "/S1Reservation2";
    const isShowS2Reservation1 = location.pathname === "/S2Reservation1";
    const isShowS2Reservation2 = location.pathname === "/S2Reservation2";
    const isSimpleInfo = location.pathname === "/SimpleInfo";
    const isFutureStore = location.pathname === "/FutureStore";
    const isMypageInfo = location.pathname === "/MypageInfo";
    const isMainTest = location.pathname === "/MainTest";

    const logoutClickHandler = () => {
        console.log("logout");
        setCookie("user", "", "/");
        moveApp();
    };
    const moveApp = () => {
        startTransition(() => {
            movePage("/");
        });
    };
    const moveSimpleInfo = () => {
        setTimeout(() => {
            movePage("/SimpleInfo");
        }, 0);
    };
    const moveMypageInfo = () => {
        setTimeout(() => {
            movePage("/MypageInfo");
        }, 0);
    };
    const moveMypageReservation = () => {
        setTimeout(() => {
            movePage("/MypageReservation");
        }, 0);
    };
    const moveLogin = () => {
        setTimeout(() => {
            movePage("/Login");
        }, 0);
    };
    const moveSignup = () => {
        setTimeout(() => {
            movePage("/Signup");
        }, 0);
    };
    const moveShowInterior1 = () => {
        setTimeout(() => {
            movePage("/ShowInterior1");
        }, 0);
    };
    const moveShowInterior2 = () => {
        setTimeout(() => {
            movePage("/ShowInterior2");
        }, 0);
    };
    const moveMainTest = () => {
        setTimeout(() => {
            movePage("/MainTest");
        }, 0);
    };

    return (
        <>
            <div className="Main-container">
                <div className="Header-inner">
                    <div className="Header-container">
                        {/* <img className="Header-logo" src={DTT} onClick={moveMain} /> */}
                        <p className="Header-title" onClick={moveApp}>
                            <span>D</span>
                            <span>T</span>
                            <span>T</span>
                        </p>

                        {!users ? (
                            <div className="Header-right">
                                <div className="Header-right-inner">
                                    <strong className="Log-in" onClick={moveLogin}>
                                        Log in
                                    </strong>
                                    <strong className="Sign-up" onClick={moveSignup}>
                                        Sign up
                                    </strong>
                                </div>
                            </div>
                        ) : (
                            <div className="Header-right">
                                <div className="Header-right-inner">
                                    <strong className="User-message">
                                        {users}님 환영합니다{" "}
                                    </strong>
                                    <strong className="Log-out" onClick={logoutClickHandler}>
                                        Log out
                                    </strong>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="LineTexture"></hr>
                <div className="Nav-container">
                    <div className="Nav">
                        {!users ? (
                            <div className="Wrapper">
                                <div className="DropdownContainer">
                                    <div className="DropdownButton" onClick={moveSimpleInfo}>
                                        테이블 이용상황
                                    </div>
                                </div>
                                <div className="DropdownContainer">
                                    <div
                                        className="DropdownButton"
                                        onClick={myPageHandler1}
                                        ref={myPageRef1}>
                                        매장선택
                                    </div>
                                    <Menu1 isDropped1={myPageIsOpen1}>
                                        <Ul1>
                                            <li>
                                                <div className="LinkWrapper" href="">
                                                    매장1
                                                </div>
                                            </li>
                                            <li>
                                                <div className="LinkWrapper" href="">
                                                    매장2
                                                </div>
                                            </li>
                                        </Ul1>
                                    </Menu1>
                                </div>
                                <div className="DropdownContainer">
                                    <div
                                        className="DropdownButton"
                                        onClick={myPageHandler2}
                                        ref={myPageRef2}>
                                        마이페이지
                                    </div>
                                    <Menu2 isDropped2={myPageIsOpen2}>
                                        <Ul2>
                                            <li>
                                                <div className="LinkWrapper" href="">
                                                    정보수정
                                                </div>
                                            </li>
                                            <li>
                                                <div className="LinkWrapper" href="">
                                                    나의 예약정보
                                                </div>
                                            </li>
                                        </Ul2>
                                    </Menu2>
                                </div>
                            </div>
                        ) : (
                            <div className="Wrapper">
                                <div className="DropdownContainer">
                                    <div className="DropdownButton" onClick={moveSimpleInfo}>
                                        테이블 이용상황
                                    </div>
                                </div>
                                <div className="DropdownContainer">
                                    <div
                                        className="DropdownButton"
                                        onClick={myPageHandler1}
                                        ref={myPageRef1}>
                                        매장선택
                                    </div>
                                    <Menu1 isDropped1={myPageIsOpen1}>
                                        <Ul1>
                                            <li>
                                                <div
                                                    className="LinkWrapper"
                                                    onClick={moveShowInterior1}>
                                                    매장1
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="LinkWrapper"
                                                    onClick={moveShowInterior2}>
                                                    매장2
                                                </div>
                                            </li>
                                        </Ul1>
                                    </Menu1>
                                </div>
                                <div className="DropdownContainer">
                                    <div
                                        className="DropdownButton"
                                        onClick={myPageHandler2}
                                        ref={myPageRef2}>
                                        마이페이지
                                    </div>
                                    <Menu2 isDropped2={myPageIsOpen2}>
                                        <Ul2>
                                            <li>
                                                <div className="LinkWrapper" onClick={moveMypageInfo}>
                                                    정보수정
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="LinkWrapper"
                                                    onClick={moveMypageReservation}>
                                                    나의 예약정보
                                                </div>
                                            </li>
                                        </Ul2>
                                    </Menu2>
                                </div>
                                <div onClick={moveMainTest}>
                                    테스트페이지
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/*{!isShowInterior1 &&*/}
                {/*  !isShowInterior2 &&*/}
                {/*  !isShowMypageReservation &&*/}
                {/*  !isShowS1Reservation1 &&*/}
                {/*  !isShowS1Reservation2 &&*/}
                {/*  !isShowS2Reservation1 &&*/}
                {/*  !isShowS2Reservation2 &&*/}
                {/*  !isSimpleInfo &&*/}
                {/*  !isFutureStore &&*/}
                {/*  !isMypageInfo && <MainImage />}*/}

                {/* ##아이콘 사용시 사용할 예정## */}
                {/* <div className="Icon-box">
          <div className="Icon-container">
            <img className="Icon1" src={mart} onClick={moveShowInterior1} />
          </div>
          <div className="Icon-container">
            <img className="Icon2" src={user} onClick={moveMypage} />
          </div>
        </div> */}
            </div>
        </>
    );
};

export default App;

const Menu1 = styled.div`
  background: #d1c4e9;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: #d1c4e9;
  }
  ${({ isDropped1 }) =>
    isDropped1 &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul1 = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Menu2 = styled.div`
  background: #d1c4e9;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 110px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: #d1c4e9;
  }
  ${({ isDropped2 }) =>
    isDropped2 &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul2 = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

//memo
