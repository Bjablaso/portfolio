import {
    useState,
    useCallback,
    useId,
    cloneElement,
    Children,
    type ReactElement,
} from "react";

interface GradientConfig {
    stops: string[];
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}

function randomGradient(): GradientConfig {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 70 + Math.floor(Math.random() * 110)) % 360;
    const hue3 = (hue2 + 70 + Math.floor(Math.random() * 110)) % 360;
    const angleDeg = Math.floor(Math.random() * 360);
    const rad = (angleDeg * Math.PI) / 180;
    // Map angle to SVG gradient vector (objectBoundingBox units)
    const x2 = (0.5 + 0.5 * Math.cos(rad)).toFixed(4);
    const y2 = (0.5 + 0.5 * Math.sin(rad)).toFixed(4);
    const x1 = (0.5 - 0.5 * Math.cos(rad)).toFixed(4);
    const y1 = (0.5 - 0.5 * Math.sin(rad)).toFixed(4);
    return {
        stops: [
            `hsl(${hue1},85%,65%)`,
            `hsl(${hue2},85%,65%)`,
            `hsl(${hue3},85%,65%)`,
        ],
        x1,
        y1,
        x2,
        y2,
    };
}

interface GradientSvgIconProps {
    /** A single lucide-react (or any) SVG icon element */
    children: ReactElement;
    /** Re-roll on click */
    clickable?: boolean;
}

/**
 * Wraps an SVG icon and paints its stroke with a random linear gradient.
 * Uses a hidden <defs> block + cloneElement to inject url(#id) onto the stroke.
 */
export function GradientSvgIcon({
                                    children,
                                    clickable = true,
                                }: GradientSvgIconProps) {
    const rawId = useId();
    // useId can produce colons which are invalid in url() references — sanitise
    const gradId = `gsi-${rawId.replace(/:/g, "")}`;

    const [grad, setGrad] = useState<GradientConfig>(randomGradient);

    const reroll = useCallback(() => {
        if (clickable) setGrad(randomGradient());
    }, [clickable]);

    const child = Children.only(children) as ReactElement<{ style?: React.CSSProperties }>;

    // Override the SVG element's stroke via CSS (beats the presentation attribute)
    const patched = cloneElement(child, {
        style: {
            ...(child.props.style ?? {}),
            stroke: `url(#${gradId})`,
        },
    });

    return (
        <span
            onClick={reroll}
            style={{
                display: "inline-flex",
                cursor: clickable ? "pointer" : "default",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
      {/* Hidden gradient definition — referenced by url(#id) in the same document */}
            <svg
                aria-hidden
                style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
            >
        <defs>
          <linearGradient
              id={gradId}
              x1={grad.x1}
              y1={grad.y1}
              x2={grad.x2}
              y2={grad.y2}
              gradientUnits="objectBoundingBox"
          >
            {grad.stops.map((color, i) => (
                <stop
                    key={i}
                    offset={`${(i / (grad.stops.length - 1)) * 100}%`}
                    stopColor={color}
                />
            ))}
          </linearGradient>
        </defs>
      </svg>

            {patched}
    </span>
    );
}
