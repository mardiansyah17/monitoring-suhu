import Container from "./Container";
import {RiCelsiusLine, RiFahrenheitLine} from "react-icons/ri";
import {useEffect, useState} from "react";
import {socket} from "../libs/socket";

export const CurrentTemprature = () => {
    const [celcius, setCelcius] = useState(0)
    const [farenheit, setFarenheit] = useState(0)

    useEffect(() => {
        socket.on('suhu-sekarang', data => {
            setFarenheit(data.farenheit)
            setCelcius(data.celsius)
        })
    }, []);
    return (
        <>
            <Container>
                <div className={`flex justify-center items-center space-x-1`}>
                    <span>{celcius}</span>
                    <RiCelsiusLine/>
                </div>
            </Container>

            <Container>
                <div className={`flex justify-center items-center space-x-1`}>
                    <span>{farenheit}</span>
                    <RiFahrenheitLine/>
                </div>
            </Container>
        </>
    );
};