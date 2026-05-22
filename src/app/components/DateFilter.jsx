"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, RotateCcw, AlertCircle } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleFilter}
        className="
          w-full bg-content1
          px-3 py-2.5
          rounded-2xl
          border border-default-200
          flex flex-col sm:flex-row sm:items-center
          gap-2
        "
      >
        {/* Date fields — stack vertically on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row gap-2 flex-1 min-w-0">

          {/* From */}
          <label
            className="
              flex items-center gap-3
              flex-1
              bg-background
              border border-default-200
              rounded-xl px-3.5 py-2.5
              cursor-pointer
              transition-all duration-150
              focus-within:border-foreground/40
              focus-within:ring-2 focus-within:ring-foreground/10
            "
          >
            <Calendar className="h-4 w-4 text-default-400 shrink-0" aria-hidden="true" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-default-400 leading-none mb-1">
                From
              </span>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="
                  bg-transparent text-sm font-medium text-foreground
                  outline-none cursor-pointer
                  w-full
                  dark:[color-scheme:dark]
                "
              />
            </div>
          </label>

          {/* To */}
          <label
            className="
              flex items-center gap-3
              flex-1
              bg-background
              border border-default-200
              rounded-xl px-3.5 py-2.5
              cursor-pointer
              transition-all duration-150
              focus-within:border-foreground/40
              focus-within:ring-2 focus-within:ring-foreground/10
            "
          >
            <Calendar className="h-4 w-4 text-default-400 shrink-0" aria-hidden="true" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-default-400 leading-none mb-1">
                To
              </span>
              <input
                type="date"
                value={end}
                min={start || undefined}
                onChange={(e) => setEnd(e.target.value)}
                className="
                  bg-transparent text-sm font-medium text-foreground
                  outline-none cursor-pointer
                  w-full
                  dark:[color-scheme:dark]
                "
              />
            </div>
          </label>

        </div>

        {/* Actions — full width row on mobile, inline on desktop */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="submit"
            disabled={isInvalidRange}
            className="
              h-10 px-5
              flex-1 sm:flex-none
              rounded-full
              bg-foreground text-background
              text-sm font-medium
              transition-all duration-150
              hover:opacity-80
              active:scale-[0.97]
              disabled:opacity-30 disabled:cursor-not-allowed
              whitespace-nowrap
            "
          >
            Apply filter
          </button>

          <button
            type="button"
            title="Reset filters"
            aria-label="Reset date filters"
            onClick={handleReset}
            className="
              w-10 h-10 shrink-0
              rounded-full
              bg-default-100 hover:bg-default-200
              border border-default-200
              text-default-500
              flex items-center justify-center
              transition-all duration-150
              active:scale-[0.95]
            "
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </form>

      {isInvalidRange && (
        <p className="mt-2 ml-1 flex items-center gap-1.5 text-xs font-medium text-danger">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          End date cannot be earlier than start date.
        </p>
      )}
    </div>
  );
};

export default DateFilter;