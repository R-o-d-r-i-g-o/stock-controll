"use client";

import React from "react";
import {
  Table as MuiTable,
  Collapse,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer as MuiTableContainer,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Link from "next/link";
import moment from "moment";

import useTable from "./use-table";
import Pagination from "@/components/ui/pagination";
import { AuxTable } from "./aux-table";
import { defaultDateMask } from "@/common/constants";

const TableContainer = styled(MuiTableContainer)({
  boxShadow: "0px 13px 20px 0px #80808029",
  borderRadius: "10px",
  overflowX: "scroll",
});

type TableProps = {
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
    shoes: {
      id: number;
      name: string;
      sole: string;
      note: string;
      color: string;
      createdAt: string;
      deletedAt: string | null;
      groupedItems: {
        size: number;
        items: {
          id: number;
          price: number;
        }[];
      }[];
    }[];
  };
};

const Table = ({ filter, data }: TableProps) => {
  const { handleRowClick, selectedRow } = useTable();

  return (
    <React.Fragment>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow className="bg-indigo-500">
              <TableCell className="!text-white font-semibold">#</TableCell>
              <TableCell className="!text-white font-semibold">Nome</TableCell>
              <TableCell className="!text-white font-semibold">Data</TableCell>
              <TableCell className="!text-white font-semibold">Cor</TableCell>
              <TableCell className="!text-white font-semibold">
                Solado
              </TableCell>
              <TableCell className="!text-white font-semibold">
                Config.
              </TableCell>
              <TableCell className="!text-white font-semibold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.shoes ||
              (data.shoes.length < 1 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <p className="text-gray-500">Nenhum registro encontrado.</p>
                  </TableCell>
                </TableRow>
              ))}
            {data.shoes?.map((c) => (
              <React.Fragment key={c.id}>
                <TableRow className="hover:bg-indigo-100">
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    {moment(c.createdAt).format(defaultDateMask)}
                  </TableCell>
                  <TableCell>{c.color}</TableCell>
                  <TableCell>{c.sole}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(c.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link href={`/panel/shoes/${c.id}`}>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={7}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={selectedRow === c.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="p-4">
                        <p className="text-gray-700">
                          <strong>Descrição:</strong>
                        </p>
                        <p className="text-gray-700">{c.note || "--"}</p>
                        <p className="text-gray-700 mt-6">
                          <strong>Tamanho X Unidades:</strong>
                        </p>
                        <AuxTable groupedItems={c.groupedItems} />
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

export default Table;
