import axios from "axios";

import { useMutation, useQueryClient, UseMutateFunction } from "react-query";

import endpoint from "../utils/endpoint";

export const deleteBooking = (): {
  mutate: UseMutateFunction<void, unknown, number, unknown>;
  isLoading: boolean;
} => {
  const queryClient = useQueryClient();

  const deleteBookingHandler = async (bookingId: number) => {
    await axios.delete(`${endpoint}/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=", // Strange API :D
      },
    });
  };

  const { mutate, isLoading } = useMutation(deleteBookingHandler, {
    onSuccess: () => {
      console.log("deleted with success");
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
