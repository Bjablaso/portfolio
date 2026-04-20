// @flow
import GitHubLink from "../../assest/Icons/GitHubLink.tsx";
import LinkedIn from "../../assest/Icons/LinkedIn.tsx";
import HandShake from "../../assest/Icons/HandShake.tsx";


export const FindLinks = () => {
    return (
        <div className="flex flex-row  max-h-30 gap-4  p-2 absolute right-5 bottom-5 leading-4 z-100">
            <GitHubLink/>
            <LinkedIn/>
            <HandShake/>
        </div>
    );
};