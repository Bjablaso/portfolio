import * as React from "react";
import { useWindowContext } from "../../../Context/useWindowContext.ts";

interface WindowControlProps {
    windowID: string;
    direction?: "row" | "column";
}

export const WindowControl: React.FC<WindowControlProps> = ({
                                                                windowID,
                                                                direction = "row",
                                                            }) => {
    const {
        windowState,
        dispatch,
        closeWindow,
    } = useWindowContext();

    const currentWindow =
        windowState.openAppWindow.get(windowID);

    if (!currentWindow || currentWindow.isClosed) {
        return null;
    }

    return (
        <div
            className={`
                flex
                ${direction === "row" ? "flex-row" : "flex-col"}
                w-full
                h-full
                items-center
                justify-center
                gap-0.5
            `}
        >
            {currentWindow.windowControl.map(control => {
                const Icon = control.icon;

                return (
                    <button
                        key={control.id}
                        type="button"
                        aria-label={control.description}
                        className="
                            rounded-full
                            p-0.5
                            text-black
                            hover:opacity-70
                            cursor-pointer
                            border-0
                        "
                        style={{
                            backgroundColor: control.color,
                        }}
                        onClick={event => {
                            event.stopPropagation();

                            const action =
                                control.description.toUpperCase();

                            switch (action) {
                                case "EXIT":
                                    closeWindow(windowID);
                                    break;

                                case "MINIMIZE":
                                    dispatch({
                                        type: "MINIMIZE",
                                        payload: {
                                            windowID,
                                        },
                                    });
                                    break;

                                case "EXPAND":
                                    dispatch({
                                        type: "EXPAND",
                                        payload: {
                                            windowID,
                                        },
                                    });
                                    break;
                            }
                        }}
                    >
                        <Icon width={3} height={3} />
                    </button>
                );
            })}
        </div>
    );
};

// import * as React from "react";
// import { useWindowContext } from "../../../Context/useWindowContext.ts";
//
// interface WindowControlProps {
//     hashParent: number;
//     direction?: "row" | "column";
// }
//
// export const WindowControl: React.FC<WindowControlProps> = ({
//                                                                 hashParent,
//                                                                 direction = "row",
//                                                             }) => {
//     const { windowState, dispatch } = useWindowContext();
//
//     const targetApp = windowState.runningApplication.find(app =>
//         app.windowState?.runningWindows.some(win => win.hash === hashParent)
//     );
//
//     const currentWindow = targetApp?.windowState?.runningWindows.find(
//         win => win.hash === hashParent
//     );
//     if (!targetApp?.windowState || !currentWindow) return null;
//
//     const windowHash = currentWindow?.hash;
//
//
//     return (
//         <div
//             className={`
//                 flex
//                 ${direction === "row" ? "flex-row" : "flex-col"}
//                 w-full
//                 h-full
//                 items-center
//                 justify-center
//                 gap-0.5
//
//             `}
//         >
//
//             {targetApp?.windowState?.windowControl.map((control) => {
//                 const Icon = control.icon;
//
//                 return (
//                     <div
//                         key={control.id}
//                         className="
//                             rounded-full
//                             p-0.5
//                             text-black
//                             hover:opacity-70
//                         "
//                         style={{
//                             backgroundColor: control.color,
//                         }}
//                         onClick={(e) => {
//                             e.stopPropagation();
//
//                             if (!windowHash) return;
//
//                             dispatch({
//                                 type: control.description.toUpperCase() as
//                                     | "EXIT"
//                                     | "MINIMIZE"
//                                     | "EXPAND",
//                                 payload: {
//                                     hash: windowHash,
//                                 },
//                             });
//                         }}
//                     >
//                         <Icon width="3" height="3" />
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

