import * as React from "react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

export type WindowHeaderPosition =
    | "top"
    | "bottom"
    | "left"
    | "right";

export type WindowHeaderSize =
    | "sm"
    | "md"
    | "lg"
    | "xl";

const headerSizeMap: Record<
    WindowHeaderSize,
    string
> = {
    sm: "10%",
    md: "15%",
    lg: "20%",
    xl: "30%",
};

const MIN_WIDTH = 250;
const MIN_HEIGHT = 160;

export interface AdaptiveWindowProps {
    /**
     * Unique ID belonging to the WindowState.
     */
    windowID: string;

    /**
     * Initial position inside the desktop boundary.
     */
    initialX: number;
    initialY: number;

    /**
     * Initial window dimensions.
     */
    windowWidth?: number;
    windowHeight?: number;

    /**
     * Determines where the window header is located.
     */
    dock?: WindowHeaderPosition;

    /**
     * Determines how much space the header occupies.
     */
    headerSize?: WindowHeaderSize;

    /**
     * Window header and body content.
     */
    headerComponent: React.ReactNode | null;
    bodyComponent: React.ReactNode | null;

    /**
     * The desktop element that contains the window.
     */
    boundaryRef: React.RefObject<HTMLDivElement | null>;

    /**
     * Called when the window is selected.
     *
     * The parent uses this to move the window to the
     * front of the window stack.
     */
    onMouseDown?: () => void;
}

interface Position {
    x: number;
    y: number;
}

interface WindowSize {
    width: number;
    height: number;
}

function getBoundarySize(
    boundary: HTMLDivElement | null
): WindowSize | null {
    if (!boundary) {
        return null;
    }

    return {
        width: boundary.clientWidth,
        height: boundary.clientHeight,
    };
}

function clampPosition(
    nextX: number,
    nextY: number,
    width: number,
    height: number,
    boundaryWidth: number,
    boundaryHeight: number
): Position {
    const maximumX = Math.max(
        0,
        boundaryWidth - width
    );

    const maximumY = Math.max(
        0,
        boundaryHeight - height
    );

    return {
        x: Math.max(
            0,
            Math.min(nextX, maximumX)
        ),

        y: Math.max(
            0,
            Math.min(nextY, maximumY)
        ),
    };
}

function clampSize(
    anchorX: number,
    anchorY: number,
    desiredWidth: number,
    desiredHeight: number,
    boundaryWidth: number,
    boundaryHeight: number
): WindowSize {
    const maximumWidth = Math.max(
        0,
        boundaryWidth - anchorX
    );

    const maximumHeight = Math.max(
        0,
        boundaryHeight - anchorY
    );

    return {
        width: Math.min(
            maximumWidth,
            Math.max(MIN_WIDTH, desiredWidth)
        ),

        height: Math.min(
            maximumHeight,
            Math.max(MIN_HEIGHT, desiredHeight)
        ),
    };
}

export const AdaptiveWindow: React.FC<
    AdaptiveWindowProps
