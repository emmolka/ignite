import axios from "axios";
import { useState, useEffect } from "react";

import Table from "../../components/table";
import { TableContainer, Paper } from "@mui/material";

const TablePage = (): JSX.Element => {
  const [bookingIds, setBookingIds] = useState<{ bookingid: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ bookingid: number }[]>(
        "https://thingproxy.freeboard.io/fetch/https://restful-booker.herokuapp.com/booking" // CORS proxy
      );

      setBookingIds(data.splice(0, 50));
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <TableContainer
      sx={{
        minWidth: 650,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      component={Paper}
    >
      <Table bookingIds={bookingIds} loading={loading} />
    </TableContainer>
  );
};

export default TablePage;