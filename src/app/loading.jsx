"use client";

import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[70vh] w-full bg-background transition-colors duration-500">
     
      <div className="relative p-8 rounded-full bg-content1 shadow-2xl border border-default-200 animate__animated animate__pulse animate__infinite">
        <ClockLoader color="#06b6d4" size={60} />
      </div>

 
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight animate__animated animate__fadeInUp">
          Fetching Data...
        </h2>
        <p className="text-foreground/50 font-medium animate__animated animate__fadeInUp animate__delay-1s">
          Please wait a moment while we prepare your content.
        </p>
      </div>
      
      
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"></div>
      </div>
    </div>
  );
}