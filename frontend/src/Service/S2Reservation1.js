import React, { useState } from "react";
import "./Reservation.css";
import { useCookies } from "react-cookie";
import App from "../App";
import S2ReservationList1 from "./S2ReservationList1";

const S2Reservation1 = () => {
  const dateNow = new Date();
  const todayDate = dateNow.toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState("");
  const [numOfGuests, setNumOfGuests] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const users = cookies.user;


  const moveRe = () => {
    window.location.reload();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      name: users,
      date: date,
      time: time,
      numOfGuests: numOfGuests,
      tableN: 1,
    };

    try {
      // 이미 예약된 데이터가 있는지 확인하는 요청
      const response = await fetch(`/2/api/reservations/check?date=${date}&time=${time}&tableN=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          // 이미 예약된 데이터가 있으면 예약할 수 없음을 알림
          alert("이미 예약된 시간입니다. 다시 시도해주십시오");
          moveRe();
        } else {
          // 예약 정보 저장 요청
          const saveResponse = await fetch("/2/api/reservations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationData),
          });

          if (saveResponse.ok) {
            // 예약 정보 저장 성공 처리
            alert("예약 정보가 성공적으로 저장되었습니다.");
            moveRe();
          } else {
            // 예약 정보 저장 실패 처리
            console.error("예약 정보 저장에 실패하였습니다.");
          }
        }
      } else {
        console.error("예약 정보 확인에 실패하였습니다.");
      }
    } catch (error) {
      console.error("예약 정보 처리 중 오류가 발생하였습니다.", error);
    }
  };

  const handleInputChange = (e) => {
    // 입력을 막기 위해 아무 작업도 하지 않습니다.
  };
  function generateHourOptions() {
    const options = [];
    const startTime = 11; // 시작 시간 (9시)
    const endTime = 20; // 종료 시간 (18시)

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute <= 59; minute += 60) {
        const formattedHour = hour.toString().padStart(2, "0"); // 시간을 2자리 숫자로 포맷팅
        const formattedMinute = minute.toString().padStart(2, "0"); // 분을 2자리 숫자로 포맷팅
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
      <App />
      <div className="RContent-container">
        <div className="RInner-container">
          <div className="reservation-container">
            <div className="reservation-form-container">
              <h2 className="reservation-form-heading">매장 2 Table 1 예약하기</h2>
              <form className="reservation-form" onSubmit={handleFormSubmit}>
                <input
                  className="reservation-input"
                  type="text"
                  placeholder={users}
                  value={users}
                  onChange={handleInputChange}
                  disabled
                />
                <input
                  className="reservation-input"
                  type="date"
                  value={date}
                  min={todayDate}
                  onChange={(e) =>
                    setDate(
                      e.target.value >= todayDate ? e.target.value : todayDate
                    )
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
            <S2ReservationList1 />
          </div>
        </div>
      </div>
    </>
  );
};
export default S2Reservation1;
