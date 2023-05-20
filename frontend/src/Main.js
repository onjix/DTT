import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      <div className="page-all">
        <h1 className="m-title">
          <a href="./Main">DTT</a>
        </h1>
        <Link to="/Join">
          <p>Join/Login</p>
        </Link>
        <hr className="line"></hr>
        <div className="header">
          <div className="nav1" style={{ display: "inline-block" }}>
            <div className="btn">
              <h2 className="item" onClick={toggleDropdown}>
                매장선택
              </h2>
            </div>
            {isOpen && (
              <ul>
                <li>
                  <Link
                    to="/Join"
                    style={{ textDecorationLine: "none", color: "black" }}>
                    매장 1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Join"
                    style={{ textDecorationLine: "none", color: "black" }}>
                    매장 2
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="nav2" style={{ display: "inline-block" }}>
            <h2 className="item">
              <Link
                to="/Mypage"
                style={{ textDecorationLine: "none", color: "black" }}>
                마이페이지
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
