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
      boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    }}
  >
    <MuiTable className="w-full">
      <TableHead>
        <TableRow className="bg-gray-100">
          <TableCell className="!text-center !font-semibold">#</TableCell>
          <TableCell className="!text-center !font-semibold">SKU</TableCell>
          <TableCell className="!text-center !font-semibold">Tamanho</TableCell>
          <TableCell className="!text-center !font-semibold">Preço</TableCell>
          <TableCell className="!text-center !font-semibold">Data</TableCell>
          <TableCell className="!text-center !font-semibold"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data || data.length < 1 ? (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <p className="text-gray-500">Nenhum registro encontrado.</p>
            </TableCell>
          </TableRow>
        ) : (
          data.map((shoe) => (
            <TableRow key={shoe.id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="!text-center">{shoe.id}</TableCell>
              <TableCell className="!text-center">
                <Link
                  href={`/panel/shoes/${meta.shoeId}/items/sku/${shoe.sku}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {shoe.sku}
                  <OpenInNewIcon fontSize="small" />
                </Link>
              </TableCell>
              <TableCell className="!text-center">{shoe.size}</TableCell>
              <TableCell className="!text-center !font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(shoe.price)}
              </TableCell>
              <TableCell className="!text-center">{moment(shoe.createdAt).format(defaultDateMask)}</TableCell>
              <TableCell className="!text-center">
                <Link href={`/panel/shoes/${meta.shoeId}/items/${shoe.id}`}>
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
);

export default Table;
