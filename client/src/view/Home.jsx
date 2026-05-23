import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useNavigation } from "react-router-dom";

const Home = () => {
   const navigator = useNavigate()

   const handelNavigation= async()=>{
     if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
     navigator("/debug")
   }

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">

        {/* Background Gradient */}
        <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_right,#9f8b2c_0%,#000000_45%)]">
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] 
        bg-[size:60px_60px] opacity-20">
        </div>

        {/* Glow */}
        <div className="absolute right-0 top-0 
        w-[500px] h-[500px] 
        bg-yellow-200/20 blur-[140px] rounded-full">
        </div>

        {/* Floating Particles */}
        <div className="absolute top-[25%] right-[20%] 
        w-3 h-3 rounded-full bg-yellow-200 
        blur-sm animate-pulse">
        </div>

        <div className="absolute bottom-[20%] left-[15%] 
        w-2 h-2 rounded-full bg-white 
        blur-sm animate-bounce">
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-[40px]">

          {/* Hero Text */}
          <h1 className="new text-[90px] md:text-[220px] 
          font-black tracking-tight leading-none 
          text-white/40">

            DRAWIX

          </h1>

          {/* Description */}
          <p className="max-w-3xl mt-4 text-gray-400 
          text-sm md:text-lg leading-relaxed font-light tracking-wide">

            Drawix AI helps developers detect, analyze, and fix code errors
            faster using intelligent debugging and real-time AI suggestions.

          </p>

          {/* Search Box
          <div className="mt-10 w-full max-w-3xl mx-auto
          p-[1px] rounded-2xl
          bg-gradient-to-r from-yellow-200/30 via-transparent to-yellow-300/30
          hover:scale-[1.01] transition-all duration-500">

            <div className="bg-[#0d0d0d]/70 backdrop-blur-2xl
            border border-yellow-100/10
            rounded-2xl px-6 py-4
            flex items-center justify-between
            shadow-[0_0_40px_rgba(255,215,0,0.08)]
            focus-within:border-yellow-200/30
            focus-within:shadow-[0_0_60px_rgba(255,215,0,0.18)]">

              <input
                type="text"
                placeholder="Ask Drawix AI..."
                className="bg-transparent outline-none w-full
                text-white placeholder:text-gray-500"
              />

              <button className="w-10 h-10 rounded-full
              bg-zinc-800 text-white
              hover:bg-yellow-300 hover:text-black
              hover:scale-110
              hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]
              transition-all duration-500">

                ✦

              </button>
            </div>
          </div> */}

          {/* Bottom Text */}
          <div className="mt-10 text-gray-500 text-sm">
            Powered by next-generation AI debugging intelligence.
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">

            <button onClick={()=>handelNavigation()} className="px-7 py-3 rounded-full 
            bg-gradient-to-r from-yellow-200 to-yellow-400 
            text-black font-medium tracking-wide
            hover:scale-105 
            transition-all duration-300 
            shadow-lg shadow-yellow-300/20">

              Debug With Drawix

            </button>

            <button className="border border-yellow-100/20 
            px-7 py-3 rounded-full text-sm tracking-wide
            hover:bg-white hover:text-black 
            transition-all duration-300">

              Learn More

            </button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;