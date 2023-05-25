import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "./UseDetectClose";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import mart from "./icons/mart.png";
import user from "./icons/user.png";
import "./Main.css";

const Main = () => {
  const [name, setName] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  const movePage = useNavigate();
  const logoutClickHandler = () => {
    console.log("logout");
    setCookie("user", "", "/");
    moveMain();
  };
  const moveMypage = () => {
    movePage("/MyPage");
  };
  const moveMain = () => {
    movePage("/Main");
  };
  const moveLogin = () => {
    movePage("/Login");
  };
  const moveSignup = () => {
    movePage("/Signup");
  };
  const moveShowInterior1 = () => {
    movePage("/ShowInterior1");
  };
  return (
    <>
      <div className="Main-container">
        <div className="inner">
          <div className="Header-container">
            <a href="./Main" className="Header-logo">
              DTT
            </a>
            <div className="Icon-box">
              <div className="Icon-container">
                <img className="Icon1" src={mart} onClick={moveShowInterior1} />
              </div>
              <div className="Icon-container">
                <img className="Icon2" src={user} onClick={moveMypage} />
              </div>
            </div>
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
                  <strong className="Log-out">{users}님 환영합니다 </strong>
                  <strong className="Log-out" onClick={logoutClickHandler}>
                    Log out
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

export default Main;
