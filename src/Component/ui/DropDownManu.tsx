import * as React from "react";
import { createPortal } from "react-dom";

import { GlassContainer_two } from "./GlassContainer.tsx";
import type {dropManuItems, RunningWindow} from "../../Interfaces/WindowIteface.ts";
import {useWindowContext} from "../../Context/useWindowContext.ts";

interface DropDownManuProps {
    dropItems?: dropManuItems[];
    anchorRect?: DOMRect | null;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const DropDownManu: React.FC<DropDownManuProps> = ({
                                                              dropItems,
                                                              anchorRect,
                                                              onMouseEnter,
                                                              onMouseLeave,
                                                          }) => {
    //const {windowState, openApplication}=useWindowContext()

    if (!anchorRect || !dropItems?.length) return null;

    // const performAction = (window: RunningWindow)=.{
    //     switch (action: String){
    //         case
    //     }
    // }

    return createPortal(
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: "fixed",
                top: `${anchorRect.bottom + 2}px`,
                left: `${anchorRect.left}px`,
                zIndex: 99999,
                pointerEvents: "auto",
            }}
        >

            <GlassContainer_two
                padding="none"
                blur="sm"
                gloss={true}
                border={true}
                shadow="sm"
                variant="default"
                rounded="lg"
                containerDirection="column"
                className="gap-0 items-stretch overflow-hidden min-w-fit pt-1 pb-1"
            >
                {dropItems.map((item, index) => (
                    <React.Fragment key={`${item.description}-${index}`}>
                        <div
                            onClick={item.action}
                            style={{
                                padding: "1px 6px",
                                fontSize: "0.45rem",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#3b82f6";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            {item.description}
                        </div>

                        {index !== dropItems.length - 1 && (
                            <div
                                style={{
                                    margin: "0px 0",
                                    height: "1px",
                                    background: "rgba(255,255,255,0.2)",
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </GlassContainer_two>
        </div>,
        document.body
    );
};