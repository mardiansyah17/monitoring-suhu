import {FC, ReactNode} from "react";

const Container: FC<ContainerProps> = ({children, className}) => {
    return (
        <div
            className={`bg-[#171821] flex flex-col justify-center shadow-md rounded-md p-3 w-full text-xl ${className}`}>
            {children}
        </div>
    );
};


interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default Container;