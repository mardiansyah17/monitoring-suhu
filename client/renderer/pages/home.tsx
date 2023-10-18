import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import Container from "../components/Container";
import {BsClock} from "react-icons/bs";
import {RiCelsiusLine, RiFahrenheitLine} from "react-icons/ri";
import {Line} from "react-chartjs-2";
import dynamic from 'next/dynamic'
import {useEffect, useState} from "react";
import {socket} from "../libs/socket";

const Kelmbababan = dynamic(() => import('react-d3-speedometer'), {ssr: false});

var jamArray = [];
for (var jam = 0; jam < 24; jam++) {
    var jamFormat = (jam < 10) ? "0" + jam : jam.toString();
    jamArray.push(jamFormat + ":00");
}


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend);
// Halaman dashboard monirotring suhu
const Page = () => {
    const [time, setTime] = useState("00:00:00")
const [celcius,setCelcius] = useState(0)
const [farenheit,setFarenheit] = useState(0)
    socket.on('suhu-10-menit',data=>{
       console.log(data)
    })

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

        // Membersihkan interval saat komponen tidak lagi digunakan
        return () => clearInterval(intervalId);
    }, [time])

    const suhuCelsius = [22, 40, 24, 25, 26, 27, 28, 29, 18, 31, 32, 33,
        34, 35, 36, 37, 38, 39, 20, 41, 42, 43, 44, 22];

    function celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    const suhuFahrenheit = suhuCelsius.map(celsiusToFahrenheit);
    return (
        <div className={`h-screen flex flex-col p-3 gap-4`}>
            <div className={`flex justify-center basis-[30%] space-x-3 p-5 bg-[#21222D] `}>

                <Container className={`h-36`}>
                    <div className={`flex justify-center items-center space-x-3`}>
                        <BsClock/>
                        <span>{time}</span>
                    </div>
                </Container>

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


            </div>
            <div className={`basis-full flex items-center space-x-3 `}>
                <Container className={'h-full basis-[58%]'}>
                    {/*grafik suhu ruangan perhari satuan celcius dan fahrenheit*/}
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
                                labels: jamArray,

                                datasets: [
                                    {
                                        label: 'Suhu Celcius',
                                        data: suhuCelsius,
                                        fill: true,
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgb(255, 99, 132)',
                                    },
                                    {
                                        label: 'Suhu Fahrenheit',
                                        data: suhuFahrenheit,
                                        fill: true,
                                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                        borderColor: 'rgb(54, 162, 235)',
                                    },
                                ],
                            }
                        }/>
                </Container>
                <Container className={'h-full basis-[40%]'}>
                    <Kelmbababan
                        width={500}
                        value={450}

                        currentValueText="Tingkat kelembaban"
                        customSegmentLabels={[
                            {
                                text: 'Kering',
                                color: '#d8dee9',

                            },
                            {
                                text: 'Basah',
                                color: '#d8dee9',
                            },
                            {
                                text: 'Lembab',
                                color: '#d8dee9',
                            },
                            {
                                text: 'Sangat Lembab',
                                color: '#d8dee9',
                            },
                            {
                                text: 'Air',
                                color: '#d8dee9',
                            }
                        ]}
                    />
                </Container>
            </div>
        </div>

    );
};

export default Page;