> = ({
         windowID,
         initialX,
         initialY,
         windowWidth = 500,
         windowHeight = 300,
         dock = "top",
         headerSize = "md",
         headerComponent,
         bodyComponent,
         boundaryRef,
         onMouseDown,
     }) => {
    const windowRef =
        useRef<HTMLDivElement | null>(null);

    const [position, setPosition] =
        useState<Position>({
            x: initialX,
            y: initialY,
        });

    const [size, setSize] =
        useState<WindowSize>({
            width: windowWidth,
            height: windowHeight,
        });

    const [isDragging, setIsDragging] =
        useState(false);

    const [isResizing, setIsResizing] =
        useState(false);

    const [mousePosition, setMousePosition] =
        useState<Position>({
            x: 0,
            y: 0,
        });

    const isHorizontalHeader =
        dock === "top" || dock === "bottom";

    const headerPercent =
        headerSizeMap[headerSize];

    const gridStyle: React.CSSProperties =
        isHorizontalHeader
            ? {
                gridTemplateRows:
                    dock === "top"
                        ? `${headerPercent} minmax(0, 1fr)`
                        : `minmax(0, 1fr) ${headerPercent}`,
            }
            : {
                gridTemplateColumns:
                    dock === "left"
                        ? `${headerPercent} minmax(0, 1fr)`
                        : `minmax(0, 1fr) ${headerPercent}`,
            };

    /**
     * Runs when any part of the window is clicked.
     *
     * This calls the parent callback that moves the
     * window to the front.
     */
    function handleWindowMouseDown(): void {
        onMouseDown?.();
    }

    /**
     * Starts dragging from the header.
     *
     * It does not call onMouseDown because the event
     * bubbles to the outer window container.
     */
    function handleDragMouseDown(
        event: React.MouseEvent<HTMLDivElement>
    ): void {
        event.preventDefault();

        setIsDragging(true);

        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    }

    /**
     * Starts resizing from the bottom-right handle.
     */
    function handleResizeMouseDown(
        event: React.MouseEvent<HTMLDivElement>
    ): void {
        event.preventDefault();

        /*
         * Prevent this event from also starting a drag
         * on the header or outer container.
         */
        event.stopPropagation();

        /*
         * Because propagation is stopped, manually call
         * the foreground callback once here.
         */
        onMouseDown?.();

        setIsResizing(true);

        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    }

    useEffect(() => {
        function handleMouseMove(
            event: MouseEvent
        ): void {
            const boundarySize =
                getBoundarySize(
                    boundaryRef.current
                );

            if (!boundarySize) {
                return;
            }

            const deltaX =
                event.clientX - mousePosition.x;

            const deltaY =
                event.clientY - mousePosition.y;

            if (isDragging) {
                setPosition(previousPosition =>
                    clampPosition(
                        previousPosition.x + deltaX,
                        previousPosition.y + deltaY,
                        size.width,
                        size.height,
                        boundarySize.width,
                        boundarySize.height
                    )
                );
            }

            if (isResizing) {
                setSize(previousSize =>
                    clampSize(
                        position.x,
                        position.y,
                        previousSize.width + deltaX,
                        previousSize.height + deltaY,
                        boundarySize.width,
                        boundarySize.height
                    )
                );
            }

            if (isDragging || isResizing) {
                setMousePosition({
                    x: event.clientX,
                    y: event.clientY,
                });
            }
        }

        function handleMouseUp(): void {
            setIsDragging(false);
            setIsResizing(false);
        }

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseup",
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseup",
                handleMouseUp
            );
        };
    }, [
        isDragging,
        isResizing,
        mousePosition,
        position.x,
        position.y,
        size.width,
        size.height,
        boundaryRef,
    ]);

    /**
     * Keeps the window inside the desktop when the
     * desktop boundary changes size.
     */
    useEffect(() => {
        const boundary =
            boundaryRef.current;

        if (
            !boundary ||
            typeof ResizeObserver === "undefined"
        ) {
            return;
        }

        const observer =
            new ResizeObserver(() => {
                const boundarySize =
                    getBoundarySize(boundary);

                if (!boundarySize) {
                    return;
                }

                setSize(previousSize =>
                    clampSize(
                        position.x,
                        position.y,
                        previousSize.width,
                        previousSize.height,
                        boundarySize.width,
                        boundarySize.height
                    )
                );

                setPosition(previousPosition =>
                    clampPosition(
                        previousPosition.x,
                        previousPosition.y,
                        size.width,
                        size.height,
                        boundarySize.width,
                        boundarySize.height
                    )
                );
            });

        observer.observe(boundary);

        return () => {
            observer.disconnect();
        };
    }, [
        boundaryRef,
        position.x,
        position.y,
        size.width,
        size.height,
    ]);

    return (
        <div
            ref={windowRef}
            data-window-id={windowID}
            onMouseDown={handleWindowMouseDown}
            className="
                absolute
                grid
                box-border
                bg-[#111111]
                rounded-sm
                shadow-md/20
                overflow-hidden
                min-w-0
                min-h-0
                max-w-full
                max-h-full
            "
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                ...gridStyle,
            }}
        >
            <div
                className="
                    flex
                    w-full
                    h-full
                    min-w-0
                    min-h-0
                    overflow-hidden
                    gap-0.5
                    select-none
                    cursor-move
                "
                onMouseDown={handleDragMouseDown}
            >
                {headerComponent}
            </div>

            <div
                className="
                    bg-[#373a3c]
                    border-t
                    border-t-white/60
                    border-t-[0.2px]
                    w-full
                    h-full
                    min-w-0
                    min-h-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        w-full
                        h-full
                        min-w-0
                        min-h-0
                        overflow-hidden
                    "
                >
                    {bodyComponent}
                </div>
            </div>

            <div
                onMouseDown={
                    handleResizeMouseDown
                }
                className="
                    absolute
                    right-0
                    bottom-0
                    w-3
                    h-3
                    cursor-se-resize
                    bg-white/20
                    hover:bg-white/40
                    z-50
                "
            />
        </div>
    );
};

