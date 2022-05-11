import { useState } from "react";

import { Box, Grid, Button, Modal } from "@mui/material";

import { BookingData } from "../../types";
import Hookform from "./hookform";
import boxStyle from "../../utils/boxStyle";
import { addBooking } from "../../queries/addBooking";

const PostForm = (): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  const onClose = () => setIsOpened(false);

  const { mutate: newBookingMutation } = addBooking();

  const newBookingHandler = (bookingData: BookingData) => {
    newBookingMutation(bookingData);
    setIsOpened(false);
  };

  return (
    <Grid>
      <Modal open={isOpened} onClose={onClose}>
        <Box sx={boxStyle}>
          <Hookform bookingHandler={newBookingHandler} />
        </Box>
      </Modal>
      <Button variant="contained" onClick={() => setIsOpened(true)}>
        Add a new booking
      </Button>
    </Grid>
  );
};

export default PostForm;
