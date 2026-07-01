// // @flow


import * as React from "react";
import { useEffect, useRef, useState } from "react";

export type WindowHeaderPosition = "top" | "bottom" | "left" | "right";
type WindowHeaderSize = "sm" | "md" | "lg" | "xl";

const headerSizeMap: Record<WindowHeaderSize, string> = {
    sm: "10%",
    md: "15%",
    lg: "20%",
    xl: "30%",
};

// Single source of truth for the minimum window footprint.
// Keeping these as named constants makes the boundary-vs-min-size
// conflict (see clampSize below) explicit instead of "magic numbers"
// scattered across the file.
const MIN_WIDTH = 250;
const MIN_HEIGHT = 160;

interface AdaptiveWindowProps {
    initialX: number;
    initialY: number;
    windowWidth?: number;
    windowHeight?: number;
    hashNumber: number;
    dock?: WindowHeaderPosition;
    headerSize?: WindowHeaderSize;
    headerComponent: React.ReactNode | null;
    bodyComponent: React.ReactNode | null;
    boundaryRef: React.RefObject<HTMLDivElement | null>;
}

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Returns the usable size of the boundary element in its own local
 * coordinate space. `clientWidth`/`clientHeight` are used (not
 * getBoundingClientRect) because:
 *   1. AdaptiveWindow is `position: absolute` inside a `position:
 *      relative` boundary, so `left`/`top` are resolved against the
 *      boundary's padding box — which is exactly what clientWidth/
 *      clientHeight measure (border-box minus borders/scrollbars).
 *   2. clientWidth/clientHeight are immune to ancestor CSS
 *      transforms (scale, translate) that would otherwise skew a
 *      getBoundingClientRect()-based measurement relative to the
 *      untransformed coordinate space the window is positioned in.
 * If DesktopWorkspace ever gains a border, switch to
 * getBoundingClientRect and subtract borderLeftWidth/borderTopWidth.
 */
function getBoundarySize(boundary: HTMLDivElement | null) {
    if (!boundary) return null;
    return { width: boundary.clientWidth, height: boundary.clientHeight };
}

/**
 * Clamp a drag (position changes, size stays fixed).
 * The window must stay fully inside [0, boundaryWidth] x [0, boundaryHeight].
 */
function clampPosition(
    nextX: number,
    nextY: number,
    width: number,
    height: number,
    boundaryWidth: number,
    boundaryHeight: number
): { x: number; y: number } {
    const x = Math.max(0, Math.min(nextX, boundaryWidth - width));
    const y = Math.max(0, Math.min(nextY, boundaryHeight - height));
    return { x, y };
}

/**
 * Clamp a resize (x/y stay fixed at the anchor corner, size changes).
 *
 * THE BUG THIS FIXES:
 * The previous implementation computed
 *   Math.max(minSize, Math.min(desired, boundaryLimit))
 * i.e. "floor, then ceiling". That ordering is only correct when
 * minSize <= boundaryLimit. As soon as the window is close enough to
 * the edge that the remaining room is *less* than the minimum size
 * (boundaryLimit < minSize), the outer Math.max throws away the
 * boundary result and forces the size back up past the edge — which
 * is precisely the "window grows outside the container" bug.
 *
 * THE FIX:
 * Reverse the order to "ceiling, then floor" —
 *   Math.min(boundaryLimit, Math.max(minSize, desired))
 * — no wait, that has the same problem in the other direction if
 * applied naively. The actual fix is to make the boundary limit
 * *win* outright when the two constraints conflict, by clamping to
 * boundaryLimit LAST, unconditionally:
 *
 *   width = Math.min(boundaryLimit, Math.max(minSize, desired))
 *
 * Walk through the conflict case: boundaryLimit (available room) is
 * 80px, minSize is 250px, desired is anything.
 *   Math.max(minSize, desired) >= 250
 *   Math.min(80, thatValue) = 80   <-- boundary wins, as required
 *
 * And the normal case: boundaryLimit is 600px, minSize is 250px,
 * desired is 40px (user tried to shrink too far).
 *   Math.max(250, 40) = 250
 *   Math.min(600, 250) = 250       <-- min-size still enforced normally
 *
 * This guarantees right <= boundaryWidth and bottom <= boundaryHeight
 * at every step, even if that means the window dips below its
 * "preferred" minimum for a moment. That's the same tradeoff macOS
 * makes: the screen edge is a hard constraint, minimum size is soft.
 */
