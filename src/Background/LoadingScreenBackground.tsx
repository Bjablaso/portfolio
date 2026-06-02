import React from "react";

interface LoadingScreenBackgroundProps {
    children?: React.ReactNode;
    className?: string;
}

export function LoadingScreenBackground({
                                            children,
                                            className = "",
                                        }: LoadingScreenBackgroundProps) {
    return (
        <div
            className={`fixed inset-0 overflow-hidden ${className}`}
            style={{ background: "linear-gradient(15deg, #101010 0%, #252525 100%)" }}
        >
            <style>{`
        @keyframes lsb-steam-a {
          0%   { transform: translateY(0px) scaleX(1);    opacity: 0.42; }
          50%  { transform: translateY(-14px) scaleX(1.25); opacity: 0.55; }
          100% { transform: translateY(-28px) scaleX(0.75); opacity: 0; }
        }
        @keyframes lsb-steam-b {
          0%   { transform: translateY(0px) scaleX(1);    opacity: 0.32; }
          50%  { transform: translateY(-11px) scaleX(0.85); opacity: 0.45; }
          100% { transform: translateY(-22px) scaleX(1.15); opacity: 0; }
        }
        @keyframes lsb-pulse   { 0%,100%{opacity:0.82} 50%{opacity:1} }
        @keyframes lsb-breathe { 0%,100%{opacity:0.68} 50%{opacity:0.88} }
        .lsb-steam-1 { animation: lsb-steam-a 3.3s ease-in-out infinite;       transform-origin: center bottom; }
        .lsb-steam-2 { animation: lsb-steam-b 2.9s ease-in-out infinite 0.45s; transform-origin: center bottom; }
        .lsb-steam-3 { animation: lsb-steam-a 3.6s ease-in-out infinite 0.9s;  transform-origin: center bottom; }
        .lsb-glow    { animation: lsb-pulse   4.5s ease-in-out infinite; }
        .lsb-ambient { animation: lsb-breathe 6.5s ease-in-out infinite; }
      `}</style>

            {/* ── Vertical silver gradient ── */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(180,185,192,0.18) 0%, rgba(120,125,132,0.08) 40%, transparent 100%)",
                }}
            />

            {/* ── Ceiling ambient cool-blue light ── */}
            <div
                className="absolute inset-0 lsb-ambient"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 38% at 50% -8%, rgba(48,78,148,0.13) 0%, transparent 100%)",
                }}
            />

            {/* ── SVG Scene ── */}
            <svg
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    {/* Filters */}
                    <filter id="lsb-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" seed="5" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <filter id="lsb-bloom" x="-45%" y="-45%" width="190%" height="190%">
                        <feGaussianBlur stdDeviation="32" />
                    </filter>
                    <filter id="lsb-glow" x="-28%" y="-28%" width="156%" height="156%">
                        <feGaussianBlur stdDeviation="15" />
                    </filter>
                    <filter id="lsb-soft" x="-18%" y="-18%" width="136%" height="136%">
                        <feGaussianBlur stdDeviation="7" />
                    </filter>
                    <filter id="lsb-steam-f" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="2.8" />
                    </filter>

                    {/* Gradients */}
                    <linearGradient id="lsb-desk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#1e2126" />
                        <stop offset="28%"  stopColor="#181a1f" />
                        <stop offset="100%" stopColor="#0d0e11" />
                    </linearGradient>
                    <radialGradient id="lsb-mon-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="rgba(195,210,240,0.42)" />
                        <stop offset="50%"  stopColor="rgba(145,170,220,0.18)" />
                        <stop offset="100%" stopColor="rgba(80,110,175,0)" />
                    </radialGradient>
                    <linearGradient id="lsb-screen" x1="0.15" y1="0" x2="0.85" y2="1">
                        <stop offset="0%"   stopColor="#0a0e15" />
                        <stop offset="42%"  stopColor="#07090d" />
                        <stop offset="100%" stopColor="#050709" />
                    </linearGradient>
                    <radialGradient id="lsb-screen-glow" cx="50%" cy="43%" r="58%">
                        <stop offset="0%"   stopColor="rgba(68,96,152,0.24)" />
                        <stop offset="60%"  stopColor="rgba(38,54,92,0.09)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <linearGradient id="lsb-chin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#262a33" />
                        <stop offset="100%" stopColor="#1c1f26" />
                    </linearGradient>
                    <linearGradient id="lsb-stand" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#13151a" />
                        <stop offset="42%"  stopColor="#282c35" />
                        <stop offset="100%" stopColor="#13151a" />
                    </linearGradient>
                    <radialGradient id="lsb-stand-base" cx="50%" cy="28%" r="72%">
                        <stop offset="0%"   stopColor="#282c35" />
                        <stop offset="100%" stopColor="#14161a" />
                    </radialGradient>
                    <linearGradient id="lsb-refl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="rgba(155,185,240,0.08)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </linearGradient>
                    <linearGradient id="lsb-key" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#1f2228" />
                        <stop offset="100%" stopColor="#141618" />
                    </linearGradient>
                    <linearGradient id="lsb-pot" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#161a1e" />
                        <stop offset="42%"  stopColor="#21252a" />
                        <stop offset="100%" stopColor="#121518" />
                    </linearGradient>
                    <linearGradient id="lsb-mug" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#0e1013" />
                        <stop offset="35%"  stopColor="#1c1f24" />
                        <stop offset="100%" stopColor="#0a0c0e" />
                    </linearGradient>
                    <radialGradient id="lsb-vignette" cx="50%" cy="50%" r="70.7%">
                        <stop offset="32%"  stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
                    </radialGradient>
                </defs>

                {/* ── DESK SURFACE ── */}
                <rect x="0" y="574" width="1440" height="326" fill="url(#lsb-desk)" />
                <rect x="0" y="574" width="1440" height="1.5" fill="rgba(255,255,255,0.055)" />
                <rect x="0" y="575.5" width="1440" height="1" fill="rgba(255,255,255,0.02)" />
                {[6,14,24,38,56,80,110,148].map((y, i) => (
                    <rect key={i} x="0" y={574+y} width="1440" height="1" fill={`rgba(255,255,255,${0.008-i*0.0008})`} />
                ))}

                {/* ── MONITOR BLOOM ── */}
                {/*<ellipse cx="720" cy="358" rx="430" ry="318" fill="url(#lsb-mon-glow)" filter="url(#lsb-bloom)" className="lsb-glow" />*/}
                {/*<ellipse cx="720" cy="352" rx="195" ry="175" fill="rgba(215,225,248,0.14)" filter="url(#lsb-glow)" />*/}

                {/* ── MONITOR BODY ── */}
                {/*<rect x="432" y="124" width="576" height="374" rx="12" fill="#0b0d11" stroke="rgba(75,90,120,0.18)" strokeWidth="1" />*/}
                {/*<rect x="437" y="129" width="566" height="364" rx="8" fill="rgba(0,0,0,0.45)" />*/}
                {/* Screen */}
                {/*<rect x="447" y="138" width="546" height="348" rx="5" fill="url(#lsb-screen)" />*/}
                {/*<rect x="447" y="138" width="546" height="348" rx="5" fill="url(#lsb-screen-glow)" />*/}
                {/*<rect x="447" y="138" width="546" height="55"  rx="5" fill="rgba(255,255,255,0.013)" />*/}
                {/*<rect x="447" y="432" width="546" height="54"  rx="3" fill="rgba(0,0,0,0.22)" />*/}
                {/* Chin */}
                {/*<rect x="432" y="498" width="576" height="32" fill="url(#lsb-chin)" />*/}
                {/*<rect x="432" y="498" width="576" height="1"  fill="rgba(255,255,255,0.065)" />*/}
                {/*<rect x="432" y="529" width="576" height="1"  fill="rgba(0,0,0,0.45)" />*/}
                {/*<ellipse cx="720" cy="514" rx="7" ry="8" fill="rgba(255,255,255,0.025)" />*/}

                {/* ── STAND ── */}
                {/*<path d="M 704,530 L 736,530 L 730,575 L 710,575 Z" fill="url(#lsb-stand)" />*/}
                {/*<path d="M 716,530 L 720,530 L 717,575 L 713,575 Z" fill="rgba(255,255,255,0.038)" />*/}
                {/*<ellipse cx="720" cy="576" rx="110" ry="10.5" fill="url(#lsb-stand-base)" />*/}
                {/*<ellipse cx="720" cy="575" rx="110" ry="10.5" fill="rgba(255,255,255,0.022)" />*/}
                {/*<ellipse cx="720" cy="574" rx="105" ry="8"    fill="rgba(255,255,255,0.012)" />*/}

                {/* ── DESK REFLECTION ── */}
                <ellipse cx="720" cy="580" rx="290" ry="48" fill="url(#lsb-refl)" filter="url(#lsb-glow)" opacity="0.85" />

                {/* ── KEYBOARD ── */}
                {/*<rect x="506" y="602" width="428" height="46" rx="7" fill="url(#lsb-key)" stroke="rgba(255,255,255,0.038)" strokeWidth="1" />*/}
                {/*<rect x="506" y="602" width="428" height="1.5" rx="1" fill="rgba(255,255,255,0.095)" />*/}
                {/*{[0,1,2,3].map((row) => (*/}
                {/*    <rect key={row} x="514" y={607+row*9.5} width="412" height="6" rx="2" fill="rgba(255,255,255,0.02)" />*/}
                {/*))}*/}
                {/*<rect x="506" y="602" width="428" height="46" rx="7" fill="rgba(95,135,215,0.022)" />*/}
                {/*<ellipse cx="720" cy="654" rx="210" ry="6" fill="rgba(0,0,0,0.28)" filter="url(#lsb-soft)" />*/}

                {/* ── MOUSE ── */}
                {/*<ellipse cx="982" cy="624" rx="22" ry="31" fill="#111418" />*/}
                {/*<ellipse cx="982" cy="613" rx="22" ry="22" fill="#191c20" />*/}
                {/*<ellipse cx="978" cy="609" rx="17" ry="15" fill="rgba(255,255,255,0.022)" />*/}
                {/*<rect x="979" y="603" width="6" height="13" rx="3" fill="#0d0f12" />*/}
                {/*<rect x="980" y="604" width="4" height="11" rx="2" fill="#090b0d" />*/}
                {/*<ellipse cx="982" cy="624" rx="22" ry="31" fill="none" stroke="rgba(255,255,255,0.038)" strokeWidth="1" />*/}
                {/*<ellipse cx="982" cy="655" rx="22" ry="5" fill="rgba(0,0,0,0.3)" filter="url(#lsb-soft)" />*/}

                {/* ── PLANT ── */}
                {/*<ellipse cx="228" cy="576" rx="52" ry="8" fill="rgba(0,0,0,0.38)" filter="url(#lsb-soft)" />*/}
                {/*<path d="M 192,574 L 196,524 L 262,524 L 266,574 Z" fill="url(#lsb-pot)" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />*/}
                {/*<rect x="187" y="518" width="84" height="10" rx="3.5" fill="#232729" />*/}
                {/*<rect x="188" y="519" width="82" height="7"  rx="3"   fill="#1b1f23" />*/}
                {/*<ellipse cx="229" cy="522" rx="40" ry="5.5" fill="#0f1113" />*/}
                {/*<path d="M 229,522 C 228,500 226,478 227,462" stroke="#1c2218" strokeWidth="3" fill="none" strokeLinecap="round" />*/}
                {/*<path d="M 225,502 C 194,490 166,474 158,449 C 153,435 161,428 172,433 C 186,439 201,461 216,482 C 221,491 223,498 225,502 Z" fill="#0f1b12" />*/}
                {/*<path d="M 225,502 C 202,478 176,454 167,437" stroke="rgba(28,56,24,0.5)" strokeWidth="0.8" fill="none" />*/}
                {/*<path d="M 233,497 C 264,484 288,467 294,444 C 298,430 289,423 279,429 C 266,436 251,458 241,480 C 237,489 235,494 233,497 Z" fill="#121e14" />*/}
                {/*<path d="M 233,497 C 257,474 278,451 285,436" stroke="rgba(28,56,24,0.45)" strokeWidth="0.8" fill="none" />*/}
                {/*<path d="M 227,480 C 218,456 215,430 218,407 C 220,393 229,389 235,397 C 242,408 242,436 235,463 C 232,474 229,478 227,480 Z" fill="#0d1910" />*/}
                {/*<path d="M 227,480 C 221,453 219,425 222,407" stroke="rgba(25,52,22,0.5)" strokeWidth="0.8" fill="none" />*/}
                {/*<path d="M 221,490 C 199,480 181,463 181,446 C 181,437 187,433 195,438 C 204,445 214,464 219,482 Z" fill="#0c1810" opacity="0.86" />*/}
                {/*<path d="M 235,487 C 256,477 272,461 272,444 C 272,437 266,433 260,439 C 250,447 241,464 237,482 Z" fill="#0e1b13" opacity="0.86" />*/}

                {/* ── COFFEE MUG ── */}
                {/*<ellipse cx="1174" cy="578" rx="40" ry="7.5" fill="rgba(0,0,0,0.42)" filter="url(#lsb-soft)" />*/}
                {/*<path d="M 1140,494 L 1140,563 Q 1140,574 1152,574 L 1198,574 Q 1210,574 1210,563 L 1210,494 Z" fill="url(#lsb-mug)" stroke="rgba(255,255,255,0.032)" strokeWidth="1" />*/}
                {/*<ellipse cx="1175" cy="494" rx="35" ry="6.5" fill="#222629" />*/}
                {/*<ellipse cx="1175" cy="493" rx="33" ry="5"   fill="#151819" />*/}
                {/*<ellipse cx="1175" cy="494" rx="31" ry="4.5" fill="#07050280" />*/}
                {/*<path d="M 1144,508 L 1144,565" stroke="rgba(255,255,255,0.052)" strokeWidth="2.5" strokeLinecap="round" />*/}
                {/*<path d="M 1210,512 Q 1242,512 1242,534 Q 1242,557 1210,557" fill="none" stroke="#1a1d22" strokeWidth="13" strokeLinecap="round" />*/}
                {/*<path d="M 1210,514 Q 1236,514 1236,534 Q 1236,555 1210,555" fill="none" stroke="#0e1013" strokeWidth="8"  strokeLinecap="round" />*/}

                {/* ── STEAM ── */}
                <g filter="url(#lsb-steam-f)">
                    <path d="M 1165,492 C 1162,478 1167,466 1163,455 C 1159,444 1164,433 1161,421" fill="none" stroke="rgba(205,215,232,0.52)" strokeWidth="2.2" strokeLinecap="round" className="lsb-steam-1" />
                    <path d="M 1175,490 C 1178,476 1173,464 1177,453 C 1181,442 1176,431 1179,419" fill="none" stroke="rgba(200,212,230,0.44)" strokeWidth="1.6" strokeLinecap="round" className="lsb-steam-2" />
                    <path d="M 1184,491 C 1187,478 1182,466 1186,455 C 1190,444 1185,433 1188,421" fill="none" stroke="rgba(205,215,232,0.38)" strokeWidth="1.6" strokeLinecap="round" className="lsb-steam-3" />
                </g>

                {/* ── GRAIN ── */}
                <rect width="1440" height="900" fill="rgba(160,160,160,0.9)" filter="url(#lsb-grain)" opacity="0.038" />

                {/* ── VIGNETTE ── */}
                <rect x="0" y="0" width="1440" height="900" fill="url(#lsb-vignette)" />
            </svg>

            {/* ── Monitor CSS bloom ── */}
            {/*<div className="absolute inset-0 pointer-events-none lsb-glow" style={{ background: "radial-gradient(ellipse 30% 42% at 50% 40%, rgba(148,175,230,0.07) 0%, transparent 70%)" }} />*/}

            {/* ── Top cinematic bar ── */}
            <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "13%", background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)" }} />

            {/* ── Bottom depth shadow ── */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "30%", background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)" }} />

            {/* ── Side shadows ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.4) 100%)" }} />

            {children && <div className="relative z-10 w-full h-full">{children}</div>}
        </div>
    );
}


// interface LoadingScreenBackgroundProps {
//     children?: React.ReactNode;
// }
//
// export function LoadingScreenBackground({ children }: LoadingScreenBackgroundProps) {
//     return (
//         <div
//             className="fixed inset-0 overflow-hidden"
//             style={{ background: "linear-gradient(15deg, #101010 0%, #252525 100%)" }}
//         >
//             {/* Vertical silver gradient — top to bottom */}
//             <div
//                 className="absolute inset-0"
//                 style={{
//                     background:
//                         "linear-gradient(to bottom, rgba(180,185,192,0.18) 0%, rgba(120,125,132,0.08) 40%, transparent 100%)",
//                 }}
//             />
//
//             {/* Side vignette */}
//             <div
//                 className="absolute inset-0"
//                 style={{
//                     background:
//                         "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.55) 100%)",
//                 }}
//             />
//
//             {/* Corner vignette */}
//             <div
//                 className="absolute inset-0"
//                 style={{
//                     background:
//                         "radial-gradient(ellipse 75% 72% at 50% 48%, transparent 30%, rgba(0,0,0,0.82) 100%)",
//                 }}
//             />
//
//             {children && <div className="relative z-10 w-full h-full">{children}</div>}
//         </div>
//     );
// }
