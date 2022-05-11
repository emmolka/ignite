import axios from "axios";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "react-query";

import { BookingData } from "../types";

const endpoint =
  "https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking";

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
