
import {useWindowContext} from "../../Context/useWindowContext.ts";
import {AdaptiveWindow} from "./AdaptiveWindow.tsx";
import {WindowHeader} from "./WindowSystem/WindowHeader.tsx";
import * as React from "react";


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
                          <AdaptiveWindow initialX={item.initialSizeX}
                                          initialY={item.initialSizeY}
                                          hashNumber={item.hash}
                                          key={item.hash}
                                          dock="top"
                                          headerSize="lg"
                                          windowHeight={180}
                                          windowWidth={280}
                                          headerComponent={ <WindowHeader
                                              hashParent={item.hash}
                                              dock={"top"}
                                          />}
                                          bodyComponent={null}
                          />
                        )

                }
                return null
            })}
             {/*//<Window/>*/}
        </div>
    );
};