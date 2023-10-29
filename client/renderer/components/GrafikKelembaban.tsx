import Container from "./Container";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {socket} from "../libs/socket";

const GaugeComponent = dynamic(() => import('react-gauge-component'), {ssr: false});

export const GrafikKelembaban = () => {
    const [kelembaban, setKelembaban] = useState(0)
    useEffect(() => {
        socket.on('suhu-sekarang', data => {
            setKelembaban(data.h)
        })
    }, [])

    return (
        <Container className={'h-full basis-[40%]'}>
            <GaugeComponent
                value={kelembaban}
                type="radial"
                labels={{
                    tickLabels: {
                        type: "inner",
                        ticks: [
                            {value: 20},
                            {value: 40},
                            {value: 60},
                            {value: 80},
                            {value: 100}
                        ]
                    }
                }}
                arc={{
                    colorArray: ['#5BE12C', '#EA4228'],
                    subArcs: [{limit: 10}, {limit: 30}, {}, {}, {}],
                    padding: 0.02,
                    width: 0.3
                }}
                pointer={{
                    elastic: true,
                    animationDelay: 0
                }}
            />
        </Container>

    );
};