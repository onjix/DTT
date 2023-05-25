import React, { useEffect, useState } from "react";
import Main from "./Main";
import { useCookies } from "react-cookie";
import "./Mypage.css";

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
      <div className="mypage-container">
        {reservations.length > 0 ? (
          <table className="mypage-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>시간</th>
                <th>예약 인원</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.numOfGuests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>예약 정보가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default Mypage;
