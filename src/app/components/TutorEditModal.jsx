"use client";

import { Button, Input, Modal } from "@heroui/react";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi";

const TutorEditModal = ({ tutor }) => {
  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:5000/tutors/${tutor._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const data = await res.json();

    window.location.reload();
  };
  return (
    <div className="antialiased">
      <Modal>
        <Modal.Trigger>
          <div
            className="text-emerald-500 hover:text-emerald-700 transition-colors text-lg cursor-pointer relative group"
            title="Edit"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaRegEdit />
            </span>
          </div>
        </Modal.Trigger>

        <Modal.Backdrop className="bg-zinc-950/40 backdrop-blur-md dark:bg-black/60">
          <Modal.Container placement="center" className="p-4">
            <Modal.Dialog className="relative w-full max-w-2xl overflow-hidden rounded-[1.8rem] border border-zinc-200/80 bg-white/95 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-zinc-800/60 dark:bg-black dark:shadow-[0_25px_50px_rgba(0,0,0,0.6)] sm:p-8">
              <Modal.CloseTrigger className="absolute right-5 top-5 rounded-full border border-zinc-200/60 p-1.5 text-black transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
                <FiX className="text-base" />
              </Modal.CloseTrigger>

              <Modal.Header className="flex flex-col items-center text-center">
                <Modal.Heading className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Update Session
                </Modal.Heading>
                <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">
                  Make changes to your profile here. Click save when you're
                  done.
                </p>
              </Modal.Header>

              <Modal.Body className="mt-6 px-1">
                <form className="space-y-5" onSubmit={submitData}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    {/* Tutor Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Tutor Name
                      </label>
                      <Input
                        name="tutorName"
                        defaultValue={tutor?.tutorName || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Photo URL */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Photo URL
                      </label>
                      <Input
                        name="photoUrl"
                        defaultValue={tutor?.photo || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Subject
                      </label>
                      <select
                        name="subject"
                        defaultValue={tutor?.subject || "Physics"}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      >
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Math">Mathematics</option>
                        <option value="Biology">Biology</option>
                      </select>
                    </div>

                    {/* Available Days and Time */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Available Days and Time
                      </label>
                      <Input
                        name="availableDays"
                        defaultValue={tutor?.availableSlots || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Hourly Fee */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Hourly Fee
                      </label>
                      <Input
                        name="hourlyFee"
                        type="number"
                        defaultValue={tutor?.hourlyFee || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Total Slot */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Total Slot
                      </label>
                      <Input
                        name="totalSlot"
                        type="number"
                        defaultValue={tutor?.totalSlot || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Session Start Date */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Session Start Date
                      </label>
                      <Input
                        name="startDate"
                        type="date"
                        defaultValue={tutor?.startDate || "2026-05-19"}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Institution */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Institution
                      </label>
                      <Input
                        name="institution"
                        defaultValue={tutor?.institution || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Location (Area/City)
                      </label>
                      <Input
                        name="location"
                        defaultValue={tutor?.location || ""}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      />
                    </div>

                    {/* Teaching Mode */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                        Teaching Mode
                      </label>
                      <select
                        name="teachingMode"
                        defaultValue={tutor?.mode || "Both"}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-zinc-800 dark:text-zinc-300">
                      Experience
                    </label>
                    <textarea
                      name="experience"
                      rows={3}
                      defaultValue={tutor?.experience || ""}
                      className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-950 outline-none transition-all focus:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white resize-y min-h-[80px]"
                    />
                  </div>

                  {/* Modal Footer */}
                  <Modal.Footer className="mt-6 flex flex-row justify-end gap-3 px-1">
                    <Button
                      slot="close"
                      variant="secondary"
                      className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-900"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      slot="close"
                      className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-2.5 text-xs font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                    >
                      Save Changes
                      <HiCheckCircle className="text-base" />
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default TutorEditModal;
