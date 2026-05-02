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
                            ${activeIndex === index ? "bg-white/20 text-white" :
                            "text-white hover:bg-white/10"}
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
// Create a store and move all action to that store and trigger custom even -> complecated
