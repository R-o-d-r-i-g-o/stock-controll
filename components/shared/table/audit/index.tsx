"use client";

import React, { useState } from "react";
import {
  Table as MuiTable,
  TableRow,
  Collapse,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import moment from "moment";

import { defaultDateMask } from "@/common/constants";
import Pagination from "@/components/ui/pagination";

type TabelaProps = {
  filter: {
    page: number;
    size: number;
  };
  data: {
    meta: {
      skip: number;
      take: number;
      total: number;
    };
    audits: Array<{
      id: number;
      user: string;
      note: string;
      shoeId: number;
      createdAt: string;
    }>;
  };
};

const Tabela = ({ filter, data }: TabelaProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <React.Fragment>
      <TableContainer
        style={{
          boxShadow: "0px 13px 20px 0px #80808029",
          overflowX: "scroll",
          borderRadius: "10px",
        }}
      >
        <MuiTable>
          <TableHead>
            <TableRow className="bg-indigo-500">
              <TableCell className="!text-white font-semibold">#</TableCell>
              <TableCell className="!text-white font-semibold">Data</TableCell>
              <TableCell className="!text-white font-semibold">User</TableCell>
              <TableCell className="!text-white font-semibold">
                Calçado
              </TableCell>
              <TableCell className="!text-white font-semibold">
                Config.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.audits ||
              (data.audits.length < 1 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <p className="text-gray-500">Nenhum registro encontrado.</p>
                  </TableCell>
                </TableRow>
              ))}
            {data.audits?.map((a, index) => (
              <React.Fragment key={a.id}>
                <TableRow className="hover:bg-indigo-100">
                  <TableCell>{a.id}</TableCell>
                  <TableCell>
                    {moment(a.createdAt).format(defaultDateMask)}
                  </TableCell>
                  <TableCell>{a.user}</TableCell>
                  <TableCell>{a.shoeId ?? "--"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(index)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={selectedRow === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="p-4">
                        <p className="text-gray-700">
                          <strong>Descrição:</strong>
                        </p>
                        <p className="text-gray-700">{a.note}</p>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Pagination
        page={filter.page}
        size={filter.size}
        total={data.meta.total}
        className="mt-4"
      />
    </React.Fragment>
  );
};

export default Tabela;
