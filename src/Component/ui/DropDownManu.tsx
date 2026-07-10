import * as React from "react";
import { createPortal } from "react-dom";

import { GlassContainer_two } from "./GlassContainer.tsx";
import type { dropManuItems } from "../../Interfaces/WindowIteface.ts";
import { useWindowContext } from "../../Context/useWindowContext.ts";

interface DropDownManuProps {
    dropItems?: dropManuItems[];
    anchorRect?: DOMRect | null;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    parentItemName?: string;
}

export const DropDownManu: React.FC<DropDownManuProps> = ({
                                                              dropItems,
                                                              anchorRect,
                                                              onMouseEnter,
                                                              onMouseLeave,
                                                              parentItemName,
                                                          }) => {
    const {
        getActiveContext,
        openApplication,
        openNewTab,
        deleteTab,
        closeWindow,
    } = useWindowContext();

    if (!anchorRect || !dropItems?.length) {
        return null;
    }

    function dropDownAction(description: string): void {
        const {
            activeApp,
            currentWindow,
            currentTab,
            tabArrayLength,
        } = getActiveContext();

        if (!activeApp) {
            return;
        }

        if (parentItemName !== "File") {
            return;
        }

        switch (description) {
            case "New Window":
                openApplication(
                    activeApp.applicationName,
                   activeApp.minWindowWidth || 340,
                   activeApp.minWindowHeight || 220,
                    activeApp.chromePage ?? null
                );
                break;

            case "New Tab":
                if (currentWindow) {
                    openNewTab(
                        currentWindow.id,
                        "New Tab"
                    );
                }
                break;

            case "Close Window":
                if (currentWindow) {
                    closeWindow(currentWindow.id);
                }
                break;

            case "Close Tab":
                if (!currentWindow || !currentTab) {
                    return;
                }

                if (tabArrayLength > 1) {
                    deleteTab(
                        currentWindow.id,
                        currentTab.hash
                    );
                } else {
                    closeWindow(currentWindow.id);
                }

                break;

            default:
                break;
        }
    }

    return createPortal(
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: "fixed",
                top: `${anchorRect.bottom + 2}px`,
                left: `${anchorRect.left}px`,
                zIndex: 99999,
                pointerEvents: "auto",
            }}
        >
            <GlassContainer_two
                padding="none"
                blur="sm"
                gloss={true}
                border={true}
                shadow="sm"
                variant="default"
                rounded="lg"
                containerDirection="column"
                className="
                    gap-0
                    items-stretch
                    overflow-hidden
                    min-w-fit
                    pt-1
                    pb-1
                "
            >
                {dropItems.map((item, index) => (
                    <React.Fragment
                        key={`${item.description}-${index}`}
                    >
                        <div
                            onClick={() =>
                                dropDownAction(
                                    item.description
                                )
                            }
                            style={{
                                padding: "1px 6px",
                                fontSize: "0.45rem",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onMouseEnter={event => {
                                event.currentTarget.style.background =
                                    "#3b82f6";
                            }}
                            onMouseLeave={event => {
                                event.currentTarget.style.background =
                                    "transparent";
                            }}
                        >
                            {item.description}
                        </div>

                        {index !==
                            dropItems.length - 1 && (
                                <div
                                    style={{
                                        margin: "0",
                                        height: "1px",
                                        background:
                                            "rgba(255,255,255,0.2)",
                                    }}
                                />
                            )}
                    </React.Fragment>
                ))}
            </GlassContainer_two>
        </div>,
        document.body
    );
};
// import * as React from "react";
// import { createPortal } from "react-dom";
//
// import { GlassContainer_two } from "./GlassContainer.tsx";
// import type {dropManuItems} from "../../Interfaces/WindowIteface.ts";
// import {useWindowContext} from "../../Context/useWindowContext.ts";
// //import {useWindowContext} from "../../Context/useWindowContext.ts";
//
// interface DropDownManuProps {
//     dropItems?: dropManuItems[];
//     anchorRect?: DOMRect | null;
//     onMouseEnter?: () => void;
//     onMouseLeave?: () => void;
//     parentItemName?: string;
// }
//
// export const DropDownManu: React.FC<DropDownManuProps> = ({
//                                                               dropItems,
//                                                               anchorRect,
//                                                               onMouseEnter,
//                                                               onMouseLeave,
//     parentItemName,
//                                                           }) => {
//
//     const { getActiveContext, openApplication, openNewTab, deleteTab, closeWindow } =
//         useWindowContext();
//
//     if (!anchorRect || !dropItems?.length) return null;
//
//     // {description: "New Window"},
//     // {description: "Open..."},
//     // {description: "Close Window"},
//     // {description: "Save"},
//
//    function dropDownAction(description: string){
//        const { activeApp, currentWindow, currentTab, tabArrayLength } = getActiveContext(); // NEW
//
//        if (!activeApp) return;
//
//        if (parentItemName === "File") {
//            switch (description) {
//                case "New Window":
//                    openApplication(
//                        activeApp.applicationName,
//                        340, 220,
//                    );
//                    break;
//
//                case "New Tab":
//                    if (currentWindow) {
//                        openNewTab(currentWindow.hash, "New Tab");
//                    }
//                    break;
//
//                case "Close Window":
//                    if (currentWindow) {
//                        closeWindow(currentWindow.hash);
//                    }
//                    break;
//
//                case "Close Tab":
//                    if (currentWindow && currentTab) {
//                        if(tabArrayLength > 1){
//                            deleteTab(currentWindow.hash, currentTab.hash);
//                        }else {
//                            closeWindow(currentWindow.hash);
//                        }
//
//                    }
//                    break;
//
//                default:
//                    break;
//            }
//        }
//    }
//     return createPortal(
//         <div
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//             style={{
//                 position: "fixed",
//                 top: `${anchorRect.bottom + 2}px`,
//                 left: `${anchorRect.left}px`,
//                 zIndex: 99999,
//                 pointerEvents: "auto",
//             }}
//         >
//
//             <GlassContainer_two
//                 padding="none"
//                 blur="sm"
//                 gloss={true}
//                 border={true}
//                 shadow="sm"
//                 variant="default"
//                 rounded="lg"
//                 containerDirection="column"
//                 className="gap-0 items-stretch overflow-hidden min-w-fit pt-1 pb-1"
//             >
//                 {dropItems.map((item, index) => (
//                     <React.Fragment key={`${item.description}-${index}`}>
//                         <div
//                             onClick={()=> dropDownAction(item.description)}
//                             style={{
//                                 padding: "1px 6px",
//                                 fontSize: "0.45rem",
//                                 whiteSpace: "nowrap",
//                                 cursor: "pointer",
//                                 userSelect: "none",
//                             }}
//                             onMouseEnter={(e) => {
//                                 e.currentTarget.style.background = "#3b82f6";
//                             }}
//                             onMouseLeave={(e) => {
//                                 e.currentTarget.style.background = "transparent";
//                             }}
//                         >
//                             {item.description}
//                         </div>
//
//                         {index !== dropItems.length - 1 && (
//                             <div
//                                 style={{
//                                     margin: "0px 0",
//                                     height: "1px",
//                                     background: "rgba(255,255,255,0.2)",
//                                 }}
//                             />
//                         )}
//                     </React.Fragment>
//                 ))}
//             </GlassContainer_two>
//         </div>,
//         document.body
//     );
// };