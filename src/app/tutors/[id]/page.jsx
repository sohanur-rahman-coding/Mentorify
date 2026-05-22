import React from "react";
import Image from "next/image";
import {
  MapPin,
  GraduationCap,
  Wallet,
  Users,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import BookingModal from "@/app/components/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const InfoCard = ({ icon: Icon, label, value, accent }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-black/[0.12] dark:hover:border-white/[0.12] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/[0.04] dark:from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative z-10">
      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.06] dark:bg-white/[0.06] backdrop-blur-sm">
        <Icon className="size-4 text-amber-600 dark:text-amber-300/80" />
      </div>
      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.32em] text-zinc-500 dark:text-white/30">
        {label}
      </p>
      <h3
        className={`font-semibold leading-snug ${
          accent
            ? `text-2xl font-black tracking-tight ${accent}`
            : "text-sm text-zinc-900 dark:text-white/80"
        }`}
      >
        {value}
      </h3>
    </div>
  </div>
);

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const reqHeaders = await headers();
  const { token } = await auth.api.getToken({ headers: reqHeaders });

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

  if (!response.ok)
    return (
      <div className="p-10 text-center text-red-500">Failed to load tutor.</div>
    );
  const tutor = await response.json();

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
    <section className="relative min-h-screen overflow-hidden bg-zinc-50 dark:bg-[#080a0f] py-12 sm:py-16 transition-colors duration-300">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-[-5%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.04] blur-[100px]" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-indigo-500/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-black/[0.07] dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.02] shadow-xl backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[1fr_1.15fr]">
            {/* Image Side */}
            <div className="relative min-h-[380px] overflow-hidden lg:min-h-[680px]">
              <Image
                src={photo}
                alt={tutorName}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-[#080a0f]" />

              <div className="absolute left-5 top-5">
                <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 backdrop-blur-md">
                  <Sparkles className="size-3.5 text-amber-600 dark:text-amber-300" />
                  <span className="text-[9px] font-black uppercase tracking-[0.35em] text-amber-700 dark:text-amber-200/90">
                    Premium Tutor
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-7 sm:p-9">
                <div className="mb-4 inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] px-4 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-black uppercase tracking-[0.38em] text-zinc-600 dark:text-white/60">
                    {category}
                  </span>
                </div>
                <h1 className="text-[2.2rem] font-black leading-[1.05] text-zinc-900 dark:text-white">
                  {tutorName}
                </h1>
                <div className="mt-5 flex gap-2.5">
                  <div className="rounded-full border border-black/[0.08] dark:border-white/[0.08] px-4 py-2 bg-black/[0.03] dark:bg-white/[0.05]">
                    <p className="text-[10px] font-semibold uppercase text-zinc-600 dark:text-white/55">
                      {teachingMode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Side */}
            <div className="flex flex-col border-l border-black/[0.05] dark:border-white/[0.05] p-6 sm:p-9 lg:p-11">
              <h2 className="text-[1.6rem] font-black text-zinc-900 dark:text-white">
                Session Details
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={GraduationCap}
                  label="Institution"
                  value={institutionExperience}
                />
                <InfoCard icon={MapPin} label="Location" value={location} />
                <InfoCard
                  icon={Wallet}
                  label="Hourly Fee"
                  value={`$${hourlyFee}`}
                  accent="text-zinc-900 dark:text-white"
                />
                <InfoCard
                  icon={Users}
                  label="Slots"
                  value={slotsLeft}
                  accent={isFullyBooked ? "text-red-500" : "text-emerald-500"}
                />
                <div className="sm:col-span-2">
                  <InfoCard
                    icon={CalendarDays}
                    label="Start Date"
                    value={new Date(sessionStartDate).toLocaleDateString()}
                  />
                </div>
              </div>

              <div className="mt-auto pt-8">
                {canBook ? (
                  <BookingModal
                    tutorName={tutorName}
                    hourlyFee={hourlyFee}
                    _id={_id}
                  >
                    <button className="w-full h-14 rounded-2xl bg-amber-500 text-white font-black uppercase tracking-widest hover:bg-amber-400 transition-colors">
                      Book Session
                    </button>
                  </BookingModal>
                ) : (
                  <button
                    disabled
                    className="w-full h-14 rounded-2xl border border-zinc-200 dark:border-white/10 text-zinc-400 font-bold uppercase"
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
