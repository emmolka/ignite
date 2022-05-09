import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { BookingData } from "../../types";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({
  bookingId,
  isModalOpened,
  onModalClose,
}: {
  bookingId?: number;
  isModalOpened: boolean;
  onModalClose: () => void;
}): JSX.Element => {
  const [bookingData, setBookingData] = useState<BookingData>();
  const [loading, setLoading] = useState(false);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<BookingData>(
        `https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking/${bookingId}`, // CORS proxy
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

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  return (
    <Modal open={isModalOpened} onClose={onModalClose}>
      <Box sx={boxStyle}>
        <Typography fontSize="20px">Booking id: {bookingId}</Typography>
        {!loading && bookingData && (
          <Box>
            <Typography>
              Additional needs: {bookingData.additionalneeds}
            </Typography>
            <Typography>
              Booking dates: {bookingData.bookingdates.checkin} until{" "}
              {bookingData.bookingdates.checkout}
            </Typography>
            <Typography>
              Deposit paid: {bookingData.depositpaid.toString()}
            </Typography>
            <Typography>First name: {bookingData.firstname}</Typography>
            <Typography>Last name: {bookingData.lastname}</Typography>
            <Typography>Total price: {bookingData.totalprice}</Typography>
          </Box>
        )}
        {loading && "Loading booking data"}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
