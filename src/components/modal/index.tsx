import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { updateBooking } from "../../queries/updateBooking";
import { getBooking } from "../../queries/getBooking";
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
  const { bookingData, loading } = getBooking(bookingId);
  const { mutate: updateMutation, isLoading } = updateBooking();

  const updateBookingHandler = (bookingData: BookingData) =>
    bookingId && updateMutation({ bookingData, bookingId });

  const isReadyToRender = !loading && !isLoading && bookingData;

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
              bookingHandler={updateBookingHandler}
              editMode
            />
          )
        )}
        {(loading || isLoading) && "Loading booking data"}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
