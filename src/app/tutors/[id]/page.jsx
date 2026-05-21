import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  GraduationCap,
  Wallet,
  Users,
  CalendarDays,
  Sparkles,
  Book,
} from "lucide-react";
import BookingModal from "@/app/components/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const reqHeaders = await headers();
  const { token } = await auth.api.getToken({
    headers: reqHeaders,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token || ""}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center px-4 animate__animated animate__fadeIn">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 px-8 py-7 backdrop-blur-xl shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500">
            Failed to fetch tutor details
          </p>
        </div>
      </div>
    );
  }

  const tutor = await response.json();

  if (!tutor) {
    return (
      <div className="flex min-h-[55vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 px-8 py-7 backdrop-blur-xl shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            Tutor profile unavailable
          </p>
        </div>
      </div>
    );
  }

  const {
    tutorName,
    photo,
    category,
    hourlyFee,
    teachingMode,
    institutionExperience,
    location,
    totalSlot,
    sessionStartDate,
    _id,
  } = tutor;

  const slotsLeft = parseInt(totalSlot) || 0;

  const isBookingStarted = new Date() <= new Date(sessionStartDate);
  const isFullyBooked = slotsLeft <= 0;
  const canBook = isBookingStarted && !isFullyBooked;
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[300px] w-[300px] rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/30" />
        <div className="absolute right-[-10%] bottom-0 h-[280px] w-[280px] rounded-full bg-zinc-300/30 blur-3xl dark:bg-zinc-700/20" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.8rem] border border-zinc-200/70 dark:border-zinc-800/70 bg-white/75 dark:bg-zinc-900/60 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_60px_rgba(0,0,0,0.35)]">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-[360px] lg:min-h-[620px] overflow-hidden">
              <Image
                src={photo}
                alt={tutorName}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

              <div className="absolute left-5 top-5">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Sparkles className="size-4 text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white">
                    Premium Tutor
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-100">
                    {category}
                  </span>
                </div>

                <h1 className="max-w-[90%] text-3xl sm:text-4xl font-black leading-tight tracking-tight text-white">
                  {tutorName}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
                      {teachingMode}
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
                      ${hourlyFee} / Hr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10">
              <div>
                <div className="mb-8 flex items-start justify-between border-b border-zinc-200/70 pb-5 dark:border-zinc-800/60">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500">
                      Tutor Overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                      Session Details
                    </h2>
                  </div>

                  <div
                    className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em]
                    ${
                      canBook
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {canBook ? "Available" : "Unavailable"}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <GraduationCap className="mb-4 size-5 text-zinc-950 dark:text-white" />

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Institution
                    </p>

                    <h3 className="text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {institutionExperience}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <MapPin className="mb-4 size-5 text-zinc-950 dark:text-white" />

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Location
                    </p>

                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                      {location}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Wallet className="mb-4 size-5 text-zinc-950 dark:text-white" />

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Hourly Fee
                    </p>

                    <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                      ${hourlyFee}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <Users className="mb-4 size-5 text-zinc-950 dark:text-white" />

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Remaining Slots
                    </p>

                    <h3
                      className={`text-2xl font-black tracking-tight ${
                        isFullyBooked ? "text-red-500" : "text-emerald-500"
                      }`}
                    >
                      {slotsLeft}
                    </h3>
                  </div>

                  <div className="sm:col-span-2 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CalendarDays className="mb-4 size-5 text-zinc-950 dark:text-white" />

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                      Session Start Date
                    </p>

                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                      {new Date(sessionStartDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                  </div>
                </div>

                {!isBookingStarted && (
                  <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4">
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                      Booking is currently locked until the session officially
                      begins.
                    </p>
                  </div>
                )}

                {isBookingStarted && isFullyBooked && (
                  <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                      Enrollment capacity has been reached for this tutor.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                {canBook ? (
                  <BookingModal
                    tutorName={tutorName}
                    hourlyFee={hourlyFee}
                    _id={_id}
                  >
                    <button className="group relative flex h-13 w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-950 bg-zinc-950 text-xs font-black uppercase tracking-[0.28em] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-white dark:bg-white dark:text-zinc-950">
                      <span className="relative z-10 block">Book Session</span>
                    </button>
                  </BookingModal>
                ) : (
                  <button
                    disabled
                    className="flex h-13 w-full cursor-not-allowed items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 text-xs font-black uppercase tracking-[0.28em] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-600"
                  >
                    {isFullyBooked ? "Fully Booked" : "Booking Locked"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorDetailsPage;
