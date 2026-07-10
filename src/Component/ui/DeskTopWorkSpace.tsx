import {
    useMemo,
    useRef,
    useState,
} from "react";

import { useWindowContext } from "../../Context/useWindowContext.ts";
import { AdaptiveWindow } from "./AdaptiveWindow.tsx";
import { WindowHeader } from "./WindowSystem/WindowHeader.tsx";
import { WindowControl } from "./WindowSystem/WindowControl.tsx";
import { EdgeTab } from "./WindowSystem/EdgeTab.tsx";
import { FinderControlBody } from "./WindowSystem/FinderControlBody.tsx";
import { FinderBody } from "./WindowSystem/FinderBody.tsx";
import { SearchBarBody } from "./WindowSystem/SearchBarBody.tsx";
import { Google } from "./WindowSystem/Google.tsx";

import { PortfolioApp } from "@brandon/embedded-webpage";

import Story from "../../assest/images/Story.png";

import type {
    WindowState,
} from "../../Interfaces/WindowIteface.ts";

export const DeskTopWorkSpace = () => {
    const {
        windowState,
        moveWindowToFront,
        openApplication,
    } = useWindowContext();

    const boundaryRef = useRef<HTMLDivElement | null>(null);

    const googleBody = useMemo(
        () => <Google />,
        []
    );

    const portfolioBody = useMemo(
        () => <PortfolioApp />,
        []
    );

    const [finderBody, setFinderBody] =
        useState<string>("");

    /**
     * Map values are already in stack order.
     *
     * First entry = background.
     * Last entry = foreground.
     */
    const windowsToRender = Array.from(
        windowState.openAppWindow.values()
    ).filter(window => !window.isClosed);

    function changeFinderBody(name: string): void {
        setFinderBody(name);
    }

    function renderWindow(window: WindowState) {
        switch (window.app) {
            case "Chrome":
                return (
                    <AdaptiveWindow
                        key={window.id}
                        boundaryRef={boundaryRef}
                        initialX={window.initalPositonX}
                        initialY={window.initalPositonY}
                        windowID={window.id}
                        dock="top"
                        headerSize="lg"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        onMouseDown={() =>
                            moveWindowToFront(window.id)
                        }
                        headerComponent={
                            <WindowHeader
                                windowID={window.id}
                                dock="top"
                                borderRadius="none"
                                control={
                                    <div className="flex w-full h-full items-center justify-center text-white p-1 gap-0.5 rounded-sm min-w-[40px] min-h-[16px]">
                                        <WindowControl
                                            windowID={window.id}
                                            direction="row"
                                        />
                                    </div>
                                }
                                headerBody={
                                    <EdgeTab
                                        windowID={window.id}
                                        dock="top"
                                    />
                                }
                                searchBarBody={
                                    <SearchBarBody />
                                }
                                padding="none"
                            />
                        }
                        bodyComponent={
                            window.chromePage === "portfolio"
                                ? portfolioBody
                                : googleBody
                        }
                    />
                );

            case "Finder":
                return (
                    <AdaptiveWindow
                        key={window.id}
                        boundaryRef={boundaryRef}
                        initialX={window.initalPositonX}
                        initialY={window.initalPositonY}
                        windowID={window.id}
                        dock="left"
                        headerSize="xl"
                        windowHeight={window.windowHeight}
                        windowWidth={window.windowWidth}
                        onMouseDown={() =>
                            moveWindowToFront(window.id)
                        }
                        headerComponent={
                            <WindowHeader
                                windowID={window.id}
                                dock="left"
                                borderRadius="sm"
                                control={
                                    <WindowControl
                                        windowID={window.id}
                                        direction="row"
                                    />
                                }
                                headerBody={
                                    <FinderControlBody
                                        onChange={
                                            changeFinderBody
                                        }
                                    />
                                }
                                searchBarBody={null}
                                padding="md"
                            />
                        }
                        bodyComponent={
                            <FinderBody
                                name={finderBody}
                            />
                        }
                    />
                );

            default:
                return null;
        }
    }

    return (
        <div
            ref={boundaryRef}
            className="flex flex-row w-full h-full relative overflow-hidden"
        >
            <div className="flex flex-col relative top-5 left-2 items-center">
                <img
                    src={Story}
                    alt="MyStory logo"
                    className="w-6 h-4 object-contain hover:opacity-70 cursor-pointer"
                    onClick={() =>
                        openApplication(
                            "Chrome",
                            380,
                            220,
                            "portfolio"
                        )
                    }
                />

                <span className="font-bold text-white leading-none mt-1 text-[0.4rem]">
                    MyStory
                </span>
            </div>

            {windowsToRender.map(window =>
                renderWindow(window)
            )}
        </div>
    );
};



