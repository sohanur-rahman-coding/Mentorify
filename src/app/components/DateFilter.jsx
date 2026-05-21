"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, RotateCcw } from "lucide-react";

const DateFilter = ({ startDate, endDate }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [start, setStart] = useState(startDate || "");
  const [end, setEnd] = useState(endDate || "");

  useEffect(() => {
    setStart(startDate || "");
    setEnd(endDate || "");
  }, [startDate, endDate]);

  const isInvalidRange = useMemo(() => {
    if (!start || !end) return false;
    return new Date(start) > new Date(end);
  }, [start, end]);

  const handleFilter = (e) => {
    e.preventDefault();
    if (isInvalidRange) return;

    const params = new URLSearchParams(searchParams.toString());

    if (start) params.set("startDate", start);
    else params.delete("startDate");

    if (end) params.set("endDate", end);
    else params.delete("endDate");

    router.push(`/tutors?${params.toString()}`);
  };

  const handleReset = () => {
    setStart("");
    setEnd("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("startDate");
    params.delete("endDate");
    router.push(`/tutors?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 animate__animated animate__fadeIn">
      <form
        onSubmit={handleFilter}
        className="w-full bg-content1 pl-4 pr-2 py-2 rounded-full border border-default-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3 transition-all duration-300"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
          <div className="relative flex items-center bg-background border border-default-300 rounded-2xl px-3 transition-all duration-200 focus-within:border-black dark:focus-within:border-white min-w-0">
            <div className="text-default-400 mr-2 flex-shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="flex flex-col w-full py-1  min-w-0 overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-wider text-default-400 block truncate">
                From
              </span>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full min-w-0 bg-transparent text-xs font-semibold text-foreground outline-none cursor-pointer pr-1 truncate dark:[color-scheme:dark]"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-background border border-default-300 rounded-2xl px-3 transition-all duration-200 focus-within:border-black dark:focus-within:border-white min-w-0">
            <div className="text-default-400 mr-2 flex-shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="flex flex-col w-full py-1 min-w-0 overflow-hidden">
              <span className="text-[9px] font-black uppercase tracking-wider text-default-400 block truncate">
                To
              </span>
              <input
                type="date"
                value={end}
                min={start || undefined}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full min-w-0 bg-transparent text-xs font-semibold text-foreground outline-none cursor-pointer pr-1 truncate dark:[color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 justify-end md:justify-start">
          <button
            type="submit"
            disabled={isInvalidRange}
            className="px-6 h-11 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-sm shadow-sm transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            Filter
          </button>

          <button
            type="button"
            title="Reset Filters"
            onClick={handleReset}
            className="w-11 h-11 rounded-full bg-default-100 hover:bg-default-200 text-default-600 border border-default-200/50 transition-all duration-200 flex items-center justify-center active:scale-95 flex-shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </form>

      {isInvalidRange && (
        <p className="mt-2 ml-5 text-xs font-semibold text-red-500 animate__animated animate__headShake">
          End date cannot be earlier than start date.
        </p>
      )}
    </div>
  );
};

export default DateFilter;