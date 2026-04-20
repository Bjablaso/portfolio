import {ModelScene} from "./Component/modal/ModelScene.tsx";
import {FindLinks} from "./Component/ui/FindLinks.tsx";
import {PortFolioInfo} from "./Component/modal/PortFolioInfo.tsx";
import {usePortFolioAudioPlayer, useStreamer} from "./Hooks/usePortFolioAudioPlayer.tsx";
import { useState} from "react";

function App(){
    const [entered, setEntered] = useState(false);
    const backgroundmusic = useStreamer("https://bjablasowebportfoliobucket.s3.us-west-1.amazonaws.com/Songs/backgroundmusic.mp4", entered);
    usePortFolioAudioPlayer({ portfolioAudio: "/Sounds/mouseclick.mp4" });

    if (!entered) {
        return (
            <div className="splash" onClick={() => setEntered(true)}>
                <button>Enter Portfolio</button>
                {/*// ---> update later */}
            </div>
        );
    }


    return (
      <>
        <PortFolioInfo
            audioRef={backgroundmusic}

        />
          <FindLinks/>
          <ModelScene/>
          <audio ref={backgroundmusic} controls  className='hidden'/>
      </>

  )
}

export default App
