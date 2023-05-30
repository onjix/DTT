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
      <div className="MContent-container">
        <div className="MInner-container">
          <div style={{ textAlign: "center" }} className="M-container">
            <h2>{users}님의 예약현황입니다.</h2>
            {ReservationList()}
          </div>
        </div>
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
          <div className="mypage-container">
            <table className="mypage-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>시간</th>
                  <th>예약 인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reservation.date}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.numOfGuests}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null
      )}
      {reservations.length === 0 && <p>No reservations</p>}
    </>
  );
};
export default Mypage;
