// import { LuBox } from "react-icons/lu";
// import {loadingDataInstruction} from './assest/json/LoadingScreen.tsx'

import * as React from "react";
import {LoadingScreenBackground} from "./Background/LoadingScreenBackground.tsx";
import {CustomCursor} from "./CustomCursor.tsx";
import {useProgress} from "@react-three/drei";


interface LoadingPageProps {
      setTransition: (value: boolean) => void;
}

interface ProgressBarProps{
    progress: number;
}
interface LoaderProps {
    setLoadingCompleted: (value: boolean) => void;
}

const ProgressBar: React.FC<ProgressBarProps>  =({progress})=>{
    return (
        <div className="flex flex-row h-6/12 w-5/12  rounded-md bg-gray-500">
            <div className="flex flex-row  h-ful  bg-white text-black justify-end pr-2
                    transition-all
                    duration-500
                    ease-in-out "
                 style={{width:`${progress}%`}}
            />


        </div>
    )
}

const Loader:React.FC<LoaderProps> = ({ setLoadingCompleted }) => {
        const { progress } = useProgress();
        const formattedProgress = progress.toFixed(2);

        React.useEffect(() => {
            if (progress >= 100) {
                setTimeout(() => {
                    console.log("Done!");
                }, 2000); // 2 seconds

                setLoadingCompleted(true);
            }
        }, [progress, setLoadingCompleted]);

        return (
            <div className="w-full h-full">
                <div className="grid grid-rows-[47%_6%_47%] w-full h-full">
                    <div></div>

                    <div className="flex flex-col w-full h-full text-white items-center justify-center">
                        <div className="flex w-full flex-1 items-center justify-center">
                            <ProgressBar progress={Number(formattedProgress)} />
                        </div>

                        <div className="flex w-full flex-1 items-center justify-center text-center">
                            <span>{formattedProgress}% Complete</span>
                        </div>
                    </div>

                    <div></div>
                </div>
            </div>
        );
    };

export const LoadingPage: React.FC<LoadingPageProps> = ({setTransition}) => {
    //set loadingComplete when loading progress reach 100%

    const [loadingCompleted, setLoadingCompleted] = React.useState(false);

     function nextHandler(){
         setTransition(true)
     }
    return (
        <div className="flex w-full h-full cursor-none z-20">
            <CustomCursor/>
            {
                loadingCompleted ?
                    <div className="absolute inset-0 flex flex-row  font-monospace">

                        {/* Left side */}
                        <div className="w-1/2 h-full bg-[linear-gradient(15deg,#101010_0%,#252525_100%)]
                         text-white flex items-center justify-center">
                            <div className="flex flex-col gap-10 items-center">
                                <h1 className="font-bold text-xl">Brandon Jablasone PortFolio @2025</h1>
                                <p className="text-md">Click Open to continue</p>

                                <button
                                    className="border-b-2 border-white hoverable"
                                    onClick={nextHandler}
                                >
                                    Open here
                                </button>

                            </div>
                        </div>

                        {/* Right side */}
                        <div className="w-1/2 h-full bg-[linear-gradient(15deg,#ffffff_0%,#faf7f2_100%)] text-black flex items-center justify-center">
                            <div className="flex flex-col gap-10 items-center">
                                <h1 className="font-bold text-xl">Brandon Jablasone PortFolio @2025</h1>
                                <p className="text-md">Click Open to continue</p>

                                <button
                                    className="border-b-2 border-black hoverable"
                                    onClick={nextHandler}
                                >
                                    Open here
                                </button>
                            </div>
                        </div>

                    </div>:
                    <LoadingScreenBackground>
                        <Loader setLoadingCompleted={setLoadingCompleted}/>
                    </LoadingScreenBackground>

            }
        </div>

    )

}
