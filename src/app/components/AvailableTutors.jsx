import React from "react";
import { Card, Button } from "@heroui/react";
import {
  FaBook,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaUniversity,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const AvailableTutors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/limited-tutors`);
  const data = await res.json();


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Available Verified Tutors
        </h1>
        <p className="mt-3 text-lg text-foreground/60 max-w-2xl mx-auto">
          Find and book the perfect mentor to accelerate your learning journey.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-foreground/50 border border-dashed border-default-200 rounded-3xl">
          No active tutor slots available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((tutor) => (
            <Card
              key={tutor._id}
              className="bg-content1 border border-default-200 dark:border-default-100 rounded-3xl overflow-hidden p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-default-100">
                  <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <FaChalkboardTeacher className="text-cyan-400" />
                    {tutor.teachingMode}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground line-clamp-1">
                      {tutor.tutorName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-cyan-500 font-medium text-sm">
                      <FaBook className="text-xs" />
                      <span>{tutor.category}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-sm text-foreground/70">
                    <FaUniversity className="mt-0.5 text-foreground/40 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {tutor.institutionExperience}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-default-100 dark:border-default-50">
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-wider text-foreground/40 font-medium">
                        Hourly Rate
                      </span>
                      <div className="flex items-center text-foreground font-bold text-base">
                        <FaDollarSign className="text-sm text-foreground/60" />
                        <span>{tutor.hourlyFee}</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-[11px] uppercase tracking-wider text-foreground/40 font-medium">
                        Available Slots
                      </span>
                      <div className="text-foreground font-bold text-base">
                        {tutor.totalSlot} Left
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-default-100 dark:border-default-50 text-xs text-foreground/60">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-foreground/40 flex-shrink-0" />
                      <span className="truncate">{tutor.availableSlots}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-foreground/40 flex-shrink-0" />
                      <span className="truncate">{tutor.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
              <Link href={`/tutors/${tutor._id}`}>
              <Button className="w-full font-bold bg-foreground text-background rounded-full py-5 text-sm shadow-md hover:opacity-90 transition-opacity">
                Book Session
              </Button></Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link href="/tutors">
          <button className="font-bold bg-foreground text-background rounded-2xl py-4 px-20 text-sm shadow-md hover:opacity-90 transition-opacity flex items-center gap-2">
            All Tutors
            <ArrowUpRight className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableTutors;
