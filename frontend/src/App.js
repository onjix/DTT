import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
    <div className="page-all">
            <h1 className="m-title">
              DTT
            </h1>
            <button className="login">로그인</button>
            <nav id="main-nav">
              <div className="pull">
                <Link to="/showInterior">
                  <button className="btn">매장1</button>
                </Link>
                <span> </span>

              </div>
            </nav>
            <hr className="line"></hr>
            <div id="content">
              <section id="main-section"></section>
            </div>
            <footer id="main-footer"></footer>
          </div>
      <div className="pull">
      </div>
    </>
  );
};
export default App;
