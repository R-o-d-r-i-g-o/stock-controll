import { footSizesList } from "@/common";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

type AuxTableProps = {
  groupedItems: {
    size: number;
    items: {
      id: number;
      price: number;
    }[];
  }[];
};

const AuxTable = ({ groupedItems }: AuxTableProps) => {
  const itemCountBySize: { [size: number]: number } = {};

  groupedItems.forEach((group) => {
    itemCountBySize[group.size] =
      (itemCountBySize[group.size] || 0) + group.items.length;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          {footSizesList.map((size) => (
            <TableCell key={size}>{size}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {footSizesList.map((size) => (
            <TableCell key={size}>{itemCountBySize[size] || 0}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { AuxTable };
