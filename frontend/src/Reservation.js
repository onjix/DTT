import React, { useEffect, useState } from "react";
import Main from "./Main";
import "./ReservationList.css";
import "./Reservation.css";
import axios from "axios";
import {useCookies} from "react-cookie";
const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchReservations();
    }, [selectedDate]);

    const fetchReservations = async () => {
        try {
            if (!selectedDate) {
                setReservations([]); // 선택한 날짜가 없을 경우 빈 배열로 초기화
                return;
            }

            const response = await fetch(`/reservations/date?date=${selectedDate}`);
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
            const date = currentDate.toISOString().split('T')[0];
            dateOptions.push(
                <option key={date} value={date}>
                    {date}
                </option>
            );
            currentDate.setDate(currentDate.getDate()+1);
        }

        return dateOptions;
    };

    return (
        <div className="reservation-list-container">
            <h2>날짜 선택</h2>
            <select className="date-select" value={selectedDate} onChange={handleDateChange}>
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
                            <th>날짜</th>
                            <th>시간</th>
                            <th>예약 인원</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <tr key={reservation.id}>
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

const Reservation = () => {
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
      }
    } catch (error) {
      console.error("예약 정보 저장 중 오류가 발생하였습니다.", error);
    }
  };
    /*useEffect(() => {
        // 쿠키에서 이름을 가져와서 name 상태를 설정합니다.
        const cookieName = getCookie('name');
        setName(cookieName);
    }, []);
    const getCookie = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    };
*/
    const handleInputChange = (e) => {
        // 입력을 막기 위해 아무 작업도 하지 않습니다.
    };
  function generateHourOptions() {
    const options = [];
    const startTime = 9; // 시작 시간 (9시)
    const endTime = 18; // 종료 시간 (18시)

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
      <Main />
      <div className="reservation-container">
        <div className="reservation-form-container">
          <h2 className="reservation-form-heading">Table 1 예약하기</h2>
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
            <button
              className="reservation-submit"
              type="submit"
              onClick={moveRe}>
              예약 하기
            </button>
          </form>
        </div>
        {ReservationList()}
      </div>
    </>
  );
};
export default Reservation;
