'use client';

import React, { useState } from 'react';
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

import * as t from './_types'

const CustomTableContainer = styled(TableContainer)({
  boxShadow: '0px 13px 20px 0px #80808029',
  borderRadius: '10px',
  overflow: 'hidden',
});

const Tabela = ({ meta, users }: t.TabelaProps) => {
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault()
    setPage(newPage);
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Usuários do sistema</h2>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-indigo-500">
              <TableCell className="!text-white font-semibold">Name</TableCell>
              <TableCell className="!text-white font-semibold">Email</TableCell>
              <TableCell className="!text-white font-semibold">Status</TableCell>
              <TableCell className="!text-white font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow className="hover:bg-indigo-100">
                  <TableCell>
                    <div
                      onClick={() => handleRowClick(index)}
                      className="cursor-pointer"
                    >
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(index)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={selectedRow === index} timeout="auto" unmountOnExit>
                      <div className="p-4">
                        <p className="text-gray-700"><strong>Details:</strong></p>
                        <p className="text-gray-700">Email: {row.email}</p>
                        <p className="text-gray-700">Status: {row.role}</p>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
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