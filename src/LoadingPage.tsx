// import { LuBox } from "react-icons/lu";
import {loadingDataInstruction} from './assest/json/LoadingScreen.tsx'

import * as React from "react";
import {LoadingScreenBackground} from "./Background/LoadingScreenBackground.tsx";
import {CustomCursor} from "./CustomCursor.tsx";
interface LoadingPageProps {
      setTransition: (value: boolean) => void;
}
interface LoadingContainerHereProps {
    title: string;
    description: string;
    id: number;
    cube: React.ReactNode;

}
interface ProgressBarContainerData {
    title: string;
    subtitle: string;
    progressing: number;
}

interface ProgressBarProps{
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps>  =({progress})=>{
    return (
        <div className="flex flex-row h-6/12 w-5/12  rounded-3xl bg-gray-500">
            <div className="flex flex-row  h-ful rounded-3xl bg-white text-black justify-end pr-2
                    transition-all
                    duration-500
                    ease-in-out "
                 style={{width:`${progress}%`}}
            />


        </div>
    )
}
const ProgressBarContainer: React.FC<ProgressBarContainerData> = ({title, subtitle, progressing = 0})=>{


    return (
        <div className="flex flex-col w-full h-full text-white items-center justify-center">
            <div className="flex w-full flex-1 items-center justify-center text-center font-bold tracking-wider text-4xl">
                {title}
            </div>
            <div className="flex w-full flex-1 items-center justify-center text-center text-base">
                {subtitle}
            </div>
            <div className="flex w-full flex-1 items-center justify-center">
                <ProgressBar progress={0} />
            </div>
            <div className="flex w-full flex-1 items-center justify-center text-center">
                <span> {progressing}% Complete</span>

            </div>

        </div>
    )
}

const LoadingContainerHere: React.FC<LoadingContainerHereProps> = ({
                                                                       title,
                                                                       description,
                                                                        id,
                                                                        cube

                                                                   }) => {
    return (
        <div
            key={id}
            className="grid grid-cols-[35%_65%] w-full h-full items-center gap-3 p-2 overflow-hidden"
        >
            <div className="flex w-full items-center justify-center  max-w-[72px]
             aspect-square rounded-full bg-gray-500 text-white overflow-hidden

            ">
                <div className="inline-flex w-full h-full  items-center justify-center">
                    {cube}
                </div>

            </div>

            <div className="flex flex-col justify-center w-full h-full min-w-0 overflow-hidden text-white gap-2">
                <div className="font-medium leading-tight text-[clamp(0.75rem,1.2vw,1rem)] truncate">
                    {title}
                </div>

                <div className="leading-snug text-[clamp(0.65rem,1vw,0.875rem)] break-words overflow-hidden text-gray-300 ">
                    {description}
                </div>
            </div>
        </div>
    );
};

const LoadingPageContent = ()=>{
    return (
        <div className="grid grid-rows-[40%_60%] w-full h-full ">
            <div></div>
            <div className=" grid grid-rows-[45%_8%_25%_32%] w-full h-full ">
                {/*// <!-- Bring to bottom leaving space ahead -->*/}
                <div>
                    <ProgressBarContainer title={loadingDataInstruction.loadingScreen.title}
                                          subtitle={loadingDataInstruction.loadingScreen.subtitle}
                                          progressing={0}
                    />

                </div>
                <div className="text-gray-300 relative left-8 top-5 pt-5">WHAT'S HAPPENING </div>
                <div className="grid grid-cols-5 justify-center items-center p-6  gap-2">
                    {/*<div className="grid grid-cols-5 w-full h-full ">*/}
                    {loadingDataInstruction.loadingScreen.steps.map((step)=>
                        (<LoadingContainerHere description={step.description} title={step.title} id={step.id} cube={step.icon}/>)
                    )}

                </div>
                <div></div>
            </div>
        </div>
    )
}
export const LoadingPage: React.FC<LoadingPageProps> = ({setTransition}) => {
    //set loadingComplete when loading progress reach 100%
    const [loadingCompleted, setLoadingCompleted] = React.useState(true);

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
                                    onClick={() => setTransition(true)}
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
                                    onClick={() => setTransition(true)}
                                >
                                    Open here
                                </button>
                            </div>
                        </div>

                    </div>:
                    <LoadingScreenBackground>
                        <LoadingPageContent/>
                    </LoadingScreenBackground>

            }
        </div>

    )

}
