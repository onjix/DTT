import React, { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../src/images/newBuilding.glb";
import object2 from "../src/images/table1.glb";
import object3 from "../src/images/table2.glb";
import tableState1_1 from "../src/images/available1.glb";
import tableState1_2 from "../src/images/inuse1.glb";
import tableState2_1 from "../src/images/available2.glb";
import tableState2_2 from "../src/images/inuse2.glb";
import sc1 from "../src/images/movingH1.glb";
import sc2 from "../src/images/movingH2.glb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Main from "./Main";
import "./ShowInterior1.css";
const State1 = () => {
  const tableAvail1 = useLoader(GLTFLoader, tableState1_1);
  const tableInuse1 = useLoader(GLTFLoader, tableState1_2);
  const sc11 = useLoader(GLTFLoader, sc1);
  const [testStr1, setTestStr1] = useState("");

  useEffect(() => {
    axios({
      url: "/table/1/status",
      method: "GET",
    }).then((res) => {
      setTestStr1(res.data);
    });
  }, []);
  var state = testStr1 === 1 ? false : true;
  if (state) {
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
  } else {
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
  }
};

const State2 = () => {
  const tableAvail2 = useLoader(GLTFLoader, tableState2_1);
  const tableInuse2 = useLoader(GLTFLoader, tableState2_2);
  const sc22 = useLoader(GLTFLoader, sc2);
  const [testStr2, setTestStr2] = useState("");

  useEffect(() => {
    axios({
      url: "/table/2/status",
      method: "GET",
    }).then((res) => {
      setTestStr2(res.data);
    });
  }, []);
  var state = testStr2 === 1 ? false : true;
  if (state) {
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
  } else {
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
  }
};

const ShowInterior1 = () => {
  const store = useLoader(GLTFLoader, object1);
  const table1 = useLoader(GLTFLoader, object2);
  const table2 = useLoader(GLTFLoader, object3);
  const movePage = useNavigate();
  const reservationPage = () => {
    movePage("/Reservation");
  };

  return (
    <>
      <Main />
      <Canvas
        style={{
          width: "650px",
          height: "650px",
          position: "center",
          margin: "0 auto",
        }}
        camera={{ position: [40, 40, 40] }}
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
    </>
  );
};

export default ShowInterior1;
