import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import MyTutorsTable from "../components/MyTutorsTable";

const MyTutor = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${baseUrl}/my-tutors?email=${user.email}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div className="py-10 text-center text-sm font-semibold text-red-500">
        Failed to fetch your tutors data. Please refresh.
      </div>
    );
  }

  const MyTutors = await res.json();

  return (
    <div className="my-8 max-w-7xl mx-auto px-4 animate__animated animate__fadeIn">
      <MyTutorsTable MyTutors={MyTutors} />
    </div>
  );
};

export default MyTutor;
