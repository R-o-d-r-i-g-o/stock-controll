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
      boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    }}
  >
    <MuiTable className="w-full">
      <TableHead>
        <TableRow className="bg-gray-100">
          <TableCell className="!text-center !font-semibold">#</TableCell>
          <TableCell className="!text-center !font-semibold">Código</TableCell>
          <TableCell className="!text-center !font-semibold">Valor</TableCell>
          <TableCell className="!text-center !font-semibold">Data</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data || data.length < 1 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <p className="text-gray-500">Nenhum registro encontrado.</p>
            </TableCell>
          </TableRow>
        ) : (
          data.map((payment) => (
            <TableRow key={payment.id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="!text-center">{payment.id}</TableCell>
              <TableCell className="!text-center">
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-mono">
                  {payment.code}
                </span>
              </TableCell>
              <TableCell className="!text-center !font-medium text-gray-800">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(payment.price)}
              </TableCell>
              <TableCell className="!text-center">{moment(payment.date).format(defaultDateMask)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;
