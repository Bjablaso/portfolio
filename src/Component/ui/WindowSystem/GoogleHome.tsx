import { useState } from "react";
import { Search, Mic, Camera, Plus, Sparkles, Grid3X3, FlaskConical } from "lucide-react";

export default function GoogleHome() {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <div className="w-full h-full bg-[#111111] flex flex-col text-white font-sans">

            {/* Top nav */}
            <nav className="flex items-center justify-end gap-4 px-6 py-3">
                <a href="#" className="text-sm text-[#e8eaed] hover:underline">Gmail</a>
                <a href="#" className="text-sm text-[#e8eaed] hover:underline">Images</a>
                <button className="text-[#e8eaed] hover:bg-white/10 p-2 rounded-full transition-colors">
                    <FlaskConical size={20} />
                </button>
                <button className="text-[#e8eaed] hover:bg-white/10 p-2 rounded-full transition-colors">
                    <Grid3X3 size={20} />
                </button>
                <button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
                    Sign in
                </button>
            </nav>

            {/* Center content */}
            <main className="flex-1 flex flex-col items-center justify-center gap-8 -mt-16">

                {/* Google logo */}
                <div className="flex items-center gap-0 select-none">
                    <span className="text-[#4285f4] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>G</span>
                    <span className="text-[#ea4335] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>o</span>
                    <span className="text-[#fbbc05] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>o</span>
                    <span className="text-[#4285f4] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>g</span>
                    <span className="text-[#34a853] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>l</span>
                    <span className="text-[#ea4335] text-7xl font-normal tracking-tight" style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}>e</span>
                </div>

                {/* Search bar */}
                <div className="w-full max-w-[584px] px-4">
                    <div
                        className={`
              flex items-center gap-3 bg-[#303134] rounded-full px-5 py-3
              border transition-all duration-200
              ${focused
                            ? "border-[#5f6368] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                            : "border-[#5f6368] hover:bg-[#3c4043] hover:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                        }
            `}
                    >
                        {/* Plus */}
                        <button className="text-[#9aa0a6] hover:text-white transition-colors flex-shrink-0">
                            <Plus size={18} />
                        </button>

                        {/* Input */}
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder="Ask Google"
                            className="flex-1 bg-transparent outline-none text-[#e8eaed] text-base placeholder-[#9aa0a6] caret-white"
                        />

                        {/* Right icons */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {query.length === 0 ? (
                                <>
                                    <button className="text-[#9aa0a6] hover:text-white transition-colors">
                                        <Mic size={20} />
                                    </button>
                                    <button className="text-[#9aa0a6] hover:text-white transition-colors">
                                        <Camera size={20} />
                                    </button>
                                    <button className="flex items-center gap-1.5 bg-[#1a1a2e] hover:bg-[#1557b0]/30 border border-[#5f6368] text-[#e8eaed] text-sm px-3 py-1 rounded-full transition-colors">
                                        <Sparkles size={14} className="text-[#8ab4f8]" />
                                        AI Mode
                                    </button>
                                </>
                            ) : (
                                <button className="text-[#9aa0a6] hover:text-white transition-colors">
                                    <Search size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Search buttons */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <button className="bg-[#303134] hover:bg-[#3c4043] text-[#e8eaed] text-sm px-4 py-2 rounded border border-transparent hover:border-[#5f6368] transition-all">
                            Google Search
                        </button>
                        <button className="bg-[#303134] hover:bg-[#3c4043] text-[#e8eaed] text-sm px-4 py-2 rounded border border-transparent hover:border-[#5f6368] transition-all">
                            I'm Feeling Lucky
                        </button>
                    </div>

                    {/* Language line */}
                    <p className="text-center text-sm text-[#bdc1c6] mt-6">
                        Google offered in:{" "}
                        <a href="#" className="text-[#8ab4f8] hover:underline">Español</a>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#171717] border-t border-[#3c4043]">
                <div className="px-6 py-3 text-sm text-[#9aa0a6]">
                    United States
                </div>
                <div className="border-t border-[#3c4043] px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#9aa0a6]">
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">Advertising</a>
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">Business</a>
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">How Search works</a>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">Privacy</a>
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">Terms</a>
                        <a href="#" className="hover:underline hover:text-[#e8eaed] transition-colors">Settings</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}