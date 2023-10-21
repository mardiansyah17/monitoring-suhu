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
const Page = () => {
    const [time, setTime] = useState("00:00:00")
    const [celcius, setCelcius] = useState(0)
    const [farenheit, setFarenheit] = useState(0)
    const [tempratures, setTempratures] = useState([])
const [suhuDataset,setSuhuDataset] = useState([])
    function getTimeInHHMMSSFormat() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        socket.on('data-suhu', data => {
            console.log(data)
            setTempratures(data)
        })

        socket.on('suhu-sekarang',data=>{
            const {c,f} = data
            setCelcius(c)
           setFarenheit(f)
        })

        const groupedData = tempratures.reduce((result, item) => {
            const createdAt = new Date(item.createdAt);
            const minuteKey = `${createdAt.getMinutes()}`;
            if (!result[minuteKey]) {
                result[minuteKey] = [];
            }
            result[minuteKey].push(item);
            return result;
        }, {});


        const averageData = [];

        for (const minuteKey in groupedData) {
            const dataPerMinute = groupedData[minuteKey];
            const sum = dataPerMinute.reduce((total, item) => total + item.celsius, 0);
            const average = parseFloat((sum / dataPerMinute.length).toFixed(2));
            const createdAt = new Date(dataPerMinute[0].createdAt);
            const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;

          setSuhuDataset(state=>[...state,{
              time: formattedTime,
              average,
          }])
        }
        console.log(averageData)

        const intervalId = setInterval(() => {
            setTime(getTimeInHHMMSSFormat());
        }, 1000); // Setiap 1 detik

        return () => {
            clearInterval(intervalId);
        }
    }, [tempratures])


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
                {
                    suhuDataset.length > 0 ?

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
                                        labels: suhuDataset.map(item=>item.time),

                                        datasets: [
                                            {
                                                label: 'Suhu Celcius',
                                                data: suhuDataset.map(item=>item.average),
                                                fill: true,
                                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                                borderColor: 'rgb(255, 99, 132)',
                                            },

                                        ],
                                    }
                                }/>
                        </Container>:''
                }
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
