import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { BookingData, ModalComponentProps } from "../../types";
import BookingInfo from "../bookingInfo";
import Hookform from "../postForm/hookform";
import boxStyle from "../../utils/boxStyle";

const ModalComponent = ({
  bookingId,
  isModalOpened,
  onModalClose,
  viewOnlyMode,
}: ModalComponentProps): JSX.Element => {
  const [bookingData, setBookingData] = useState<BookingData>();
  const [loading, setLoading] = useState(false);

  const fetchBookingData = async (bookingIdInner: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get<BookingData>(
        `https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking/${bookingIdInner}`, // CORS proxy
        {
          headers: {
            Accept: "application/json", // api returns teapot without this param
          },
        }
      );
      setBookingData(data);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (bookingData: BookingData, bookingId: number) => {
    try {
      setLoading(true);
      const { data } = await axios.patch<BookingData>(
        `https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking/${bookingId}`, // CORS proxy
        {
          ...bookingData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=", // Strange API :D
            Accept: "application/json",
          },
        }
      );
      setBookingData(data);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bookingId && fetchBookingData(bookingId);
  }, [bookingId]);

  const isReadyToRender = !loading && bookingData;

  return (
    <Modal open={isModalOpened} onClose={onModalClose}>
      <Box sx={boxStyle}>
        <Typography fontSize="20px">Booking id: {bookingId}</Typography>
        {isReadyToRender && viewOnlyMode ? (
          <BookingInfo {...bookingData} />
        ) : (
          isReadyToRender && (
            <Hookform
              {...bookingData}
              bookingHandler={(bookingData) =>
                bookingId && updateBooking(bookingData, bookingId)
              }
              editMode
            />
          )
        )}
        {loading && "Loading booking data"}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
