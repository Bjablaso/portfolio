import * as React from "react";

interface GlassDropDownContainerProps {
    children: React.ReactNode;
}

export const GlassDropDownContainer: React.FC<GlassDropDownContainerProps> = ({
                                                                                  children,
                                                                              }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "120px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(15, 15, 15, 0.58)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                color: "white",
                boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    );
};