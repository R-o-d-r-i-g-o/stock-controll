import Link from "next/link";
import moment from "moment";
import { OpenInNew, MoreVert } from "@mui/icons-material";
import { Table as MuiTable, TableCell, TableContainer, TableHead, TableBody, TableRow, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { defaultDateMask } from "@/common/constants";

type TableProps = {
  meta: {
    total: number;
    shoeId: number;
  };
  data: {
    id: number;
    sku: string;
    shoeId: number;
    userId: number;
    metadata: { [key: string]: object };
    createdAt: Date;
    deletedAt: Date | null;
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
    <MuiTable>
      <TableHead>
        <TableRow className="bg-gray-100">
          <TableCell className="!text-center !font-semibold">#</TableCell>
          <TableCell className="!text-center !font-semibold">SKU</TableCell>
          <TableCell className="!text-center !font-semibold">Criador</TableCell>
          <TableCell className="!text-center !font-semibold">Status</TableCell>
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
          data.map((tag) => (
            <TableRow key={tag.id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="!text-center">{tag.id}</TableCell>
              <TableCell className="!text-center">
                <Link
                  href={`/panel/shoes/${meta.shoeId}/items/sku/${tag.sku}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {tag.sku}
                  <OpenInNew fontSize="small" />
                </Link>
              </TableCell>
              <TableCell className="!text-center">
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs">
                  #{tag.userId}
                </span>
              </TableCell>
              <TableCell className="!text-center">
                {tag.deletedAt != null ? (
                  <span className="inline-flex items-center gap-1 text-xs">
                    <CancelIcon className="text-sm text-red-500" />
                    <span className="text-red-600">Desativado</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs">
                    <CheckCircleIcon className="text-sm text-green-500" />
                    <span className="text-green-600">Ativo</span>
                  </span>
                )}
              </TableCell>
              <TableCell className="!text-center">{moment(tag.createdAt).format(defaultDateMask)}</TableCell>
              <TableCell className="!text-center">
                <Link href={`/panel/shoes/${meta.shoeId}/tags/${tag.id}`}>
                  <IconButton size="small" className="hover:bg-gray-100">
                    <MoreVert fontSize="small" />
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
