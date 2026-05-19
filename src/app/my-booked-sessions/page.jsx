import { authClient } from "@/lib/auth-client";

import MyBookingTable from "../components/MyBookingTable";
import { headers } from "next/headers";

const MyBookingSection = async () => {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  const user = session?.user;
  
  const res = await fetch(
    `http://localhost:5000/my-booked-sessions?email=${user?.email}`,
  );
  const bookings = await res.json();
 

  return (
    <div className="my-8 max-w-7xl mx-auto px-4">
      <MyBookingTable bookings={bookings}></MyBookingTable>
    </div>
  );
};

export default MyBookingSection;
