import {useEffect, useState} from "react";
import {socket} from "../libs/socket";
import Container from "./Container";
import {Line} from "react-chartjs-2";


export const GrafikSuhu = () => {


    const [suhuDataset, setSuhuDataset] = useState([])
    const calculateTempratures = (dataTempratures) => {
        const {createdAt, c, f} = dataTempratures
        const date = new Date()
        let x = {
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            c,
            f

        }

        let oldData = [...suhuDataset, x]
        if (oldData.length > 50) {
            oldData.splice(0, 10)
        }
        setSuhuDataset(oldData)
    }

    useEffect(() => {
        socket.on('suhu-sekarang', data => {
            calculateTempratures(data)
        })
        // console.log(suhuDataset)
    }, [suhuDataset])


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
                                    data: suhuDataset.map(item => item.c),
                                    fill: true,
                                    backgroundColor: 'rgba(130,154,251,0.2)',
                                    borderColor: 'rgb(92,78,251)',
                                },
                                // {
                                //     label: 'Suhu Farenheit',
                                //     data: suhuDataset.map(item => item.f),
                                //     fill: true,
                                //     backgroundColor: 'rgba(248,181,72,0.2)',
                                //     borderColor: 'rgb(251,162,78)',
                                // },

                            ],
                        }
                    }/>
            </Container>

        </>
    );
};