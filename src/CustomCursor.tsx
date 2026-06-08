import { useEffect, useState } from "react";

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });

            const target = e.target as HTMLElement;
            setHovering(Boolean(target.closest(".hoverable")));
        };

        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);

    return (
        <>
            <div
                className="
                    pointer-events-none fixed left-0 top-0 z-[9999]
                    hidden md:block
                    mix-blend-difference
                    transition-transform duration-300 ease-out
                "
                style={{
                    transform: `translate(${position.x - 15}px, ${position.y - 15}px) scale(${hovering ? 4 : 1})`,
                }}
            >
                <svg height="30" width="30">
                    <circle cx="15" cy="15" r="12" fill="#f7f8fa" />
                </svg>
            </div>

            <div
                className="
                    pointer-events-none fixed left-0 top-0 z-[9999]
                    hidden md:block
                    mix-blend-difference
                    transition-transform duration-75 ease-out
                "
                style={{
                    transform: `translate(${position.x - 5}px, ${position.y - 5}px)`,
                }}
            >
                <svg height="10" width="10">
                    <circle cx="5" cy="5" r="4" fill="#f7f8fa" />
                </svg>
            </div>
        </>
    );
};