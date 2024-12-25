'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useRouter } from "next/navigation";
import { NavigationPage } from '@/common';

import * as t from './_types'

const CustomTableContainer = styled(TableContainer)({
  boxShadow: '0px 13px 20px 0px #80808029',
  borderRadius: '10px',
  overflowX: 'scroll',
});

const Tabela = ({ filter, data }: t.TabelaProps) => {
  const router = useRouter()
  const totalPages = Math.ceil(data.meta?.total / filter.size)

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault()
    router.push(`${NavigationPage.Users}?page=${newPage}`)
  };

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Usuários do sistema</h2>
      <div className="overflow-x-auto">
        <CustomTableContainer>
          <Table>
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
              {data.users?.map((u, index) => (
                <TableRow key={index} className="hover:bg-indigo-100">
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.deletedAt != null ? "🔴 Desabilitado" : "🟢 Ativo"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => router.push(`${NavigationPage.Users}/${u.id}`)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CustomTableContainer>
      </div>

      <div className="flex justify-center items-center mt-4">
        <Pagination
          defaultPage={1}
          count={totalPages}
          page={filter.page}
          onChange={handleChangePage}
          siblingCount={1}
          boundaryCount={1}
          color="primary"
        />
      </div>
    </React.Fragment>
  );
}

export default Tabela;
