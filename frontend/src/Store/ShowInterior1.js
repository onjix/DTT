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

const State1 = () => {
  const [reservations1, setReservations1] = useState([]);
  const tableAvail1 = useLoader(GLTFLoader, tableState1_1);
  const tableInuse1 = useLoader(GLTFLoader, tableState1_2);
  const tableOccupied1 = useLoader(GLTFLoader, tableState1_3);
  const tableReserved1 = useLoader(GLTFLoader, tableState1_4);
  const Human1 = useLoader(GLTFLoader, human1);
  const Human3 = useLoader(GLTFLoader, human3);
  const [state1, setState1] = useState("");

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

  const fetchData1 = async () => {
    try {
      const response1 = await fetch("/table/1/1/status");
      const data1 = await response1.json();
      setState1(data1);

      const response2 = await axios.get("/reservations/time");
      if (response2.status === 200) {
        const data2 = response2.data;
        setReservations1(data2);

        const today = new Date();
        reservations1.forEach((reservation) => {
          if (reservation.date === today) {
            setState1(4);
          }
        });
        console.log(reservations1);
      } else {
        console.error("Failed to fetch reservations:", response2.status);
      }
      const response3 = await fetch("/reservations/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response3) => {
          if (response3.ok) {
            // 성공적으로 업데이트된 경우
            console.log("테이블 상태가 업데이트되었습니다.");
          } else {
            // 업데이트 실패한 경우
            console.error("테이블 상태 업데이트에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("API 호출 중 오류가 발생했습니다.", error);
        });
    } catch (error) {
      console.log("에러:", error);
    }
  };
  useInterval(fetchData1, 5000);
  if (state1 === 3) {
    return (
      <>
        <primitive
          object={tableReserved1.scene}
          scale={4.5}
          position={[-8, 3, -20]}
          children-0-castShadow
        />
      </>
    );
  } else if (state1 === 2) {
    return (
      <>
        <primitive
          object={tableOccupied1.scene}
          scale={4.5}
          position={[-8, 3, -20]}
          children-0-castShadow
        />
        <primitive
          object={Human1.scene}
          scale={5}
          position={[-8, -13, -20]}
          children-0-castShadow
        />
      </>
    );
  } else if (state1 === 1) {
    return (
      <>
        <primitive
          object={tableInuse1.scene}
          scale={5.5}
          position={[-8, 3, -20]}
          children-0-castShadow
        />

        <primitive
          object={Human1.scene}
          scale={5}
          position={[-19, -13, -15]}
          children-0-castShadow
        />
        <primitive
          object={Human3.scene}
          scale={5}
          position={[-19, -13, -25]}
          children-0-castShadow
        />
      </>
    );
  } else {
    return (
      <>
        <primitive
          object={tableAvail1.scene}
          scale={4.5}
          position={[-8, 3, -20]}
          children-0-castShadow
        />
      </>
    );
  }
};

const State2 = () => {
  const [reservations2, setReservations2] = useState([]);
  const tableAvail2 = useLoader(GLTFLoader, tableState2_1);
  const tableInuse2 = useLoader(GLTFLoader, tableState2_2);
  const tableOccupied2 = useLoader(GLTFLoader, tableState2_3);
  const tableReserved2 = useLoader(GLTFLoader, tableState2_4);
  const Human2 = useLoader(GLTFLoader, human2);
  // const Human3 = useLoader(GLTFLoader, human3);
  const [state2, setState2] = useState("");

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

  const fetchData2 = async () => {
    try {
      const response1 = await fetch("/table/1/2/status");
      const data1 = await response1.json();
      setState2(data1);

      const response2 = await axios.get("/reservations/time");
      if (response2.status === 200) {
        const data2 = response2.data;
        setReservations2(data2);

        const today = new Date();
        reservations2.forEach((reservation) => {
          if (reservation.date === today) {
            setState2(4);
          }
        });
        console.log(reservations2);
      } else {
        console.error("Failed to fetch reservations:", response2.status);
      }
    } catch (error) {
      console.log("에러:", error);
    }
  };

  useInterval(fetchData2, 5000);

  if (state2 === 3) {
    return (
      <>
        <primitive
          object={tableReserved2.scene}
          scale={4.5}
          position={[30, 3, -20]}
          children-0-castShadow
        />
      </>
    );
  } else if (state2 === 2) {
    return (
      <>
        <primitive
          object={tableOccupied2.scene}
          scale={4.5}
          position={[30, 3, -20]}
          children-0-castShadow
        />

        <primitive
          object={Human2.scene}
          scale={5}
          position={[19, -13, -25]}
          children-0-castShadow
        />
      </>
    );
  } else if (state2 === 1) {
    return (
      <>
        <primitive
          object={tableInuse2.scene}
          scale={5.5}
          position={[30, 3, -20]}
          children-0-castShadow
        />

        <primitive
          object={Human2.scene}
          scale={5}
          position={[19, -13, -25]}
          children-0-castShadow
        />
      </>
    );
  } else {
    return (
      <>
        <primitive
          object={tableAvail2.scene}
          scale={4.5}
          position={[30, 3, -20]}
          children-0-castShadow
        />
      </>
    );
  }
};

const ShowInterior1 = () => {
  const store = useLoader(GLTFLoader, object1);
  const table1 = useLoader(GLTFLoader, object2);
  const table2 = useLoader(GLTFLoader, object3);
  const movePage = useNavigate();
  const reservationPage1 = () => {
    movePage("/S1Reservation1");
  };
  const reservationPage2 = () => {
    movePage("/S1Reservation2");
  };
  const moveFuture = () => {
    movePage("/FutureStore");
  };

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
                  children-0-castShadow
                />
                <primitive
                  object={table1.scene}
                  scale={3}
                  position={[-8, -6, -20]}
                  children-0-castShadow
                  onClick={reservationPage1}
                />
                {State1()}

                <primitive
                  object={table2.scene}
                  scale={3}
                  position={[30, -6, -20]}
                  children-0-castShadow
                  onClick={reservationPage2}
                />
                {State2()}
                <directionalLight intensity={1} />
                <ambientLight intensity={1.2} />
                <spotLight
                  intensity={0.1}
                  angle={0.1}
                  penumbra={1}
                  castShadow
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
