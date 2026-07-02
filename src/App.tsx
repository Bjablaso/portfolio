import {ModelScene} from "./Component/modal/ModelScene.tsx";
import {FindLinks} from "./Component/ui/FindLinks.tsx";
import {HeadingComponent} from "./Component/modal/HeadingComponent.tsx";
import {usePortFolioAudioPlayer, useStreamer} from "./Hooks/usePortFolioAudioPlayer.tsx";
import { useState} from "react";
import {LoadingPage} from "./LoadingPage.tsx";
import { useMonitorInteractionStore } from "./Store/monitorInteractionStore";
//import {LoadingScreenBackground} from "./Background/LoadingScreenBackground.tsx";

function App(){
    const [entered, setEntered] = useState(false);
    const backgroundmusic = useStreamer("https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/Songs/backgroundmusic.mp4", entered);
    usePortFolioAudioPlayer({ portfolioAudio: "/Sounds/mouseclick.mp4" });

    // isHovered is only ever true while cameraMode === 'monitor' AND the
    // pointer is over the screen (see Model.tsx's handlePointerEnter,
    // which gates on `isInteractive`), so this alone is sufficient to
    // know "the user is hovering the monitor" without also checking
    // cameraMode here.
    const { isHovered: isMonitorHovered } = useMonitorInteractionStore();

    function enterPortFolio(value: boolean){
        setEntered(value);
    }


    return (
        <div className="relative w-screen h-screen overflow-hidden">

            {/* Portfolio page layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className={`transition-opacity duration-300 ${
                        isMonitorHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                    <HeadingComponent audioRef={backgroundmusic} />
                </div>
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



// import {ModelScene} from "./Component/modal/ModelScene.tsx";
// import {FindLinks} from "./Component/ui/FindLinks.tsx";
// import {HeadingComponent} from "./Component/modal/HeadingComponent.tsx";
// import {usePortFolioAudioPlayer, useStreamer} from "./Hooks/usePortFolioAudioPlayer.tsx";
// import { useState} from "react";
// import {LoadingPage} from "./LoadingPage.tsx";
// //import {LoadingScreenBackground} from "./Background/LoadingScreenBackground.tsx";
//
// function App(){
//     const [entered, setEntered] = useState(false);
//     const backgroundmusic = useStreamer("https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/Songs/backgroundmusic.mp4", entered);
//     usePortFolioAudioPlayer({ portfolioAudio: "/Sounds/mouseclick.mp4" });
//
//     function enterPortFolio(value: boolean){
//         setEntered(value);
//     }
//
//
//     return (
//         <div className="relative w-screen h-screen overflow-hidden">
//
//             {/* Portfolio page layer */}
//             <div className="absolute inset-0 z-0">
//                 <HeadingComponent audioRef={backgroundmusic} /> {/* HIDE THIS ON WHEN WE GET CLOSER TO MONITOR*/}
//                 <FindLinks />
//                 <ModelScene />
//                 <audio ref={backgroundmusic} controls className="hidden" />
//             </div>
//
//             {/* Loading overlay layer */}
//             {!entered && (
//                 <div className="absolute inset-0 z-50">
//                     <LoadingPage setTransition={enterPortFolio} />
//                 </div>
//             )}
//
//         </div>
//     );
// }
//
// export default App
