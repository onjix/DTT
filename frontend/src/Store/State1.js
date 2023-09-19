import React, {useEffect, useState} from "react";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import tableState1_1 from "../images/Signs/available1.glb";
import tableState1_2 from "../images/Signs/inuse1.glb";
import tableState1_3 from "../images/Signs/occupied1.glb";
import tableState1_4 from "../images/Signs/reserved1.glb";
import human1 from "../images/Human/Human1-1.glb";
import human3 from "../images/Human/Human1-3.glb";

export const State1 = (props) => {
    const [reservations1, setReservations1] = useState([]);
    const tableAvail1 = useLoader(GLTFLoader, tableState1_1);
    const tableInuse1 = useLoader(GLTFLoader, tableState1_2);
    const tableOccupied1 = useLoader(GLTFLoader, tableState1_3);
    const tableReserved1 = useLoader(GLTFLoader, tableState1_4);
    const Human1 = useLoader(GLTFLoader, human1);
    const Human3 = useLoader(GLTFLoader, human3);
    const [state1, setState] = useState('');
    console.log("data1: "+props.state);

    if (props.state === '3') {
        return (
            <>
                <primitive
                    object={tableReserved1.scene}
                    scale={4.5}
                    position={[-8, 3, -20]}
                    // children-0-castShadow
                />
            </>
        );
    } else if (props.state === '2') {
        return (
            <>
                <primitive
                    object={tableOccupied1.scene}
                    scale={4.5}
                    position={[-8, 3, -20]}
                    // children-0-castShadow
                />
                <primitive
                    object={Human1.scene}
                    scale={5}
                    position={[-8, -13, -20]}
                    // children-0-castShadow
                />
            </>
        );
    } else if (props.state === '1') {
        return (
            <>
                <primitive
                    object={tableInuse1.scene}
                    scale={5.5}
                    position={[-8, 3, -20]}
                    // children-0-castShadow
                />

                <primitive
                    object={Human1.scene}
                    scale={5}
                    position={[-19, -13, -15]}
                    // children-0-castShadow
                />
                <primitive
                    object={Human3.scene}
                    scale={5}
                    position={[-19, -13, -25]}
                    // children-0-castShadow
                />
            </>
        );
    } else if(props.state === '0') {
        return (
            <>
                <primitive
                    object={tableAvail1.scene}
                    scale={4.5}
                    position={[-8, 3, -20]}
                    // children-0-castShadow
                />
            </>
        );
    }
    else {
            return (
                <>
                    <primitive
                        object={tableAvail1.scene}
                        scale={4.5}
                        position={[-8, 3, -20]}
                        // children-0-castShadow
                    />
                </>
            );
        }
};