import { useMemo } from "react";
import { useWindowContext } from "../../Context/useWindowContext.ts";
import { AdaptiveWindow } from "./AdaptiveWindow.tsx";
import { WindowHeader } from "./WindowSystem/WindowHeader.tsx";
import Story from "../../assest/images/Story.png";
import { Google } from "./WindowSystem/Google.tsx";
import type {RunningWindow} from "../../Interfaces/WindowIteface.ts";
import {WindowControl} from "./WindowSystem/WindowControl.tsx";
import * as React from "react";

export const DeskTopWorkSpace = () => {
    const { windowState, openApplication } = useWindowContext();
    const googleBody = useMemo(() => <Google />, []);

    /////////////////////////// Flat out array -. only keep active window/////////////

    const windowsToRender = windowState.runningApplication.flatMap(app =>
        (app.windowState?.runningWindows ?? [])
            .filter(window => window.isRunning)
            .map(window => ({
                app,
                window,
            }))
    );

    // const foregroundApp = windowState.runningApplication
    //     .filter(app => app.isActive && !app.isBackground)
    //     .sort((a, b) => b.zIndex - a.zIndex)[0];
    //
    // const runningWindows =
    //     foregroundApp?.windowState?.runningWindows ?? [];
    //
    // const edgeApp = windowState.runningApplication.find(
    //     app => app.applicationName === "Edge"
    // );
    //
    // const edgeRunningWindows =
    //     edgeApp?.windowState?.runningWindows ?? [];
    //
    // const edgeMaxWindow =
    //     edgeApp?.windowState?.maxWindow ?? 5;
    //
    // const openEdgeWindow = () => {
    //     if (edgeRunningWindows.length >= edgeMaxWindow) return;
    //
    //     dispatch({
    //         type: "CREATE_WINDOW",
    //         payload: { app: "Edge" }
    //     });
    // };
    const renderWindow = (window: RunningWindow) =>{
        switch (window.app) {
            case "Edge":
                return (
                    <AdaptiveWindow
                        key={window.hash}
                        initialX={window.initialSizeX}
                        initialY={window.initialSizeY}
                        hashNumber={window.hash}
                        // appName={app.applicationName}
                        dock="top"
                        headerSize="lg"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        // zIndex={app.zIndex}
                        // isBackground={app.isBackground}
                        headerComponent={
                            <WindowHeader
                                hashParent={window.hash}
                                dock="top"
                                control={
                                    <div className="flex w-full h-full items-center justify-center text-white p-1 gap-0.5 rounded-sm min-w-[40px] min-h-[16px]">
                                        <WindowControl
                                            hashParent={window.hash}
                                            direction="row"
                                        />
                                    </div>
                                }
                                headerBody={undefined}                            />
                        }
                        bodyComponent={googleBody}
                    />
                );

            case "Finder":
                return (
                    <AdaptiveWindow
                        key={window.hash}
                        initialX={window.initialSizeX}
                        initialY={window.initialSizeY}
                        hashNumber={window.hash}
                        // appName={app.applicationName}
                        dock="left"
                        headerSize="xl"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        // zIndex={app.zIndex}
                        // isBackground={app.isBackground}

                        headerComponent={
                            <WindowHeader
                                hashParent={window.hash}
                                dock="left"
                                control={undefined}
                                headerBody={undefined}
                            />
                        }
                        bodyComponent={null}
                    />
                )
            default:
                return <div> Not found</div>


        }

    }

    return (
        <div className="flex flex-row w-full h-full relative overflow-hidden">
            <div className="flex flex-col relative top-5 left-2 items-center">
                <img
                    src={Story}
                    alt="MyStory logo"
                    className="w-6 h-4 object-contain hover:opacity-70 cursor-pointer"
                    onClick={()=> openApplication("Edge", 280, 180)}
                />

                <span className="font-bold text-white leading-none mt-1 text-[0.4rem]">
                    MyStory
                </span>
            </div>

            {windowsToRender.map(({ window }) => (
                renderWindow(window)

            ))}
        </div>
    );
};


// import {useWindowContext} from "../../Context/useWindowContext.ts";
// import {AdaptiveWindow} from "./AdaptiveWindow.tsx";
// import {WindowHeader} from "./WindowSystem/WindowHeader.tsx";
// import Story from "../../../public/Story.png"
// import {Google} from "./WindowSystem/Google.tsx";
// import {useMemo} from "react";
//
//
// export const DeskTopWorkSpace = () => {
//     const {windowState, dispatch} = useWindowContext();
//     const googleBody = useMemo(() => <Google/>, []);
//
//     const activeApp = windowState.runningApplication.find(app => app.isActive)
//         ?? windowState.runningApplication[0];
//
//     const runningWindows = activeApp?.windowState?.runningWindows ?? [];
//     const maxWindow = activeApp?.windowState?.maxWindow ?? 5;
//
//     return (
//         <div className='flex flex-row w-full h-full
//         relative overflow-hidden
//         '
//         >
//             <div className="flex flex-col relative top-5 left-2 items-center">
//                 <img
//                     src={Story}
//                     alt="MyStory logo"
//                     className="w-6 h-4 object-contain hover:opacity-70"
//                    onClick={() => {
//                        if(runningWindows.length >= maxWindow){
//                            return;
//                        }else {
//                            dispatch({
//                                type: "CREATE_WINDOW",
//                                payload: {app: "Edge"}
//                            })
//                        }
//
//                    }}
//                 />
//
//                 <span className="font-bold text-white leading-none mt-1 text-[0.4rem]">
//                     MyStory
//                   </span>
//             </div>
//             {runningWindows.map((item)=>{
//                 if(item.isRunning){
//
//                     return(
//                           <AdaptiveWindow initialX={item.initialSizeX}
//                                           initialY={item.initialSizeY}
//                                           hashNumber={item.hash}
//                                           key={item.hash}
//                                           dock="top"
//                                           headerSize="lg"
//                                           windowHeight={180}
//                                           windowWidth={280}
//                                           headerComponent={ <WindowHeader
//                                               hashParent={item.hash}
//                                               dock={"top"}
//                                           />}
//                                           bodyComponent={googleBody}
//                           />
//                         )
//
//                 }
//                 return null
//             })}
//              {/*//<Window/>*/}
//         </div>
//     );
// };