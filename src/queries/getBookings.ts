import axios from "axios";

import { useQuery } from "react-query";

import endpoint from "../utils/endpoint";

export const getBookings = (): {
  bookingIds: { bookingid: number }[] | undefined;
  loading: boolean;
  error: unknown;
} => {
  const getBookingIdsHandler = async () => {
    const { data } = await axios.get<{ bookingid: number }[]>(endpoint);
    return data;
  };
  const { data, isLoading, error } = useQuery(
    "booking-ids",
    getBookingIdsHandler
  );

  return { bookingIds: data, loading: isLoading, error };
};
