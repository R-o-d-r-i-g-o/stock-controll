import Link from "next/link";
import moment from "moment";
import { OpenInNew, MoreVert } from "@mui/icons-material";
import {
  Table as MuiTable,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
} from "@mui/material";

import { defaultDateMask } from "@/common";

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
    }}
  >
    <MuiTable>
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
            <TableCell className="!text-center !text-blue-500 underline">
              <Link href={`/panel/shoes/${meta.shoeId}/items/sku/${tag.sku}`}>
                {tag.sku}
                <IconButton>
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Link>
            </TableCell>
            <TableCell className="!text-center">{tag.userId}</TableCell>
            <TableCell className="!text-center">
              {tag.deletedAt != null ? "🔴 Desa." : "🟢 Ativo"}
            </TableCell>
            <TableCell className="!text-center">
              {moment(tag.createdAt).format(defaultDateMask)}
            </TableCell>
            <TableCell className="!text-center">
              <Link href={`/panel/shoes/${meta.shoeId}/tags/${tag.id}`}>
                <IconButton>
                  <MoreVert />
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
