import React, { useEffect, useState } from "react";
import "./Predict.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../images/Building/FutreStore.glb";
import object2 from "../images/Building/F_table1.glb";
import object3 from "../images/Building/F_table2.glb";
import tableState1_1 from "../images/Signs/available1.glb";
import tableState1_4 from "../images/Signs/reserved1.glb";
import tableState2_1 from "../images/Signs/available2.glb";
import tableState2_4 from "../images/Signs/reserved2.glb";
import App from "../App";
import "./FutureStore.css";

const FutureStore = () => {
  const dateNow = new Date();
  const todayDate = dateNow.toISOString().slice(0, 10);
  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState("");
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const futureDate = oneWeekAgo.toISOString().split("T")[0];
  const [reservations, setReservation] = useState([]);
  const store = useLoader(GLTFLoader, object1);
  const table1 = useLoader(GLTFLoader, object2);
  const table2 = useLoader(GLTFLoader, object3);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/reservation/future?date=${date}&time=${time}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReservation(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("오류가 발생하였습니다.", error);
    }
  };

  function generateHourOptions() {
    const options = [];
    const startTime = 11; // 시작 시간 (9시)
    const endTime = 20; // 종료 시간 (18시)

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute <= 59; minute += 60) {
        const formattedHour = hour.toString().padStart(2, "0"); // 시간을 2자리 숫자로 포맷팅
        const formattedMinute = minute.toString().padStart(2, "0"); // 분을 2자리 숫자로 포맷팅
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  }

  const ReturnState1 = () => {
    const tableReserved1 = useLoader(GLTFLoader, tableState1_4);
    // const tableAvail1 = useLoader(GLTFLoader, tableState1_1);

    return reservations.map((reservation) =>
      reservation.tableN === 1 ? (
        <>
          <primitive
            object={tableReserved1.scene}
            scale={4.5}
            position={[-8, 3, -20]}
            children-0-castShadow
          />
        </>
      ) : null
    );
  };

  const ReturnState2 = () => {
    const tableReserved2 = useLoader(GLTFLoader, tableState2_4);
    // const tableAvail2 = useLoader(GLTFLoader, tableState2_1);

    return reservations.map((reservation) =>
      reservation.tableN === 2 ? (
        <>
          <primitive
            object={tableReserved2.scene}
            scale={4.5}
            position={[30, 3, -20]}
            children-0-castShadow
          />
        </>
      ) : null
    );
  };

  // const printCanvas = () => {
  //   return (
  //     <>
  //       <Canvas
  //         style={{
  //           width: "550px",
  //           height: "550px",
  //           position: "center",
  //           margin: "0 auto",
  //         }}
  //         camera={{ position: [80, 80, 80] }}
  //         shadows>
  //         <primitive
  //           object={store.scene}
  //           scale={2}
  //           position={[0, 0, 0]}
  //           children-0-castShadow
  //         />
  //         <primitive
  //           object={table1.scene}
  //           scale={3}
  //           position={[-8, -6, -20]}
  //           children-0-castShadow
  //         />
  //         {ReturnState1()}
  //         <primitive
  //           object={table2.scene}
  //           scale={3}
  //           position={[30, -6, -20]}
  //           children-0-castShadow
  //         />
  //         {ReturnState2()}
  //         <directionalLight intensity={1} />
  //         <ambientLight intensity={1.2} />
  //         <spotLight intensity={0.1} angle={0.1} penumbra={1} castShadow />
  //         <OrbitControls target={[0, 1, 0]} />
  //       </Canvas>
  //     </>
  //   );
  // };

  return (
    <>
      <App />
      <div className="Future-container">
        <div className="Future-header-container">
          <p className="Future-header">예약 확인</p>
        </div>
        <div className="Future-explain-container">
          <p className="Future-explain">
            날짜와 시간을 선택 후 확인하기 버튼 클릭시 해당되는 날짜의 매장
            예약상황이 보여집니다.
          </p>
        </div>

        <form className="Predict-form" onSubmit={handleFormSubmit}>
          <input
            className="Predict-input"
            type="date"
            value={date}
            min={todayDate}
            onChange={(e) =>
              setDate(
                e.target.value >= todayDate && e.target.value <= futureDate
                  ? e.target.value
                  : todayDate
              )
            }
          />
          <select
            className="Predict-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}>
            <option value="">시간 선택</option>
            {generateHourOptions()}
          </select>
          <button className="Predict-submit" type="submit">
            확인 하기
          </button>
        </form>

        <div className="FutureImage-container">
          <Canvas
            style={{
              width: "550px",
              height: "550px",
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
            />
            {ReturnState1()}
            <primitive
              object={table2.scene}
              scale={3}
              position={[30, -6, -20]}
              children-0-castShadow
            />
            {ReturnState2()}
            <directionalLight intensity={1} />
            <ambientLight intensity={1.2} />
            <spotLight intensity={0.1} angle={0.1} penumbra={1} castShadow />
            <OrbitControls target={[0, 1, 0]} />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default FutureStore;
