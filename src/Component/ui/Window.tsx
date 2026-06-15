// import * as React from "react";
// import {useEffect, useState} from "react";
// import {WindowContentBody} from "./WindowSystem/WindowContentBody.tsx";
// import {WindowHeader} from "./WindowSystem/WindowHeader.tsx";
// import {useWindowContext} from "../../Context/useWindowContext.ts";
//
//
// interface initalPosition {
//     initialX: number;
//     initialY: number;
//     hashNumber: number;
// }
// export const Window: React.FC<initalPosition> = ({initialX, initialY, hashNumber}) => {
//     const [position, setPosition] = useState({
//         x: initialX,
//         y: initialY,
//     });
//
//     const [isDragging, setIsDragging] = useState(false);
//
//     const [mousePosition, setMousePosition] = useState({
//         x: 0,
//         y: 0,
//     });
//     const { windowRef} = useWindowContext();
//
//     // Only starts dragging when Header is clicked
//     const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//         e.preventDefault();
//
//         setIsDragging(true);
//
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
//                     return {
//                         x: nextX,
//                         y: nextY,
//                     };
//                 }
//
//                 const parentRect = parent.getBoundingClientRect();
//                 const windowRect = windowRef.current.getBoundingClientRect();
//
//                 return {
//                     x: Math.max(
//                         0,
//                         Math.min(nextX, parentRect.width - windowRect.width)
//                     ),
//                     y: Math.max(
//                         0,
//                         Math.min(nextY, parentRect.height - windowRect.height)
//                     ),
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
//     }, [isDragging, mousePosition]);
//
//
//     return (
//         <div
//             className="
//                 grid
//                 grid-rows-[32px_1fr]
//                 bg-[#111111]
//                 min-h-45
//                 min-w-70
//                 absolute
//                 shadow-md/20
//                 overflow-auto
//                 resize
//                 text-inherit
//                 rounded-sm
//                 scroll-auto
//             "
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//             }}
//             ref={windowRef}
//         >
//             {/* Header - Draggable Area */}
//             <div
//                 className={`
//                     select-none
//                     flex
//                     items-center
//                 `}
//                 onMouseDown={handleMouseDown}
//             >
//                 <WindowHeader hashParent={hashNumber} />
//             </div>
//
//
//             <div className="bg-[#373a3c]  ">
//                 <WindowContentBody/>
//             </div>
//         </div>
//     );
// };