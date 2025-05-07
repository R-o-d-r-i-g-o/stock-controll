import React from "react";
import moment from "moment";
import { Table as MuiTable, TableRow, TableCell, TableHead, TableBody, TableContainer } from "@mui/material";

import { defaultDateMask } from "@/common/constants";

type TableProps = {
  data: {
    id: number;
    code: string;
    date: number;
    price: number;
  }[];
};

const Table: React.FC<TableProps> = ({ data }) => (
  <TableContainer
    style={{
      marginTop: "30px",
      overflowX: "scroll",
    }}
  >
    <MuiTable className="w-full">
      <TableHead>
        <TableRow>
          <TableCell className="!text-center">#</TableCell>
          <TableCell className="!text-center">Code</TableCell>
          <TableCell className="!text-center">Valor</TableCell>
          <TableCell className="!text-center">Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data ||
          (data.length < 1 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <p className="text-gray-500">Nenhum registro encontrado.</p>
              </TableCell>
            </TableRow>
          ))}
        {data?.map((shoe) => (
          <TableRow key={shoe.id} className="hover:bg-gray-100">
            <TableCell className="!text-center">{shoe.id}</TableCell>
            <TableCell className="!text-center">{shoe.code}</TableCell>
            <TableCell className="!text-center">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(shoe.price)}</TableCell>
            <TableCell className="!text-center">{moment(shoe.date).format(defaultDateMask)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;
