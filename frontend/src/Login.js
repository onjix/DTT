import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './Login.css';
import Main from './Main';
import {useCookies} from "react-cookie";

const Login = ({onLoginSuccess}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] =useState('');
    const [cookies,setCookie]=useCookies(["user"]);
    const movePage = useNavigate();


    const moveHome = () => {
        movePage("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 로그인 요청을 서버에 보내는 코드
        // 예를 들어, fetch 또는 axios를 사용하여 백엔드 API와 통신

        // 서버로 전송할 데이터
        const data = {
            id: id,
            password: password,
        };

        try {
            // 서버로 회원 가입 요청 전송
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const name = await response.text();
                setName(name);
                setCookie("user",name,{path:"/"});
                console.log('로그인 성공. 이름:', name);
                moveHome()
            } else {
                console.log('실패');
                alert("로그인에 실패했습니다.");
                window.location.reload();
            }
        } catch (error) {
            console.log('오류 발생', error);
        }
    };

    return (
        <>
            <div class="form-container">
            <h2>로그인</h2>
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
                <button type="submit">로그인</button>
            </form>
        </div>
        </>
    );
};

export default Login;