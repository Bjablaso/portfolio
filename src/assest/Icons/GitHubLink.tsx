
import links from '../../../portfolio.config.json'
const GitHubLink: React.FC = () => {
    const link = links.ContactLinks[1].link;

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
                className="flex items-center socialfont p-1.5"
                onClick={handleClick}
            >
                <svg
                    className="
                        h-[calc(var(--font-size-hamburger-mobile)*3.5vh)]
                         h-[calc(var(--font-size-hamburger-mobile)*3.5vh)]

                        hover:opacity-25
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 273 267"
                    fill="none"
                >
                    <g filter="url(#filter0_d_19_59)">
                        <path
                            d="M134.554 4.92725C63.9298 4.92725 6.72705 62.1619 6.72705 132.755C6.72705 189.244 43.3496 237.147 94.1289 254.031C100.52 255.234 102.864 251.282 102.864 247.884C102.864 244.848 102.757 236.806 102.704 226.154C67.1467 233.866 59.6475 209.003 59.6475 209.003C53.8314 194.25 45.4268 190.309 45.4268 190.309C33.8477 182.383 46.3215 182.543 46.3215 182.543C59.1575 183.438 65.9004 195.709 65.9004 195.709C77.2984 215.256 95.8227 209.611 103.13 206.34C104.281 198.074 107.572 192.439 111.226 189.243C82.8375 186.048 53.0005 175.055 53.0005 126.076C53.0005 112.121 57.9538 100.723 66.1561 91.7752C64.718 88.5476 60.4039 75.5518 67.2746 57.9436C67.2746 57.9436 77.9801 54.5136 102.427 71.0459C112.653 68.2017 123.519 66.7956 134.384 66.7317C145.249 66.7956 156.115 68.2017 166.341 71.0459C190.628 54.5136 201.333 57.9436 201.333 57.9436C208.204 75.5518 203.89 88.5476 202.612 91.7752C210.761 100.723 215.714 112.121 215.714 126.076C215.714 175.183 185.834 185.995 157.393 189.137C161.867 192.972 166.021 200.812 166.021 212.785C166.021 229.893 165.861 243.634 165.861 247.788C165.861 251.144 168.098 255.138 174.649 253.86C225.791 237.094 262.382 189.158 262.382 132.755C262.382 62.1619 205.147 4.92725 134.554 4.92725Z"
                            fill="var(--color-projectlink-font-color)"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_19_59"
                            x="0.781596"
                            y="0.96361"
                            width="271.509"
                            height="265.179"
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
                                result="effect1_dropShadow_19_59"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_19_59"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            </a>
        </div>
    );
};

export default GitHubLink;
