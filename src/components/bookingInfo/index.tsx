import { Box, Typography } from "@mui/material";
import { BookingData } from "../../types";

const BookingInfo = ({
  firstname,
  lastname,
  totalprice,
  bookingdates: { checkin, checkout },
  additionalneeds,
  depositpaid,
}: BookingData): JSX.Element => {
  return (
    <Box>
      <Typography>First name: {firstname}</Typography>
      <Typography>Last name: {lastname}</Typography>
      <Typography>Total price: {totalprice}</Typography>
      <Typography>
        Booking dates: {checkin} until {checkout}
      </Typography>
      <Typography>Additional needs: {additionalneeds}</Typography>
      <Typography>Deposit paid: {depositpaid.toString()}</Typography>
    </Box>
  );
};

export default BookingInfo;
