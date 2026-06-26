import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    RotateCw,
    Search,
    Sparkles,
    FilePenLine,
    PanelRight,
    Puzzle,
    UserCircle,
    MoreVertical,
} from "lucide-react";

interface SearchBarBodyProps {
    onSearch?: (query: string) => void;
    defaultValue?: string;
}

export const SearchBarBody = ({
                                  onSearch,
                                  defaultValue = "",
                              }: SearchBarBodyProps) => {
    const [query, setQuery] = useState(defaultValue);

    const iconClass = "w-[var(--window-icon-md)] h-[var(--window-icon-md)]";

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const cleanQuery = query.trim();
        if (!cleanQuery) return;

        onSearch?.(cleanQuery);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[12%_1fr_22%] w-full h-full items-center window-gap-sm window-px-sm text-white
            window-innerbody-color"
        >
            {/* Nav controls */}
            <div className="flex items-center justify-center window-gap-sm text-white/60">
                <ArrowLeft className={iconClass} />
                <ArrowRight className={iconClass} />
                <RotateCw className={iconClass} />
            </div>

            {/* Search bar */}
            <div className="flex items-center h-[70%] bg-[#3a3a3a] border border-blue-400 overflow-hidden window-rounded-xxxl window-px-sm">
                <Search className={`${iconClass} shrink-0`} />

                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="flex-1 min-w-0 bg-transparent outline-none window-text-sm text-white placeholder:text-white/40 window-px-sm"
                    placeholder="Search Google or type a URL"
                />

                <button
                    type="submit"
                    className="flex items-center h-[75%] window-px-sm window-gap-sm bg-[#075985] text-blue-100 font-semibold window-text-sm window-rounded-xxxl shrink-0"
                >
                    <Sparkles className="w-[var(--window-icon-sm)] h-[var(--window-icon-sm)]" />
                    AI Mode
                </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center justify-evenly text-white/70">
                <FilePenLine className={iconClass} />
                <PanelRight className={iconClass} />
                <Puzzle className={iconClass} />

                <div className="w-[1px] h-[var(--window-icon-lg)] bg-white/20" />

                <UserCircle className="w-[var(--window-icon-lg)] h-[var(--window-icon-lg)]" />
                <MoreVertical className={iconClass} />
            </div>
        </form>
    );
};
// import {
//     ArrowLeft,
//     ArrowRight,
//     RotateCw,
//     Search,
//     Sparkles,
//     FilePenLine,
//     PanelRight,
//     Puzzle,
//     UserCircle,
//     MoreVertical,
// } from "lucide-react";
//
// export const SearchBarBody = () => {
//     const iconClass = "w-[var(--window-icon-md)] h-[var(--window-icon-md)]";
//
//     return (
//         <div className="grid grid-cols-[12%_1fr_22%] w-full h-full items-center window-gap-sm window-px-sm text-white bg-[#373a3c]">
//
//             {/* Nav controls */}
//             <div className="flex items-center justify-center window-gap-sm text-white/60">
//                 <ArrowLeft className={iconClass} />
//                 <ArrowRight className={iconClass} />
//                 <RotateCw className={iconClass} />
//             </div>
//
//             {/* Search bar */}
//             <div className="flex items-center h-[70%] bg-[#3a3a3a] border border-blue-400 overflow-hidden window-rounded-xxxl window-px-sm">
//                 <Search className={`${iconClass} shrink-0`} />
//
//                 <input
//                     className="flex-1 min-w-0 bg-transparent outline-none window-text-sm text-white placeholder:text-white/40 window-px-sm"
//                     placeholder="Search Google or type a URL"
//                 />
//
//                 <button className="flex items-center h-[75%] window-px-sm window-gap-sm bg-[#075985] text-blue-100 font-semibold window-text-sm window-rounded-xxxl shrink-0">
//                     <Sparkles className="w-[var(--window-icon-sm)] h-[var(--window-icon-sm)]" />
//                     AI Mode
//                 </button>
//             </div>
//
//             {/* Right actions */}
//             <div className="flex items-center justify-evenly text-white/70">
//                 <FilePenLine className={iconClass} />
//                 <PanelRight className={iconClass} />
//                 <Puzzle className={iconClass} />
//
//                 <div className="w-[1px] h-[var(--window-icon-lg)] bg-white/20" />
//
//                 <UserCircle className="w-[var(--window-icon-lg)] h-[var(--window-icon-lg)]" />
//                 <MoreVertical className={iconClass} />
//             </div>
//
//         </div>
//     );
// };