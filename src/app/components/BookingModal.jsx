"use client";

import { useState } from "react";
import { Modal, Button, Input } from "@heroui/react";
import { FiUser, FiPhone, FiMail, FiX } from "react-icons/fi";
import {
  HiOutlineAcademicCap,
  HiSparkles,
  HiCheckCircle,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

const BookingModal = ({ tutorName, hourlyFee }) => {
  const submitData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    const res = await fetch("http://localhost:5000/my-booked-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    
  };

  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  return (
    <div className="antialiased">
      <Modal>
        <Modal.Trigger>
          <Button className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-950 text-xs font-black uppercase tracking-[0.25em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:bg-white dark:text-zinc-950 dark:hover:shadow-[0_15px_30px_rgba(255,255,255,0.1)]">
            <span className="relative z-10 flex items-center gap-2">
              Book Session
              <HiSparkles className="text-sm transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-zinc-800 to-zinc-700 transition-transform duration-500 group-hover:translate-y-0 dark:from-zinc-200 dark:to-white" />
          </Button>
        </Modal.Trigger>

        <Modal.Backdrop className="bg-zinc-950/40 backdrop-blur-md dark:bg-black/60">
          <Modal.Container placement="center" className="p-4">
            <Modal.Dialog className="relative w-full max-w-md overflow-hidden rounded-[1.8rem] border border-zinc-200/80 bg-white/95 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl dark:border-zinc-800/60 dark:bg-black dark:shadow-[0_25px_50px_rgba(0,0,0,0.6)] sm:p-8">
              <div className="absolute -right-12 -top-12 -z-10 size-32 rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-900/20" />
              <div className="absolute -left-12 -bottom-12 -z-10 size-32 rounded-full bg-zinc-300/30 blur-3xl dark:bg-zinc-800/10" />

              <Modal.CloseTrigger className="absolute right-5 top-5 rounded-full border border-zinc-200/60 p-1.5 text-black transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
                <FiX className="text-base" />
              </Modal.CloseTrigger>

              <Modal.Header className="flex flex-col items-center text-center">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                  <HiSparkles className="text-lg text-zinc-950 dark:text-white" />
                </div>
                <Modal.Heading className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
                  Secure Your Session
                </Modal.Heading>
                <p className="mt-1  text-[12px] font-bold tracking-wide text-black dark:text-zinc-400">
                  Fill out the overview details below to finalize your premium
                  tutoring appointment.
                </p>
              </Modal.Header>

              <Modal.Body className="mt-6 px-1">
                <form className="space-y-4" onSubmit={submitData}>
                  <div className="w-full">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-black dark:text-zinc-400">
                      Your Full Name
                    </label>
                    <Input
                      name="name"
                      defaultValue={user?.name || "John Doe"}
                      startContent={
                        <FiUser className="text-base text-black dark:text-zinc-400 flex-shrink-0" />
                      }
                      className="w-full"
                      classNames={{
                        inputWrapper:
                          "h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 transition-all hover:bg-zinc-100/50 focus-within:border-zinc-950 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50 dark:focus-within:border-white dark:focus-within:bg-zinc-950",
                        input:
                          "text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 font-bold pl-2 bg-transparent w-full",
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-black dark:text-zinc-400">
                      Phone Number
                    </label>
                    <Input
                      name="phoneNumber"
                      placeholder="+880 17XX-XXXXXX"
                      startContent={
                        <FiPhone className="text-base text-black dark:text-zinc-400 flex-shrink-0" />
                      }
                      className="w-full"
                      classNames={{
                        inputWrapper:
                          "h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 transition-all hover:bg-zinc-100/50 focus-within:border-zinc-950 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50 dark:focus-within:border-white dark:focus-within:bg-zinc-950",
                        input:
                          "text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 font-bold pl-2 bg-transparent w-full",
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-black dark:text-zinc-400">
                      Assigned Tutor
                    </label>
                    <Input
                      name="tutorName"
                      defaultValue={tutorName || "Tutor Name"}
                      startContent={
                        <HiOutlineAcademicCap className="text-lg text-black dark:text-zinc-400 flex-shrink-0" />
                      }
                      className="w-full"
                      classNames={{
                        inputWrapper:
                          "h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 transition-all hover:bg-zinc-100/50 focus-within:border-zinc-950 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50 dark:focus-within:border-white dark:focus-within:bg-zinc-950",
                        input:
                          "text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 font-bold pl-2 bg-transparent w-full",
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-black dark:text-zinc-400">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      defaultValue={user?.email || "user@example.com"}
                      startContent={
                        <FiMail className="text-base text-black dark:text-zinc-400 flex-shrink-0" />
                      }
                      className="w-full"
                      classNames={{
                        inputWrapper:
                          "h-11 rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 transition-all hover:bg-zinc-100/50 focus-within:border-zinc-950 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50 dark:focus-within:border-white dark:focus-within:bg-zinc-950",
                        input:
                          "text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 font-bold pl-2 bg-transparent w-full",
                      }}
                    />
                  </div>

                  <Modal.Footer className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end px-1">
                    <Button
                      slot="close"
                      variant="secondary"
                      className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 text-xs font-black uppercase tracking-wider text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-zinc-900 sm:w-auto sm:px-5"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      slot="close"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 sm:w-auto sm:px-6"
                    >
                      Confirm Appointment
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

export default BookingModal;
