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
import {GrafikSuhu} from "../components/GrafikSuhu";
import {CurrentTime} from "../components/CurrentTime";
import {CurrentTemprature} from "../components/CurrentTemprature";
import {GrafikKelembaban} from "../components/GrafikKelembaban";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend);
const Page = () => {


    return (
        <div className={`h-screen flex flex-col p-3 gap-4`}>
            <div className={`flex justify-center basis-[30%] space-x-3 p-5 bg-[#21222D] `}>
                <CurrentTime/>
                <CurrentTemprature/>
            </div>
            <div className={`basis-full flex items-center space-x-3 `}>
                <GrafikSuhu/>
                <GrafikKelembaban/>
            </div>
        </div>

    );
};

export default Page;
