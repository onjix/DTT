import React, { useEffect, useState } from "react";
import Main from "./Main";
import "./ReservationList.css";
import "./Reservation.css";
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
      } else {
        console.error("Failed to fetch reservations:", response.status);
      }
    } catch (error) {
      console.error("Error while fetching reservations:", error);
    }
  };

  return (
      <div className="reservation-list-container">
        <h2 className="reservation-list-heading">Table1 예약 현황</h2>
        {reservations.length > 0 ? (
            <ul className="reservation-list">
              {reservations.map((reservation) => (
                  <li className="reservation-item" key={reservation.id}>
                    <p className="reservation-info">
                      <span className="reservation-date">{reservation.reservationDate}</span>
                      <span className="reservation-time">{reservation.time}</span>
                      <span className="reservation-guests">{reservation.numOfGuests}인 예약</span>
                    </p>
                  </li>
              ))}
            </ul>
        ) : (
            <p className="no-reservations">No reservations found.</p>
        )}
      </div>
  );
};

const Reservation = () => {
  const dateNow = new Date();
  const todayDate = dateNow.toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState("");
  const [numOfGuests, setNumOfGuests] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      name: name,
      reservationDate: date,
      time: time,
      numOfGuests: numOfGuests,
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // 예약 정보 저장 성공 처리
        console.log("예약 정보가 성공적으로 저장되었습니다.");


      } else {
        // 예약 정보 저장 실패 처리
        console.error("예약 정보 저장에 실패하였습니다.");
        console.log(time);
      }
    } catch (error) {
      console.error("예약 정보 저장 중 오류가 발생하였습니다.", error);
    }
  };
  function generateHourOptions() {
    const options = [];
    const startTime = 9; // 시작 시간 (9시)
    const endTime = 18; // 종료 시간 (18시)

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute <= 59; minute +=60) {
        const formattedHour = hour.toString().padStart(2, '0'); // 시간을 2자리 숫자로 포맷팅
        const formattedMinute = minute.toString().padStart(2, '0'); // 분을 2자리 숫자로 포맷팅
        const time = `${formattedHour}:${formattedMinute}`;
        options.push(
            <option key={time} value={time}>
              {time}
            </option>
        );
      }
    }

    return options;
  }


  return (
    <>
      <Main />
      <div className="reservation-form-container">
        <h2 className="reservation-form-heading">Table 1 예약하기</h2>
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <input
              className="reservation-input"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <input
              className="reservation-input"
              type="date"
              value={date}
              min={todayDate}
              onChange={(e) =>
                  setDate(e.target.value >= todayDate ? e.target.value : todayDate)
              }
          />
          <select
              className="reservation-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}>
            <option value="">시간 선택</option>
            {generateHourOptions()}

          </select>


          <input
              className="reservation-input"
              type="number"
              placeholder="예약 인원"
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)}
          />
          <button className="reservation-submit" type="submit">
            예약 하기
          </button>
        </form>
      </div>
      {ReservationList()}
    </>
  );
};
export default Reservation;
