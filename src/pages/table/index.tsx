import Table from "../../components/table";
import { TableContainer, Paper } from "@mui/material";
const TablePage = (): JSX.Element => {
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
      <Table />
    </TableContainer>
  );
};

export default TablePage;
