"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { defaultDateMask, footSizesList } from "@/common";

import * as t from "./_types";
import moment from "moment";
import Title from "@/components/ui/title";
import Pagination from "@/components/ui/pagination";
import Link from "next/link";

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

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <React.Fragment>
      <Title className="text-center mb-6 " text="Calçados disponiveis" />
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
