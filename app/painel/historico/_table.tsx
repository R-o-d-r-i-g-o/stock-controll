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
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

import { useRouter } from "next/navigation";
import { NavigationPage } from '@/common';

import * as t from './_types'
import moment from 'moment';

const CustomTableContainer = styled(TableContainer)({
  boxShadow: '0px 13px 20px 0px #80808029',
  borderRadius: '10px',
  overflowX: 'scroll',
});

const Tabela = ({ filter, data }: t.TabelaProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const router = useRouter()
  const totalPages = Math.ceil(data.meta?.total / filter.size)

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault()
    router.push(`${NavigationPage.History}?page=${newPage}`)
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Histórico de atividades</h2>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-indigo-500">
              <TableCell className="!text-white font-semibold">#</TableCell>
              <TableCell className="!text-white font-semibold">Data</TableCell>
              <TableCell className="!text-white font-semibold">User</TableCell>
              <TableCell className="!text-white font-semibold">Calçado</TableCell>
              <TableCell className="!text-white font-semibold">Config.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.audits || data.audits.length < 1 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <p className="text-gray-500">Nenhum registro encontrado.</p>
                </TableCell>
              </TableRow>
            )}
            {data.audits?.map((a, index) => (
              <React.Fragment key={index}>
                <TableRow key={index} className="hover:bg-indigo-100">
                  <TableCell>
                    {a.id}
                  </TableCell>
                  <TableCell>
                    {moment(a.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {a.user}
                  </TableCell>
                  <TableCell>
                    {a.shoeId ?? "--"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(index)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={selectedRow === index} timeout="auto" unmountOnExit>
                      <div className="p-4">
                        <p className="text-gray-700"><strong>Descrição:</strong></p>
                        <p className="text-gray-700">{a.note}</p>
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
