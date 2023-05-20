import React, { useState } from 'react';

const Signup = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 회원 가입 정보
        const userData = {
            id: id,
            password: password,
            name: name,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
        };

        try {
            // 서버로 회원 가입 요청 전송
            const response = await fetch('/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // 회원 가입 성공 처리
                console.log('회원 가입 성공');
            } else {
                // 회원 가입 실패 처리
                console.log('회원 가입 실패');
            }
        } catch (error) {
            console.log('오류 발생', error);
        }
    };

    return (
        <><h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="date"
                placeholder="생년월일"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <button type="submit">회원 가입</button>
        </form></>
    );
};

export default Signup;
