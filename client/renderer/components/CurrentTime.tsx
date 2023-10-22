import Container from "./Container";
import {BsClock} from "react-icons/bs";
import {useEffect, useState} from "react";
import {socket} from "../libs/socket";

export const CurrentTime = () => {
    const [time, setTime] = useState("00:00:00")

    function getTimeInHHMMSSFormat() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        

        const intervalId = setInterval(() => {
            setTime(getTimeInHHMMSSFormat());
        }, 1000); // Setiap 1 detik

        return () => {
            clearInterval(intervalId);
        }
    }, [time])

    return (
        <Container className={`h-36`}>
            <div className={`flex justify-center items-center space-x-3`}>
                <BsClock/>
                <span>{time}</span>
            </div>
        </Container>
    );
};