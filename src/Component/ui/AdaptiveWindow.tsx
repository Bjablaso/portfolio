// @flow
import {useWindowContext} from "../../Context/useWindowContext.ts";
import {useEffect, useState} from "react";
import * as React from "react";


export type WindowHeaderPosition = "top" | "bottom" | "left" | "right";

type WindowHeaderSize = "sm" | "md" | "lg" | "xl";

const headerSizeMap: Record<WindowHeaderSize, string> = {
    sm: "10%",
    md: "15%",
    lg: "20%",
    xl: "30%",
};

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
   // children: React.ReactNode;
}
//array of childread no that will pass to the header
export const AdaptiveWindow: React.FC<AdaptiveWindowProps> = ({
                                                                  initialX,
                                                                  initialY,
                                                                  windowWidth = 500,
                                                                  windowHeight = 300,
                                                                  dock = "top",
                                                                  headerSize = "md",
                                                                    //hashNumber,
                                                                    bodyComponent,
                                                                  headerComponent,
                                                                //  headerChildren = [],
                                                                  //children,
                                                              }) => {
    const [position, setPosition] = useState({
        x: initialX,
        y: initialY,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { windowRef } = useWindowContext();

    const isHorizontalHeader = dock === "top" || dock === "bottom";
    const headerPercent = headerSizeMap[headerSize];

    const gridStyle: React.CSSProperties = isHorizontalHeader
        ? {
            gridTemplateRows:
                dock === "top"
                    ? `${headerPercent} 1fr`
                    : `1fr ${headerPercent}`,
        }
        : {
            gridTemplateColumns:
                dock === "left"
                    ? `${headerPercent} 1fr`
                    : `1fr ${headerPercent}`,
        };

    // const headerDirectionClass = isHorizontalHeader
    //     ? "flex-row items-center"
    //     : "flex-col items-center";

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragging(true);
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            const deltaX = e.clientX - mousePosition.x;
            const deltaY = e.clientY - mousePosition.y;

            setPosition((prev) => {
                const nextX = prev.x + deltaX;
                const nextY = prev.y + deltaY;

                const parent = windowRef.current?.parentElement;

                if (!parent || !windowRef.current) {
                    return { x: nextX, y: nextY };
                }

                const parentRect = parent.getBoundingClientRect();
                const windowRect = windowRef.current.getBoundingClientRect();

                return {
                    x: Math.max(0, Math.min(nextX, parentRect.width - windowRect.width)),
                    y: Math.max(0, Math.min(nextY, parentRect.height - windowRect.height)),
                };
            });

            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, mousePosition, windowRef]);

    // const header = (
    //     <div
    //         onMouseDown={handleMouseDown}
    //         className={`
    //     flex
    //     ${headerDirectionClass}
    //     gap-1
    //     bg-[#111111]
    //     overflow-hidden
    //     select-none
    //     p-1
    //   `}
    //     >
    //         {headerChildren.map((component, index) => (
    //             <React.Fragment key={index}>{component}</React.Fragment>
    //         ))}
    //     </div>
    // );
    //
    // const content = (
    //     <div
    //         className="
    //     bg-[#373a3c]
    //     overflow-auto
    //     min-w-0
    //     min-h-0
    //   "
    //     >
    //         {children}
    //     </div>
    // );

    return (
        <div
            ref={windowRef}
            className={`
            absolute
            grid
            bg-[#111111]
            rounded-sm
            shadow-md/20
            overflow-hidden
            resize
            `}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${windowWidth}px`,
                height: `${windowHeight}px`,
                ...gridStyle,
            }}
            onMouseDown={handleMouseDown}
        >
            {dock === "top" || dock === "left" ? (
                <>
                    <div className="border-2 border-amber-200 flex  w-full h-full gap-0.5">
                        {headerComponent}
                    </div>
                    <div className="border-3 border-green-500">
                        {bodyComponent}

                    </div>
                </>

            ) : (
                <>
                    <div className="border-2 border-amber-200 flex  w-full h-full gap-0.5">
                        {headerComponent}
                    </div>
                    <div className="border-3 border-green-500">
                        {bodyComponent}
                    </div>
                </>
            )}
        </div>
    );
};

