"use client";

import React from "react";
import { Card } from "@heroui/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaUserCheck, FaChalkboard, FaAward } from "react-icons/fa";

const PlatformStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      id: 1,
      icon: <FaUserCheck className="text-2xl text-cyan-500" />,
      endValue: 500,
      suffix: "+",
      label: "Verified Tutors",
    },
    {
      id: 2,
      icon: <FaUsers className="text-2xl text-emerald-500" />,
      endValue: 10000,
      suffix: "+",
      label: "Happy Students",
    },
    {
      id: 3,
      icon: <FaChalkboard className="text-2xl text-purple-500" />,
      endValue: 25000,
      suffix: "+",
      label: "Sessions Booked",
    },
    {
      id: 4,
      icon: <FaAward className="text-2xl text-amber-500" />,
      endValue: 4.9,
      decimals: 1,
      suffix: "/5",
      label: "Average Rating",
    },
  ];

  return (
    <section ref={ref} className="w-full bg-background border-y border-default-200 dark:border-default-100 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-purple-500 bg-purple-500/10 px-4 py-1.5 rounded-full">
            Our Achievements
          </span>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mt-4">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
            We are proud to connect thousands of learners with expert mentors nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              className="bg-content1 border border-default-200 dark:border-default-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="mb-4 bg-default-100 dark:bg-default-50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                {inView ? (
                  <CountUp
                    end={stat.endValue}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground/50 group-hover:text-foreground/70 transition-colors">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;