import Container from "./Container";
import dynamic from "next/dynamic";

const Kelmbababan = dynamic(() => import('react-d3-speedometer'), {ssr: false});

export const GrafikKelembaban = () => {
    return (
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

    );
};