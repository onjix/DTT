import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const S1ReservationList2 = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      if (!selectedDate) {
        setReservations([]); // 선택한 날짜가 없을 경우 빈 배열로 초기화
        return;
      }

      const response = await fetch(
        `/reservations/date?date=${selectedDate}&tableN=2`
      );
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error("Failed to fetch reservations:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching reservations:", error);
    }
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };
  const renderDateOptions = () => {
    const today = new Date();
    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 현재 날짜로부터 일주일 뒤의 날짜

    const dateOptions = [];
    let currentDate = new Date(today.getTime());
    while (currentDate <= weekLater) {
      const date = currentDate.toISOString().split("T")[0];
      dateOptions.push(
        <option key={date} value={date}>
          {date}
        </option>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateOptions;
  };
  return (
    <div className="reservation-list-container">
      <h2>날짜 선택</h2>
      <select
        className="date-select"
        value={selectedDate}
        onChange={handleDateChange}>
        <option value="">날짜를 선택해주세요</option>
        {renderDateOptions()}
      </select>
      <div className="reservation-info">
        <h3 className="info">예약 정보</h3>
        {reservations.length === 0 ? (
          <p>예약 정보가 없습니다.</p>
        ) : (
          <table className="reservation-table">
            <thead>
              <tr>
                <th>테이블 번호</th>
                <th>날짜</th>
                <th>시간</th>
                <th>예약 인원</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>Table{reservation.tableN}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.numOfGuests}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">예약 정보가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default S1ReservationList2;
