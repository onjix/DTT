import React, { useState, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import object1 from "../images/Building/FutreStore.glb.glb";
import object2 from "../images/Building/F_table1.glb";
import object3 from "../images/Building/F_table2.glb";
import tableState1_1 from "../images/Signs/available1.glb";
import tableState1_4 from "../images/Signs/reserved1.glb";
import tableState2_1 from "../images/Signs/available2.glb";
import tableState2_4 from "../images/Signs/reserved2.glb";
import "./ShowInterior.css";

const State1 = () => {
    const [reservations1, setReservations1] = useState([]);
    const tableAvail1 = useLoader(GLTFLoader, tableState1_1);
    const tableReserved1 = useLoader(GLTFLoader, tableState1_4);
    const [state1, setState1] = useState("");

    if (state1 === 3) {
        return (
            <>
                <primitive
                    object={tableReserved1.scene}
                    scale={4.5}
                    position={[-8, 8.5, 3]}
                    children-0-castShadow
                />
            </>
        );
    }  else {
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
    const tableReserved2 = useLoader(GLTFLoader, tableState2_4);
    const [state2, setState2] = useState("");

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

const FuturePrint = () => {
    const store = useLoader(GLTFLoader, object1);
    const table1 = useLoader(GLTFLoader, object2);
    const table2 = useLoader(GLTFLoader, object3);

    return (
        <>
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
                </div>

            </div>
        </>
    );
};

export default FuturePrint;
