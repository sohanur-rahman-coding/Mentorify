"use client";
import React from "react";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const AddTutor = () => {
  const { data: session, status } = useSession();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const tutorData = {
      ...formValues,
      createdBy: session?.user?.email,
    };
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
    return <div className="text-center my-10">Loading session...</div>;
  }

  return (
    <div className="min-h-screen my-8 flex items-center justify-center mx-auto bg-gray-100 dark:bg-zinc-950 transition-colors duration-300 animate__animated animate__fadeIn">
      <Card className="p-6 mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Tutor</h2>
        <form onSubmit={onSubmit} className="p-10 space-y-8 w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <TextField name="tutorName" isRequired>
                <Label>Tutor Name</Label>
                <Input placeholder="Your Name" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="photo" type="url" isRequired>
                <Label>Photo URL </Label>
                <Input
                  placeholder="https://i.ibb.co/example.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            <div>
              <Select
                name="category"
                isRequired
                className="w-full"
                placeholder="Select subject"
              >
                <Label>Subject / Category</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Mathematics" textValue="Mathematics">
                      Mathematics
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Physics" textValue="Physics">
                      Physics
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Chemistry" textValue="Chemistry">
                      Chemistry
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Biology" textValue="Biology">
                      Biology
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="Programming"
                      textValue="Programming & Tech"
                    >
                      Programming & Tech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="English" textValue="English">
                      English
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="availableSlots" isRequired>
              <Label>Available Days & Time Slot</Label>
              <Input
                placeholder="Sun - Thu 5:00 PM - 8:00 PM"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <TextField name="hourlyFee" type="number" isRequired>
              <Label>Hourly Fee</Label>
              <Input
                type="number"
                placeholder="e.g. 500"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <TextField name="totalSlot" type="number" isRequired>
              <Label>Total Slot</Label>
              <Input
                type="number"
                placeholder="e.g. 5"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <div className="md:col-span-2">
              <TextField name="sessionStartDate" type="date" isRequired>
                <Label>Session Start Date</Label>
                <Input type="date" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="institution" isRequired>
                <Label>Institution</Label>
                <Input
                  placeholder="e.g. Dhaka Polytechnic Institute"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            <div>
              <TextField name="location" isRequired>
                <Label>Location (Area/City)</Label>
                <Input
                  placeholder="e.g. Mirpur, Dhaka"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            <div>
              <Select
                name="teachingMode"
                isRequired
                className="w-full"
                placeholder="Select mode"
              >
                <Label>Teaching Mode</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Online" textValue="Online">
                      Online
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Offline" textValue="Offline">
                      Offline
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Both" textValue="Both">
                      Both (Online & Offline)
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="md:col-span-2">
              <TextField name="experience" isRequired>
                <Label>Experience</Label>
                <Input
                  placeholder="e.g. 2 Years Experience"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="rounded-none w-full bg-black text-white"
          >
            Add Tutor
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddTutor;
