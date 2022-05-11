import { useState } from "react";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

import { BookingsTableProps } from "../../types";
import { deleteBooking } from "../../queries/deleteBooking";

import Row from "./row";
import ModalComponent from "../modal";

const BookingsTable = ({
  bookingIds,
  loading,
}: BookingsTableProps): JSX.Element => {
  const headers = ["Booking id", "View", "Edit", "Delete"];

  const { mutate: deleteMutation } = deleteBooking();

  const [openedBookingId, setOpenedBookingId] = useState<number>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleModalClose = () => {
    setIsViewOnly(false);
    setIsModalOpened(false);
  };

  return (
    <TableContainer
      sx={{ minWidth: 650, display: "flex", justifyContent: "center" }}
      component={Paper}
    >
      {openedBookingId && (
        <ModalComponent
          bookingId={openedBookingId}
          isModalOpened={isModalOpened}
          onModalClose={handleModalClose}
          viewOnlyMode={isViewOnly}
        />
      )}
      <Table sx={{ minWidth: 650, maxWidth: 1250 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ minWidth: 650, maxWidth: 1250 }}>
            {headers.map((header, index) => (
              <TableCell key={`${header}${index}`} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            bookingIds?.map(({ bookingid }) => (
              <Row
                key={bookingid}
                bookingId={bookingid}
                onView={() => {
                  setIsViewOnly(true);
                  setOpenedBookingId(bookingid);
                  setIsModalOpened(true);
                }}
                onDelete={() => {
                  deleteMutation(bookingid);
                }}
                onEdit={() => {
                  setOpenedBookingId(bookingid);
                  setIsModalOpened(true);
                }}
              />
            ))}
          <TableRow>
            <TableCell align="center">
              {loading && "Data is loading..."}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingsTable;
