import React, { useEffect, useState } from "react";
import "./Predict.css"
const Predict = () => {
    const dateNow = new Date();
    const todayDate = dateNow.toISOString().slice(0, 10);
    const [date, setDate] = useState(todayDate);
    const [time, setTime] = useState("");
    const [table, setTable] = useState("");


    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const futureDate = oneWeekAgo.toISOString().split("T")[0];

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // 이미 예약된 데이터가 있는지 확인하는 요청
            const response = await fetch(
                `/reservation/data?date=${date}&time=${time}&tableN=${table}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                console.log("ok");

                const resultContainer = document.getElementById("resultContainer");
                resultContainer.innerText = data; // 결과 값을 텍스트로 삽입
            } else {
                console.log("error");
            }
        } catch (error) {
            console.error("오류가 발생하였습니다.", error);
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
                    <select
                        className="Predict-input"
                        value={table === "1" ? "table1" : "table2"}
                        onChange={(e) => {
                            const value = e.target.value === "table1" ? "1" : "2";
                            setTable(value);
                        }}
                    >
                        <option value="">테이블 선택</option>
                        <option value="table1">Table 1</option>
                        <option value="table2">Table 2</option>
                    </select>
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
            <div id="resultContainer"></div>

        </>
    );
};
export default Predict;