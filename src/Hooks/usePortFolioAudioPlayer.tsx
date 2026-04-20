import {useEffect, useMemo, useRef} from "react";
import {modelClickStore} from "../Store/useModelClick.tsx";
//new Audio('public/Sounds/mouseclick.mp4')

type PropsAudio = {
    portfolioAudio : string
};

// // use instead of types
// interface AudioFile {
//     src : string
//     strartTime: number
//     volume : string
// }

//audion is playing interruption occur audion i push to the background interruption is over audion go to the foreground
/*
* function handle audio player for background song that is constantly playing full volume
* on interruption drop volume to 2 set sound to background
* once sound stop bring volume back up automaticalling nad contunue playing
* */
export const usePortFolioAudioPlayer= ({ portfolioAudio }: PropsAudio)=>{
    //"public/Sounds/mouseclick.mp4"
    const sound = useRef(usePreloadedAudio(portfolioAudio))
   // create a way to add  both sound

    useEffect(() => {

        const myMouseDown = () =>{
            sound.current.currentTime = 0
            sound.current.volume = 0.09
            sound.current.play()
            //console.log('clicking')
            // lower second sound
        }
        // an mouseUp functioon and icrease volume to what it should be
        document.addEventListener('mousedown', myMouseDown)

        // backgroundmusic.current?.play();
        // console.log(`audio streaming ${backgroundmusic.current}`)



        return () => {
           document.removeEventListener('mousedown', myMouseDown)

        }
    }, []);

    return null
}


function usePreloadedAudio(src: string) {
    const audio = useMemo(() => {
        const a = new Audio(src);
        a.preload = "auto"; // hint browser to fetch immediately
        a.load();           // force load now
        return a;
    }, [src]);

    return audio;
}

export function useStreamer(src: string, enabled: boolean) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current || !enabled) return;

        const audio = audioRef.current;
        audio.src = src;
        audio.preload = 'auto';
        audio.loop = true;
        audio.volume = 0.5;
        audio.load();

        audio.play().catch(err => console.warn("Playback failed:", err));


        const unsubscribe = modelClickStore.subscribe(() => {
            audio.muted = false;
        });

        return () => {
            unsubscribe();
            audio.pause();
            audio.src = "";
        };
    }, [src, enabled]); // ✅ re-runs when enabled flips to true

    return audioRef;
}