// import * as React from "react";
// import { useEffect, useRef, useState } from "react";
// import { useWindowContext } from "../../Context/useWindowContext.ts";
//
// export type WindowHeaderPosition =
//     | "top"
//     | "bottom"
//     | "left"
//     | "right";
//
// type WindowHeaderSize = "sm" | "md" | "lg" | "xl";
//
// const headerSizeMap: Record<WindowHeaderSize, string> = {
//     sm: "10%",
//     md: "15%",
//     lg: "20%",
//     xl: "30%",
// };
//
// const MIN_WIDTH = 250;
// const MIN_HEIGHT = 160;
//
// interface AdaptiveWindowProps {
//     windowID: string;
//
//     initialX: number;
//     initialY: number;
//
//     windowWidth?: number;
//     windowHeight?: number;
//
//     dock?: WindowHeaderPosition;
//     headerSize?: WindowHeaderSize;
//
//     headerComponent: React.ReactNode | null;
//     bodyComponent: React.ReactNode | null;
//
//     boundaryRef: React.RefObject<HTMLDivElement | null>;
//
// }
//
// function getBoundarySize(
//     boundary: HTMLDivElement | null
// ): {
//     width: number;
//     height: number;
// } | null {
//     if (!boundary) {
//         return null;
//     }
//
//     return {
//         width: boundary.clientWidth,
//         height: boundary.clientHeight,
//     };
// }
//
// function clampPosition(
//     nextX: number,
//     nextY: number,
//     width: number,
//     height: number,
//     boundaryWidth: number,
//     boundaryHeight: number
// ): {
//     x: number;
//     y: number;
// } {
//     const maximumX = Math.max(0, boundaryWidth - width);
//     const maximumY = Math.max(0, boundaryHeight - height);
//
//     const x = Math.max(
//         0,
//         Math.min(nextX, maximumX)
//     );
//
//     const y = Math.max(
//         0,
//         Math.min(nextY, maximumY)
//     );
//
//     return {
//         x,
//         y,
//     };
// }
//
// function clampSize(
//     anchorX: number,
//     anchorY: number,
//     desiredWidth: number,
//     desiredHeight: number,
//     boundaryWidth: number,
//     boundaryHeight: number
// ): {
//     width: number;
//     height: number;
// } {
//     const maxWidth = Math.max(
//         0,
//         boundaryWidth - anchorX
//     );
//
//     const maxHeight = Math.max(
//         0,
//         boundaryHeight - anchorY
//     );
//
//     const width = Math.min(
//         maxWidth,
//         Math.max(MIN_WIDTH, desiredWidth)
//     );
//
//     const height = Math.min(
//         maxHeight,
//         Math.max(MIN_HEIGHT, desiredHeight)
//     );
//
//     return {
//         width,
//         height,
//     };
// }
//
// export const AdaptiveWindow: React.FC<
//     AdaptiveWindowProps
// > = ({
//          windowID,
//          initialX,
//          initialY,
//          windowWidth = 500,
//          windowHeight = 300,
//          dock = "top",
//          headerSize = "md",
//          bodyComponent,
//          headerComponent,
//          boundaryRef,
//
//      }) => {
//     const {
//         windowState,
//         moveWindowToFront,
//     } = useWindowContext();
//
//     const windowRef =
//         useRef<HTMLDivElement | null>(null);
//
//     const currentWindow =
//         windowState.openAppWindow.get(windowID);
//
//     const [position, setPosition] = useState({
//         x: initialX,
//         y: initialY,
//     });
//
//     const [size, setSize] = useState({
//         width: windowWidth,
//         height: windowHeight,
//     });
//
//     const [isDragging, setIsDragging] =
//         useState(false);
//
//     const [isResizing, setIsResizing] =
//         useState(false);
//
//     const [mousePosition, setMousePosition] =
//         useState({
//             x: 0,
//             y: 0,
//         });
//
//     const isHorizontalHeader =
//         dock === "top" || dock === "bottom";
//
//     const headerPercent =
//         headerSizeMap[headerSize];
//
//     const gridStyle: React.CSSProperties =
//         isHorizontalHeader
//             ? {
//                 gridTemplateRows:
//                     dock === "top"
//                         ? `${headerPercent} minmax(0, 1fr)`
//                         : `minmax(0, 1fr) ${headerPercent}`,
//             }
//             : {
//                 gridTemplateColumns:
//                     dock === "left"
//                         ? `${headerPercent} minmax(0, 1fr)`
//                         : `minmax(0, 1fr) ${headerPercent}`,
//             };
//
//     function handleWindowMouseDown(): void {
//         if (!currentWindow?.isActive) {
//             moveWindowToFront(windowID);
//         }
//     }
//
//     function handleDragMouseDown(
//         event: React.MouseEvent<HTMLDivElement>
//     ): void {
//         event.preventDefault();
//
//         moveWindowToFront(windowID);
//
//         setIsDragging(true);
//
//         setMousePosition({
//             x: event.clientX,
//             y: event.clientY,
//         });
//     }
//
//     function handleResizeMouseDown(
//         event: React.MouseEvent<HTMLDivElement>
//     ): void {
//         event.preventDefault();
//         event.stopPropagation();
//
//         moveWindowToFront(windowID);
//
//         setIsResizing(true);
//
//         setMousePosition({
//             x: event.clientX,
//             y: event.clientY,
//         });
//     }
//
//     useEffect(() => {
//         function handleMouseMove(
//             event: MouseEvent
//         ): void {
//             const boundarySize = getBoundarySize(
//                 boundaryRef.current
//             );
//
//             if (!boundarySize) {
//                 return;
//             }
//
//             const deltaX =
//                 event.clientX - mousePosition.x;
//
//             const deltaY =
//                 event.clientY - mousePosition.y;
//
//             if (isDragging) {
//                 setPosition(previousPosition =>
//                     clampPosition(
//                         previousPosition.x + deltaX,
//                         previousPosition.y + deltaY,
//                         size.width,
//                         size.height,
//                         boundarySize.width,
//                         boundarySize.height
//                     )
//                 );
//             }
//
//             if (isResizing) {
//                 setSize(previousSize =>
//                     clampSize(
//                         position.x,
//                         position.y,
//                         previousSize.width + deltaX,
//                         previousSize.height + deltaY,
//                         boundarySize.width,
//                         boundarySize.height
//                     )
//                 );
//             }
//
//             if (isDragging || isResizing) {
//                 setMousePosition({
//                     x: event.clientX,
//                     y: event.clientY,
//                 });
//             }
//         }
//
//         function handleMouseUp(): void {
//             setIsDragging(false);
//             setIsResizing(false);
//         }
//
//         window.addEventListener(
//             "mousemove",
//             handleMouseMove
//         );
//
//         window.addEventListener(
//             "mouseup",
//             handleMouseUp
//         );
//
//         return () => {
//             window.removeEventListener(
//                 "mousemove",
//                 handleMouseMove
//             );
//
//             window.removeEventListener(
//                 "mouseup",
//                 handleMouseUp
//             );
//         };
//     }, [
//         isDragging,
//         isResizing,
//         mousePosition,
//         position,
//         size,
//         boundaryRef,
//     ]);
//
//     useEffect(() => {
//         const boundary = boundaryRef.current;
//
//         if (
//             !boundary ||
//             typeof ResizeObserver === "undefined"
//         ) {
//             return;
//         }
//
//         const observer = new ResizeObserver(() => {
//             const boundarySize =
//                 getBoundarySize(boundary);
//
//             if (!boundarySize) {
//                 return;
//             }
//
//             setSize(previousSize =>
//                 clampSize(
//                     position.x,
//                     position.y,
//                     previousSize.width,
//                     previousSize.height,
//                     boundarySize.width,
//                     boundarySize.height
//                 )
//             );
//
//             setPosition(previousPosition =>
//                 clampPosition(
//                     previousPosition.x,
//                     previousPosition.y,
//                     size.width,
//                     size.height,
//                     boundarySize.width,
//                     boundarySize.height
//                 )
//             );
//         });
//
//         observer.observe(boundary);
//
//         return () => {
//             observer.disconnect();
//         };
//     }, [
//         boundaryRef,
//         position.x,
//         position.y,
//         size.width,
//         size.height,
//     ]);
//
//     if (!currentWindow || currentWindow.isClosed) {
//         return null;
//     }
//
//     return (
//         <div
//             ref={windowRef}
//            // onMouseDown={handleWindowMouseDown}
//             className="
//                 absolute
//                 grid
//                 box-border
//                 bg-[#111111]
//                 rounded-sm
//                 shadow-md/20
//                 overflow-hidden
//                 min-w-0
//                 min-h-0
//                 max-w-full
//                 max-h-full
//             "
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 width: `${size.width}px`,
//                 height: `${size.height}px`,
//                 ...gridStyle,
//             }}
//         >
//             <div
//                 className="
//                     flex
//                     w-full
//                     h-full
//                     min-w-0
//                     min-h-0
//                     overflow-hidden
//                     gap-0.5
//                     select-none
//                 "
//                 onMouseDown={handleDragMouseDown}
//             >
//                 {headerComponent}
//             </div>
//
//             <div
//                 className="
//                     bg-[#373a3c]
//                     border-t
//                     border-t-white/60
//                     border-t-[0.2px]
//                     w-full
//                     h-full
//                     min-w-0
//                     min-h-0
//                     overflow-hidden
//                 "
//             >
//                 <div
//                     className="
//                         w-full
//                         h-full
//                         min-w-0
//                         min-h-0
//                         overflow-hidden
//                     "
//                 >
//                     {bodyComponent}
//                 </div>
//             </div>
//
//             <div
//                 onMouseDown={handleResizeMouseDown}
//                 className="
//                     absolute
//                     right-0
//                     bottom-0
//                     w-3
//                     h-3
//                     cursor-se-resize
//                     bg-white/20
//                     hover:bg-white/40
//                     z-50
//                 "
//             />
//         </div>
//     );
// };
//

