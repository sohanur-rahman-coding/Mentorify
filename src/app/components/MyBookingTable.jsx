"use client";

import { Chip, Table, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

const MyBookingTable = ({ bookings = [] }) => {
  console.log(bookings);

  const handleCancel = async (id) => {
    const res = await fetch(`http://localhost:5000/my-booked-sessions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();

    if (res.ok) {
      toast.success("Booking cancelled successfully.");
    } else {
      toast.error("Failed to cancel the booking. Please try again.");
    }
  };

  return (
    <div>
      <Table aria-label="Booking sessions table">
        <Table.ResizableContainer>
          <Table.Content
            aria-label="Table with resizable columns"
            className="min-w-[900px]"
          >
            <Table.Header>
              <Table.Column
                isRowHeader
                defaultWidth="1.2fr"
                id="name"
                minWidth={150}
              >
                Name
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1.2fr" id="phone" minWidth={160}>
                Phone
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1.5fr" id="tutorName" minWidth={160}>
                Tutor Name
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1.8fr" id="email" minWidth={200}>
                Email
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="status" minWidth={120}>
                Status
                <Table.ColumnResizer />
              </Table.Column>

              <Table.Column defaultWidth="1fr" id="cancel" minWidth={120}>
                Cancel
                <Table.ColumnResizer />
              </Table.Column>
            </Table.Header>

            <Table.Body emptyContent={"No bookings found."}>
              {bookings?.map((booking, index) => {
                const statusColor =
                  booking.status === "Confirmed"
                    ? "success"
                    : booking.status === "Pending"
                      ? "warning"
                      : "danger";

                return (
                  <Table.Row key={booking._id || index}>
                    <Table.Cell className="font-medium text-zinc-900 dark:text-zinc-100">
                      {booking.name || "N/A"}
                    </Table.Cell>
                    <Table.Cell>{booking.phoneNumber || "N/A"}</Table.Cell>
                    <Table.Cell>{booking.tutorName || "N/A"}</Table.Cell>
                    <Table.Cell>{booking.email}</Table.Cell>
                    <Table.Cell>
                      <Chip color={statusColor} size="sm" variant="flat">
                        {booking.status || "Pending"}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        size="sm"
                        onClick={() => handleCancel(booking._id)}
                      >
                        <FiTrash2 className="text-lg" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default MyBookingTable;
