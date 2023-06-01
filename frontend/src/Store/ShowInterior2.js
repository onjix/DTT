import React, { useState, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../images/Building/newBuilding.glb";
import object2 from "../images/Building/table1.glb";
import object3 from "../images/Building/table2.glb";
import tableState1_1 from "../images/Signs/available1.glb";
import tableState1_2 from "../images/Signs/inuse1.glb";
import tableState1_3 from "../images/Signs/occupied1.glb";
import tableState2_1 from "../images/Signs/available2.glb";
import tableState2_2 from "../images/Signs/inuse2.glb";
import tableState2_3 from "../images/Signs/occupied2.glb";
import sc1 from "../images/Human/BASEmodel1.glb";
import sc2 from "../images/Human/BASEmodel2.glb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ShowInterior.css";
import App from "../App";

const State1 = () => {
  const tableAvail1 = useLoader(GLTFLoader, tableState1_1);
  const tableInuse1 = useLoader(GLTFLoader, tableState1_2);
  const tableOccupied1 = useLoader(GLTFLoader, tableState1_3);
  const sc11 = useLoader(GLTFLoader, sc1);
  const [state1, setstate1] = useState("");

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
      const response = await axios.get("/table/1/status");
      setstate1(response.data);
    } catch (error) {
      console.log("에러:", error);
    }
  };

  useInterval(fetchData, 5000);

  if (state1 === 2) {
    return (
      <>
        <primitive
          object={tableOccupied1.scene}
          scale={2}
          position={[-8, 8.5, 3]}
          children-0-castShadow
        />
        <primitive
          object={sc11.scene}
          scale={2}
          position={[-8, 6.5, 3]}
          children-0-castShadow
        />
      </>
    );
  } else if (state1 === 1) {
    return (
      <>
        <primitive
          object={tableInuse1.scene}
          scale={2}
          position={[-8, 8.5, 3]}
          children-0-castShadow
        />

        <primitive
          object={sc11.scene}
          scale={2}
          position={[-8, 6.5, 3]}
          children-0-castShadow
        />
      </>
    );
  } else {
    return (
      <>
        <primitive
          object={tableAvail1.scene}
          scale={2}
          position={[-8, 8.5, 3]}
          children-0-castShadow
        />
      </>
    );
  }
};

const State2 = () => {
  const tableAvail2 = useLoader(GLTFLoader, tableState2_1);
  const tableInuse2 = useLoader(GLTFLoader, tableState2_2);
  const tableOccupied2 = useLoader(GLTFLoader, tableState2_3);
  const sc22 = useLoader(GLTFLoader, sc2);
  const [state2, setState2] = useState("");

  useEffect(() => {
    axios({
      url: "/table/2/status",
      method: "GET",
    }).then((res) => {
      setState2(res.data);
    });
  }, []);
  if (state2 === 2) {
    <>
      <primitive
        object={tableOccupied2.scene}
        scale={2}
        position={[10, 8.5, 3]}
        children-0-castShadow
      />

      <primitive
        object={sc22.scene}
        scale={2}
        position={[10, 6.5, 3]}
        children-0-castShadow
      />
    </>;
  } else if (state2 === 1) {
    return (
      <>
        <primitive
          object={tableInuse2.scene}
          scale={2}
          position={[10, 8.5, 3]}
          children-0-castShadow
        />

        <primitive
          object={sc22.scene}
          scale={2}
          position={[10, 6.5, 3]}
          children-0-castShadow
        />
      </>
    );
  } else {
    return (
      <>
        <primitive
          object={tableAvail2.scene}
          scale={2}
          position={[10, 8.5, 3]}
          children-0-castShadow
        />
      </>
    );
  }
};

const ShowInterior2 = () => {
  const store = useLoader(GLTFLoader, object1);
  const table1 = useLoader(GLTFLoader, object2);
  const table2 = useLoader(GLTFLoader, object3);
  const movePage = useNavigate();
  const reservationPage = () => {
    movePage("/Reservation");
  };

  return (
    <>
      <App />
      <div className="SContent-container">
        <div className="SInner-container">
          <Canvas
            style={{
              width: "650px",
              height: "650px",
              position: "center",
              margin: "0 auto",
            }}
            camera={{ position: [48, 48, 48] }}
            shadows>
            <primitive
              object={store.scene}
              scale={2}
              position={[0, 0, 0]}
              children-0-castShadow
            />
            <primitive
              object={table1.scene}
              scale={4.4}
              position={[-8, 2, 3]}
              children-0-castShadow
              onClick={reservationPage}
            />
            {State1()}

            <primitive
              object={table2.scene}
              scale={4.4}
              position={[10, 2, 3]}
              children-0-castShadow
              onClick={reservationPage}
            />
            {State2()}
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

export default ShowInterior2;