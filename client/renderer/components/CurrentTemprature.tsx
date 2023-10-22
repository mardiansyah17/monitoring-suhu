import Container from "./Container";
import {RiCelsiusLine, RiFahrenheitLine} from "react-icons/ri";
import {useState} from "react";

export const CurrentTemprature = () => {
    const [celcius, setCelcius] = useState(0)
    const [farenheit, setFarenheit] = useState(0)
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