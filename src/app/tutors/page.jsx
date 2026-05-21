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
import SearchBar from "../components/SearchBar";
import DateFilter from "../components/DateFilter";

const TutorsPage = async ({ searchParams }) => {
  const searchParam = await searchParams;
  const search = searchParam.search || "";
  const startDate = searchParam.startDate || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?search=${encodeURIComponent(search)}&startDate=${startDate}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-background animate__animated animate__fadeIn">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest font-bold text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-full">
          Elite pool
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground mt-4 animate__animated animate__fadeInUp">
          Explore All Verified Tutors
        </h1>
        <p className="mt-3 text-sm sm:text-base text-foreground/50 max-w-xl mx-auto font-medium animate__animated animate__fadeInUp animate__delay-1s">
          Connect with verified university alumni and industry experts tailored
          to your learning schedule.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mb-10 max-w-4xl mx-auto w-full">
        <div className="w-full max-w-md">
          <SearchBar />
        </div>
        <div className="w-full max-w-md">
          <DateFilter startDate={startDate} />
        </div>
      </div>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-default-200 rounded-3xl bg-content1/50 max-w-2xl mx-auto shadow-sm animate__animated animate__zoomIn">
          <div className="text-default-400 mb-4 bg-default-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 mx-auto text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-foreground mb-2">
            No Tutors Found
          </h3>
          <p className="text-foreground/60 text-sm max-w-md font-medium">
            We couldn't find any verified tutors matching your criteria. Please try updating your search or date filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((tutor) => (
            <Card
              key={tutor._id}
              className="bg-content1 border border-default-200 dark:border-default-100 rounded-3xl overflow-hidden p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeInUp"
            >
              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-default-100">
                  <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
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
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorsPage;