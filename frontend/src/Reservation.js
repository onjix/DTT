import React, { useEffect, useState } from 'react';
const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('/api/reservations');
            if (response.ok) {
                const data = await response.json();
                setReservations(data);
            } else {
                console.error('Failed to fetch reservations:', response.status);
            }
        } catch (error) {
            console.error('Error while fetching reservations:', error);
        }
    };

    return (
        <div>
            <h2>Table1 예약 현황</h2>
            {reservations.length > 0 ? (
                <ul>
                    {reservations.map(reservation => (
                        <li key={reservation.id}>
                            <p>{reservation.reservationDate} {reservation.reservationTime} {reservation.numOfGuests}인 예약</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

const Reservation = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numOfGuests, setNumOfGuests] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const reservationData = {
            name: name,
            reservationDate: date,
            reservationTime: time,
            numOfGuests: numOfGuests
        };

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                // 예약 정보 저장 성공 처리
                console.log('예약 정보가 성공적으로 저장되었습니다.');
            } else {
                // 예약 정보 저장 실패 처리
                console.error('예약 정보 저장에 실패하였습니다.');
            }
        } catch (error) {
            console.error('예약 정보 저장 중 오류가 발생하였습니다.', error);
        }
    };



    return (
        <><h2>Table 1 예약하기</h2>
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <input
                type="number"
                placeholder="예약 인원"
                value={numOfGuests}
                onChange={(e) => setNumOfGuests(e.target.value)}
            />
            <button type="submit">예약 하기</button>
        </form>{ReservationList()}
    </>
    );

};
export default Reservation;

