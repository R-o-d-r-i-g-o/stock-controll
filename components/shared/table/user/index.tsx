import React from "react";
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import Pagination from "@/components/ui/pagination";
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
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.1)",
        overflowX: "scroll",
        borderRadius: "8px",
      }}
    >
      <MuiTable>
        <TableHead>
          <TableRow className="bg-indigo-500">
            <TableCell className="!text-white !font-semibold">#</TableCell>
            <TableCell className="!text-white !font-semibold">Nome</TableCell>
            <TableCell className="!text-white !font-semibold">Email</TableCell>
            <TableCell className="!text-white !font-semibold">Cargo</TableCell>
            <TableCell className="!text-white !font-semibold">Status</TableCell>
            <TableCell className="!text-white !font-semibold">Config.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data.users || data.users.length < 1 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <p className="text-gray-500">Nenhum registro encontrado.</p>
              </TableCell>
            </TableRow>
          ) : (
            data.users.map((u, index) => (
              <TableRow
                key={index}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <TableCell>{u.id}</TableCell>
                <TableCell className="!font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs">
                    {u.role}
                  </span>
                </TableCell>
                <TableCell>
                  {u.deletedAt != null ? (
                    <span className="inline-flex items-center gap-1 text-xs">
                      <CancelIcon className="text-sm text-red-500" />
                      <span className="text-red-600">Desativado</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs">
                      <CheckCircleIcon className="text-sm text-green-500" />
                      <span className="text-green-600">Ativo</span>
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/panel/users/${u.id}`}>
                    <IconButton size="small" className="hover:bg-gray-100">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
    <Pagination page={filter.page} size={filter.size} total={data.meta.total} className="mt-4" />
  </React.Fragment>
);

export default Table;
