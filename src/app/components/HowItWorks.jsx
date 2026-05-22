"use client";

import React from "react";
import { Card } from "@heroui/react";
import { FaSearch, FaCalendarCheck, FaGraduationCap } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-xl text-cyan-400" />,
      glowClass: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      borderClass: "group-hover:border-cyan-500/30",
      title: "Find Your Perfect Tutor",
      description:
        "Filter through verified mentors by subject, location, hourly fee, or teaching mode to find your best match.",
    },
    {
      id: 2,
      icon: <FaCalendarCheck className="text-xl text-emerald-400" />,
      glowClass: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]",
      borderClass: "group-hover:border-emerald-500/30",
      title: "Book a Convenient Slot",
      description:
        "Choose an available day and time slot that fits your schedule, select your start date, and secure bookings instantly.",
    },
    {
      id: 3,
      icon: <FaGraduationCap className="text-xl text-purple-400" />,
      glowClass: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.3)]",
      borderClass: "group-hover:border-purple-500/30",
      title: "Start Learning",
      description:
        "Connect with your expert mentor on the scheduled time, unlock interactive sessions, and accelerate your growth.",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-24 bg-background overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-12 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-500 bg-cyan-500/10 px-4 py-1.5 rounded-full">
          Workflow
        </span>
        <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mt-4">
          How{" "}
          <span className="bg-gradient-to-r bg-clip-text text-transparent from-cyan-400 via-indigo-400 to-purple-500">
            MediQueue
          </span>{" "}
          Works
        </h2>
        <p className="mt-4 text-base sm:text-lg text-foreground/50 max-w-2xl mx-auto font-medium">
          Your journey to academic excellence and skill mastery in three simple
          steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step) => (
          <Card
            key={step.id}
            className={`group bg-content1/40 dark:bg-zinc-900/30 backdrop-blur-md border border-default-200/50 dark:border-zinc-800/50 rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-start text-left shadow-xl transition-all duration-500 ${step.glowClass} ${step.borderClass} hover:-translate-y-2`}
          >
            <div className="absolute top-6 right-8 text-7xl font-black text-default-200/20 dark:text-transparent select-none transition-all duration-500 ease-in-out group-hover:text-default-400/40 dark:group-hover:text-white/30" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}>
  0{step.id}
</div>
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-default-200 dark:border-zinc-700/50 flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform duration-500">
              {step.icon}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight group-hover:text-foreground transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed font-medium">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