// // // @flow
//
//
// import * as React from "react";
// import { useEffect, useRef, useState } from "react";
//
// export type WindowHeaderPosition = "top" | "bottom" | "left" | "right";
// type WindowHeaderSize = "sm" | "md" | "lg" | "xl";
//
// const headerSizeMap: Record<WindowHeaderSize, string> = {
//     sm: "10%",
//     md: "15%",
//     lg: "20%",
//     xl: "30%",
// };
//
// // Single source of truth for the minimum window footprint.
// // Keeping these as named constants makes the boundary-vs-min-size
// // conflict (see clampSize below) explicit instead of "magic numbers"
// // scattered across the file.
// const MIN_WIDTH = 250;
// const MIN_HEIGHT = 160;
//
// interface AdaptiveWindowProps {
//     initialX: number;
//     initialY: number;
//     windowWidth?: number;
//     windowHeight?: number;
//     hashNumber: number;
//     dock?: WindowHeaderPosition;
//     headerSize?: WindowHeaderSize;
//     headerComponent: React.ReactNode | null;
//     bodyComponent: React.ReactNode | null;
//     boundaryRef: React.RefObject<HTMLDivElement | null>;
// }
//
// // interface Rect {
// //     x: number;
// //     y: number;
// //     width: number;
// //     height: number;
// // }
//
// /**
//  * Returns the usable size of the boundary element in its own local
//  * coordinate space. `clientWidth`/`clientHeight` are used (not
//  * getBoundingClientRect) because:
//  *   1. AdaptiveWindow is `position: absolute` inside a `position:
//  *      relative` boundary, so `left`/`top` are resolved against the
//  *      boundary's padding box — which is exactly what clientWidth/
//  *      clientHeight measure (border-box minus borders/scrollbars).
//  *   2. clientWidth/clientHeight are immune to ancestor CSS
//  *      transforms (scale, translate) that would otherwise skew a
//  *      getBoundingClientRect()-based measurement relative to the
//  *      untransformed coordinate space the window is positioned in.
//  * If DesktopWorkspace ever gains a border, switch to
//  * getBoundingClientRect and subtract borderLeftWidth/borderTopWidth.
//  */
// function getBoundarySize(boundary: HTMLDivElement | null) {
//     if (!boundary) return null;
//     return { width: boundary.clientWidth, height: boundary.clientHeight };
// }
//
// /**
//  * Clamp a drag (position changes, size stays fixed).
//  * The window must stay fully inside [0, boundaryWidth] x [0, boundaryHeight].
//  */
// function clampPosition(
//     nextX: number,
//     nextY: number,
//     width: number,
//     height: number,
//     boundaryWidth: number,
//     boundaryHeight: number
// ): { x: number; y: number } {
//     const x = Math.max(0, Math.min(nextX, boundaryWidth - width));
//     const y = Math.max(0, Math.min(nextY, boundaryHeight - height));
//     return { x, y };
// }
//
// /**
//  * Clamp a resize (x/y stay fixed at the anchor corner, size changes).
//  *
//  * THE BUG THIS FIXES:
//  * The previous implementation computed
//  *   Math.max(minSize, Math.min(desired, boundaryLimit))
//  * i.e. "floor, then ceiling". That ordering is only correct when
//  * minSize <= boundaryLimit. As soon as the window is close enough to
//  * the edge that the remaining room is *less* than the minimum size
//  * (boundaryLimit < minSize), the outer Math.max throws away the
//  * boundary result and forces the size back up past the edge — which
//  * is precisely the "window grows outside the container" bug.
//  *
//  * THE FIX:
//  * Reverse the order to "ceiling, then floor" —
//  *   Math.min(boundaryLimit, Math.max(minSize, desired))
//  * — no wait, that has the same problem in the other direction if
//  * applied naively. The actual fix is to make the boundary limit
//  * *win* outright when the two constraints conflict, by clamping to
//  * boundaryLimit LAST, unconditionally:
//  *
//  *   width = Math.min(boundaryLimit, Math.max(minSize, desired))
//  *
//  * Walk through the conflict case: boundaryLimit (available room) is
//  * 80px, minSize is 250px, desired is anything.
//  *   Math.max(minSize, desired) >= 250
//  *   Math.min(80, thatValue) = 80   <-- boundary wins, as required
//  *
//  * And the normal case: boundaryLimit is 600px, minSize is 250px,
//  * desired is 40px (user tried to shrink too far).
//  *   Math.max(250, 40) = 250
//  *   Math.min(600, 250) = 250       <-- min-size still enforced normally
//  *
//  * This guarantees right <= boundaryWidth and bottom <= boundaryHeight
//  * at every step, even if that means the window dips below its
//  * "preferred" minimum for a moment. That's the same tradeoff macOS
//  * makes: the screen edge is a hard constraint, minimum size is soft.
//  */
// function clampSize(
//     anchorX: number,
//     anchorY: number,
//     desiredWidth: number,
//     desiredHeight: number,
//     boundaryWidth: number,
//     boundaryHeight: number
// ): { width: number; height: number } {
//     const maxWidth = boundaryWidth - anchorX;
//     const maxHeight = boundaryHeight - anchorY;
//
//     const width = Math.min(maxWidth, Math.max(MIN_WIDTH, desiredWidth));
//     const height = Math.min(maxHeight, Math.max(MIN_HEIGHT, desiredHeight));
//
//     return { width, height };
// }
//
// export const AdaptiveWindow: React.FC<AdaptiveWindowProps> = ({
//                                                                   initialX,
//                                                                   initialY,
//                                                                   windowWidth = 500,
//                                                                   windowHeight = 300,
//                                                                   dock = "top",
//                                                                   headerSize = "md",
//                                                                   bodyComponent,
//                                                                   headerComponent,
//                                                                   boundaryRef,
//                                                               }) => {
//     const windowRef = useRef<HTMLDivElement | null>(null);
//
//     const [position, setPosition] = useState({ x: initialX, y: initialY });
//     const [size, setSize] = useState({ width: windowWidth, height: windowHeight });
//
//     const [isDragging, setIsDragging] = useState(false);
//     const [isResizing, setIsResizing] = useState(false);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//
//     const isHorizontalHeader = dock === "top" || dock === "bottom";
//     const headerPercent = headerSizeMap[headerSize];
//
//     const gridStyle: React.CSSProperties = isHorizontalHeader
//         ? {
//             gridTemplateRows:
//                 dock === "top"
//                     ? `${headerPercent} minmax(0, 1fr)`
//                     : `minmax(0, 1fr) ${headerPercent}`,
//         }
//         : {
//             gridTemplateColumns:
//                 dock === "left"
//                     ? `${headerPercent} minmax(0, 1fr)`
//                     : `minmax(0, 1fr) ${headerPercent}`,
//         };
//
//     const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         setIsDragging(true);
//         setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//
//     const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setIsResizing(true);
//         setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//
//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             const boundarySize = getBoundarySize(boundaryRef.current);
//             if (!boundarySize) return;
//
//             const deltaX = e.clientX - mousePosition.x;
//             const deltaY = e.clientY - mousePosition.y;
//
//             if (isDragging) {
//                 setPosition((prev) =>
//                     clampPosition(
//                         prev.x + deltaX,
//                         prev.y + deltaY,
//                         size.width,
//                         size.height,
//                         boundarySize.width,
//                         boundarySize.height
//                     )
//                 );
//             }
//
//             if (isResizing) {
//                 // Bottom-right handle: the anchor corner (position.x, position.y)
//                 // never moves during a resize — only width/height change.
//                 setSize((prev) =>
//                     clampSize(
//                         position.x,
//                         position.y,
//                         prev.width + deltaX,
//                         prev.height + deltaY,
//                         boundarySize.width,
//                         boundarySize.height
//                     )
//                 );
//             }
//
//             if (isDragging || isResizing) {
//                 setMousePosition({ x: e.clientX, y: e.clientY });
//             }
//         };
//
//         const handleMouseUp = () => {
//             setIsDragging(false);
//             setIsResizing(false);
//         };
//
//         window.addEventListener("mousemove", handleMouseMove);
//         window.addEventListener("mouseup", handleMouseUp);
//
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, [isDragging, isResizing, mousePosition, position, size, boundaryRef]);
//
//     // Defensive re-clamp: if the boundary itself resizes (e.g. the
//     // browser window shrinks, or the Dock changes height) while this
//     // window is NOT being actively dragged/resized, snap it back
//     // inside the new bounds instead of waiting for the next
//     // drag/resize gesture to notice.
//     useEffect(() => {
//         const boundary = boundaryRef.current;
//         if (!boundary || typeof ResizeObserver === "undefined") return;
//
//         const observer = new ResizeObserver(() => {
//             const boundarySize = getBoundarySize(boundary);
//             if (!boundarySize) return;
//
//             setSize((prevSize) => {
//                 const clampedSize = clampSize(
//                     position.x,
//                     position.y,
//                     prevSize.width,
//                     prevSize.height,
//                     boundarySize.width,
//                     boundarySize.height
//                 );
//                 return clampedSize;
//             });
//
//             setPosition((prevPosition) =>
//                 clampPosition(
//                     prevPosition.x,
//                     prevPosition.y,
//                     size.width,
//                     size.height,
//                     boundarySize.width,
//                     boundarySize.height
//                 )
//             );
//         });
//
//         observer.observe(boundary);
//         return () => observer.disconnect();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [boundaryRef]);
//
//     return (
//         <div
//             ref={windowRef}
//             className="
//                 absolute
//                 grid
//                 box-border
//                 bg-[#111111]
//                 rounded-sm
//                 shadow-md/20
//                 overflow-hidden
//                 min-w-0
//                 min-h-0
//                 max-w-full
//                 max-h-full
//             "
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 width: `${size.width}px`,
//                 height: `${size.height}px`,
//                 ...gridStyle,
//             }}
//         >
//             <div
//                 className="flex w-full h-full min-w-0 min-h-0 overflow-hidden gap-0.5 select-none"
//                 onMouseDown={handleMouseDown}
//             >
//                 {headerComponent}
//             </div>
//
//             <div
//                 className="
//                     bg-[#373a3c]
//                     border-t
//                     border-t-white/60
//                     border-t-[0.2px]
//                     w-full
//                     h-full
//                     min-w-0
//                     min-h-0
//                     overflow-hidden
//                 "
//             >
//                 <div className="w-full h-full min-w-0 min-h-0 overflow-hidden">
//                     {bodyComponent}
//                 </div>
//             </div>
//
//             <div
//                 onMouseDown={handleResizeMouseDown}
//                 className="
//                     absolute
//                     right-0
//                     bottom-0
//                     w-3
//                     h-3
//                     cursor-se-resize
//                     bg-white/20
//                     hover:bg-white/40
//                     z-50
//                 "
//             />
//         </div>
//     );
// };
//
