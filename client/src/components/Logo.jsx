import React from "react";

const Logo = () => {
    return (
        <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative w-14 h-14 flex items-center justify-center group">
                <div className="absolute inset-0 rounded-full bg-white/5 blur-xl  group-hover:bg-white/10 transition-all duration-700"></div>
                <h1 className="new relative text-4xl font-black tracking-tight bg-gradient-to-r from-gray-400 via-white to-gray-500 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110">
                    dX
                </h1>
            </div>
        </div>
    );
};

export default Logo;