// @flow
import * as React from 'react';
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";
import { BsCameraVideo } from "react-icons/bs";
import { TfiMouseAlt } from "react-icons/tfi";
import {type RefObject, useEffect, useState} from "react";
import {useCameraStore} from "../../Store/cameraStore.tsx";

// type UIMode = 'intro' | 'manual' | 'monitor';

interface LoadingPageProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    // onManualControl : (active: boolean)=> void;
    // cameraMode: UIMode;
}
export const LoadingPage: React.FC<LoadingPageProps> = ({audioRef}) => {
    const [isSpeakerActive, setisSpeakerActive] = useState<boolean>(true)
    const { cameraMode, setCamera } = useCameraStore();
   // const [isManualControl, setManualControl] = useState(false);
    const [CurrentTime, setCurrentTime] = useState<Date>(new Date())

    useEffect(() => {
        const interval = setInterval(()=>{
            setCurrentTime(new Date())
        },1000)
        return () => clearInterval(interval)
    }, []);

    const mute = () =>{
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    }

    const unmuted = () =>{
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    }
    return (
        <div className='flex flex-col  absolute top-1/12 left-15 gap-1.5 z-100 border-l-8 border-amber-200'>
            <div className='  intro_font   text-sm bg-white text-black px-3 w-fit border-l-8 border-amber-200'>
                BRANDON JABLASONE
            </div>
            <div className='intro_font text-sm bg-white text-black px-3 w-fit'> Aspiring Software Engineer</div>
            <div className='flex flex-row gap-1.5'>
                <div className='intro_font text-sm bg-white text-black px-3 w-fit'> {CurrentTime.toLocaleTimeString()}</div>
                <div className='intro_font text-sm bg-white text-black px-1 w-fit flex items-center justify-center  ' onClick={() => {setisSpeakerActive(!isSpeakerActive)}}>
                    {isSpeakerActive ? <GiSpeaker onClick={unmuted} />  :   <GiSpeakerOff onClick={mute}/> }
                </div>

                <div
                    className='intro_font text-sm bg-white text-black px-3 w-fit flex items-center justify-center'
                    onClick={() => {

                        if (cameraMode === 'manual') {
                            setCamera('intro');
                        } else {

                            setCamera('manual');
                        }
                    }}
                >

                    {cameraMode === 'manual' ? <TfiMouseAlt /> : <BsCameraVideo /> }
                </div>
            </div>


        </div>
    );
};