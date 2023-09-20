import React, { useState } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import "./SelectStore.css";
import App from "./App";

function SelectStore() {
    const [selectedStore, setSelectedStore] = useState("");

    const handleStoreChange = (event) => {
        setSelectedStore(event.target.value);
    };

    const handlePlayDtt = () => {

    };

    return (
        <div>
            <App />
            <div className="top-section">
                <div className="top-section-text">전라남도</div>
                <div className="top-section-text">목포</div>
            </div>
            <div className="middle-section">
                <Select
                    className="select-dropdown"
                    value={selectedStore}
                    onChange={handleStoreChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        매장을 선택하세요
                    </MenuItem>
                    <MenuItem value="매장1">매장 1</MenuItem>
                    <MenuItem value="매장2">매장 2</MenuItem>
                </Select>
            </div>

            {selectedStore && (
                <div className="store-info">
                    <h2>{selectedStore} 정보</h2>
                    {selectedStore === "매장1" && (
                        <div>
                            <p>매장 주소: 전라남도, 목포</p>
                            <p>전화번호: 123-456-7890</p>
                            <p>운영 시간: 9:00 AM - 6:00 PM</p>
                            <Button variant="contained" onClick={handlePlayDtt}>
                                Play Dtt
                            </Button>
                        </div>
                    )}
                    {selectedStore === "매장2" && (
                        <div>
                            <p>매장 주소: 다른 주소</p>
                            <p>전화번호: 987-654-3210</p>
                            <p>운영 시간: 8:00 AM - 5:00 PM</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SelectStore;