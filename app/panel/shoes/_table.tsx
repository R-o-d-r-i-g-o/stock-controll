"use client";

import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useRouter } from "next/navigation";
import { defaultDateMask, footSizesList, NavigationPage } from "@/common";

import * as t from "./_types";
import moment from "moment";

const CustomTableContainer = styled(TableContainer)({
  boxShadow: "0px 13px 20px 0px #80808029",
  borderRadius: "10px",
  overflowX: "scroll",
});

type AuxTabelaProps = {
  groupedItems: t.GroupedItems[];
};

const AuxTabela = ({ groupedItems }: AuxTabelaProps) => {
  const itemCountBySize: { [size: number]: number } = {};

  groupedItems.forEach((group) => {
    itemCountBySize[group.size] =
      (itemCountBySize[group.size] || 0) + group.items.length;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          {footSizesList.map((size) => (
            <TableCell key={size}>{size}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {footSizesList.map((size) => (
            <TableCell key={size}>{itemCountBySize[size] || 0}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

const Tabela = ({ filter, data }: t.TabelaProps) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const router = useRouter();
  const totalPages = Math.ceil(data.meta?.total / filter.size);

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault();
    router.push(`${NavigationPage.Shoe}?page=${newPage}`);
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Calçados disponiveis
      </h2>
      <CustomTableContainer>
        <Table>
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
                    <IconButton
                      onClick={() =>
                        router.push(`${NavigationPage.Shoe}/${c.id}`)
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
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
                        <AuxTabela groupedItems={c.groupedItems} />
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
};

export default Tabela;
