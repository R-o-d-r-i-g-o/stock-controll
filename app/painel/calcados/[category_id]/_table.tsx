import {
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow
} from '@mui/material';

import * as t from './_types'

const CustomTableContainer = styled(TableContainer)({
  marginTop: '30px',
  overflowX: 'scroll',
});

const AuxTabela = ({ data }: t.TableProps) => {
  return (
    <CustomTableContainer>
      <Table className='w-full'>
        <TableHead>
          <TableRow>
            <TableCell className="!text-center">ID</TableCell>
            <TableCell className="!text-center">SKU</TableCell>
            <TableCell className="!text-center">Tamanho</TableCell>
            <TableCell className="!text-center">Preço</TableCell>
            <TableCell className="!text-center">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data || data.length < 1 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <p className="text-gray-500">Nenhum registro encontrado.</p>
              </TableCell>
            </TableRow>
          )}
          {data?.map((shoe) => (
            <TableRow key={shoe.id} className="hover:bg-gray-100">
              <TableCell className="!text-center">{shoe.id}</TableCell>
              <TableCell className="!text-center">{shoe.sku}</TableCell>
              <TableCell className="!text-center">{shoe.size}</TableCell>
              <TableCell className="!text-center">{`R$ ${shoe.price.toFixed(2)}`}</TableCell>
              <TableCell className="!text-center">{new Date(shoe.createdAt).toISOString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default AuxTabela;
