import type { dropManuItems } from "./ManuBar.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface DropDownManuProps {
    dropItems?: dropManuItems[];
    anchorRef: React.RefObject<HTMLDivElement | null>;  // ← pass the label element
}

export const DropDownManu: React.FC<DropDownManuProps> = ({ dropItems, anchorRef }) => {
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
    }, [anchorRef]);

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'absolute',
                top: coords.top,
                left: coords.left,
                zIndex: 1,
                minWidth: '140px',
                background: 'rgba(30, 30, 30, 0.85)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '6px',
                padding: '4px 0',
            }}
        >
            {dropItems?.map((item, index) => {
                if (item.description === "---") {
                    return (
                        <div
                            key={index}
                            style={{
                                height: '1px',
                                background: 'rgba(255,255,255,0.12)',
                                margin: '2px 8px',
                            }}
                        />
                    );
                }
                return (
                    <div
                        key={index}
                        onClick={item.action}
                        style={{
                            padding: '2px 12px',
                            fontSize: '0.4rem',
                            color: 'rgba(255,255,255,0.9)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#3478f6')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        {item.description}
                    </div>
                );
            })}
        </div>,
        document.body
    );
};