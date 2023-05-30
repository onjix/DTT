import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Main from "./Main";
import "./SimpleInfo.css";

const SimpleInfo = () => {
  const [testStr1, setTestStr1] = useState(0);
  const [testStr2, setTestStr2] = useState(0);
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [delay]);
  }

  const fetchData = async () => {
    try {
      const response1 = await axios.get("/table/1/status");
      const response2 = await axios.get("/table/2/status");
      setTestStr1(response1.data);
      setTestStr2(response2.data);
      console.log(response1);
      console.log(response2);
    } catch (error) {
      console.log("에러:", error);
    }
  };

  useInterval(fetchData, 3000);
  return (
    <>
      <Main />
      <div className="SContent-container">
        <div className="SInner-container">
          <div style={{ textAlign: "center" }} className="S-container">
            <h2>현재 테이블 사용현황입니다.</h2>
          </div>
          <div className="Shop1-container">
            <div className="Shop1Inner-container">
              <h2>매장 1의 테이블 현황</h2>
              <div className="table-container">
                <div className="Table1-container">
                  <div>
                    <h2>1번 테이블</h2>
                  </div>
                  <div>
                    {testStr1 === 0 ? (
                      <div>
                        <h3 className="Table-color1">테이블 비어있습니다.</h3>
                      </div>
                    ) : (
                      <div>
                        <h3 className="Table-color2">테이블이 사용중입니다.</h3>
                      </div>
                    )}
                  </div>
                </div>
                <div className="Table2-container">
                  <div>
                    <h2>2번 테이블</h2>
                  </div>
                  <div>
                    {testStr2 === 0 ? (
                      <div>
                        <h3 className="Table-color1">테이블 비어있습니다.</h3>
                      </div>
                    ) : (
                      <div>
                        <h3 className="Table-color2">테이블이 사용중입니다.</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleInfo;
