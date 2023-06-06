import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import App from "../App";
import "./MypageInfo.css";

const MypageInfo = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const movePage = useNavigate();
    const [cookies, setCookie] = useCookies(["user"]);
    const [cookies2, setCookie2] = useCookies(["userId"]);
    const users = cookies.user;
    const userId=cookies2.userId;



    const moveHome = () => {
        movePage("/");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 회원 가입 정보
        const userData = {
            id: userId,
            password: password,
            name: users,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
        };

        try {
            // 서버로 회원 가입 요청 전송
            const response = await fetch("/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // 회원 가입 성공 처리s
                console.log("회원 가입 성공");
                {
                    moveHome();
                }
            } else {
                // 회원 가입 실패 처리
                console.log("회원 가입 실패");
                alert("정보 수정에 실패했습니다.");
                window.location.reload();
            }
        } catch (error) {
            console.log("오류 발생", error);
        }
    };

    return (
        <>
            <App />
            <div className="Info-container">
                <div className="InfoInner-container">
                    <div className="InfoParent-container">
                        <div className="InfoForm-container">
                            <h2>개인 정보 수정</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={userId}
                                    onChange={(e) => setId(e.target.value)}
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="이름"
                                    value={users}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                <button type="submit">수정 하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MypageInfo;
