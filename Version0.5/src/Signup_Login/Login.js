import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCookies } from "react-cookie";

const Login = ({}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [cookies2, setCookie2] = useCookies(["userId"]);
  const movePage = useNavigate();

  const moveHome = () => {
    setCookie("user", name, { path: "/" });
  };

  const handleLoginAndScrollToTop = () => {
    moveHome();
    const hashLink = document.querySelector('a[href="#"]');
    if (hashLink) {
      hashLink.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <>
        <div className="parent-container">
          <div className="form-container">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={handleLoginAndScrollToTop}>
                로그인
              </button>
            </form>
          </div>
        </div>
        <a href="#"></a>
      </>
  );
};

export default Login;
