interface LoadingScreenBackgroundProps {
    children?: React.ReactNode;
}

export function LoadingScreenBackground({ children }: LoadingScreenBackgroundProps) {
    return (
        <div
            className="fixed inset-0 overflow-hidden"
            style={{ background: "linear-gradient(15deg, #101010 0%, #252525 100%)" }}
        >
            {/* Vertical silver gradient — top to bottom */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(180,185,192,0.18) 0%, rgba(120,125,132,0.08) 40%, transparent 100%)",
                }}
            />

            {/* Side vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.55) 100%)",
                }}
            />

            {/* Corner vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 75% 72% at 50% 48%, transparent 30%, rgba(0,0,0,0.82) 100%)",
                }}
            />

            {children && <div className="relative z-10 w-full h-full">{children}</div>}
        </div>
    );
}
