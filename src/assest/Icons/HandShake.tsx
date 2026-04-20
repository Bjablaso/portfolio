
import links from '../../../portfolio.config.json'
const HandShake: React.FC = () => {
    const link = links.ContactLinks[2].link;

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

                        hover:opacity-25
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 209 243"
                    fill="none"
                >
                    <g filter="url(#filter0_d_20_61)">
                        <path
                            d="M198.582 4.81812L151.91 230.745H101.439L122.033 131.601L69.8002 168.248L56.8273 230.745H6.34546L53.017 4.81812H103.477L78.3019 127.308L130.381 90.9529L148.111 4.81812H198.582Z"
                            fill="var(--color-projectlink-font-color)"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_20_61"
                            x="0.400004"
                            y="0.854479"
                            width="208.091"
                            height="241.782"
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
                                result="effect1_dropShadow_20_61"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_20_61"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
                {/* <div>HandShake</div> */}
            </a>
        </div>
    );
};

export default HandShake;
