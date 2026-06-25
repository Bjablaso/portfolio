import { useMemo } from "react";
import { useWindowContext } from "../../Context/useWindowContext.ts";
import { AdaptiveWindow } from "./AdaptiveWindow.tsx";
import { WindowHeader } from "./WindowSystem/WindowHeader.tsx";
import Story from "../../assest/images/Story.png";
import { Google } from "./WindowSystem/Google.tsx";
import type {RunningWindow} from "../../Interfaces/WindowIteface.ts";
import {WindowControl} from "./WindowSystem/WindowControl.tsx";
import {EdgeTab} from "./WindowSystem/EdgeTab.tsx";

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
                        headerSize="sm"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        // zIndex={app.zIndex}
                        // isBackground={app.isBackground}
                        headerComponent={
                            <WindowHeader
                                hashParent={window.hash}
                                dock="top"
                                borderRadius="none"
                                control={
                                    <div className="flex w-full h-full items-center justify-center text-white p-1 gap-0.5 rounded-sm min-w-[40px] min-h-[16px]">
                                        <WindowControl
                                            hashParent={window.hash}
                                            direction="row"
                                        />
                                    </div>
                                }
                                headerBody={
                                <EdgeTab
                                    hashParent={window.hash}
                                    dock={"top"}
                                />
                                }
                                padding="none"
                            />
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
                        headerSize="lg"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        // zIndex={app.zIndex}
                        // isBackground={app.isBackground}

                        headerComponent={
                            <WindowHeader
                                hashParent={window.hash}
                                dock="left"
                                outerBgColor="#373a3c"
                                innerBgColor="#111111"
                                borderRadius="sm"
                                control={
                                        <WindowControl
                                            hashParent={window.hash}
                                            direction="row"
                                        />
                                }
                                headerBody={undefined}
                                padding="md"
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