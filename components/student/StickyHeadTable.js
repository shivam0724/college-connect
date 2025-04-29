"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

export default function StickyHeadTable({ rows, columns }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.length === 0 || !rows && <TableRow><TableCell align='center' colSpan={columns.length}>No data available</TableCell></TableRow>}
                        {rows?.length > 0 && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if(column.id === "file"){
                                            return (
                                                <TableCell key={column?.id} align={column?.align}>
                                                    {value !== null && value !== undefined ? (
                                                        <Link href={value} target="_blank" className='text-blue-500 hover:underline'>
                                                            {/* {value.split('/').pop()} */} View
                                                        </Link>
                                                    ) : <span className='text-gray-400'>No Attachment</span>}
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column?.id} align={column?.align}>
                                                {value !== null ? value : <span className='text-gray-400'>No Attachment</span>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!rows || rows?.length < 6 ? null : (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
}
