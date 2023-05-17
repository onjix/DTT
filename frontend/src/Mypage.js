import React, { useState } from "react";
import { Link } from "react-router-dom";

const Mypage = () => {
  const Dropdown1 = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
    };
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="btn1">
          <button>매장선택</button>
        </div>
        {isOpen && (
          <ul>
            <li>
              <Link to="/showInterior1">
                <button className="btn">매장1</button>
              </Link>
            </li>
            <li>
              <Link to="/showInterior2">
                <button className="btn">매장2</button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="page-all">
        <h1 className="m-title">DTT</h1>
        <button className="login">Join/Login</button>
        <hr className="line"></hr>
        <div className="header">
          <div className="gnb">
            <span className="nav1">{Dropdown1()}</span>
            <span className="nav2">
              <Link to="/Mypage">
                <button className="btn">마이페이지</button>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2>마이페이지 할거야</h2>
      </div>
    </>
  );
};

export default Mypage;
