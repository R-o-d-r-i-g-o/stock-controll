"use client";

import {
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";

import moment from "moment";
import { ArrowBack, MoreVert, Add } from "@mui/icons-material";

import { defaultDateMask } from "@/common";
import * as t from "./_types";

import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomTableContainer = styled(TableContainer)({
  marginTop: "30px",
  overflowX: "scroll",
});

const AuxTabela = ({ meta, data }: t.TableProps) => {
  const router = useRouter();

  const actionButtons = (
    <div className="flex justify-between">
      <button
        onClick={router.back}
        className="flex items-center text-gray-700 transition-colors hover:animate-jump animate-once"
      >
        <ArrowBack fontSize="small" className="mr-2" />
        Voltar
      </button>

      <Link
        className="text-gray-700 hover:animate-spin animate-once"
        href={`/panel/shoes/${meta.shoeId}/tags/create`}
      >
        <Add />
      </Link>
    </div>
  );

  return (
    <>
      {actionButtons}
      <CustomTableContainer>
        <Table className="w-full">
          <TableHead>
            <TableRow>
              <TableCell className="!text-center">#</TableCell>
              <TableCell className="!text-center">SKU</TableCell>
              <TableCell className="!text-center">Criador</TableCell>
              <TableCell className="!text-center">Status</TableCell>
              <TableCell className="!text-center">Data</TableCell>
              <TableCell className="!text-center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ||
              (data.length < 1 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <p className="text-gray-500">Nenhum registro encontrado.</p>
                  </TableCell>
                </TableRow>
              ))}
            {data?.map((tag) => (
              <TableRow key={tag.id} className="hover:bg-gray-100">
                <TableCell className="!text-center">{tag.id}</TableCell>
                <TableCell className="!text-center">{tag.sku}</TableCell>
                <TableCell className="!text-center">{tag.userId}</TableCell>
                <TableCell className="!text-center">
                  {tag.deletedAt != null ? "🔴 Desa." : "🟢 Ativo"}
                </TableCell>
                <TableCell className="!text-center">
                  {moment(tag.createdAt).format(defaultDateMask)}
                </TableCell>
                <TableCell className="!text-center">
                  <IconButton
                    onClick={() =>
                      router.push(`/panel/shoes/${meta.shoeId}/tags/${tag.id}`)
                    }
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </>
  );
};

export default AuxTabela;
