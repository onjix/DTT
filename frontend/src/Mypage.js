import React, { useEffect, useState } from "react";
import Main from "./Main";
import { useCookies } from "react-cookie";

const Mypage = () => {
  const [reservations, setReservations] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  return (
    <>
      <Main />
      <div style={{ textAlign: "center" }}>
        <h2>{users}님의 예약현황입니다.</h2>
        {ReservationList()}
      </div>
    </>
  );
};

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations");
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
        console.log(reservations);
      } else {
        console.error("Failed to fetch reservations:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching reservations:", error);
    }
  };

  return (
    <>
      {reservations.map((reservation) =>
        reservation.name === users ? (
          <p key={reservation.id}>
            <span className="reservation-date">
              {reservation.reservationDate}
            </span>
            <span className="reservation-time">{reservation.time}</span>
            <span className="reservation-guests">
              {reservation.numOfGuests}인 예약
            </span>
          </p>
        ) : null
      )}
      {reservations.length === 0 && <p>No reservations</p>}
    </>
  );
};

export default Mypage;
