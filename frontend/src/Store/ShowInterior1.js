import React, { useState, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../images/Building/realBuilding.glb";
import object2 from "../images/Building/s1_table1.glb";
import object3 from "../images/Building/s1_table2.glb";
import tableState1_1 from "../images/Signs/available1.glb";
import tableState1_2 from "../images/Signs/inuse1.glb";
import tableState1_3 from "../images/Signs/occupied1.glb";
import tableState1_4 from "../images/Signs/reserved1.glb";
import tableState2_1 from "../images/Signs/available2.glb";
import tableState2_2 from "../images/Signs/inuse2.glb";
import tableState2_3 from "../images/Signs/occupied2.glb";
import tableState2_4 from "../images/Signs/reserved2.glb";
import human1 from "../images/Human/Human1-1.glb";
import human2 from "../images/Human/Human1-2.glb";
import human3 from "../images/Human/Human1-3.glb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ShowInterior.css";
import App from "../App";
import Predict from "../Service/Predict";
import FutureStore from "../Service/FutureStore";
import {State1} from "./State1"
import {State2} from "./State2"

const ShowInterior1 = () => {
  const store = useLoader(GLTFLoader, object1);
  const table1 = useLoader(GLTFLoader, object2);
  const table2 = useLoader(GLTFLoader, object3);
  const movePage = useNavigate();
  const [state1, setState1] = useState('0');
  const [state2, setState2] = useState('0');
  const reservationPage1 = () => {
    movePage("/S1Reservation1");
  };
  const reservationPage2 = () => {
    movePage("/S1Reservation2");
  };
  const moveFuture = () => {
      movePage("/FutureStore");
  };
  // const fetchData2 = async () => {
  //   const response2 = await fetch("/table/1/2/status");
  //   const data2 = await response2.json();
  //   console.log(data2.type);
  //   setState2(data2);
  // }
  const eventSource = new EventSource("/sse/listen");
  useEffect(() => {

    eventSource.onmessage = (event) => {
      console.log("hi");
      const eventD = JSON.parse(event.data);
      const id = eventD.id.toString()
      const status = eventD.status.toString()
      console.log("Received event:", id);
      if(id === '1') {
        setState1(status);
      } else if(id === '2') {
        setState2(status);
      }
      else {
        console.log("not id")
      }
    }


    // 컴포넌트가 언마운트될 때 EventSource를 닫습니다.
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <App />
      <div className="Total-container">
        <div className="TotalInner-container">
          <div className="SContent-container">
            <div className="SInner-container">
              <Canvas
                style={{
                  width: "650px",
                  height: "650px",
                  position: "center",
                  margin: "0 auto",
                }}
                camera={{ position: [80, 80, 80] }}
                shadows>
                <primitive
                  object={store.scene}
                  scale={2}
                  position={[0, 0, 0]}
                  // children-0-castShadow
                />
                <primitive
                  object={table1.scene}
                  scale={3}
                  position={[-8, -6, -20]}
                  // children-0-castShadow
                  onClick={reservationPage1}
                />
                <State1 state={state1}/>

                <primitive
                  object={table2.scene}
                  scale={3}
                  position={[30, -6, -20]}
                  // children-0-castShadow
                  onClick={reservationPage2}
                />
                <State2 state={state2}/>
                <directionalLight intensity={1} />
                <ambientLight intensity={1.2} />
                <spotLight
                  intensity={0.1}
                  angle={0.1}
                  penumbra={1}
                  // children-0-castShadow
                />
                <OrbitControls target={[0, 1, 0]} />
              </Canvas>
            </div>
          </div>
          <div className="AddInform-container">
            <div className="ReservationInform-container" onClick={moveFuture}>
              <h2 className="ReservationInform-title">예약 확인하기</h2>
            </div>
            <Predict />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInterior1;