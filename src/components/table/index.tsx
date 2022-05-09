import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RowProps } from "../../types";

const Row = (props: RowProps) => {
  const rowArray = Object.values(props);

  return (
    <TableRow>
      {rowArray?.map((property, index) => {
        const renderValue =
          typeof property === "object"
            ? Object.values(property).join(" until ")
            : property.toString(); // case of booking dates

        return (
          <TableCell key={`${property}${index}`} align="center">
            {renderValue}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const TopicsTable = (): JSX.Element => {
  const headers = [
    "First name",
    "Last name",
    "Total price",
    "Deposit price",
    "Booking dates",
    "Additional needs",
  ];

  const row = {
    firstname: "Samantha",
    lastname: "Harris",
    totalprice: 115,
    depositpaid: true,
    bookingdates: {
      checkin: "2022-10-02",
      checkout: "2022-10-12",
    },
    additionalneeds: "null",
  };

  return (
    <TableContainer
      sx={{ minWidth: 650, display: "flex", justifyContent: "center" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650, maxWidth: 1250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={`${header}${index}`} align="center">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Row {...row} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopicsTable;
