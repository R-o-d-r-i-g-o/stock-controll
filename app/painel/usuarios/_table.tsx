'use client';

import React, { useState } from 'react';
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

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import { useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';

import * as t from './_types'
import { NavigationPage } from '@/common';

const CustomTableContainer = styled(TableContainer)({
  boxShadow: '0px 13px 20px 0px #80808029',
  borderRadius: '10px',
  overflow: 'hidden',
});

const CreateUserButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    color="primary"
    title='Adicionar Usuário'
    onClick={onClick}
  >
    <AddIcon />
  </IconButton>
)

const Tabela = ({ meta, users }: t.TabelaProps) => {
  const router = useRouter()
  const [page, setPage] = useState(0);

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault()
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <CreateUserButton onClick={() => router.push(NavigationPage.UsersCreate)} />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Usuários do sistema</h2>

      <CustomTableContainer className='overflow-x-auto'>
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
            {users?.map((u, index) => (
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

      <div className="flex justify-center items-center mt-4">
        <Pagination
          count={meta?.total}
          page={page}
          defaultPage={1}
          onChange={handleChangePage}
          siblingCount={1}
          boundaryCount={1}
          color="secondary"
        />
      </div>
    </React.Fragment>
  );
}

export default Tabela;
