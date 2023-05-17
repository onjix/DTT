import React, { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../src/images/newBuilding.glb";
import object2 from "../src/images/table1.glb";
import object3 from "../src/images/table2.glb";
import tableState1 from "../src/images/available.glb";
import tableState2 from "../src/images/inuse.glb";
import sc1 from "../src/images/movingH.glb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const State = () => {
  const tableAvail = useLoader(GLTFLoader, tableState1);
  const tableInuse = useLoader(GLTFLoader, tableState2);
  const sc = useLoader(GLTFLoader, sc1);
  const [testStr, setTestStr] = useState("");

  useEffect(() => {
    axios({
      url: "/table/1/status",
      method: "GET",
    }).then((res) => {
      setTestStr(res.data);
    });
  }, []);
  var state = testStr === 1 ? false : true;
  if (state) {
    return (
      <>
        <primitive
          object={tableAvail.scene}
          scale={1.5}
          position={[-4, 4.5, 3]}
          children-0-castShadow
        />
      </>
    );
  } else {
    return (
      <>
        <primitive
          object={tableInuse.scene}
          scale={1.5}
          position={[-4, 4.5, 3]}
          children-0-castShadow
        />

        <primitive
          object={sc.scene}
          scale={1}
          position={[-4, 4.5, 3]}
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
      <Canvas
        style={{
          width: "800px",
          height: "800px",
          position: "relative",
        }}
        camera={{ position: [40, 40, 40] }}
        shadows>
        <primitive
          object={store.scene}
          scale={1}
          position={[0, 0, 0]}
          children-0-castShadow
        />
        <primitive
          object={table1.scene}
          scale={2.4}
          position={[-4, 1, 3]}
          children-0-castShadow
          onClick={reservationPage}
        />
        {State()}

        <primitive
          object={table2.scene}
          scale={2.4}
          position={[6, 1, 3]}
          children-0-castShadow
          onClick={reservationPage}
        />

        <directionalLight intensity={1} />
        <ambientLight intensity={1.2} />
        <spotLight intensity={0.1} angle={0.1} penumbra={1} castShadow />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    </>
  );
};

export default ShowInterior1;