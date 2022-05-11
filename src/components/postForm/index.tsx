import { useState } from "react";
import axios from "axios";

import { Box, Grid, Button, Modal } from "@mui/material";

import { BookingData } from "../../types";
import Hookform from "./hookform";
import boxStyle from "../../utils/boxStyle";

const PostForm = ({
  fetchAllBookings,
}: {
  fetchAllBookings: () => void;
}): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);

  const onClose = () => {
    setIsOpened(false);
  };

  const newBookingHandler = async (bookingData: BookingData) => {
    try {
      await axios.post(
        "https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking",
        {
          ...bookingData,
        },
        {
          headers: {
            Accept: "application/json", // api returns teapot without this param
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      alert(e);
    } finally {
      setIsOpened(false);
      fetchAllBookings();
    }
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
