import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./Test.css";
const Test = () => {
  const dateNow = new Date();
  const todayDate = dateNow.toISOString().slice(0, 10);
  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState("");

  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const futureDate = oneWeekAgo.toISOString().split("T")[0];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      date: date,
      time: time,
      tableN: 1,
    };

    try {
      // 이미 예약된 데이터가 있는지 확인하는 요청
      const response = await fetch(
        `/api/reservations/check?date=${date}&time=${time}&tableN=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          // 이미 예약된 데이터가 있으면 예약할 수 없음을 알림
          alert("이미 예약된 시간입니다. 다시 시도해주십시오");
        } else {
          // 예약 정보 저장 요청
          const saveResponse = await fetch("/api/reservations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationData),
          });

          if (saveResponse.ok) {
            // 예약 정보 저장 성공 처리
            alert("예약 정보가 성공적으로 저장되었습니다.");
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
      <div>
        <div className="Predict-container">
          <h2 className="Predict-title">예측하기</h2>
        </div>
        <form className="Predict-form" onSubmit={handleFormSubmit}>
          <input
            className="Predict-input"
            type="date"
            value={date}
            min={todayDate}
            onChange={
              (e) =>
                setDate(
                  e.target.value >= todayDate && e.target.value <= futureDate
                    ? e.target.value
                    : todayDate
                )
              // setDate((e.target.value >= todayDate) && (e.target.value <=todayDate-) ? e.target.value : todayDate)
            }
          />
          <select
            className="Predict-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}>
            <option value="">시간 선택</option>
            {generateHourOptions()}
          </select>
          <button className="Predict-submit" type="submit">
            예측 하기
          </button>
        </form>
      </div>
    </>
  );
};
export default Test;
