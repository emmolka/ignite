import axios from "axios";

import { useQuery } from "react-query";

import { BookingData } from "../types";
import endpoint from "../utils/endpoint";

export const getBooking = (
  bookingid: number
): {
  bookingData: BookingData | undefined;
  loading: boolean;
  error: unknown;
} => {
  const getBookingHandler = async (bookingId: number) => {
    const { data } = await axios.get<BookingData>(
      `${endpoint}/${bookingId}`, // CORS proxy
      {
        headers: {
          Accept: "application/json", // api returns teapot without this param
        },
      }
    );
    return data;
  };
  const { data, isLoading, error } = useQuery(`${bookingid}`, () =>
    getBookingHandler(bookingid)
  );

  return { bookingData: data, loading: isLoading, error };
};
