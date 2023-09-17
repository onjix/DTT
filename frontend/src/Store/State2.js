import React, {useEffect, useState} from "react";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import tableState2_1 from "../images/Signs/available2.glb";
import tableState2_2 from "../images/Signs/inuse2.glb";
import tableState2_3 from "../images/Signs/occupied2.glb";
import tableState2_4 from "../images/Signs/reserved2.glb";
import human2 from "../images/Human/Human1-2.glb";

export const State2 = () => {
    const [reservations2, setReservations2] = useState([]);
    const tableAvail2 = useLoader(GLTFLoader, tableState2_1);
    const tableInuse2 = useLoader(GLTFLoader, tableState2_2);
    const tableOccupied2 = useLoader(GLTFLoader, tableState2_3);
    const tableReserved2 = useLoader(GLTFLoader, tableState2_4);
    const Human2 = useLoader(GLTFLoader, human2);
    // const Human3 = useLoader(GLTFLoader, human3);
    const [state2, setState2] = useState('');
    const eventSource = new EventSource("/sse/listen");

    useEffect(() => {

        eventSource.onopen = function() {
            console.log("connect");
        }

        eventSource.onmessage = (event) => {
            console.log("Received event:", event.data);
            setState2(event.data);
        }
        // 컴포넌트가 언마운트될 때 EventSource를 닫습니다.
        return () => {
            eventSource.close();
        };
    }, []);


    // const fetchData2 = async () => {
    //   try {
    //     const response1 = await fetch("/table/1/2/status");
    //     const data1 = await response1.json();
    //     setState2(data1);
    //
    //     const response2 = await axios.get("/reservations/time");
    //     if (response2.status === 200) {
    //       const data2 = response2.data;
    //       setReservations2(data2);
    //
    //       const today = new Date();
    //       reservations2.forEach((reservation) => {
    //         if (reservation.date === today) {
    //           setState2(4);
    //         }
    //       });
    //       console.log(reservations2);
    //     } else {
    //       console.error("Failed to fetch reservations:", response2.status);
    //     }
    //   } catch (error) {
    //     console.log("에러:", error);
    //   }
    // };


    if (state2 === '3') {
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
    } else if (state2 === '2') {
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
    } else if (state2 === '1') {
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