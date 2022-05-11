import Table from "../../components/table";
import PostForm from "../../components/postForm/index";
import { TableContainer, Paper } from "@mui/material";
import { getBookings } from "../../queries";

const TablePage = (): JSX.Element => {
  const { bookingIds = [], loading, error } = getBookings();

  if (error) return <p>An error has occurred</p>;

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
      <PostForm />
      <Table bookingIds={bookingIds} loading={loading} />
    </TableContainer>
  );
};

export default TablePage;
