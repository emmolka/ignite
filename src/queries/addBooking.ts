import axios from "axios";

import { useMutation, useQueryClient, UseMutateFunction } from "react-query";
import endpoint from "../utils/endpoint";

import { BookingData } from "../types";
export const addBooking = (): {
  mutate: UseMutateFunction<void, unknown, BookingData, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();
  const newBookingHandler = async (bookingData: BookingData) => {
    await axios.post<BookingData>(
      endpoint,
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
  };

  const { mutate, isLoading } = useMutation(newBookingHandler, {
    onSuccess: (data) => {
      return data;
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("booking-ids");
    },
  });

  return { mutate, isLoading };
};
