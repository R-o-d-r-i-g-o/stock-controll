'use client';

import React, { useState } from 'react';
import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const CustomTableContainer = styled(TableContainer)({
    boxShadow: '0px 13px 20px 0px #80808029',
    borderRadius: '10px',
    overflow: 'hidden',
});

interface RowData {
    name: string;
    email: string;
    status: string;
}

const data: RowData[] = [
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Pending' },
    { name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Pending' },
    { name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Pending' },
    { name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
    { name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Pending' },
    { name: 'Bob Brown', email: 'bob@example.com', status: 'Active' },
];

export default function Tabela() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
        e.preventDefault()

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (index: number) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Calçados disponíveis</h2>
                <CustomTableContainer > {/* component={Paper} */}
                    <Table>
                        <TableHead>
                            <TableRow className="bg-indigo-500 text-white">
                                <TableCell className="text-white font-semibold">Name</TableCell>
                                <TableCell className="text-white font-semibold">Email</TableCell>
                                <TableCell className="text-white font-semibold">Status</TableCell>
                                <TableCell className="text-white font-semibold">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow className="hover:bg-indigo-100">
                                        <TableCell>
                                            <div
                                                onClick={() => handleRowClick(index)}
                                                className="cursor-pointer"
                                            >
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleRowClick(index)}>
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
                                            <Collapse in={selectedRow === index} timeout="auto" unmountOnExit>
                                                <div className="p-4">
                                                    <p className="text-gray-700"><strong>Details:</strong></p>
                                                    <p className="text-gray-700">Email: {row.email}</p>
                                                    <p className="text-gray-700">Status: {row.status}</p>
                                                </div>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </CustomTableContainer>
                <TablePagination

                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="mt-4"
                    classes={{
                        root: 'flex justify-center',
                        selectIcon: 'text-indigo-600',
                        actions: 'text-indigo-600',
                    }}
                />
            </div>
        </div>
    );
}
