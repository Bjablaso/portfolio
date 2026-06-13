import {Window} from "./Window.tsx";
import {useWindowContext} from "../../Context/useWindowContext.ts";

export const DeskTopWorkSpace = () => {
    const {windowState} = useWindowContext();
    //
    return (
        <div className='flex flex-row w-full h-full border border-gray-950
        relative overflow-hidden
        '
        >
            {windowState.runningWindows.map((item)=>{
                if(item.isRunning){

                    return(
                            <Window
                                initialX={item.initialSizeX}
                                initialY={item.initialSizeY}
                                key={item.hash}
                                hashNumber={item.hash}
                            />
                        )

                }
                return null
            })}
             {/*//<Window/>*/}
        </div>
    );
};