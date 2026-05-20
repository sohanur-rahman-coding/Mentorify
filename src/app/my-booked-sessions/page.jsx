import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBookingTable from "../components/MyBookingTable";

const MyBookingSection = async () => {
  const reqHeaders = await headers();

  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: reqHeaders,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-booked-sessions?email=${user.email}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token || ""}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return (
      <div className="my-8 max-w-7xl mx-auto px-4 text-center text-red-500 font-medium">
        Failed to load bookings. Please try again later.
      </div>
    );
  }

  const bookings = await res.json();

  return (
    <div className="my-8 max-w-7xl mx-auto px-4">
      <MyBookingTable bookings={bookings} />
    </div>
  );
};

export default MyBookingSection;
