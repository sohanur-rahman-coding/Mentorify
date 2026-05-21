"use client";

import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-[70vh] w-full">
      <div><ClockLoader /></div>
      <p className="text-4xl font-bold">Data is loading.Please Wait...</p>
    </div>
  );
}