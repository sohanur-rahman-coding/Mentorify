"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Find the Perfect Mentor for Your Journey",
      subtitle:
        "Connect with expert tutors worldwide for 1-on-1 personalized live learning sessions tailored to your goals.",
      bgImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600",
    },
    {
      id: 2,
      title: "Master New Skills Without the Scheduling Hassle",
      subtitle:
        "Say goodbye to conflict slots. Book verified tutors instantly with our automated real-time token booking system.",
      bgImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600",
    },
    {
      id: 3,
      title: "Elevate Your Learning Experience Today",
      subtitle:
        "Join thousands of students who are achieving their academic goals through direct expert mentorship.",
      bgImage:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative my-4 w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl border border-default-200 dark:border-default-100 shadow-2xl group">
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative flex items-center justify-start px-8 sm:px-16 md:px-24"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear scale-105"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.3) 100%), url(${slide.bgImage})`,
              }}
            />

            <div className="relative z-10 max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="pt-2">
                <Link href="/tutors">
                  <Button
                    className="font-bold bg-white text-black hover:bg-slate-100 rounded-full px-8 py-6 text-base group/btn shadow-lg"
                    endContent={
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    }
                  >
                    Explore Tutors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