// import { useMemo, useRef, useState } from "react";
// import { useWindowContext } from "../../Context/useWindowContext.ts";
// import { AdaptiveWindow } from "./AdaptiveWindow.tsx";
// import { WindowHeader } from "./WindowSystem/WindowHeader.tsx";
// import Story from "../../assest/images/Story.png";
// import { Google } from "./WindowSystem/Google.tsx";
// import type { RunningWindow } from "../../Interfaces/WindowIteface.ts";
// import { WindowControl } from "./WindowSystem/WindowControl.tsx";
// import { EdgeTab } from "./WindowSystem/EdgeTab.tsx";
// import { FinderControlBody } from "./WindowSystem/FinderControlBody.tsx";
// import { FinderBody } from "./WindowSystem/FinderBody.tsx";
// import { SearchBarBody } from "./WindowSystem/SearchBarBody.tsx";
// import { PortfolioApp } from "@brandon/embedded-webpage";
// // import "@brandon/embedded-webpage/style.css";
//
// export const DeskTopWorkSpace = () => {
//     const { windowState, openApplication } = useWindowContext();
//
//     const boundaryRef = useRef<HTMLDivElement | null>(null);
//
//     const googleBody = useMemo(() => <Google />, []);
//     const portfolio = useMemo(() => <PortfolioApp />, []);
//
//     const [body, setBody] = useState<string>("");
//
//     const windowsToRender = windowState.runningApplication.flatMap((app) =>
//         (app.windowState?.runningWindows ?? [])
//             .filter((window) => window.isRunning)
//             .map((window) => ({
//                 app,
//                 window,
//             }))
//     );
//
//     function somefunction(name: string) {
//         setBody(name);
//     }
//
//     const renderWindow = (window: RunningWindow) => {
//         switch (window.app) {
//             case "Chrome":
//                 return (
//                     <AdaptiveWindow
//                         key={window.hash}
//                         boundaryRef={boundaryRef}
//                         initialX={window.initialSizeX}
//                         initialY={window.initialSizeY}
//                         hashNumber={window.hash}
//                         dock="top"
//                         headerSize="lg"
//                         windowHeight={window.windowHeight}
//                         windowWidth={window.windowWidth}
//                         headerComponent={
//                             <WindowHeader
//                                 hashParent={window.hash}
//                                 dock="top"
//                                 borderRadius="none"
//                                 control={
//                                     <div className="flex w-full h-full items-center justify-center text-white p-1 gap-0.5 rounded-sm min-w-[40px] min-h-[16px]">
//                                         <WindowControl
//                                             hashParent={window.hash}
//                                             direction="row"
//                                         />
//                                     </div>
//                                 }
//                                 headerBody={
//                                     <EdgeTab
//                                         hashParent={window.hash}
//                                         dock="top"
//                                     />
//                                 }
//                                 searchBarBody={<SearchBarBody />}
//                                 padding="none"
//                             />
//                         }
//                         bodyComponent={
//                             window.chromePage === "portfolio"
//                                 ? portfolio
//                                 : googleBody
//                         }
//                     />
//                 );
//
//             case "Finder":
//                 return (
//                     <AdaptiveWindow
//                         key={window.hash}
//                         boundaryRef={boundaryRef}
//                         initialX={window.initialSizeX}
//                         initialY={window.initialSizeY}
//                         hashNumber={window.hash}
//                         dock="left"
//                         headerSize="xl"
//                         windowHeight={window.windowHeight}
//                         windowWidth={window.windowWidth}
//                         headerComponent={
//                             <WindowHeader
//                                 hashParent={window.hash}
//                                 dock="left"
//                                 borderRadius="sm"
//                                 control={
//                                     <WindowControl
//                                         hashParent={window.hash}
//                                         direction="row"
//                                     />
//                                 }
//                                 headerBody={
//                                     <FinderControlBody onChange={somefunction} />
//                                 }
//                                 searchBarBody={null}
//                                 padding="md"
//                             />
//                         }
//                         bodyComponent={<FinderBody name={body} />}
//                     />
//                 );
//
//             default:
//                 return <div>Not found</div>;
//         }
//     };
//
//     return (
//         <div
//             ref={boundaryRef}
//             className="flex flex-row w-full h-full relative overflow-hidden"
//         >
//             <div className="flex flex-col relative top-5 left-2 items-center">
//                 <img
//                     src={Story}
//                     alt="MyStory logo"
//                     className="w-6 h-4 object-contain hover:opacity-70 cursor-pointer"
//                     onClick={() =>
//                         openApplication("Chrome", 380, 220, "portfolio")
//                     }
//                 />
//
//                 <span className="font-bold text-white leading-none mt-1 text-[0.4rem]">
//                     MyStory
//                 </span>
//             </div>
//
//             {windowsToRender.map(({ window }) => renderWindow(window))}
//         </div>
//     );
// };
