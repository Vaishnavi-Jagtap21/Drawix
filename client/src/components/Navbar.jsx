import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const navigator = useNavigate()
   const handelNavigation= async()=>{
     if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
     navigator("/debug")
   }
  return (
    <nav className="w-full flex items-center justify-between px-10 py-6 absolute top-0 left-0 z-50">
      <div className="text-white text-3xl font-bold tracking-wide cursor-pointer">
       <Logo />
      </div>
      <button onClick={()=>handelNavigation()} className="border border-gray-500 px-5 py-2 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
       Get Started
      </button>
    </nav>
  );
};

export default Navbar;
