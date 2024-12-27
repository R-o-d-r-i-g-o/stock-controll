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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useRouter } from "next/navigation";
import { defaultDateMask, NavigationPage } from '@/common';

import * as t from './_types'
import moment from 'moment';

const CustomTableContainer = styled(TableContainer)({
  boxShadow: '0px 13px 20px 0px #80808029',
  borderRadius: '10px',
  overflowX: 'scroll',
});

const FOOT_SIZES = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

type AuxTabelaProps = {
  groupedShoes: t.GroupedShoe[];
};

const AuxTabela = ({ groupedShoes }: AuxTabelaProps) => {
  const shoeCountBySize: { [size: number]: number } = {};

  groupedShoes.forEach((group) => {
    shoeCountBySize[group.size] = (shoeCountBySize[group.size] || 0) + group.shoes.length;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          {FOOT_SIZES.map((size) => (
            <TableCell key={size}>{size}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {FOOT_SIZES.map((size) => (
            <TableCell key={size}>{shoeCountBySize[size] || 0}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Calçados disponiveis</h2>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-indigo-500">
              <TableCell className="!text-white font-semibold">#</TableCell>
              <TableCell className="!text-white font-semibold">Nome</TableCell>
              <TableCell className="!text-white font-semibold">Data</TableCell>
              <TableCell className="!text-white font-semibold">Cor</TableCell>
              <TableCell className="!text-white font-semibold">Solado</TableCell>
              <TableCell className="!text-white font-semibold">Config.</TableCell>
              <TableCell className="!text-white font-semibold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.categories || data.categories.length < 1 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <p className="text-gray-500">Nenhum registro encontrado.</p>
                </TableCell>
              </TableRow>
            )}
            {data.categories?.map((c, index) => (
              <React.Fragment key={index}>
                <TableRow key={index} className="hover:bg-indigo-100">
                  <TableCell>
                    {c.id}
                  </TableCell>
                  <TableCell>
                    {c.name}
                  </TableCell>
                  <TableCell>
                    {moment(c.createdAt).format(defaultDateMask)}
                  </TableCell>
                  <TableCell>
                    {c.color}
                  </TableCell>
                  <TableCell>
                    {c.sole}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(index)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(index)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={selectedRow === index} timeout="auto" unmountOnExit>
                      <div className="p-4">
                        <p className="text-gray-700"><strong>Descrição:</strong></p>
                        <p className="text-gray-700">{c.note || "--"}</p>
                        <p className="text-gray-700 mt-6"><strong>Tamanho X Unidades:</strong></p>
                        <AuxTabela groupedShoes={c.groupedShoes} />
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
