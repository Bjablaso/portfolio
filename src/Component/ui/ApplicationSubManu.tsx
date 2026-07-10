import * as React from "react";
import { useRef, useState } from "react";
import { DropDownManu } from "./DropDownManu.tsx";
import type {SubItem} from "../../Interfaces/WindowIteface.ts";

interface ApplicationSubManuProps {
    subItem: SubItem[];
    onItemClick?: (item: SubItem) => void;
}

export const ApplicationSubManu: React.FC<ApplicationSubManuProps> = ({
                                                                          subItem,
                                                                          onItemClick,
                                                                      }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const scheduleClose = () => {
        cancelClose();

        closeTimer.current = setTimeout(() => {
            setActiveIndex(null);
            setAnchorRect(null);
        }, 120);
    };

    const openMenu = (index: number) => {
        cancelClose();

        const item = itemRefs.current[index];
        if (!item) return;

        setAnchorRect(item.getBoundingClientRect());
        setActiveIndex(index);
    };

    const handleClick = (item: SubItem, index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            setAnchorRect(null);
        } else {
            openMenu(index);
        }

        onItemClick?.(item);
    };

    const activeItem = activeIndex !== null ? subItem[activeIndex] : null;

    return (
        <>
            <div className="relative flex flex-row gap-1 text-[0.4rem] font-light items-center"
            >
                {subItem.map((appManuItem, index) => (
                    <div
                        key={`${appManuItem.itemName}-${index}`}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        onMouseEnter={() => openMenu(index)}
                        onMouseLeave={scheduleClose}
                        onClick={() => handleClick(appManuItem, index)}
                        className={`
                            cursor-pointer px-1.5 py-0.5 rounded-[4px] select-none 
                            ${
                            activeIndex === index
                                ? "bg-white/20 text-white"
                                : "text-white hover:bg-white/10"
                        }
                        `}
                    >
                        {appManuItem.itemName === "Preview" ?
                            <div className="text-center font-bold">{appManuItem.itemName}</div>
                            :
                            <div>{appManuItem.itemName} </div>
                        }

                    </div>
                ))}
            </div>

            {activeItem?.dopItemList && activeItem.dopItemList.length > 0 && (
                <DropDownManu
                    dropItems={activeItem.dopItemList}
                    anchorRect={anchorRect}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    parentItemName={activeItem.itemName}
                />
            )}
        </>
    );
};

