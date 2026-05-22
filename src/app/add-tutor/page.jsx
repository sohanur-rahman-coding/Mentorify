"use client";
import React from "react";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AddTutor = () => {
  const { data: session, status } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const tutorData = { ...formValues, createdBy: session?.user?.email };
    const { data: token } = await authClient.token();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(tutorData),
      });
      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        toast.success("Tutor Added Successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add tutor.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding tutor.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-300 dark:border-white/20 border-t-black dark:border-t-white animate-spin" />
          <p className="text-zinc-400 text-sm tracking-wide">Loading session…</p>
        </div>
      </div>
    );
  }

  // Optimized for both modes
  const fieldClass = [
    "w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
    "bg-black/[0.03] dark:bg-white/[0.04]",
    "border border-black/10 dark:border-white/10",
    "text-zinc-900 dark:text-zinc-100", 
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
    "focus:outline-none focus:border-black/30 focus:bg-black/[0.06]",
    "dark:focus:border-white/40 dark:focus:bg-white/[0.07]",
    "backdrop-blur-sm",
  ].join(" ");

  const labelClass =
    "block text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5 " +
    "text-zinc-600 dark:text-zinc-400";

  const selectTriggerClass = [
    "w-full px-4 py-2.5 rounded-xl text-sm flex items-center justify-between transition-all duration-200 cursor-pointer",
    "bg-black/[0.03] dark:bg-white/[0.04]",
    "border border-black/10 dark:border-white/10",
    "text-zinc-900 dark:text-zinc-100",
    "focus:outline-none focus:border-black/30 dark:focus:border-white/40",
    "backdrop-blur-sm",
  ].join(" ");

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 transition-colors duration-300 bg-zinc-50 dark:bg-[#0a0a0a] animate__animated animate__fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5
            bg-black/[0.05] dark:bg-white/[0.06]
            border border-black/10 dark:border-white/10">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              className="text-zinc-700 dark:text-white">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Add a New Tutor
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Fill in the details below to list a tutor on the platform.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden
          border border-black/[0.08] dark:border-white/[0.08]
          bg-white/70 dark:bg-white/[0.03]
          backdrop-blur-xl
          shadow-xl shadow-black/5 dark:shadow-black/60">

          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/15 dark:via-white/20 to-transparent" />

          <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-7">
            <SectionLabel>Basic Information</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <TextField name="tutorName" isRequired>
                  <Label className={labelClass}>Tutor Name</Label>
                  <Input placeholder="Full name" className={fieldClass} />
                  <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
                </TextField>
              </div>

              <div className="sm:col-span-2">
                <TextField name="photo" type="url" isRequired>
                  <Label className={labelClass}>Photo URL</Label>
                  <Input placeholder="https://i.ibb.co/example.jpg" className={fieldClass} />
                  <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
                </TextField>
              </div>

              <div className="sm:col-span-2">
                <TextField name="institution" isRequired>
                  <Label className={labelClass}>Institution</Label>
                  <Input placeholder="e.g. Dhaka Polytechnic Institute" className={fieldClass} />
                  <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
                </TextField>
              </div>

              <TextField name="experience" isRequired>
                <Label className={labelClass}>Experience</Label>
                <Input placeholder="e.g. 2 Years" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>

              <TextField name="location" isRequired>
                <Label className={labelClass}>Location</Label>
                <Input placeholder="e.g. Mirpur, Dhaka" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>
            </div>

            <Divider />

            <SectionLabel>Session Details</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Select name="category" isRequired className="w-full" placeholder="Select subject">
                  <Label className={labelClass}>Subject / Category</Label>
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {["Mathematics","Physics","Chemistry","Biology","English"].map((s) => (
                        <ListBox.Item key={s} id={s} textValue={s}>
                          {s}<ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                      <ListBox.Item id="Programming" textValue="Programming & Tech">
                        Programming & Tech<ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div>
                <Select name="teachingMode" isRequired className="w-full" placeholder="Select mode">
                  <Label className={labelClass}>Teaching Mode</Label>
                  <Select.Trigger className={selectTriggerClass}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Online" textValue="Online">Online<ListBox.ItemIndicator /></ListBox.Item>
                      <ListBox.Item id="Offline" textValue="Offline">Offline<ListBox.ItemIndicator /></ListBox.Item>
                      <ListBox.Item id="Both" textValue="Both">Both (Online & Offline)<ListBox.ItemIndicator /></ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="availableSlots" isRequired>
                <Label className={labelClass}>Available Days & Time</Label>
                <Input placeholder="Sun – Thu  5:00 PM – 8:00 PM" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>

              <TextField name="sessionStartDate" type="date" isRequired>
                <Label className={labelClass}>Session Start Date</Label>
                <Input type="date" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>
            </div>

            <Divider />

            <SectionLabel>Pricing & Availability</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="hourlyFee" type="number" isRequired>
                <Label className={labelClass}>Hourly Fee ($)</Label>
                <Input type="number" placeholder="e.g. 500" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>

              <TextField name="totalSlot" type="number" isRequired>
                <Label className={labelClass}>Total Slots</Label>
                <Input type="number" placeholder="e.g. 5" className={fieldClass} />
                <FieldError className="text-xs text-red-600 dark:text-red-400 mt-1" />
              </TextField>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl text-sm font-semibold tracking-wide
                  bg-zinc-900 dark:bg-white
                  text-white dark:text-black
                  hover:bg-zinc-800 dark:hover:bg-zinc-100
                  active:scale-[0.98]
                  transition-all duration-150"
              >
                Add Tutor
              </button>
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-600 mt-3">
                All fields are required to submit.
              </p>
            </div>
          </form>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
      {children}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent" />
  </div>
);

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
);

export default AddTutor;