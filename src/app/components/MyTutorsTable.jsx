'use client';
import { Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import TutorEditModal from "./TutorEditModal";

const MyTutorsTable = ({MyTutors}) => {
  const handleDelete = (id) => {
    const res = fetch(`http://localhost:5000/tutors/${id}`, {
      method: "DELETE",
    }).then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Tutor deleted successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
 
        toast.error("Failed to delete tutor. Please try again.");
      });
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 p-4">
        <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-200">
          My Added Tutors List
        </h2>

        <Card className="overflow-x-auto p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <th className="py-4 px-4">Tutor Name</th>
                <th className="py-4 px-4">Subject</th>
                <th className="py-4 px-4">Available Slots</th>
                <th className="py-4 px-4">Hourly Fee</th>
                <th className="py-4 px-4">Total Slot</th>
                <th className="py-4 px-4">Registration Date</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {MyTutors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No tutors added yet.
                  </td>
                </tr>
              ) : (
                MyTutors.map((tutor) => (
                  <tr
                    key={tutor._id}
                    className="text-sm text-zinc-800 dark:text-zinc-200 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    {/* Name and Image optionally */}
                    <td className="py-4 px-4 flex items-center gap-3">
                      <Image
                        src={tutor.photo || "https://via.placeholder.com/40"}
                        alt={tutor.tutorName}
                        width={200}
                        height={200}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span>{tutor.tutorName}</span>
                    </td>

                    {/* Subject */}
                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">
                      {tutor.category}
                    </td>

                    {/* Available Days/Slots */}
                    <td className="py-4 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {tutor.availableSlots}
                    </td>

                    {/* Hourly Fee */}
                    <td className="py-4 px-4 text-zinc-700 dark:text-zinc-300">
                      ৳{tutor.hourlyFee}
                    </td>

                    {/* Total Slot with Badge Styling */}
                    <td className="py-4 px-4">
                      <span className="bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 px-3 py-1 rounded-md text-xs font-bold">
                        {tutor.totalSlot}
                      </span>
                    </td>

                    {/* Session Start Date */}
                    <td className="py-4 px-4 text-zinc-500 dark:text-zinc-400 text-xs">
                      {tutor.sessionStartDate || "N/A"}
                    </td>

                    {/* Actions (Delete and Edit) */}
                    <td className="py-4 px-4 text-right space-x-3">
                      {/* Delete button (Red Icon) */}
                      <button
                        onClick={() => handleDelete(tutor._id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-lg cursor-pointer"
                        title="Delete"
                      >
                       <RiDeleteBinLine/>
                      </button>
                      {/* Edit button (Green Icon) */}
                      <button
                        className="text-emerald-500 hover:text-emerald-700 transition-colors text-lg cursor-pointer"
                        title="Edit"
                      >
                        
                        <TutorEditModal tutor={tutor}></TutorEditModal>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default MyTutorsTable;
