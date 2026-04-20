// @flow

import {Edge} from "../../assest/Icons/Edge.tsx";
import {Finder} from "../../assest/Icons/Finder.tsx";
import {GlassContainer_two} from "./GlassContainer.tsx";
import Divider from "./Divider.tsx";
import {ManuBar} from "./ManuBar.tsx";


export const DeskTop = () => {


    return (
        <div
            // className={onEnter ? "desktopPointer" : "pagepointer "}
             style={{
                 display: "grid",
                 width: "100%",
                 height:"100%",
                 gridTemplateRows: "22px 1fr 40px",
                 fontSmooth: 'always',
                 WebkitFontSmoothing: 'subpixel-antialiased',
                 textRendering: 'optimizeLegibility',
                 backgroundImage: 'url("src/assest/images/mountainview.jpg")',  // 👈 add here
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}
            // onMouseEnter={() => {
            //     setpointEnter(true)
            // }}
            // onMouseLeave={() => {
            //     setpointEnter(false)
            //
            // }}
        >
            <nav className="flex w-full h-full px-1.25  py-0.5 justify-between text-white font-light">
                <ManuBar/>
            </nav>

            <main className="border border-amber-500">

            </main>
            <footer className="flex w-full h-full justify-center pt-1.5 ">
                <GlassContainer_two
                    padding="sm"
                    className="bottom-1 items-center"
                    blur="sm"
                    gloss={true}
                    border={true}
                    shadow="lg"
                    variant="default"
                    rounded="md"
                >
                    <Finder/>
                    <Edge/>
                    <Divider/>
                </GlassContainer_two>


            </footer>



        </div>
    );
};