function clampSize(
    anchorX: number,
    anchorY: number,
    desiredWidth: number,
    desiredHeight: number,
    boundaryWidth: number,
    boundaryHeight: number
): { width: number; height: number } {
    const maxWidth = boundaryWidth - anchorX;
    const maxHeight = boundaryHeight - anchorY;

    const width = Math.min(maxWidth, Math.max(MIN_WIDTH, desiredWidth));
    const height = Math.min(maxHeight, Math.max(MIN_HEIGHT, desiredHeight));

    return { width, height };
}

export const AdaptiveWindow: React.FC<AdaptiveWindowProps> = ({
                                                                  initialX,
                                                                  initialY,
                                                                  windowWidth = 500,
                                                                  windowHeight = 300,
                                                                  dock = "top",
                                                                  headerSize = "md",
                                                                  bodyComponent,
                                                                  headerComponent,
                                                                  boundaryRef,
                                                              }) => {
    const windowRef = useRef<HTMLDivElement | null>(null);

    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [size, setSize] = useState({ width: windowWidth, height: windowHeight });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const isHorizontalHeader = dock === "top" || dock === "bottom";
    const headerPercent = headerSizeMap[headerSize];

    const gridStyle: React.CSSProperties = isHorizontalHeader
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

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const boundarySize = getBoundarySize(boundaryRef.current);
            if (!boundarySize) return;

            const deltaX = e.clientX - mousePosition.x;
            const deltaY = e.clientY - mousePosition.y;

            if (isDragging) {
                setPosition((prev) =>
                    clampPosition(
                        prev.x + deltaX,
                        prev.y + deltaY,
                        size.width,
                        size.height,
                        boundarySize.width,
                        boundarySize.height
                    )
                );
            }

            if (isResizing) {
                // Bottom-right handle: the anchor corner (position.x, position.y)
                // never moves during a resize — only width/height change.
                setSize((prev) =>
                    clampSize(
                        position.x,
                        position.y,
                        prev.width + deltaX,
                        prev.height + deltaY,
                        boundarySize.width,
                        boundarySize.height
                    )
                );
            }

            if (isDragging || isResizing) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing, mousePosition, position, size, boundaryRef]);

    // Defensive re-clamp: if the boundary itself resizes (e.g. the
    // browser window shrinks, or the Dock changes height) while this
    // window is NOT being actively dragged/resized, snap it back
    // inside the new bounds instead of waiting for the next
    // drag/resize gesture to notice.
    useEffect(() => {
        const boundary = boundaryRef.current;
        if (!boundary || typeof ResizeObserver === "undefined") return;

        const observer = new ResizeObserver(() => {
            const boundarySize = getBoundarySize(boundary);
            if (!boundarySize) return;

            setSize((prevSize) => {
                const clampedSize = clampSize(
                    position.x,
                    position.y,
                    prevSize.width,
                    prevSize.height,
                    boundarySize.width,
                    boundarySize.height
                );
                return clampedSize;
            });

            setPosition((prevPosition) =>
                clampPosition(
                    prevPosition.x,
                    prevPosition.y,
                    size.width,
                    size.height,
                    boundarySize.width,
                    boundarySize.height
                )
            );
        });

        observer.observe(boundary);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boundaryRef]);

    return (
        <div
            ref={windowRef}
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
                className="flex w-full h-full min-w-0 min-h-0 overflow-hidden gap-0.5 select-none"
                onMouseDown={handleMouseDown}
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
                <div className="w-full h-full min-w-0 min-h-0 overflow-hidden">
                    {bodyComponent}
                </div>
            </div>

            <div
                onMouseDown={handleResizeMouseDown}
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


// import {useWindowContext} from "../../Context/useWindowContext.ts";
// import {useEffect, useState} from "react";
// import * as React from "react";
//
//
// export type WindowHeaderPosition = "top" | "bottom" | "left" | "right";
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
//    // children: React.ReactNode;
// }
// //array of childread no that will pass to the header
// export const AdaptiveWindow: React.FC<AdaptiveWindowProps> = ({
//                                                                   initialX,
//                                                                   initialY,
//                                                                   windowWidth = 500,
//                                                                   windowHeight = 300,
//                                                                   dock = "top",
//                                                                   headerSize = "md",
//                                                                     //hashNumber,
//                                                                     bodyComponent,
//                                                                   headerComponent,
//                                                                 //  headerChildren = [],
//                                                                   //children,
//                                                               }) => {
//     const [position, setPosition] = useState({
//         x: initialX,
//         y: initialY,
//     });
//
//     const [isDragging, setIsDragging] = useState(false);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//
//     const { windowRef } = useWindowContext();
//
//     const isHorizontalHeader = dock === "top" || dock === "bottom";
//     const headerPercent = headerSizeMap[headerSize];
//
//     const gridStyle: React.CSSProperties = isHorizontalHeader
//         ? {
//             gridTemplateRows:
//                 dock === "top"
//                     ? `${headerPercent} 1fr`
//                     : `1fr ${headerPercent}`,
//         }
//         : {
//             gridTemplateColumns:
//                 dock === "left"
//                     ? `${headerPercent} 1fr`
//                     : `1fr ${headerPercent}`,
//         };
//
//     // const headerDirectionClass = isHorizontalHeader
//     //     ? "flex-row items-center"
//     //     : "flex-col items-center";
//
//     const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.preventDefault();
//
//         setIsDragging(true);
//         setMousePosition({
//             x: e.clientX,
//             y: e.clientY,
//         });
//     };
//
//     useEffect(() => {
//         const handleMouseMove = (e: MouseEvent) => {
//             if (!isDragging) return;
//
//             const deltaX = e.clientX - mousePosition.x;
//             const deltaY = e.clientY - mousePosition.y;
//
//             setPosition((prev) => {
//                 const nextX = prev.x + deltaX;
//                 const nextY = prev.y + deltaY;
//
//                 const parent = windowRef.current?.parentElement;
//
//                 if (!parent || !windowRef.current) {
//                     return { x: nextX, y: nextY };
//                 }
//
//                 const parentRect = parent.getBoundingClientRect();
//                 const windowRect = windowRef.current.getBoundingClientRect();
//
//                 return {
//                     x: Math.max(0, Math.min(nextX, parentRect.width - windowRect.width)),
//                     y: Math.max(0, Math.min(nextY, parentRect.height - windowRect.height)),
//                 };
//             });
//
//             setMousePosition({
//                 x: e.clientX,
//                 y: e.clientY,
//             });
//         };
//
//         const handleMouseUp = () => {
//             setIsDragging(false);
//         };
//
//         window.addEventListener("mousemove", handleMouseMove);
//         window.addEventListener("mouseup", handleMouseUp);
//
//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, [isDragging, mousePosition, windowRef]);
//
//     // const header = (
//     //     <div
//     //         onMouseDown={handleMouseDown}
//     //         className={`
//     //     flex
//     //     ${headerDirectionClass}
//     //     gap-1
//     //     bg-[#111111]
//     //     overflow-hidden
//     //     select-none
//     //     p-1
//     //   `}
//     //     >
//     //         {headerChildren.map((component, index) => (
//     //             <React.Fragment key={index}>{component}</React.Fragment>
//     //         ))}
//     //     </div>
//     // );
//     //
//     // const content = (
//     //     <div
//     //         className="
//     //     bg-[#373a3c]
//     //     overflow-auto
//     //     min-w-0
//     //     min-h-0
//     //   "
//     //     >
//     //         {children}
//     //     </div>
//     // );
//
//     return (
//         <div
//             ref={windowRef}
//             className={`
//             absolute
//             grid
//             bg-[#111111]
//             rounded-sm
//             shadow-md/20
//             overflow-hidden
//             resize
//             `}
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 width: `${windowWidth}px`,
//                 height: `${windowHeight}px`,
//                 ...gridStyle,
//             }}
//
//         >
//             {dock === "top" || dock === "left" ? (
//                 <>
//                     <div className=" flex  w-full h-full gap-0.5 " onMouseDown={handleMouseDown}>
//                         {headerComponent}
//                     </div>
//                     <div className="bg-[#373a3c] border-t border-t-white/60 border-t-[0.2px] ">
//                         {bodyComponent}
//
//                     </div>
//                 </>
//
//             ) : (
//                 <>
//                     <div className=" flex  w-full h-full gap-0.5" onMouseDown={handleMouseDown}>
//                         {headerComponent}
//                     </div>
//                     <div className=" border-t border-t-white/60 border-t-[0.2px] window-innerbody-color">
//                         {bodyComponent}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };
//
