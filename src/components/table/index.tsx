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

import Row from "./row";
import ModalComponent from "../modal";
import axios from "axios";

const BookingsTable = ({
  bookingIds,
  loading,
  fetchAllBookings,
}: BookingsTableProps): JSX.Element => {
  const headers = ["Booking id", "View", "Edit", "Delete"];

  const [openedBookingId, setOpenedBookingId] = useState<number>();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleModal = () => {
    setIsViewOnly(false);
    setIsModalOpened(false);
  };

  const deleteBooking = async (bookingId: number) => {
    try {
      await axios.delete(
        `https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=", // Strange API :D
          },
        }
      );
      fetchAllBookings();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <TableContainer
      sx={{ minWidth: 650, display: "flex", justifyContent: "center" }}
      component={Paper}
    >
      <ModalComponent
        bookingId={openedBookingId}
        isModalOpened={isModalOpened}
        onModalClose={handleModal}
        viewOnlyMode={isViewOnly}
      />
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
                  deleteBooking(bookingid);
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
