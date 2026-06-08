import {ModelScene} from "./Component/modal/ModelScene.tsx";
import {FindLinks} from "./Component/ui/FindLinks.tsx";
import {HeadingComponent} from "./Component/modal/HeadingComponent.tsx";
import {usePortFolioAudioPlayer, useStreamer} from "./Hooks/usePortFolioAudioPlayer.tsx";
import { useState} from "react";
import {LoadingPage} from "./LoadingPage.tsx";
//import {LoadingScreenBackground} from "./Background/LoadingScreenBackground.tsx";

function App(){
    const [entered, setEntered] = useState(false);
    const backgroundmusic = useStreamer("https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/Songs/backgroundmusic.mp4", entered);
    usePortFolioAudioPlayer({ portfolioAudio: "/Sounds/mouseclick.mp4" });

    function enterPortFolio(value: boolean){
        setEntered(value);
    }


    return (
        <div className="relative w-screen h-screen overflow-hidden">

            {/* Portfolio page layer */}
            <div className="absolute inset-0 z-0">
                <HeadingComponent audioRef={backgroundmusic} />
                <FindLinks />
                <ModelScene />
                <audio ref={backgroundmusic} controls className="hidden" />
            </div>

            {/* Loading overlay layer */}
            {!entered && (
                <div className="absolute inset-0 z-50">
                    <LoadingPage setTransition={enterPortFolio} />
                </div>
            )}

        </div>
    );
}

export default App
