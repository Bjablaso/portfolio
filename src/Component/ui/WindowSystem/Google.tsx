// @flow
// import * as React from 'react';


import {Camera, FlaskConical, Grid3X3, Mic, Plus, Search} from "lucide-react";
import {useState} from "react";

export const Google = () => {
   // const [focus, setFocused] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="grid grid-rows-[15%_70%_15%] w-full h-full ">
            <div className="flex  justify-end">
                <nav className="flex flex-row items-center gap-0.5">
                    <a href="#" className="text-[0.3rem] text-[#e8eaed] hover:underline ">Gmail</a>
                    <a href="#" className="text-[0.3rem] text-[#e8eaed] hover:underline ">Images</a>
                    <button className="flex items-center text-[#e8eaed] rounded-full transition-colors">
                        <FlaskConical size={8} className="hover:opacity-75" />
                    </button>
                    <button className="flex items-center text-[#e8eaed]  pr-2 rounded-full transition-colors">
                        <Grid3X3 size={8} className="hover:opacity-75" />
                    </button>
                </nav>
            </div>
            <main className="flex  justify-center items-center ">
                <div className="flex flex-col w-[70%] h-[80%] justify-center items-center gap-1 ">
                    {/*<div className="flex min-w-[20%] border-2 border-blue-600">*/}
                    <div className="flex items-center gap-0 select-none">
                        <span className="text-[#4285f4] text-[1.2rem] font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>G</span>
                        <span className="text-[#ea4335] text-[1.2rem]  font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>o</span>
                        <span className="text-[#fbbc05] text-[1.2rem]  font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>o</span>
                        <span className="text-[#4285f4] text-[1.2rem] font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>g</span>
                        <span className="text-[#34a853] text-[1.2rem]  font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>l</span>
                        <span className="text-[#ea4335] text-[1.2rem]  font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>e</span>
                    </div>
                    {/*</div>*/}
                    <div
                        className={`
                      flex flex-row items-center gap-1 bg-white rounded-full  px-1
                      w-[90%]
                      h-[20%]
                     
                    `}
                    >
                        <button className="text-black hover:text-white transition-colors flex-shrink-0">
                            <Plus size={8} />
                        </button>

                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            // onFocus={() => setFocused(true)}
                            // onBlur={() => setFocused(false)}
                            onMouseDown={e => e.stopPropagation()}
                            placeholder="Ask Google"
                            className="flex-1 w-[60%] h-full
                           bg-transparent outline-none text-black placeholder-[#9aa0a6] caret-black"
                        />

                        <div className="flex items-center gap-0.5 flex-shrink-0 ">
                            {query.length === 0 ? (
                                <>
                                    <button className="text-black hover:text-white transition-colors">
                                        <Mic size={8} />
                                    </button>
                                    <button className="text-black hover:text-white transition-colors">
                                        <Camera size={8} />
                                    </button>
                                </>
                            ) : (
                                <button className="text-black hover:text-white transition-colors">
                                    <Search size={8} />
                                </button>
                            )}
                        </div>


                    </div>
                </div>

            </main>

            <div></div>
        </div>
    );
};