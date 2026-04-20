
import links from '../../../portfolio.config.json'
const LinkedIn: React.FC = () => {
    const link = links.ContactLinks[0].link;

    const handleClick = () => {
        console.log(link);
    };

    return (
        <div className="flex items-center justify-center object-contain
          rounded-full border border-nav_bootom_border-light animate-float
        ">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center socialfont p-1.5"
                onClick={handleClick}
            >
                <svg
                    className="
                            h-[calc(var(--font-size-hamburger-mobile)*3.5vh)]
                         h-[calc(var(--font-size-hamburger-mobile)*3.5vh)]

                        fill-[var(--color-projectlink-font-color)]
                        hover:opacity-25
                    "

                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 241 268"
                    fill="none"
                >
                    {/* SVG paths and filters preserved exactly */}
                    <g filter="url(#filter0_d_19_55)">
                        <path
                            d="M7.91699 29.1046C7.91699 35.3942 10.1454 41.4262 14.112 45.8736C18.0786 50.3211 23.4585 52.8196 29.0682 52.8196C34.6778 52.8196 40.0577 50.3211 44.0243 45.8736C47.9909 41.4262 50.2194 35.3942 50.2194 29.1046C50.2194 22.815 47.9909 16.783 44.0243 12.3356C40.0577 7.88818 34.6778 5.38965 29.0682 5.38965C23.4585 5.38965 18.0786 7.88818 14.112 12.3356C10.1454 16.783 7.91699 22.815 7.91699 29.1046Z"
                            stroke="var(--color-projectlink-font-color)"
                            strokeWidth="1.98182"
                            strokeLinejoin="round"
                            shapeRendering="crispEdges"
                        />
                    </g>
                    <g filter="url(#filter1_d_19_55)">
                        <path
                            d="M7.91699 254.397V88.3921H50.2194V254.397H7.91699ZM76.6584 88.3921V254.397H118.961V172.485C118.961 159.537 129.536 135.822 160.153 135.822C177.528 135.822 187.702 145.842 187.702 165.466V254.397H230.004V165.466C230.004 149.944 226.705 130.64 215.262 114.751C203.164 97.9492 184.455 88.3921 160.163 88.3921C144.162 88.3921 130.181 95.6844 118.961 104.589V88.3921H76.6584Z"
                            stroke="var(--color-projectlink-font-color)"
                            strokeWidth="1.98182"
                            strokeLinejoin="round"
                            shapeRendering="crispEdges"
                        />
                    </g>
                    <defs>
                        {/* Filters preserved exactly */}
                        <filter
                            id="filter0_d_19_55"
                            x="0.980571"
                            y="0.435045"
                            width="60.1387"
                            height="65.2664"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="1.98182" dy="3.96364" />
                            <feGaussianBlur stdDeviation="3.96364" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_19_55"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_19_55"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter1_d_19_55"
                            x="0.980571"
                            y="83.4375"
                            width="239.924"
                            height="183.841"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="1.98182" dy="3.96364" />
                            <feGaussianBlur stdDeviation="3.96364" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_19_55"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_19_55"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
                {/* <span>LinkedIn</span> */}
            </a>
        </div>
    );
};

export default LinkedIn;
