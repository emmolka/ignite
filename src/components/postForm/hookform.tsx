import { useForm } from "react-hook-form";
import { Typography, Button, Input, Checkbox, Box } from "@mui/material";

import { HookformProps } from "../../types";
import dateRegExp from "../../utils/date";

const Hookform = ({
  bookingHandler,
  firstname = "",
  lastname = "",
  totalprice = 0,
  depositpaid = false,
  bookingdates = { checkin: "", checkout: "" },
  additionalneeds = "",
  editMode = false,
}: HookformProps): JSX.Element => {
  const { checkin = "", checkout = "" } = bookingdates;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstname,
      lastname,
      totalprice,
      depositpaid,
      bookingdates: {
        checkin,
        checkout,
      },
      additionalneeds,
    },
  });
  // Fields could be moved to some array to keep DRY

  const infoText = editMode ? "Edit booking" : "Add a new booking";

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        bookingHandler(formData);
      })}
    >
      <Typography>{infoText}</Typography>
      <Box>
        <Input
          placeholder="First name"
          {...register("firstname", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          error={!!errors.firstname}
        />
      </Box>
      <Box>
        <Input
          placeholder="Last name"
          {...register("lastname", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          error={!!errors.lastname}
        />
      </Box>
      <Box>
        <Typography>Total price</Typography>
        <Input
          placeholder="Total price"
          type="number"
          {...register("totalprice", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          error={!!errors.totalprice}
        />
      </Box>
      <Box>
        <Typography>Deposit paid</Typography>
        <Checkbox
          {...register("depositpaid")}
          defaultChecked={getValues("depositpaid")}
        />
      </Box>
      <Box>
        <Typography>Check in/out</Typography>
        <Input
          {...register("bookingdates.checkin", {
            required: true,
            pattern: {
              value: dateRegExp,
              message: "Applied wrong date format",
            },
          })}
          error={!!errors.bookingdates?.checkin}
          placeholder="Check in date"
        />
        <Input
          {...register("bookingdates.checkout", {
            required: {
              value: true,
              message: "This field is required",
            },
            validate: (value: string) =>
              value >= getValues("bookingdates.checkin") ||
              "Please enter checkout date later than checkin",
          })}
          placeholder="Check out date"
          error={!!errors.bookingdates?.checkout}
        />
      </Box>
      <Box>
        <Input
          {...register("additionalneeds", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          placeholder="Additional needs"
          error={!!errors.additionalneeds}
        />
      </Box>
      <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
        {infoText}
      </Button>
    </form>
  );
};

export default Hookform;
