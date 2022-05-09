import { TableRow, TableCell, Button } from "@mui/material";

import { RowProps } from "../../types";

const Row = ({ bookingId, onEdit }: RowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell align="center">{bookingId}</TableCell>
      <TableCell align="center">
        <Button onClick={onEdit}>View</Button>
      </TableCell>
      <TableCell align="center">
        <Button onClick={onEdit}>Edit</Button>
      </TableCell>
      <TableCell align="center">
        <Button>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
