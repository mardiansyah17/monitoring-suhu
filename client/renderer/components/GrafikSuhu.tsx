import {useEffect, useState} from "react";
import {socket} from "../libs/socket";
import Container from "./Container";
import {Line} from "react-chartjs-2";

export const GrafikSuhu = () => {
    const [suhuDataset, setSuhuDataset] = useState([])
    const calculateTempratures = (dataTempratures) => {
        const {createdAt, celsius, farenheit} = dataTempratures
        const date = new Date(createdAt)
        dataTempratures = {
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            celsius,
            farenheit

        }
        let oldData = [...suhuDataset, dataTempratures]
        if (oldData.length > 50) {
            oldData.splice(0, 10)
        }
        setSuhuDataset(oldData)
    }

    useEffect(() => {
        socket.on('suhu-sekarang', data => {
            calculateTempratures(data)
        })
        console.log(suhuDataset)
    }, [suhuDataset])

    if (suhuDataset.length == 0) {
        return null
    }

    return (
        <>

            <Container className={'h-full basis-[58%]'}>

                <Line
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top' as const,
                            },
                            title: {
                                display: true,
                                text: "Suhu ruangan perhari",
                            },

                        },
                        showLine: true,

                    }}
                    data={
                        {

                            // label perjam
                            labels: suhuDataset.map(item => item.time),

                            datasets: [
                                {
                                    label: 'Suhu Celcius',
                                    data: suhuDataset.map(item => item.celsius),
                                    fill: true,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgb(255, 99, 132)',
                                },

                            ],
                        }
                    }/>
            </Container>

        </>
    );
};