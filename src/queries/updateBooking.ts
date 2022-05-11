import axios from "axios";

import { useMutation, useQueryClient, UseMutateFunction } from "react-query";

import { BookingData } from "../types";

import endpoint from "../utils/endpoint";

export const updateBooking = (): {
  mutate: UseMutateFunction<
    void,
    unknown,
    {
      bookingData: BookingData;
      bookingId: number;
    },
    unknown
  >;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();

  const updateBookingHandler = async ({
    bookingData,
    bookingId,
  }: {
    bookingData: BookingData;
    bookingId: number;
  }) => {
    await axios.patch<BookingData>(
      `${endpoint}/${bookingId}`, // CORS proxy
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
    await queryClient.invalidateQueries(`${bookingId}`);
  };

  const { mutate, isLoading } = useMutation(updateBookingHandler, {
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
