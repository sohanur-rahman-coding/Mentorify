import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import React from "react";
import MyTutorsTable from "../components/MyTutorsTable";

const MyTutor = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  const user = session?.user;

  const res = await fetch(
    `http://localhost:5000/my-tutors?email=${user?.email}`,
  );
  const MyTutors = await res.json();

  return (
    <div>
      <MyTutorsTable MyTutors={MyTutors} />
    </div>
  );
};

export default MyTutor;
