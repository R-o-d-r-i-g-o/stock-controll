import React from "react";
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";

import Pagination from "@/components/ui/pagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Link from "next/link";

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
    users: Array<{
      id: number;
      name: string;
      role: string;
      email: string;
      createdAt: string;
      deletedAt: string | null;
    }>;
  };
};

const Table: React.FC<TableProps> = ({ filter, data }) => (
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
            <TableCell className="!text-white font-semibold">Nome</TableCell>
            <TableCell className="!text-white font-semibold">Email</TableCell>
            <TableCell className="!text-white font-semibold">Cargo</TableCell>
            <TableCell className="!text-white font-semibold">Status</TableCell>
            <TableCell className="!text-white font-semibold">Config.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data.users ||
            (data.users.length < 1 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <p className="text-gray-500">Nenhum registro encontrado.</p>
                </TableCell>
              </TableRow>
            ))}
          {data.users?.map((u, index) => (
            <TableRow key={index} className="hover:bg-indigo-100">
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>{u.deletedAt != null ? "🔴 Desa." : "🟢 Ativo"}</TableCell>
              <TableCell>
                <Link href={`/panel/users/${u.id}`}>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
    <Pagination page={filter.page} size={filter.size} total={data.meta.total} className="mt-4" />
  </React.Fragment>
);

export default Table;
