'use client';

import { authClient } from "@/lib/auth-client";
import { FiUser, FiImage, FiLoader, FiCheck } from "react-icons/fi";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import React, { useState } from "react";

export function UpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const name = e.target.name.value;
    const image = e.target.image.value;

    try {
      await authClient.updateUser({
        name,
        image,
      });
      window.location.reload();
    } catch (error) {
      console.error("Update failed", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      {/* Trigger Button - Dark Mode Compatible */}
      <Button className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-white font-bold py-3 rounded-2xl shadow-md transition-all active:scale-95">
        Edit Profile Information
      </Button>

      <Modal.Backdrop className="backdrop-blur-sm">
        <Modal.Container placement="center">
          {/* Dialog - Added Dark Mode Backgrounds */}
          <Modal.Dialog className="sm:max-w-md rounded-[2.5rem] p-2 border border-gray-100 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
            <Modal.Header className="p-6">
              <Modal.Heading className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Edit Profile
              </Modal.Heading>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Update your identity on <span className="text-blue-600 font-bold">MediQueue</span>
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 pb-6">
              <form id="update-profile-form" onSubmit={onSubmit} className="flex flex-col gap-5">
                <TextField className="w-full" name="name" type="text">
                  <Label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <FiUser /> Full Name
                  </Label>
                  <Input placeholder="Enter your full name" className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800" />
                </TextField>

                <TextField className="w-full" name="image" type="url">
                  <Label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <FiImage /> Profile Image URL
                  </Label>
                  <Input placeholder="https://example.com/avatar.jpg" className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800" />
                </TextField>
              </form>
            </Modal.Body>

            <Modal.Footer className="px-6 pb-6 pt-2 flex gap-3">
              <Button slot="close" variant="flat" className="flex-1 rounded-xl text-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                Cancel
              </Button>
              <Button
                type="submit"
                form="update-profile-form"
                disabled={isLoading}
                className="flex-1 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiCheck className="mr-2" />
                )}
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}