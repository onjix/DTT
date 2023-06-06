import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./MyPageList.css";

const MyPageList1 = () => {
  const [reservations, setReservations] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/reservations/time");
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
      <h2>매장 1</h2>
      {reservations.map((reservation) =>
        reservation.name === users ? (
          <div className="mypage-container">
            <table className="mypage-table">
              <thead>
                <tr>
                  <th>테이블 번호</th>
                  <th>날짜</th>
                  <th>시간</th>
                  <th>예약 인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reservation.tableN}</td>
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

export default MyPageList1;
