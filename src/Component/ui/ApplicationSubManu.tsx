import * as React from "react";
import { useState, useEffect, useRef } from "react";
import type { SubItem } from "./ManuBar.tsx";
import { DropDownManu } from "./DropDownManu.tsx";

interface ApplicationSubManuProps {
    subItem: SubItem[];
    onItemClick?: (item: SubItem) => void;
}

export const ApplicationSubManu: React.FC<ApplicationSubManuProps> = ({ subItem, onItemClick }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // One ref per menu item label
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setActiveIndex(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={containerRef} className="flex flex-row gap-1 text-[0.4rem] font-light items-center">
            {subItem.map((appManuItem, index) => (
                <div
                    key={`${appManuItem.itemName}${index}`}
                    className="relative"
                    ref={el => { labelRefs.current[index] = el; }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={(e) => {
                        const related = e.relatedTarget as Node;
                        if (containerRef.current && !containerRef.current.contains(related)) {
                            setActiveIndex(null);
                        }
                    }}
                >
                    <div
                        onClick={() => {
                            setActiveIndex(activeIndex === index ? null : index);
                            onItemClick?.(appManuItem);
                        }}
                        className={`
                            cursor-pointer px-1.5 py-0.5 rounded-[4px] select-none
                            ${activeIndex === index ? "bg-white/20 text-white" : "text-white hover:bg-white/10"}
                        `}
                    >
                        {appManuItem.itemName}
                    </div>

                    {/* Portal dropdown — escapes all overflow:hidden parents */}
                    {activeIndex === index &&
                        appManuItem.dopItemList &&
                        appManuItem.dopItemList.length > 0 && (
                            <DropDownManu
                                dropItems={appManuItem.dopItemList}
                                anchorRef={{ current: labelRefs.current[index] }}
                            />
                        )}
                </div>
            ))}
        </div>
    );
};

// import * as React from "react";
// import type {SubItem} from "./ManuBar.tsx";
// import {useState} from "react";
// import {DropDownManu} from "./DropDownManu.tsx";
//
//
//
//
// interface ApplicationSubManuProps {
//     subItem: SubItem[];
//     onItemClick?: (item: SubItem) => void;
// }
//
// // add  onItemClick click to  ApplicationSubManu manu later when active turn all manu button off and only current manu button stay
// export const ApplicationSubManu: React.FC<ApplicationSubManuProps> = ({subItem, onItemClick}) => {
//     //const [isActive, setActive] = useState<boolean>(false) //set this to true
//     const [activeIndex, setActiveIndex] = useState<number | null>(null);
//     return(
//         <div className="flex flex-row gap-1 text-[0.4rem] text-center  font-light items-center">
//             {
//                 subItem.map((appManuItem, index)=>{
//                     return(
//                         <>
//                             <div key={`${appManuItem.itemName}${index}`}
//                                  onClick={()=> {
//                                      const result = onItemClick?.(appManuItem);
//                                      setActiveIndex(index);
//                                      console.log("Callback returned:", result);
//                                  }}
//                                  className="relative inline-block"
//                             >
//                                 { activeIndex === index ?
//                                     <div className={`cursor-pointer px-2 py-1 ${ activeIndex === index ? "bg-gray-300 rounded-[25px]" : "" }  `}>
//                                         {appManuItem.itemName}
//                                         {/*{  appManuItem.itemName}  // replace dive with lear glass that*/}
//                                     </div>
//
//                                    :
//                                     appManuItem.itemName
//
//                                 }
//                                 {/*{appManuItem.itemName} // wrap in class contianer it active when not active show as it */}
//                             </div>
//                             { activeIndex === index &&
//                                 <div className={`flex min-h-5 min w-10 border border-amber-300 absolute top-5`}
//                                      style={{ left: `${appManuItem.dropManuPosition}px` }}
//                                 >
//                                     <DropDownManu dropItems={appManuItem?.dopItemList ?? []} />
//                                 </div>
//
//                             }
//
//
//                             {/*if item is click down display application manu sub manu list */}
//                         </>
//
//                     )
//                 })
//             }
//
//         </div>
//     )
// }