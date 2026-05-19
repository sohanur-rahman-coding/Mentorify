"use client";
import { AlertDialog, Button } from "@heroui/react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteAlert = ({ tutor, handleDelete, booking, handleCancel }) => {
  const isBooking = !!booking;

  const onConfirm = () => {
    if (isBooking) {
      handleCancel?.(booking._id);
    } else {
      handleDelete?.(tutor?._id);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialog.Trigger>
          <Button className="bg-transparent text-red-500 hover:text-red-700">
            <RiDeleteBinLine />
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  {isBooking ? "Cancel Booking Permanently?" : "Delete Tutor Permanently?"}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>{tutor?.tutorName || booking?.tutorName || "N/A"}</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={onConfirm} slot="close" variant="danger">
                  {isBooking ? "Cancel Booking" : "Delete Tutor"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteAlert;