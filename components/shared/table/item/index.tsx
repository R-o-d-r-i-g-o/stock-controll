import Link from "next/link";
import moment from "moment";
import { Table as MuiTable, TableRow, TableCell, TableHead, TableBody, IconButton, TableContainer } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { defaultDateMask } from "@/common/constants";

type TableProps = {
  meta: {
    shoeId: number;
  };
  data: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
};

const Table = ({ meta, data }: TableProps) => (
  <TableContainer
    style={{
      marginTop: "30px",
      overflowX: "scroll",
    }}
  >
    <MuiTable className="w-full">
      <TableHead>
        <TableRow>
          <TableCell className="!text-center">#</TableCell>
          <TableCell className="!text-center">SKU</TableCell>
          <TableCell className="!text-center">Tamanho</TableCell>
          <TableCell className="!text-center">Preço</TableCell>
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
        {data?.map((shoe) => (
          <TableRow key={shoe.id} className="hover:bg-gray-100">
            <TableCell className="!text-center">{shoe.id}</TableCell>
            <TableCell className="!text-center !text-blue-500 underline">
              <Link href={`/panel/shoes/${meta.shoeId}/items/sku/${shoe.sku}`}>
                {shoe.sku}
                <IconButton>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Link>
            </TableCell>
            <TableCell className="!text-center">{shoe.size}</TableCell>
            <TableCell className="!text-center">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(shoe.price)}
            </TableCell>
            <TableCell className="!text-center">{moment(shoe.createdAt).format(defaultDateMask)}</TableCell>
            <TableCell className="!text-center">
              <Link href={`/panel/shoes/${meta.shoeId}/items/${shoe.id}`}>
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
);

export default Table;
