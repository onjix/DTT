import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "./UseDetectClose";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import MainImage from "./MainImage";
// import mart from "./icons/mart.png";
// import user from "./icons/user.png";
import DTT from "./icons/DTT1.gif";
import "./App.css";

const App = () => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [name, setName] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  const movePage = useNavigate();
  const location = useLocation();

  const isShowInterior1 = location.pathname === "/ShowInterior1";
  const isShowInterior2 = location.pathname === "/ShowInterior2";
  const isShowMypage = location.pathname === "/MyPage";
  const isShowS1Reservation1 = location.pathname === "/S1Reservation1";
  const isShowS1Reservation2 = location.pathname === "/S1Reservation2";
  const isShowS2Reservation1 = location.pathname === "/S2Reservation1";
  const isShowS2Reservation2 = location.pathname === "/S2Reservation2";
  const isSimpleInfo = location.pathname === "/SimpleInfo";

  const logoutClickHandler = () => {
    console.log("logout");
    setCookie("user", "", "/");
    moveApp();
  };
  const moveApp = () => {
    setTimeout(() => {
      movePage("/");
    }, 0);
  };
  const moveSimpleInfo = () => {
    setTimeout(() => {
      movePage("/SimpleInfo");
    }, 0);
  };
  const moveMypage = () => {
    setTimeout(() => {
      movePage("/MyPage");
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
                    onClick={myPageHandler}
                    ref={myPageRef}>
                    매장선택
                  </div>
                  <Menu isDropped={myPageIsOpen}>
                    <Ul>
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
                    </Ul>
                  </Menu>
                </div>
                <div className="DropdownContainer">
                  <div className="DropdownButton">마이페이지</div>
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
                    onClick={myPageHandler}
                    ref={myPageRef}>
                    매장선택
                  </div>
                  <Menu isDropped={myPageIsOpen}>
                    <Ul>
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
                    </Ul>
                  </Menu>
                </div>
                <div className="DropdownContainer">
                  <div className="DropdownButton" onClick={moveMypage}>
                    마이페이지
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!isShowInterior1 &&
          !isShowInterior2 &&
          !isShowMypage &&
          !isShowS1Reservation1 &&
            !isShowS1Reservation2&&
            !isShowS2Reservation1&&
            !isShowS2Reservation2&&
          !isSimpleInfo && <MainImage />}
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

const Menu = styled.div`
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
  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
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
